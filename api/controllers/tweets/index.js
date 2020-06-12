const express = require('express');
const router = express.Router();

const tweets = require('./../../services/tweets');

router.route('/')
	.get((req, res) => {
		tweets.loadTweets(req, res);
	})
	.post(tweets.verifyTweet, (req, res) => {		
		tweets.createTweet(req, res);
	});

router.route('/:id')
	.get((req, res) => {
		tweets.getTweet(req, res);
	})
	.delete((req, res) => {
		tweets.deleteTweet(req, res);
	})
	.put((req, res) => {
		tweets.updateTweet(req, res);
	});

module.exports = router;