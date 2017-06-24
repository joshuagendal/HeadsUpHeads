var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const emailController = require('../controllers/emailController');
const shortid = require('shortid');

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
         
        const userShortId  = shortid.generate();

        const {username, firstName, lastName, email, password, company, professionalTitle, jobDescription, role, business, 
          cell, firstPhishShow, lastPhishShow, firstDeadShowWithJerry, lastDeadShowWithJerry, topThreeFavLiveExp} = req.body;
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
          topThreeFavLiveExp,
          userEmailKey: userShortId,    
          userEmailVerified: false,
          userVerifiedByAdmin: false,
        });


        newUser.save((err, newUser) => {
            if(err) {
                console.log('Error saving' + err);
                return done(true);
            } else {                // below call variables that will feed into sendEmail function
                let htmlData = `            
                   <b>
                       Hello ${username} please verify your account by clicking this link
                       <a href="http://localhost:3000/verifyuser?token=${userShortId}">here</a>
                   </b>
                `;
                let subject = "Please verify your email";
                emailController.sendEmail(htmlData, email, subject, (err, stat) => {
                    return done(null, newUser);
                });
            }
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
            console.log('PASSPORT ERROR');
            return done(err);
        } 
        const loginPostReqErrMsgs = [];    
        
        if(!user){
            loginPostReqErrMsgs.push('Email does not exist! Please try again');
            return done(null, false, req.flash('loginPostReqErrs', loginPostReqErrMsgs));
        }
        else if(user){
            console.log('LOGIN SUCCESSFUL')                     // if condition above is false and this condition is true
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
          
    

