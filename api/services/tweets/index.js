const usersModel = require('./../../models/users');
const tweetsModel = require('./../../models/tweets');
const dateUtilities = require('./../../utilities/date');

const verifyTweet = (req, res, next) => {
	var content = req.body.content;
	tweetsModel.find({content: content})
	.then(tweets=>{
		if(tweets.length == 0){
			next();
		} else {
			res.send({resp: 'El tweet ya existe'});
		}
	});
};

const getTweet = (req, res) => {
	var id = req.params.id;	
	tweetsModel.find({_id: id}, (err, tweets)=>{
		usersModel.populate(tweets, {path: 'userId'},(err, tweets)=>{
			res.status(200).send(tweets);
		});
	});
}

const getUserTweets = (req, res) => {
	var id = req.params.id;
	tweetsModel.find({userId: id}, (err, tweets)=>{
		usersModel.populate(tweets, {path: 'userId'},(err, tweets)=>{
			res.status(200).send(tweets);
		});
	});
}

const loadTweets = (req, res) => {
	tweetsModel.find({}, (err, tweets)=>{
		usersModel.populate(tweets, {path: 'userId'},(err, tweets)=>{
			res.status(200).send(tweets);
		})
	});
}

const createTweet = (req, res) => {
	const tweet = {
		content: req.body.content,
		userId: req._id
	};

	tweetsModel.create(tweet)
	.then(() => {
		res.status(200).send({resp: 'El tweet ha sido creado'});
	});
}

const updateTweet = (req, res) => {
	res.status(200).send({resp: 'El tweet ha sido actualizado'});
}

const deleteTweet = (req, res) => {
	var id = req.params.id;
	tweetsModel.findByIdAndDelete(id)
	.then(tweets=>{
		if(tweets.length == 0){
			res.status(200).send({resp: 'El tweet no existe'});
		} else {
			res.status(200).send({resp: 'El tweet eliminado es: '+ tweets.content});
		}
	});
}

module.exports = {
	verifyTweet,
	getTweet,
	getUserTweets,
	loadTweets,
	createTweet,
	updateTweet,
	deleteTweet
};