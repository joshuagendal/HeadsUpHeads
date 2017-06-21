var Post = require('../models/post');
var Comment = require('../models/comment');
var passport = require('passport');

module.exports = {
  // FUNCTION TO CHECK IF USER IS LOGGED IN
    isUserLoggedIn: function(req, res, next) {
        if(req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    },

  // FUNCTION TO CHECK IF A) USER IS LOGGED IN AND B) POST TO BE EDITED/DELETED IS 'OWNED' BY USER WHO IS TRYING TO DO SAID FUNCTIONS
    checkPostOwnership: function(req, res, next) {
        if(req.isAuthenticated){
            Post.findById(req.params.id, function(err, queriedPostToEdit){
                if(err){
                    res.redirect("back");
                } else {
                    if(queriedPostToEdit.userPosting.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            });        
        } else {
            res.redirect("back");
        }
    },

  //FUNCTION TO CHECK IF A) USER IS LOGGED AND B) COMMENT TO BE EDITED/DELETED IS 'OWNED' BY USER WHO IS ATTEMPTING TO DO SAID FUNCTION
    checkCommentOwnership: function(req, res, next) {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, queriedCommentToEdit){
                if(err){
                    res.redirect("back");
                } else {
                    if(queriedCommentToEdit.userCommenting.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    },

    // messageBoardPostValidation: function(req, res, next, done) {
    //     if(req.body.postHeading && req.body.postText) {
    //         next();
    //     } else {
    //         return done(null, false, req.flash('error', 'Your post must have text in the heading and the body! :)'));
    //     }
    // }


}
