const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const weather = require('./../../services/weather');

router.route('/:city')
	.get((req, res) => {
		const city = req.params.city;
		fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=ca684dfccee70c9b47f45029164a4a75')
		.then((res) => res.json())
		.then((json) => {
			res.send({ temp : json.main.temp});
		})
		//res.send(weather.getWeather(city));
	});

module.exports = router;