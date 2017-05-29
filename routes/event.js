var Event = require('../models/event');

module.exports = (app) => {
	app.get('/events', (req, res) => {
		Event.find({}, function(err, allEvents){
			if(err){
				console.log(err);
				res.redirect('/');
			} else {
				res.render('events/show-all.ejs', {events: allEvents});
			}
		});
	});	
	;

	app.get('/events/new-event', (req, res) => {
		res.render('events/new-event.ejs')
	});

	app.post('/events/new-event', (req, res) => {
		var eventTitle = req.body.eventTitle;
		var eventDescription = req.body.eventDescription;
		var userThatAddedEvent = {
			id: req.user._id,
			username: req.user.username
		}
		var created = new Date();
		var newEvent = {eventTitle: eventTitle, eventDescription: eventDescription, userThatAddedEvent: userThatAddedEvent, created: created}	
		Event.create(newEvent, function(err, newlyAddedEvent){
			if(err){
				console.log(err);
				res.redirect('/');
			} else {
				res.redirect('/events');
			}
		});


	});
}

