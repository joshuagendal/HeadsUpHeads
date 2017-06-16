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
		// app.get('path', controller)
		app.post('/message-board/new-post', middleware.isUserLoggedIn, (req, res) =>{
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





		// app.get('/message-board/:id/edit', function(req, res){
		// 	Post.findById(req.params.id, function(err, queriedPostToEdit){
		// 		if(err){
		// 			res.redirect('/')
		// 		} else {
		// 			res.render('messageBoard/edit-post.ejs', {queriedPostToEdit: queriedPostToEdit});
		// 		}
		// 	});
		// });		

		// app.put('/message_board/:id', function(req, res){

		// })

    // DISPLAY INDIVIDUAL POSTS
    app.get('/message-board/:id', (req, res) =>{
      Post.findById(req.params.id).populate('comments').exec(function(err, queriedPost){
        if(err){
          console.log(err);
          res.redirect("/");
        } else {
          res.render('messageBoard/view-post.ejs', {queriedPost: queriedPost});
        }
      });
    });


    		// EDIT POST
	app.get("/message-board/:id/edit", middleware.checkPostOwnership, function(req, res){
        Post.findById(req.params.id, function(err, queriedPostToEdit){
            res.render("messageBoard/edit-post.ejs", {queriedPostToEdit: queriedPostToEdit});
        });
	});

    // UPDATE POST
            // below if where req.params.id come from
    app.put("/message-board/:id", middleware.checkPostOwnership, function(req, res){
        var data = {
            postHeading: req.body.postHeading,
            postText: req.body.postText
        }
        Post.findByIdAndUpdate(req.params.id, data, function(err, updatedPost){
            if(err){
                res.redirect("/")
            } else {
                res.redirect("/message-board/" + req.params.id);
            }
        });

    });

    // DESTROY POST ROUTE
    app.delete("/message-board/:id", middleware.checkPostOwnership, function(req, res){
        Post.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect('/');
            } else {
                res.redirect('/message-board');
            }
        });
    });













}
