const express = require('express');
const controller = require('../controllers/eventController');
const {fileUpload} = require('../middleware/fileUpload');
const router = express.Router();

//GET /stories: send all events to user
router.get('/', controller.events);

//GET /events/new: form to create a new event
router.get('/new', controller.new);

//GET /events/:id: details of any particular story
router.get('/:id', controller.show);

//POST /events: create a new event
router.post('/', fileUpload, controller.create);

//DELETE /events/:id: delete story by id
router.delete('/:id', controller.delete); 

//GET /events/:id/edit: form to update event
router.get('/:id/edit', controller.edit);

//PUT /events/:id: update event by id
router.put('/:id', fileUpload, controller.update);

module.exports = router;