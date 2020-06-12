const config = {
    server: {
		port: process.env.SERVER_PORT,
		tokenKey: process.env.SERVER_TOKENKEY,
		saltRounds: process.env.SERVER_SALTROUNDS	
	},
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		port: process.env.DB_PORT,
		name: process.env.DB_NAME
	}
};

module.exports = config;