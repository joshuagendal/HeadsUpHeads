var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');

var actions = require('../controllers/messageBoardController');
var middleware = require('../middleware/functions.js');

module.exports = (app) => {

	// GET MESSAGE BOARD W/ ALL POSTS
	app.get('/message-board', actions.getMessageBoard);

    // SHOW NEW POST FORM
	app.get('/message-board/new-post', middleware.isUserLoggedIn, (req, res) => {
		res.render('messageBoard/new-post.ejs');
	});

    // ADD NEW POST
	app.post('/message-board/new-post', middleware.isUserLoggedIn, actions.postMessageBoard);

    // DISPLAY INDIVIDUAL POSTS
    app.get('/message-board/:id', actions.getIndividualPostById);

    // EDIT POST
	app.get("/message-board/:id/edit", middleware.checkPostOwnership, actions.getEditPostForm);

    // UPDATE POST
            // below if where req.params.id come from
    app.put("/message-board/:id", middleware.checkPostOwnership, actions.putUpdateEditedPost);

    // DESTROY POST ROUTE
    app.delete("/message-board/:id", middleware.checkPostOwnership, actions.deletePost);
}
