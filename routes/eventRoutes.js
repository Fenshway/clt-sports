const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

//GET /stories: send all events to user
router.get('/', controller.events);

//GET /events/new: form to create a new event
router.get('/new', controller.new);

//GET /events/:id: details of any particular story
router.get('/:id', controller.show);

//POST /events: create a new event
router.post('/', controller.create)

module.exports = router;