const checkLogin = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
	if(window.location.href.includes("users.html")){
		if(token !== null){
			window.location.href = '/index.html';
		}
	}else if(window.location.href.includes("tweets.html")){
		if(token === null){
			document.getElementById('logout-content').style.display = 'none';
		}else{
			document.getElementById('username-content').innerHTML = "Bienvenido " + username;
			document.getElementById('logout-content').style.display = 'block';			
		}
	}else if(window.location.href.includes("messages.html")){
		if(token === null){
			document.getElementById('logout-content').style.display = 'none';
			document.getElementById('tweeter-content').style.display = 'none';
		}else{
			document.getElementById('username-content').innerHTML = "Bienvenido " + username;
			document.getElementById('logout-content').style.display = 'block';			
			document.getElementById('tweeter-content').style.display = 'block';
		}
	}else {
		if(token === null){
			document.getElementById('register-content').style.display = 'block';
			document.getElementById('login-content').style.display = 'block';
			document.getElementById('logout-content').style.display = 'none';
			document.getElementById('tweeter-content').style.display = 'none';
		}else{
			document.getElementById('username-content').innerHTML = "Bienvenido " + username;
			document.getElementById('register-content').style.display = 'none';
			document.getElementById('login-content').style.display = 'none';
			document.getElementById('logout-content').style.display = 'block';
			document.getElementById('tweeter-content').style.display = 'block';
		}		
	}
};

const login = () => {
	//Se define la ruta hacia donde se enviará la petición
	const url = '/api/users/login';
	//Se contruye el objeto que se enviará al API
	const user = {
		username: document.getElementById("username").value,
		password: document.getElementById("password").value
	};
	//Se hace una petición tipo POST usando Fetch
	fetch(url,{
		method: 'post',
		body: JSON.stringify(user),
		headers: { 'Content-Type': 'application/json' }
	}).then(res => res.json())
	//Respuesta con error
	.catch(error => console.error('Error:', error))
	//Respuesta exitosa
	.then(response => {
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
		//Variable de sesión local
		localStorage.setItem('username',response.user); 
		localStorage.setItem('token',response.token); 
		checkLogin();        
		alert(response.resp);
	});
};

const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    document.getElementById('register-content').style.display = 'block';
    document.getElementById('login-content').style.display = 'block';
    document.getElementById('logout-content').style.display = 'none';
    document.getElementById('tweeter-content').style.display = 'none';
};

const logout2 = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
	window.location.href = "/index.html";
};

const getUsers = () => {
	const url = '/api/users';
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