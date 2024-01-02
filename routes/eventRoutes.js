const express = require('express');
const controller = require('../controllers/eventController');
const { fileUpload } = require('../middleware/fileUpload');
const { validateEventId } = require('../middleware/validateEventId');
const { isLoggedIn } = require('../middleware/auth');
const { isHost, isNotHost } = require('../middleware/auth');
const { validateEvent, validateResult } = require('../middleware/validator');
const router = express.Router();

//GET /stories: send all events to user
router.get('/', controller.events);

//GET /events/new: form to create a new event
router.get('/new', isLoggedIn, controller.new);

//GET /events/:id: details of any particular story
router.get('/:id', validateEventId, controller.show);

//POST /events: create a new event
router.post('/', fileUpload, isLoggedIn, validateEvent, validateResult, controller.create);

//DELETE /events/:id: delete story by id
router.delete('/:id', validateEventId, isLoggedIn, isHost, controller.delete); 

//GET /events/:id/edit: form to update event
router.get('/:id/edit', validateEventId, isLoggedIn, isHost, controller.edit);

//PUT /events/:id: update event by id
router.put('/:id', fileUpload, validateEventId, isLoggedIn, isHost, validateEvent, validateResult, controller.update);

//POST /events/:id RSVP to event
router.post('/:id/rsvp', validateEventId, isLoggedIn, isNotHost, controller.rsvp)

module.exports = router;