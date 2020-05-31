const logger = (req, resp, next) => {
	console.log(Date.now() + " " + req.method + " " + req.path);
	next();
};

module.exports = logger;