module.exports = {
  // FUNCTION TO CHECK IF USER IS LOGGED IN
  isUserLoggedIn: function(req, res, next){
    if(req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }

}
