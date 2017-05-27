var User = require('../models/user');
var Post = require('../models/post');

module.exports = (app) => {
    app.get('/message-board', (req, res) => {
			Post.find({}, function(err, allPosts){
				if(err){
					console.log(err);
				} else {
					res.render('messageBoard/message-board.ejs', {posts: allPosts});
				}
					
			});
    });
	
		app.get('/message-board/new-post', (req, res) =>{
			res.render('messageBoard/new-post.ejs')
		});
	
		app.post('/message-board/new-post', (req, res) =>{
//		  var newPost = new Post();
			var postHeading = req.body.postHeading;
			var postText = req.body.postText;
			var userPosting = {
				id: req.user._id,
				username: req.user.username
			}
			var created = new Date();
			var newPost = {postHeading: postHeading, postText: postText, userPosting: userPosting, created: created}
			console.log(newPost);
			Post.create(newPost, function(err, newlyPosted){
				if(err){
					console.log(err);
				} else {
					console.log(newlyPosted);
					res.redirect('/')
				}
			});
		});
				
				
//				if(err){
//					console.log(err);
//					return done(err);
//				}
			
			}
