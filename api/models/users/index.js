const mongoose = require('mongoose');
const Schema = mongoose.Squema;

const userSchema = new Schema({
	username:{
		type: String,
		rquered: true
	},
	password: {
		type: String,
		rquered: true
	}
});

const userModel = mongoose.model('users', userSchema);

model.exports = userModel;