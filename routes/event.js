const Event = require('../models/event');
const actions = require('../controllers/eventController.js');
const middleware = require('../middleware/functions.js');


module.exports = (app) => {

	// 	GET ALL EVENTS
	app.get('/events', actions.getAllEvents);
	
	// GET NEW EVENT PAGE
	app.get('/events/new-event', middleware.isUserLoggedIn, actions.getNewEventPage);

	// POST EVENT
	app.post('/events/new-event', middleware.isUserLoggedIn, actions.eventPostValidation, actions.postNewEvent);

}
