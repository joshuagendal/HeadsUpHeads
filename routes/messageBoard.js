var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');
var middleware = require('../middleware/functions.js');

module.exports = (app) => {
	// GET MESSAGE BOARD W/ ALL POSTS
	app.get('/message-board', (req, res) => {
		Post.find({}, function(err, allPosts){
			if(err){
				console.log(err);
				res.redirect('/');
			} else {
				res.render('messageBoard/message-board.ejs', {posts: allPosts});
			}

		});
  });

    // SHOW NEW POST FORM
		app.get('/message-board/new-post', middleware.isUserLoggedIn, (req, res) =>{
			res.render('messageBoard/new-post.ejs')
		});

    // ADD NEW POST
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

		app.get('/message-board/:id/edit', function(req, res){
			res.send('EDIT CAMPGROUND ROUTE');
		});		

    // DISPLAY INDIVIDUAL POSTS
    app.get('/message-board/:id', (req, res) =>{
      Post.findById(req.params.id).populate('comments').exec(function(err, queriedPost){
        if(err){
          console.log(err);
        } else {
          res.render('messageBoard/view-post.ejs', {queriedPost: queriedPost});
        }
      });
    });
//				if(err){
//					console.log(err);
//					return done(err);
//				}

		// EDIT POST












}
