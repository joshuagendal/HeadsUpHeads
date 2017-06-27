var mongoose = require('mongoose');
var bcrypt = require('bcrypt');    //    npm encryption module

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required:true},
    company: {type: String, required: true},          // where user works
    professionalTitle: {type: String, required: false}, // ... if any
    jobDescription: {type: String, required: false},
    role: {type: String, required:false},
    telephone: {
    business: {type: Number, required: false},
    cell: {type: Number, required: false},  
    },
    firstPhishShow: {type: Date, required: false},
    lastPhishShow: {type: Date, required: false},
    firstDeadShowWithJerry: {type: Date, required: false},
    lastDeadShowWithJerry: {type: Date, required: false},
    topThreeFavLiveExp: {
        firstFav: {type: String, required: false},
        secondFav: {type: String, required: false},
        thirdFav: {type: String, required: false}
    },
    dateJoined: {type: Date, required: false, default: Date.now},
    userEmailKey: {type: String, required: false},
    userEmailVerified: {type: Boolean, required: false},
    userVerifiedByAdmin: {type: Boolean, required: false},
    isAdmin: {type: Boolean, required: false}

});


userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            return next(err);
        } else {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                } else {
                    user.password = hash;
                    next();
                }
            });
        }
    });
});

module.exports = mongoose.model('User', userSchema);
