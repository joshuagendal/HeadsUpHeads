const actions = require("../controllers/userController");
const emailActions = require("../controllers/emailController");
const passport = require("passport");

module.exports = app => {
  // GET SIGNUP FORM
  app.get("/signup", actions.getSignupForm);

  // POST SIGNUP FORM
  // STEPS: 1. Client-side validation
  // 2. Server-side validation
  app.post(
    "/signup",
    actions.signUpValidation,
    passport.authenticate("local.signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  // GET LOGIN FORM
  app.get("/login", actions.getLoginForm);

  // POST LOGIN FORM
  // STEPS: 1. Client-side validation
  // 2. Server-side validation
  app.post(
    "/login",
    actions.loginValidation,
    passport.authenticate("local.login", {
      // @TODO add in function to make sure user is verified by admin
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  // LOGOUT
  app.get("/logout", actions.logout);

  // PASSWORD RESET
  app.get("/password-reset", actions.getPasswordResetForm);

  // SEND EMAIL TO USER
  app.post("/password-reset", emailActions.sendPasswordResetEmail);

  // GET NEW PASSWORD FORM
  // app.get("/harpua/reset-password", actions.getNewPasswordForm);

  // GET EMAILED USER TO PASSWORD RESET FORMX
  app.get("/harpua/reset-password/:email", actions.getNewPasswordForm);

  app.post("/harpua/reset-password/:email", actions.postNewPassword);

  // DELETE USER
  app.delete("/:id/1m0a7c53ndtkejd", actions.deleteUser);
};
