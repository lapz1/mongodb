const loadTweets = () => {
	const url = '/api/tweets';
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const html = response.map(tweet => {
			return '<p><div class="card" style="width: 18rem;">' +
						'<div class="card-body">' +
							'<a href="/tweets.html?id='+ tweet.userId._id +'"><h5 class="card-title">'+ tweet.userId.name +'</h5></a>' +
							'<h6 class="card-subtitle mb-2 text-muted">'+ tweet.createdAt.substr(0,10) +'</h6>' +
							'<p class="card-text">'+ tweet.content +'</p>' +
							'<a href="/messages.html?id='+ tweet._id +'" class="card-link">Ver Comentarios</a>' +
						'</div>' +
					'</div></p>';
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		document.getElementById('tweets').innerHTML = html;
	});
};

const getTweets = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	const url = '/api/tweets/' + id;
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const html = response.map(tweet => {
			return '<p><div class="card" style="width: 18rem;">' +
						'<div class="card-body">' +
							'<a href="/tweets.html?id='+ tweet.userId._id +'"><h5 class="card-title">'+ tweet.userId.name +'</h5></a>' +
							'<h6 class="card-subtitle mb-2 text-muted">'+ tweet.createdAt.substr(0,10) +'</h6>' +
							'<p class="card-text">'+ tweet.content +'</p>' +
							'<a href="/messages.html?id='+ tweet._id +'" class="card-link">Ver Comentarios</a>' +
						'</div>' +
					'</div></p>';
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		document.getElementById('tweets').innerHTML = html;
	});
};

const getUserTweets = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	const url = '/api/tweets/users/' + id;
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const html = response.map(tweet => {
			return '<p><div class="card" style="width: 18rem;">' +
						'<div class="card-body">' +
							'<a href="/tweets.html?id='+ tweet.userId._id +'"><h5 class="card-title">'+ tweet.userId.name +'</h5></a>' +
							'<h6 class="card-subtitle mb-2 text-muted">'+ tweet.createdAt.substr(0,10) +'</h6>' +
							'<p class="card-text">'+ tweet.content +'</p>' +
							'<a href="/messages.html?id='+ tweet._id +'" class="card-link">Ver Comentarios</a>' +
						'</div>' +
					'</div></p>';
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		document.getElementById('tweets').innerHTML = html;
	});
};

const newTweet = () => {
	//Se define la ruta hacia donde se enviará la petición
	const url = '/api/tweets';
    const token = localStorage.getItem('token');
	//Se contruye el objeto que se enviará al API
	const tweet = {
		content: document.getElementById("contenido").value
	};
	//Se hace una petición tipo POST usando Fetch
	fetch(url,{
		method: 'post',
		body: JSON.stringify(tweet),
		headers:{
			'Content-Type': 'application/json',
			'x-access-token': token
		}
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
		method: 'delete',
		headers:{
			'Content-Type': 'application/json',
			'x-access-token': token
		}
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
			document.getElementById("weather").innerHTML = "El clima en la ciudad de " + ciudad + " es de " + response.temp + "°C";
		});
	} else {
		const html = 'Por favor ingrese el nombre de la ciudad';
		document.getElementById("weather").innerHTML = html;
	}
};