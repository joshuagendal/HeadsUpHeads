const Event = require('../models/event');

let getAllEvents = (req, res) => {
    Event.find({}, function(err, allEvents){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('events/show-all.ejs', {events: allEvents});
        }
    });
}	

let getNewEventPage = (req, res) => {
    res.render('events/new-event.ejs');
};

let postNewEvent = (req, res) => {
    const eventTitle = req.body.eventTitle;
    const eventDescription = req.body.eventDescription;
    const userThatAddedEvent = {
        id: req.user._id,
        username: req.user.username
    }
    const created = new Date();
    const newEvent = {eventTitle: eventTitle, eventDescription: eventDescription, userThatAddedEvent: userThatAddedEvent, created: created}	
    Event.create(newEvent, function(err, newlyAddedEvent){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/events');
        }
    });
};

let eventPostValidation = (req, res, next) => {
    if(!req.body.eventTitle || !req.body.eventDescription) {
        req.flash('error', 'Your event must have a title and a decription! Please try again');
        res.redirect('/events/new-event');
    } else {
        next();
    }
}



module.exports = {
    getAllEvents,
    getNewEventPage,
    postNewEvent,
    eventPostValidation
}