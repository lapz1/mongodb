const getTweets = () => {
	const url = 'api/tweets';
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const html = response.map(tweet => {
			return "<p>" + tweet.content + "<br/>" + tweet.date + "</p>";
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		document.getElementById('tweets').innerHTML = html;
	});
};

const newTweet = () => {
	//Se define la ruta hacia donde se enviará la petición
	const url = '/api/tweets';
	//Se contruye el objeto que se enviará al API
	const tweet = {
		content: document.getElementById("contenido").value,
		user: 1
	};
	//Se hace una petición tipo POST usando Fetch
	fetch(url,{
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tweet)
	}).then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {
		getTweets();
		document.getElementById("contenido").value = "";
		alert(response.resp);
	});
};

const findTweet = () => {
	//Se define la ruta hacia donde se enviará la petición
	const id = document.getElementById("contenido").value;
	const url = '/api/tweets/'+ id;
	
	//Se hace una petición tipo get usando Fetch
	fetch(url).then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {		
		document.getElementById("contenido").value = "";
		alert(response.resp);
	});
};

const deleteTweet = () => {
	//Se define la ruta hacia donde se enviará la petición
	const id = document.getElementById("contenido").value;
	const url = '/api/tweets/'+ id;

	//Se hace una petición tipo get usando Fetch
	fetch(url,{
		method: 'delete'
	})
	.then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {	
		getTweets();	
		document.getElementById("contenido").value = "";
		alert(response.resp);
	});
};

const getWeather = () => {
	const ciudad = document.getElementById("ciudad").value;
	document.getElementById("weather").innerHTML = "";
	if(ciudad !== ''){
		const url = '/api/weather/' + ciudad;
		//Se hace una petición tipo POST usando Fetch
		fetch(url)
		.then(res => res.json())
		//Respuesta con error
		.catch(error => console.error('Error:', error))
		//Respuesta exitosa
		.then(response => {
			document.getElementById("weather").innerHTML = response.temp;
		});
	} else {
		const html = 'Por favor ingrese el nombre de la ciudad';
		document.getElementById("weather").innerHTML = html;
	}
};