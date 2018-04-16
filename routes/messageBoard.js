const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const actions = require('../controllers/messageBoardController');
const middleware = require('../middleware/functions.js');

module.exports = (app) => {

	// GET MESSAGE BOARD W/ ALL POSTS
	app.get('/message-board', actions.getMessageBoard);

  // SHOW NEW POST FORM
	app.get('/message-board/new-post', middleware.isUserLoggedIn, actions.getNewPostForm);

  // POST A NEW MSG BRD POST
	app.post('/message-board/new-post', middleware.isUserLoggedIn, actions.messageBoardPostValidation, actions.postMessageBoard);

  // DISPLAY INDIVIDUAL POSTS
  app.get('/message-board/:id', actions.getIndividualPostById);

  // GET EDIT POST FORM
	app.get("/message-board/:id/edit", middleware.isUserLoggedIn, middleware.checkPostOwnership, actions.getEditPostForm);

  // UPDATE POST
  app.put("/message-board/:id", middleware.checkPostOwnership, actions.putUpdateEditedPost);

  // DESTROY POST ROUTE
  app.delete("/message-board/:id", middleware.checkPostOwnership, actions.deletePost);
}
