var Post = require('../models/post');
var Comment = require('../models/comment');
var passport = require('passport');

module.exports = {
  // FUNCTION TO CHECK IF USER IS LOGGED IN
    isUserLoggedIn: function(req, res, next) {
        // !!!!!@TODO must have proper error if user hasn't signed up, hasnt authenticated email, hasnt been auth by admin
        // if(req.isAuthenticated() === false && req.user.userVerifiedByAdmin ===false ) {

        // }
        
        if(req.isAuthenticated()) {                         // if user is logged in
            if(req.user.userVerifiedByAdmin === true) {     // if user is verified by admin
                next();
            } else {   
                req.flash('error', 'You have not been authorized by the admins!');                                     // if user is logged in but not verified by amdin
                // req.flash('notAuthorizedByAdmin', 'You have not been authorized by the admins!');
                res.redirect('/login');
            }
        } else {                                                          
            req.flash('error', 'You must be logged in to do that!');          
            res.redirect('/login');
        }
    },

  // FUNCTION TO CHECK IF A) USER IS LOGGED IN AND B) POST TO BE EDITED/DELETED IS 'OWNED' BY USER WHO IS TRYING TO DO SAID FUNCTIONS
    checkPostOwnership: function(req, res, next) {
        Post.findById(req.params.id, function(err, queriedPostToEdit){
            if(err){
                res.redirect("back");
            } else {
                if(queriedPostToEdit.userPosting.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You can only edit or delete a post you have posted!');
                    res.redirect('/back');
                }
            }
        });        
    },

  //FUNCTION TO CHECK IF A) USER IS LOGGED AND B) COMMENT TO BE EDITED/DELETED IS 'OWNED' BY USER WHO IS ATTEMPTING TO DO SAID FUNCTION
    checkCommentOwnership: function(req, res, next) {
        Comment.findById(req.params.comment_id, function(err, queriedCommentToEdit){
            if(err){
                res.redirect("back");
            } else {
                if(queriedCommentToEdit.userCommenting.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You can only edit or delete a post you have posted!');
                    res.redirect('back');
                }
            }
        });
    },

    // messageBoardPostValidation: function(req, res, next, done) {
    //     if(req.body.postHeading && req.body.postText) {
    //         next();
    //     } else {
    //         return done(null, false, req.flash('error', 'Your post must have text in the heading and the body! :)'));
    //     }
    // }


}

// !!TODO:
// ADMIN MIDDLE . REQ.ISADMIN === TRUE