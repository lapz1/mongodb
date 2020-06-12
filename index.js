//Librerias
require('dotenv').config();

//Modules
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('./config');
const api = require('./api');

app.use(express.json());
app.use('/api',api);
app.use(express.static('./public'));

mongoose.connect('mongodb+srv://' + config.db.user + ":" + config.db.password + "@" + config.db.host + "/" + config.db.name, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//Server
app.listen(process.env.PORT || config.server.port, ()=> {
    console.log('Servidor Iniciado');
});