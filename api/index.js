const express = require('express');
const router = express.Router();

const tweets = require('./controllers/tweets');
const users = require('./controllers/users');
const weather = require('./controllers/weather');
const logger = require('./middleware/logger');

router.use(logger);
router.use('/users',users)
router.use('/tweets',tweets)
router.use('/weather',weather)

module.exports = router;