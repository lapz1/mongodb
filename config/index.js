const config = {
    server: {
		port: 80,
		tokenKey: 'books-key',
		saltRounds: 10		
	},
	db: {
		host: 'cluster0-sx6ox.mongodb.net',
		user: 'lapz1',
		password: 'Lapz@1987',
		port: 27017,
		name: 'testdb'
	}
};

module.exports = config;