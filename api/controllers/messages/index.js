const express = require('express');
const router = express.Router();

const messages = require('./../../services/messages');

router.route('/')
	.get((req, res) => {
		messages.loadMessages(req, res);
	})
	.post((req, res) => {
		messages.createMessage(req, res);
	});

router.route('/:id')
	.get((req, res) => {
		messages.getMessage(req, res);
	})
	.delete((req, res) => {
		messages.deleteMessage(req, res);
	})
	.put((req, res) => {
		messages.updateMessage(req, res);
	});

module.exports = router;