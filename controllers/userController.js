const User = require('../models/user')

function signUpValidation(req, res, next) {
	req.checkBody('firstName', 'First name is required!').notEmpty();
	req.checkBody('lastName', 'Last name is required!').notEmpty();
	req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'This email already has an account!').isEmail();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password', 'Password must be more than 5 characters!').isLength({min:5});
	req.check('password', 'Password must contain at least 1 number!').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");
    // req.checkBody('business', 'Your business phone number is incorrect! Phone numbers are 9 or 10 characters! Please try again!').matches('/^\d{9}$/');
    // req.checkBody('cell', 'Your business phone number is incorrect! Phone numbers are 9 or 10 characters! Please try again!').matches('/^\d{9}$/');

	var errors = req.validationErrors();

	if(errors) {
		var messages = [];
		errors.forEach((error) => {
			messages.push(error.msg);
		});

		req.flash('error', messages);
		res.redirect('/signup'); // errors displayed on signup page
	} else {
		return next();
	}	
}	

function loginValidation(req, res, next) {
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'Email address is invalid! Please try again').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password Must Not Be Less Than 5 Characters').isLength({min:5});    

    var loginErrors = req.validationErrors();


    if(loginErrors){
        var loginValidationErrMsgs = [];
        loginErrors.forEach((error) => {
            loginValidationErrMsgs.push(error.msg);
        });
        req.flash('loginValidationErrs', loginValidationErrMsgs);
        res.redirect('/login');
    } else {
        return next();
    }
}

function deleteUser(req, res) { 
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.send('USER DELETED');
        }
    });
};


module.exports = {
    signUpValidation,
    loginValidation,
    deleteUser
}