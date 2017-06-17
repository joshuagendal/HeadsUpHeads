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
	app.get('/message-board/:id/comments/:comment_id/edit', (req, res) => {
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				res.redirect("back");
			} else {
				res.render("comments/edit-comment.ejs", {post_id: req.params.id, comment: comment});
			}
		});
	});

	// UPDATE COMMENT ROUTE
	app.put("/message-board/:id/comments/:comment_id", (req, res) => {
		var data = {commentText: req.body.commentText}

		Comment.findByIdAndUpdate(req.params.comment_id, data, function(err, updatedComment){
			if(err){
				res.redirect("/");
			} else {
				res.redirect("/message-board/" + req.params.id);
			}
		});
	});

	// DEESTROY COMMENT ROUTE
	app.delete("/message-board/:id/comments/:comment_id", (req, res) => {
		Comment.findByIdAndRemove(req.params.comment_id, function(err){
			if(err){
				console.log(err);
				res.redirect('back');
			} else {
				res.redirect('/message-board/' + req.params.id);
			}
		});
	});
	


}
