var actions = require('../controllers/userController');
var passport = require('passport');

module.exports = (app) => {
    app.get('/signup', (req, res) => {
        var errors = req.flash('error');
        console.log(errors);
    	res.render('user/signup.ejs', {messages: errors, hasErrors: errors.length > 0});
    });

	app.post('/signup', actions.signUpValidation, passport.authenticate('local.signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

    app.get('/login', (req, res) => {
        var loginErrors = req.flash('loginErrorMessages');
        console.log('LOGIN ERROR(S): ' + loginErrors);
        res.render('user/login.ejs', {                  
            loginErrorMessages: loginErrors,
            loginPostReqHasErrors: loginErrors.length > 0,
            });
    });
    // error: req.flash('mustBeLoggedInError')
    // mustBeLoggedInError: req.flash('mustBeLoggedInError')
    app.post('/login', actions.loginValidation, passport.authenticate('local.login', { // @TODO add in function to make sure user is verified by admin
        successRedirect: '/', // if user successfully signs up via passport
        failureRedirect: '/login',  // intention: to authenticate w/ Passport. Before authentication, you validate users info. GOAL is t
        failureFlash : true
    }));

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });
}
