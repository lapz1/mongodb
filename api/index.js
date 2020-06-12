const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const tweets = require('./controllers/tweets');
const messages = require('./controllers/messages');
const weather = require('./controllers/weather');
const logger = require('./middleware/logger');

router.use(logger);
router.use('/users',users)
router.use('/tweets',tweets)
router.use('/messages',messages)
router.use('/weather',weather)

module.exports = router;