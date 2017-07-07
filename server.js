var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
// var ejs = require('ejs');
// var engine = require('ejs-mate');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var path = require('path');

var app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/networking'); //rateme is name of db

require('./config/passport.js');


app.use(express.static(path.join(__dirname, 'public')));
// app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(validator());

app.use(session({
    secret: 'testkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){                           
    if(req.isAuthenticated()){
        if(req.user.userVerifiedByAdmin === true) {         // LEVEL OF AUTHENTICATION:
            res.locals.currentUser = req.user;              // 3. currentUser : signed up, email auth, admin auth
            res.locals.notAuthByAdminUser = false;          // 2. notAuthByAdminUser: signed up, email auth, !admin auth
            res.locals.notEmailAuthUser = false;            // 1. notEmailAuthUser: signed up, !email auth, !admin auth
        } else {                                            
            res.locals.notAuthByAdminUser = true; 
            res.locals.currentUser = false;
            res.locals.notEmailAuthUser = false;
        }
    }
    else {
        res.locals.notEmailAuthUser = true;
        res.locals.currentUser = false;
        res.locals.notAuthByAdminUser = false;    
    }

    // res.locals.mustBeLoggedInErrMsg = req.flash('mustBeLoggedInError');
    // res.locals.postSuccessMessage = req.flash('msgBrdPostSuccessMsg');
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');

    // res.locals.isVerifiedByAdmin = req.user.userVerifiedByAdmin;
    next();
});



require('./routes')(app);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});


module.exports = app;