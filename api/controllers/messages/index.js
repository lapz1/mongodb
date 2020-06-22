const express = require('express');
const router = express.Router();

const users = require('./../../services/users');
const messages = require('./../../services/messages');

router.route('/')
	.post(users.verifyUser, (req, res) => {
		messages.createMessage(req, res);
	});

router.route('/:id')
	.get((req, res) => {
		messages.getMessage(req, res);
	})
	.delete(users.verifyUser, (req, res) => {
		messages.deleteMessage(req, res);
	})
	.put(users.verifyUser, (req, res) => {
		messages.updateMessage(req, res);
	});

module.exports = router;