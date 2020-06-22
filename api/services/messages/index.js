const usersModel = require('./../../models/users');
const tweetsModel = require('./../../models/tweets');
const messagesModel = require('./../../models/messages');
const dateUtilities = require('./../../utilities/date');

const getMessage = (req, res) => {
	var id = req.params.id;	
	messagesModel.find({tweetId: id}, (err, messages)=>{
		tweetsModel.populate(messages, {path: 'tweetId'},(err, messages)=>{
			usersModel.populate(messages, {path: 'userId'},(err, messages)=>{
				res.status(200).send(messages);
			});
		});
	});
}

const createMessage = (req, res) => {
	const message = {
		content: req.body.content,
		tweetId: req.body.tweetId,
		userId: req._id
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
	createMessage,
	updateMessage,
	deleteMessage
};