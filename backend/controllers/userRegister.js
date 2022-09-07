const jwt = require("jsonwebtoken");
const sendverificationEmail = require("../helpers/mailer");
const User = require("../model/User");
const {
	validateEmail,
	validatelength,
	genUsername,
	validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/tokens");

const register = async (req, res) => {
	// console.log(req.body)

	try {
		const {
			email,
			password,
			firstName,
			lastName,
			username,
			bYear,
			bMonth,
			bDay,
			gender,
		} = await req.body;

		if (!validateEmail(email))
			return res.status(400).json({ error: "invalid email" });
		const checkedEmail = await User.findOne({ email });
		let newUsername;
		if (username === "") {
			const tempUsername = firstName + lastName;
			newUsername = await genUsername(tempUsername);
		} else {
			const validated = validateUsername(username);
			if (validated) {
				const userFound = await User.findOne({ username });
				if (userFound) {
					return res.status(400).json({ error: "Username is already taken" });
				} else {
					newUsername = username;
				}
			} else {
				return res.status(400).json({ error: "Username is invalid " });
			}
		}

		if (checkedEmail)
			return res.status(400).json({ error: "Email already exists" });
		if (!validatelength(firstName, 3, 30))
			return res
				.status(400)
				.json({ error: "first name must by between 3 and 30 letters" });
		if (!validatelength(lastName, 3, 30))
			return res
				.status(400)
				.json({ error: "last name must by between 3 and 30 letters" });
		if (!validatelength(password, 8, 30))
			return res
				.status(400)
				.json({ error: "password must by between 8 and 30 letters" });
		const cryptedPassword = await bcrypt.hash(password, 12);
		// return res.send("done");
		// console.log(cryptedPassword)
		const user = await new User({
			firstName,
			lastName,
			email,
			password: cryptedPassword,
			username: newUsername,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();
		const emailverificationToken = await generateToken(
			{
				id: user._id.toString(),
			},
			"30m"
		);
		const url = `${process.env.BASE_URL}/activate/${emailverificationToken}`;
		sendverificationEmail(user.email, user.firstName, url);
		console.log(emailverificationToken);
		const token = await generateToken({ id: user._id.toString() }, "7d");
		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			firstName: user.firstName,
			lastName: user.lastName,
			token: token,
			verified: user.verified,
			message: "Register Success! please activate your email to start",
		});
		// res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).send("error, user not created" + err.massage);
	}
};

const activateAccount = async (req, res) => {
	const token = req.body.token;
	const userVerify = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
	const check = await User.findById(userVerify.id);
	if (check.verified == true) {
		return res.status(400).json({ message: "this email is already activated" });
	} else {
		await User.findByIdAndUpdate(userVerify.id, { verified: true });
		return res
			.status(200)
			.json({ message: "Account has been activated successfully" });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return await res
				.status(400)
				.json({ message: "this email is invalid try register" });
		}
		const checkpwd =await bcrypt.compare(password, user.password);
		if (!checkpwd) {
			res.status(400).json("wrong password was entered");
		} else {
			if (user.verified == true) {
				res.json(user);
			}
			else {
				res.json({message: "this email is not verified verify to complete the login"})
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.massage });
	}
};

module.exports = { register, activateAccount, login };
