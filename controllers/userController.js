const User = require('../models/user');
const Event = require('../models/event')
const RSVP = require('../models/rsvp');

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.register = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(user=> {
        req.flash('success', 'Registration successful.');
        res.redirect('/users/login')
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/register');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email already taken.');  
            return res.redirect('/users/register');
        }
        
        next(err);
    }); 
};

exports.getLogin = (req, res)=>{
    res.render('./user/login');
};

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Incorrect email address.');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                    req.flash('success', 'You have successfully logged in.');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'Incorrect password.');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));

};

exports.profile = (req, res, next)=>{
    let id = req.session.user.id;
    Promise.all([User.findById(id), Event.find({host: id}), RSVP.find({user: id}).populate('event')])
    .then(results=>{
        const [user, events, rsvps] = results;
        res.render('./user/profile', {user, events, rsvps})
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.flash('success', 'You have successfully logged out');
    
    req.session.destroy(err=>{
        if(err) {
            console.error('Error destroying session: ', err)
            return next(err);
        }
        res.redirect('/'); 
    });   
};