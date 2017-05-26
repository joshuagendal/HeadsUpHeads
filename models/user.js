var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');    // npm encryption module

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
    business: {type: String, required: false},
    cell: {type: String, required: false},  
  },
  firstPhishShow: {type: Date, required: false},
  lastPhishShow: {type: Date, required: false},
  firstDeadShowWithJerry: {type: Date, required: false},
  lastDeadShowWithJerry: {type: Date, required: false},
  topThreeFavLiveExp: {type: Date, required: false}

});

// below is are INSTANCE methods that you only have access to after instantiate new User object
//userSchema.methods.encryptPassword = function(password){
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
//}
//
//userSchema.methods.validPassword = function(password) {
//  return bcrypt.compareSync(password, this.password);
//}

module.exports = mongoose.model('User', userSchema);
