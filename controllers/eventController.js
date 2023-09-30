const model = require('../models/event')
const categories = []

exports.events = (req, res)=>{
    let events = model.find();
    res.render('./event/events', {events});
};

exports.new = (req, res)=>{
    res.render('./event/newEvent')
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/event', {event});
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.create = (req, res)=>{
    let event = req.body;
    model.add(event);
    res.redirect('/events');
}
