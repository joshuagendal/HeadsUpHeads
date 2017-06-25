const actions = require('../controllers/emailController');

module.exports = (app) => {
	
	app.get('/verifyuser', actions.verifyUser); 

	
	app.get('/verifyByAdmin', actions.verifyAdmin); 
}