const messagesModel = require('./../../models/messages');
const dateUtilities = require('./../../utilities/date');

const getMessage = (req, res) => {
	var id = req.params.id;
	messagesModel.findById(id)
	.then(messages=>{
		if(messages.length == 0){
			res.send({resp: 'El comentario no existe'});
		} else {
			console.log(messages);
			res.send({resp: 'El comentario es: '+ messages.content});
		}
	});
}

const loadMessages = (req, res) => {
	messagesModel.find({})
	.then(messages=>{
		res.status(200).send(messages);
	});
}

const createMessage = (req, res) => {
	const message = {
		content: req.body.content,
		date: dateUtilities.getDate()
	};

	messagesModel.create(message)
	.then(() => {
		res.send({resp: 'El comentario ha sido creado'});
	});
}

const updateMessage = (req, res) => {
	res.send({resp: 'El comentario ha sido actualizado'});
}

const deleteMessage = (req, res) => {
	var id = req.params.id;
	messagesModel.findByIdAndDelete(id)
	.then(messages=>{
		if(messages.length == 0){
			res.send({resp: 'El comentario no existe'});
		} else {
			res.send({resp: 'El comentario eliminado es: '+ messages.content});
		}
	});
}

module.exports = {
	getMessage,
	loadMessages,
	createMessage,
	updateMessage,
	deleteMessage
};