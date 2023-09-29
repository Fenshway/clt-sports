const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.get('/', controller.events);

router.get('/new', controller.new);



module.exports = router;