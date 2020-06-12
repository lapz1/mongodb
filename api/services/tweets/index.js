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
	tweetsModel.findById(id)
	.then(tweets=>{
		if(tweets.length == 0){
			res.send({resp: 'El tweet no existe'});
		} else {
			console.log(tweets);
			res.send({resp: 'El tweet es: '+ tweets.content});
		}
	});
}

const loadTweets = (req, res) => {
	tweetsModel.find({})
	.then(tweets=>{
		res.status(200).send(tweets);
	});
}

const createTweet = (req, res) => {
	const tweet = {
		content: req.body.content,
		date: dateUtilities.getDate(),
		userId: "USER"
	};

	tweetsModel.create(tweet)
	.then(() => {
		res.send({resp: 'El tweet ha sido creado'});
	});
}

const updateTweet = (req, res) => {
	res.send({resp: 'El tweet ha sido actualizado'});
}

const deleteTweet = (req, res) => {
	var id = req.params.id;
	tweetsModel.findByIdAndDelete(id)
	.then(tweets=>{
		if(tweets.length == 0){
			res.send({resp: 'El tweet no existe'});
		} else {
			res.send({resp: 'El tweet eliminado es: '+ tweets.content});
		}
	});
}

module.exports = {
	verifyTweet,
	getTweet,
	loadTweets,
	createTweet,
	updateTweet,
	deleteTweet
};