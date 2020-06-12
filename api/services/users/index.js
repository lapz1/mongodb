const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersModel = require('./../../models/users');
const dateUtilities = require('./../../utilities/date');
const config = require('./../../../config');

const getUser = (req, res) => {
	var id = req.params.id;
	usersModel.findById(id)
	.then(users=>{
		if(users.length == 0){
			res.send({resp: 'El user no existe'});
		} else {
			console.log(users);
			res.send({resp: 'El user es: '+ users.content});
		}
	});
}

const loadUsers = (req, res) => {
	usersModel.find({})
	.then(users=>{
		res.status(200).send(users);
	});
}

const createUser = (req, res) => {
	const plainPassword = req.body.password;
	const salt = bcrypt.genSaltSync(config.saltRounds);
	const hash = bcrypt.hashSync(plainPassword, salt);

	const user = {
		username: 	req.body.username,
		name: 		req.body.name,
		lastname: 	req.body.lastname,
		email: 		req.body.email,
		password: 	hash	
	};

	usersModel.create(user)
	.then(() => {
		res.send({resp: 'El user ha sido creado'});
	});
}

const updateUser = (req, res) => {
	res.send({resp: 'El user ha sido actualizado'});
}

const deleteUser = (req, res) => {
	var id = req.params.id;
	usersModel.findByIdAndDelete(id)
	.then(users=>{
		if(users.length == 0){
			res.send({resp: 'El user no existe'});
		} else {
			res.send({resp: 'El user eliminado es: '+ users.content});
		}
	});
}

const loginUser = (req, res) => {
	const user = {
		username: 	req.body.username,
		password: 	req.body.password
	};

	usersModel.find({username: user.username})
	.then(objs=>{
		if(bcrypt.compareSync(user.password, objs[0].password)){
			token = jwt.sign({username: user.username}, config.server.tokenKey);
			res.send({resp: 'El usuario: ' + user.username + ', fue asignado con el token: ' + token});
		}else{
			res.send({resp: 'El usuario: ' + user.username + ' no pudo iniciar sesión'});
		}
	});
}

module.exports = {
	getUser,
	loadUsers,
	createUser,
	updateUser,
	deleteUser,
	loginUser
};