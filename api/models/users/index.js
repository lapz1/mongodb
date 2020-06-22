const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = 'users';
const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
},{
    timestamps: true
});

const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;