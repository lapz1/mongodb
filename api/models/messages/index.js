const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	content:{
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	tweetId:{
		type: String,
		required: true
	}
});

const messageModel = mongoose.model('messages', messageSchema);

module.exports = messageModel;