const User = require("../model/User");

const validateEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const validatelength = (text, min, max) => {
	if (text.length < min || text.length > max) {
		return false;
	} else {
		return true;
	}
};

const validateUsername = (username) => {
	const re = /^[a-zA-Z0-9]+$/;
	return re.test(String(username).toLowerCase());
};

const genUsername = async (username) => {
	const validated = validateUsername(username);
	if (!validated) {
		return res.status(400).json({ error: "Username is invalid "});
	} else {
		let a = false;
		do {
			let checkedUsername = await User.findOne({ username });
			if (checkedUsername) {
				username += (+new Date().getTime() * Math.random())
					.toString()
					.substring(0, 1);
				a = true;
			} else {
				return username;
			}
		} while (a);
	}
};

module.exports = { validateEmail, validatelength, genUsername, validateUsername };
