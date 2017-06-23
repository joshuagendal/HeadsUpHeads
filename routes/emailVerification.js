const actions = require('../controllers/emailController');

module.exports = (app) => {
	// GO TO PAGE WITH COMMENT FORM
	app.get('/verifyuser', actions.verifyUser); 

	// DESTROY COMMENT ROUTE
	app.get('/verifyByAdmin', actions.verifyAdmin); 
}