const express = require('express');
const router = express.Router();

const users = require('./../../services/users');

router.route('/login')
	.post((req, res) => {
		users.loginUser(req, res);
	});
	
router.route('/')
	.get((req, res) => {
		users.loadUsers(req, res);
	})
	.post((req, res) => {
		users.createUser(req, res);
	});

router.route('/:id')
	.get((req, res) => {
		users.getUser(req, res);
	})
	.delete((req, res) => {
		users.deleteUser(req, res);
	})
	.put((req, res) => {
		users.updateUser(req, res);
	});

module.exports = router;