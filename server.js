var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var validator = require("express-validator");
var ejs = require("ejs");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var path = require("path");

var app = express();

mongoose.Promise = global.Promise;
var url =
  process.env.MONGODB_URI ||
  "mongodb://huh-admin:headsupheads123!@ds153352.mlab.com:53352/headsupheads-main";
mongoose.connect(url);

require("./config/passport.js");

app.use(express.static(path.join(__dirname, "public")));
// app.engine('ejs', engine);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(validator());

// MongoStore (connect-mongo) config
app.use(
  session({
    secret: "testkey",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// This app.use function below is used to declare global variables - AKA variables that are
// available from ALL ROUTES.

// LEVEL OF AUTHENTICATION:
// 3. currentUser : signed up, email auth, admin auth -- completely authorized
// 2. notAuthByAdminUser: signed up, email auth, !admin auth
// 1. notEmailAuthUser: signed up, !email auth, !admin auth
app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.userVerifiedByAdmin === true) {
      res.locals.currentUser = req.user;
      res.locals.notAuthByAdminUser = false;
      res.locals.notEmailAuthUser = false;
    } else {
      res.locals.notAuthByAdminUser = true;
      res.locals.currentUser = false;
      res.locals.notEmailAuthUser = false;
    }
  } else {
    res.locals.notEmailAuthUser = true;
    res.locals.currentUser = false;
    res.locals.notAuthByAdminUser = false;
  }

  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

require("./routes")(app);

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("App is listening on port " + port);
});

module.exports = app;
