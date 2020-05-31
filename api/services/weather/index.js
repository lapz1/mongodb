const fetch = require('node-fetch');

function createFetch(city) { 
	return new Promise(resolve => {
		setTimeout(() => {			
			fetch('https://samples.openweathermap.org/data/2.5/weather?q='+city+',uk&appid=439d4b804bc8187953eb36d2a8c26a02')
			.then(res => res.text())
			.then(body => {
				console.log(body);
				resolve(body);
			})
		}, 5000);
	});
}

const getWeather = async(city) => {
	let resp = await createFetch(city);
	return resp;
}

module.exports = { getWeather };