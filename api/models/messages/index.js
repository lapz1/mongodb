const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = 'messages';
const messageSchema = new Schema({
	content:{
		type: String,
		required: true
	},
	tweetId:{
		type: Schema.ObjectId, 
		ref: 'tweets'
	},
	userId:{
		type: Schema.ObjectId, 
		ref: 'users'
	}
},{
    timestamps: true
});

const messageModel = mongoose.model(collection, messageSchema);

module.exports = messageModel;