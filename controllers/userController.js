const User = require("../models/user");

// GET SIGNUP FORM
let getSignupForm = (req, res) => {
  var errors = req.flash("errors");
  res.render("user/signup.ejs", {
    messages: errors,
    hasErrors: errors.length > 0
  });
};

// 	SIGNUP VALIDATION
let signUpValidation = (req, res, next) => {
  req.checkBody("firstName", "First name is required!").notEmpty();
  req.checkBody("lastName", "Last name is required!").notEmpty();
  req.checkBody("email", "Email is required!").notEmpty();
  req.checkBody("email", "This email already has an account!").isEmail();
  req.checkBody("password", "Password is required!").notEmpty();
  req
    .checkBody("password", "Password must be more than 5 characters!")
    .isLength({ min: 5 });
  req
    .checkBody("company", "Please tell us what company you work for!")
    .notEmpty();
  req
    .checkBody(
      "isThirteen",
      "You must be at least 13 years of age to join HUH! Please check the check box"
    )
    .notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    // Create error messages array and send array to signup page
    var messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });

    req.flash("errors", messages);
    // Errors displayed on signup page
    res.redirect("/signup");
  } else {
    return next();
  }
};

// GET LOGIN FORM
let getLoginForm = (req, res) => {
  var loginValidationErrors = req.flash("loginValidationErrs");
  var loginPostErrors = req.flash("loginPostReqErrs");
  if (loginValidationErrors) {
    console.log("VALIDATION ERROR(S): " + loginValidationErrors);
  }
  if (loginPostErrors) {
    console.log("POST REQ ERRORS): " + loginPostErrors);
  }
  // MUST PASS THIS ROUTE THE LOGIN POST REQUEST ERRORS
  res.render("user/login.ejs", {
    loginValidationErrs: loginValidationErrors,
    loginValidationHasErrs: loginValidationErrors.length > 0,
    loginPostReqErrs: loginPostErrors,
    loginPostReqHasErrs: loginPostErrors.length > 0
  });
};

// LOGIN VALIDATION
let loginValidation = (req, res, next) => {
  req.checkBody("email", "Email is required!").notEmpty();
  req
    .checkBody("email", "Email address is invalid! Please try again")
    .isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password", "Password Must Not Be Less Than 5 Characters")
    .isLength({ min: 5 });
  var loginErrors = req.validationErrors();

  if (loginErrors) {
    var loginValidationErrMsgs = [];
    loginErrors.forEach(error => {
      loginValidationErrMsgs.push(error.msg);
    });
    req.flash("loginValidationErrs", loginValidationErrMsgs);
    res.redirect("/login");
  } else {
    return next();
  }
};

// LOGOUT
let logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

// PASSWORD RESET
let getPasswordResetForm = (req, res) => {
  res.render("user/passwordReset.ejs");
};

let sendPasswordResetEmail = (req, res) => {
  const userEmail = req.body.email;

  console.log("USER EMAIL: ", userEmail);

  res.render("/");
};

// DELETE USER
let deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err) {
    // request must come from admin
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.send("USER DELETED");
    }
  });
};

module.exports = {
  getSignupForm,
  signUpValidation,
  getLoginForm,
  loginValidation,
  logout,
  getPasswordResetForm,
  deleteUser
};
