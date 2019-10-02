const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./model');
const validations = require('./validations');

const register = async (req, res) => {
	const { error } = validations.registerValidation(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	try {
		const { name, email, password } = req.body;

		const emailExists = await User.findOne({ email });
		if (emailExists) {
			res.status(400).send('Email already exists!');
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = new User({ name, email, password: hashPassword });
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (e) {
		res.status(400).send(e);
	}
};

const login = async (req, res) => {
	const { error } = validations.loginValidation(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).send('Email or Password wrong');
			return;
		}

		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) {
			res.status(400).send('Email or Password wrong');
			return;
		}

		const accessToken = jwt.sign({ _id: user._id }, process.env.JWT);
		res.header('auth-token', accessToken).send(accessToken);
	} catch (e) {
		res.status(400).send(e);
	}
};

const profile = async (req, res) => {
	const { name, email, date } = res.locals.currentUser;
	res.send({ name, email, date });
};

exports.register = register;
exports.login = login;
exports.profile = profile;
