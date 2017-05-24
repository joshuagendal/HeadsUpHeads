var User = require('../models/user');
var Post = require('../models/post');

module.exports = (app) => {
    app.get('/message-board', (req, res) => {
    	res.render('messageBoard/message-board.ejs');
    });
	
		app.get('/message-board/new-post', (req, res) =>{
			res.render('messageBoard/new-post.ejs')
		});
	
		app.post('/message-board/new-post', (req, res) =>{
		  var newPost = new Post();
			newPost.postHeading = req.body.postHeading;
			newPost.postText = req.body.postText;
			newPost.userPosting = {
				id: req.user._id,
				username: req.user.username
			}
			newPost.created = new Date();
			
			console.log(newPost);
			
			newPost.save((err) => {
				successRedirect: '/',
				failureRedirect: '/login',
				failureFlash: true
			})
				
				
//				if(err){
//					console.log(err);
//					return done(err);
//				}
			
			});
		}
