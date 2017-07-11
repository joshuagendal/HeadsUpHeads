const Event = require('../models/event');
const actions = require('../controllers/eventController.js');
const middleware = require('../middleware/functions.js');


module.exports = (app) => {

	// 	GET ALL EVENTS
	app.get('/events', actions.getAllEvents);
	
	// GET NEW EVENT PAGE
	app.get('/events/new-event', middleware.isUserLoggedIn, actions.getNewEventPage);
	
	// (req, res) => {
	// 	res.render('events/new-event.ejs')
	// });

	// POST EVENT
	app.post('/events/new-event', middleware.isUserLoggedIn, actions.eventPostValidation, actions.postNewEvent);

}
	
// 	(req, res) => {
// 		var eventTitle = req.body.eventTitle;
// 		var eventDescription = req.body.eventDescription;
// 		var userThatAddedEvent = {
// 			id: req.user._id,
// 			username: req.user.username
// 		}
// 		var created = new Date();
// 		var newEvent = {eventTitle: eventTitle, eventDescription: eventDescription, userThatAddedEvent: userThatAddedEvent, created: created}	
// 		Event.create(newEvent, function(err, newlyAddedEvent){
// 			if(err){
// 				console.log(err);
// 				res.redirect('/');
// 			} else {
// 				res.redirect('/events');
// 			}
// 		});
// 	});
// }