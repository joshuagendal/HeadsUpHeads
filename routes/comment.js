const middleware = require('../middleware/functions.js');
const actions = require('../controllers/commentController.js');

module.exports = (app) => {
	// GO TO PAGE WITH COMMENT FORM
	app.get('/message-board/:id/new-comment', middleware.isUserLoggedIn, actions.getCommentForm); 

	// POST COMMENT (LOGGED IN USERS ONLY)			
	app.post('/message-board/:id/new-comment', middleware.isUserLoggedIn, actions.postComment); 

	// GET EDIT COMMENT FORM (USER WHO POSTED COMMENT ONLY)
	app.get('/message-board/:id/comments/:comment_id/edit', middleware.isUserLoggedIn, middleware.checkCommentOwnership, actions.getEditCommentForm);

	// UPDATE COMMENT ROUTE
	app.put("/message-board/:id/comments/:comment_id", middleware.isUserLoggedIn, middleware.checkCommentOwnership, actions.putUpdateComment);

	// DESTROY COMMENT ROUTE
	app.delete("/message-board/:id/comments/:comment_id", middleware.checkCommentOwnership, actions.deleteComment);
}
