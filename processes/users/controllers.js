const bcrypt = require('bcryptjs');

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

exports.register = register;
