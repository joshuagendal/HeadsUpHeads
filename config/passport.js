var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err);
        }

        if(user){
            return done(null, false, req.flash('error', 'User with email already exists'));
        }

        const {username, firstName, lastName, email, password, company, professionalTitle, jobDescription, role, business, 
          cell, firstPhishShow, lastPhishShow, firstDeadShowWithJerry, lastDeadShowWithJerry, topThreeFavLiveExp } = req.body;
        const newUser = new User({                        // js destructuring assignment: have object, instead of doing object.field, extracting info from body
          username,
					firstName,
          lastName,
          password,
          email,
          company,
          professionalTitle,
          jobDescription,
          role,
          telephone: {
            business,
            cell
          },
          firstPhishShow,
          lastPhishShow,
          firstDeadShowWithJerry,
          lastDeadShowWithJerry,
          topThreeFavLiveExp                                                       // stuff inside request body
        });
//        newUser.encryptPassword(password); 

        newUser.save((err, newUser) => {
            console.log('Error saving' + err);
		    return done(null, newUser);
        });
    });
}));


passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err);
        } 
        const messages = [];    
        
        if(!user){
            messages.push('Email does not exist!');
            return done(null, false, req.flash('error', messages));
        }
        else if(user){                     // if condition above is false and this condition is true
            return done(null, user);
            
            
            
            
            // var correctPassword = user.validPassword(password);

            // if(!correctPassword){
            //     messages.push('Not a valid pasword!');
            //     return done(null, false, req.flash('error', messages));
            // }    
            // else{
            }
        }
    );
    }));
          
    

