const express = require('express');
const controller = require('../controllers/userController');
const { isGuest } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/auth');
const { validateRegistration, validateLogin, validateResult } = require('../middleware/validator');
const { loginLimiter } = require('../middleware/rateLimiters');
const router = express.Router();

router.get('/register', isGuest, controller.new);

router.post('/', isGuest, validateRegistration, validateResult, controller.register);

router.get('/login', isGuest, controller.getLogin);

router.post('/login', loginLimiter, isGuest, validateLogin, validateResult, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
