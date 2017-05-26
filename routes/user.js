var passport = require('passport');

module.exports = (app) => {

    app.get('/signup', (req, res) => {
        var errors = req.flash('error');
        console.log(errors);
    	res.render('user/signup', {messages: errors, hasErrors: errors.length > 0});
    });

	app.post('/signup', signUpValidation, passport.authenticate('local.signup', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

    app.get('/login', (req, res) => {
        var errors = req.flash('error');
        console.log(errors);
        res.render('user/login', {messages: errors, hasErrors: errors.length > 0});
    });

    app.post('/login', loginValidation, passport.authenticate('local.login', {
      successRedirect: '/', // if user successfully signs up via passport
      failureRedirect: '/login',  // intention: to authenticate w/ Passport. Before authentication, you validate users info. GOAL is t
      failureFlash : true
    }));



	app.get('/', (req, res) => {
		res.render('user/index');
	});
}

// =============== USER SIGN UP VALIDATION ============================

function signUpValidation(req, res, next){
	req.checkBody('firstName', 'First name is required!').notEmpty();
	req.checkBody('lastName', 'Last name is required!').notEmpty();
	req.checkBody('email', 'Email is required!').notEmpty();
  req.checkBody('email', 'This email already has an account!').isEmail();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password', 'Password must be more than 5 characters!').isLength({min:5});
	req.checkBody('password', 'Password must contain at least 1 number!').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

	var errors = req.validationErrors();

	if(errors){
		var messages = [];
		errors.forEach((error) => {
			messages.push(error.msg);
		});

		req.flash('error', messages);
		res.redirect('/signup');
	}else {
		return next();
	}	
}	

function loginValidation(req, res, next){
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'Email address is invalid! Please try again').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password Must Not Be Less Than 5 Characters').isLength({min:5});    

    var loginErrors = req.validationErrors();

    if(loginErrors){
        var messages = [];
        loginErrors.forEach((error) => {
            messages.push(error.msg);
        });

        req.flash('error', messages);
        res.redirect('/login');
    } else {
        return next();
    }
}


