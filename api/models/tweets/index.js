const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = 'tweets';
const tweetSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.ObjectId, 
		ref: 'users'
	}
},{
    timestamps: true
});

const tweetModel = mongoose.model(collection, tweetSchema);

module.exports = tweetModel;