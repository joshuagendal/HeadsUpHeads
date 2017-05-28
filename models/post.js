var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    postHeading: {type: String, required: true},
    postText: {type: String, required: true},
    userPosting: {
			id: {type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
			},
			username: {type: String, required: true}
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
			  ref: 'Comment'
		}
	],
    created: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);
