const getMessages = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	const url = '/api/messages/' + id;
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const html = response.map(message => {
			return '<p><div class="card" style="width: 18rem;">' +
						'<div class="card-body">' +
							'<h5 class="card-title">'+ message.userId.name +'</h5>' +
							'<h6 class="card-subtitle mb-2 text-muted">'+ message.createdAt.substr(0,10) +'</h6>' +
							'<p class="card-text">'+ message.content +'</p>' +
						'</div>' +
					'</div></p>';
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		document.getElementById('messages').innerHTML = html;
	});
};

const newMessage = () => {
	//Se define la ruta hacia donde se enviará la petición
	const url = '/api/messages';
    const token = localStorage.getItem('token');
	//Se obtiene el id del tweet
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	//Se contruye el objeto que se enviará al API
	const message = {
		content: document.getElementById("contenido").value,
		tweetId: id
	};
	//Se hace una petición tipo POST usando Fetch
	fetch(url,{
		method: 'post',
		body: JSON.stringify(message),
		headers:{
			'Content-Type': 'application/json',
			'x-access-token': token
		}
	}).then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {
		getMessages();
		document.getElementById("contenido").value = "";
		alert(response.resp);
	});
};

const deleteMessage = () => {
	//Se define la ruta hacia donde se enviará la petición
	const id = document.getElementById("contenido").value;
	const url = '/api/messages/'+ id;
    const token = localStorage.getItem('token');
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
		getMessages();	
		document.getElementById("contenido").value = "";
		alert(response.resp);
	});
};