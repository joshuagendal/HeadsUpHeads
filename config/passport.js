var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const emailController = require('../controllers/emailController');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

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

        const {username, firstName, lastName, email, password, isThirteen, company, professionalTitle, jobDescription, role, business, 
          cell, firstPhishShow, lastPhishShow, firstDeadShowWithJerry, lastDeadShowWithJerry, firstFav, secondFav, thirdFav} = req.body;



        const newUser = new User({                        // js destructuring assignment: have object, instead of doing object.field, extracting info from body
          username,
	      firstName,
          lastName,
          email,
          password,
          isThirteen,
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
          topThreeFavLiveExp: {
              firstFav,
              secondFav,
              thirdFav
          },
          userEmailKey: userShortId,    
          userEmailVerified: false,
          userVerifiedByAdmin: false,
        });

        newUser.save((err, newUser) => {
            if(err) {
                console.log('Error saving' + err);
                return done(true);
            } else {                // below call variables that will feed into sendEmail function
                req.flash('signupSuccessMsg', 'Thanks for signing up with Heads Up Heads! Please check your email for an email verification link!');
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

        const loginPostReqErrMsgs = [];  

        // PASSPORT ERROR
        if(err){  
            loginPostReqErrMsgs.push('System Error! Please contact the site administrators!')
            return done(err);
        } 
        // USER EMAIL IS NOT IN DB
        if(!user){
            loginPostReqErrMsgs.push('Email does not exist! Please try again!');
            return done(null, false, req.flash('loginPostReqErrs', loginPostReqErrMsgs));
        } 
        
        // USER NOT VERIFIED BY EMAIL
        if(user.userEmailVerified === false){
            loginPostReqErrMsgs.push('You must verify your email! Please verify your email via the email we sent you and try again!');
            return done(null, false, req.flash('loginPostReqErrs', loginPostReqErrMsgs));
        }

        // USER NOT VERIFIED BY ADMIN
        if(user.userVerifiedByAdmin === false){
            loginPostReqErrMsgs.push('The administrators of Head Up Heads have yet to verify you! Hang tight!');
            return done(null, false, req.flash('loginPostReqErrs', loginPostReqErrMsgs));
        }

        // INVALID PASSWORD
        if(bcrypt.compareSync(password, user.password) === false){
            loginPostReqErrMsgs.push('Invalid Password! Try Again!');
            return done(null, false, req.flash('loginPostReqErrs', loginPostReqErrMsgs));
        }
        else if(user){
            console.log('LOGIN SUCCESSFUL')                    
            return done(null, user);
            }
        }
    );
    }));
          
    

