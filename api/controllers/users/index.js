const express = require('express');
const router = express.Router();

router.route('/')
	.get((req, res) => {
		res.send('Lista de Usuarios');
	})
	.post((req, res) => {
		res.send('Nuevo Usuarios');
	});

router.route('/:id')
	.get((req, res) => {
		res.send('Página del Usuario ' + req.params.id);
	})
	.delete((req, res) => {
		res.send('Eliminar Usuario ' + req.params.id);
	})
	.put((req, res) => {
		res.send('Actualizar Usuario ' + req.params.id);
	});

module.exports = router;