const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	}
});

const tweetModel = mongoose.model('tweets', tweetSchema);

module.exports = tweetModel;