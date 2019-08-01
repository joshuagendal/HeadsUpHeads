const Post = require('../models/post');
const Event = require('../models/event');
const async = require('async');

// GET HOME PAGE --- query 5 most recent events and (message board) posts asychronously
let getHomePage = (req, res) => {
	const successMsg = req.flash('signupSuccessMsg');
	var fiveRecentPosts = {};
	var fiveRecentEvents = {};

	async.parallel([
		function(cb){
			Post.find({}).sort({_id:-1}).limit(5).exec((err, recentPosts) => {
				if(err){
					return cb(err);
				} else {
					fiveRecentPosts = recentPosts;
					cb();
				};
			});
		},
		function(cb){
			Event.find({}).sort({_id:-1}).limit(5).exec((err, recentEvents) => {
				if(err){
					return cb(err);
				} else {
					fiveRecentEvents = recentEvents;
					cb();
				};
			});
		}
], function(err){
		if(err){
			return next(err);
		} else {
			res.render('home.ejs', {
				mostRecentPosts: fiveRecentPosts,
				mostRecentEvents: fiveRecentEvents,
				successMsg: successMsg,
				hasSuccessMsg: successMsg.length > 0
			});
		}
	});
};

module.exports = {
	getHomePage
}