const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	content:{
		type: String,
		rquered: true
	},
	date: {
		type: String,
		rquered: true
	}
});

const tweetModel = mongoose.model('tweets', tweetSchema);

module.exports = tweetModel;