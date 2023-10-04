const model = require('../models/event');
const { dateFormat } = require('../scripts/dateFormat')

exports.events = (req, res)=>{
    let events = model.find();
    res.render('./event/events', {events});
};

exports.new = (req, res)=>{
    res.render('./event/newEvent');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/event', {event, dateFormat});
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    };
};

exports.create = (req, res)=>{
    let event = req.body;
    let filePath = req.file.path;
    let splitPaths = filePath.split('\\');
    let fileName = splitPaths[splitPaths.length - 1];
    event.eventImage = fileName;
    model.add(event);
    res.redirect('/events');
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err);
    };
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err);
    };
};

exports.update = (req, res, next)=>{
    let id = req.params.id;
    let event = req.body;
    let filePath = req.file.path;
    let splitPaths = filePath.split('\\');
    let fileName = splitPaths[splitPaths.length - 1];
    event.eventImage = fileName;
    if (model.updateById(id, event)) {
        res.redirect('/events/');
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err);
    };
};