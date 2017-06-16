var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');
var middleware = require('../middleware/functions.js');

module.exports = (app) => {

	// GO TO PAGE WITH COMMENT FORM
	app.get('/message-board/:id/new-comment', middleware.isUserLoggedIn, (req, res) => {
		console.log('Param: ' + req.params.id);
		Post.findById(req.params.id, function(err, post){
			if(err){
				console.log(err);
			} else {
				res.render('comments/new.ejs', {post: post});
			}
		});
	});

	// POST COMMENT (LOGGED IN USERS ONLY)			********* FIGURE OUT HOW TO PROPERLY CONFIGURE ROUTES TO INDUSTRY STANDARDS
	app.post('/message-board/:id/new-comment', (req, res) => {
		Post.findById(req.params.id, function(err, postToCommentOn){
			if(err){
				console.log(err);
				res.redirect('/');
			} else {
				var commentText = req.body.commentText;
				var userCommenting = {
					id: req.user._id,
					username: req.user.username
				}
				var created = new Date();
				var newComment = {commentText: commentText, userCommenting: userCommenting, created: created}
				Comment.create(newComment, function(err, newlyAddedComment){
					if(err){
						console.log(err);
						res.redirect('/');
					} else {
						postToCommentOn.comments.push(newlyAddedComment);
						postToCommentOn.save();
						res.redirect('/message-board/' + postToCommentOn._id);
					}
				});
			}
		});
	});

	// EDIT COMMENT (USER WHO POSTED COMMENT ONLY)
	// app.get('/')

	// UPDATE CAMPGROUND ROUTE


}
