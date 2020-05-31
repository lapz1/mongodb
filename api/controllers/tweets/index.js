const express = require('express');
const router = express.Router();
const dateUtilities = require('./../../utilities/date');

const tweets = require('./../../services/tweets');
const tweetsModel = require('./../../models/tweets');

const verify = (req, res, next) => {
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

router.route('/')
	.get((req, res) => {
		tweetsModel.find({})
		.then(tweets=>{
			res.status(200).send(tweets);
		});
		//res.send(tweets.loadTweets());
	})
	.post(verify, (req, res) => {
		const tweet = {
			content: req.body.content,
			date: dateUtilities.getDate()
		};
		
		new tweetsModel(tweet)
		.save()
		.then(() => {
			res.send({resp: 'El tweet ha sido creado'});
		});
		
		//tweets.newTweet(tweet);
		//res.send({resp: 'El tweet ha sido creado'});
	});

router.route('/:id')
	.get((req, res) => {
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
	})
	.delete((req, res) => {
		var id = req.params.id;
		tweetsModel.findByIdAndDelete(id)
		.then(tweets=>{
			if(tweets.length == 0){
				res.send({resp: 'El tweet no existe'});
			} else {
				tweetsModel.remove({_id: id});
				res.send({resp: 'El tweet eliminado es: '+ tweets.content});
			}
		});
	})
	.put((req, res) => {
		res.send('Actualizar tweet ' + req.params.id);
	});

module.exports = router;