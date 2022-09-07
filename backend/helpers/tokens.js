const jwt = require("jsonwebtoken");

const generateToken = (payload, expired) => {
	return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
		expiresIn: expired,
	});
};

module.exports = generateToken
