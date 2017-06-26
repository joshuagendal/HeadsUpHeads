var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');    //    npm encryption module

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

// @TODO: requiredL true is only necessary when it is true. false not needed
// const saltRounds = 10;

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         password = hash;       
//     })
// });

// below is are INSTANCE methods that you only have access to after instantiate new User object
//userSchema.methods.encryptPassword = function(password){
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
//}
//
//userSchema.methods.validPassword = function(password) {
//  return bcrypt.compareSync(password, this.password);
//}

module.exports = mongoose.model('User', userSchema);
