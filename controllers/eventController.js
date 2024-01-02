const Event = require('../models/event');
const { dateFormat, toISO } = require('../public/scripts/dateFormat');
const RSVP = require('../models/rsvp');

exports.events = (req, res, next)=>{
    Event.find()
    .then(events=>res.render('./event/events', {events}))
    .catch(err=>next(err))
};

exports.new = (req, res)=>{
    res.render('./event/newEvent');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;

    Promise.all([Event.findById(id).populate('host', '_id firstName lastName'), RSVP.find({ event: id }) ])
    .then(results=>{
        if (results) {
            const [event, rsvps] = results
            res.render('./event/event', {event, rsvps, dateFormat})
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.create = (req, res, next)=>{
    let event = new Event(req.body)
    event.eventImage = req.file.filename;
    event.host = req.session.user.id;
    event.save()
    .then(event=> {
        req.flash('success', 'Event created successfully.');
        res.redirect('/events')
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    })
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    Event.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event=>{
        if(event){
            RSVP.deleteMany({ event: event._id })
            .then(()=> {
                req.flash('success', 'Successfully deleted the event');
                res.redirect('/events')
            })
            .catch(err => next(err))
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;

    Event.findById(id)
    .then(event=>{
        if(event){
            res.render('./event/edit', {event, toISO})
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let id = req.params.id;
    let event = req.body;


    if(req.file && req.file.path) {
        event.eventImage = req.file.filename;
    }

    Event.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event){
            req.flash('success', 'Successfuly updated event');
            res.redirect('/events/' + id);
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if (err.name === 'ValidationError')
            err.status = 400;
        next(err);
    })
};

exports.rsvp = (req, res, next)=>{
    let id = req.params.id;
    let userId = req.session.user.id;
    let userResponse = Object.values(req.body)[0];

    RSVP.findOneAndUpdate(
        { event: id, user: userId },
        { $set: { 'status': userResponse } },
        { new: true, upsert: true }
    )
    .then(rsvp => {
        req.flash('success', 'Successfully updated RSVP to event');
        res.redirect('/users/profile');
    })
    .catch(err=>{
        if (err.name === 'ValidationError')
        err.status = 400;
        next(err);
    })
}