const getUsers = () => {
	const url = 'api/users';
	fetch(url)
	.then(res => res.json())
	.then(response => {
		//Se recibe el json de respuesta, se recorre y se arma un string
		//Para mostrar el resultado
		const usuarios = response.map(users => {
			return users.name + "\n";
		}).join(" ");
		//El string construido se agrega en el div con id tweet
		alert(usuarios);
	});
};

const newUser = () => {
	//Se define la ruta hacia donde se enviará la petición
	const url = '/api/users';
	//Se contruye el objeto que se enviará al API
	const user = {
		username: document.getElementById("username").value,
		name: document.getElementById("name").value,
		lastname: document.getElementById("lastname").value,
		email: document.getElementById("email").value,
		password: document.getElementById("password").value
	};
	//Se hace una petición tipo POST usando Fetch
	fetch(url,{
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	}).then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {
		document.getElementById("username").value = "";
		document.getElementById("name").value = "";
		document.getElementById("lastname").value = "";
		document.getElementById("email").value = "";
		document.getElementById("password").value = "";
		alert(response.resp);
	});
};