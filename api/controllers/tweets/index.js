const express = require('express');
const router = express.Router();

const users = require('./../../services/users');
const tweets = require('./../../services/tweets');

router.route('/')
	.get((req, res) => {
		tweets.loadTweets(req, res);
	})
	.post(users.verifyUser, tweets.verifyTweet, (req, res) => {		
		tweets.createTweet(req, res);
	});

router.route('/:id')
	.get((req, res) => {
		tweets.getTweet(req, res);
	})
	.delete(users.verifyUser, (req, res) => {
		tweets.deleteTweet(req, res);
	})
	.put(users.verifyUser, (req, res) => {
		tweets.updateTweet(req, res);
	});

router.route('/users/:id')
	.get((req, res) => {
		console.log("entro");
		tweets.getUserTweets(req, res);
	})

module.exports = router;