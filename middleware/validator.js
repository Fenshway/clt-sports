const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateRegistration = [
    body('firstName').notEmpty().trim().escape(),
    body('lastName').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be betwen 8 and 64 characters.').isLength({min: 8, max: 64})
];

exports.validateLogin = [
    body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be betwen 8 and 64 characters.').isLength({min: 8, max: 64})
];

exports.validateEvent = [
    body('category', 'Category must be from the provided selections.'),
    body('title', 'Title must not be empty.').notEmpty().trim().escape(),
    body('details', 'Details must not be empty.').notEmpty().trim().escape(),
    body('location', 'Location must not be empty.').notEmpty().trim().escape(),
    body('start', 'Start time cannot be before current time.').notEmpty()
        .custom((value, {req})=>{
            const current = new Date();
            const start = new Date(value);

            if (start <= current) {
                return false;
            } else {
                return true;
            }
        }),
    body('end', 'End time cannot be before start time.').notEmpty()
        .custom((value, {req})=>{
            const start = new Date(req.body.start);
            const end = new Date(value);

            if (end <= start) {
                return false;
            } else {
                return true;
            }
        })
];

exports.validateResult = (req, res, next)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}