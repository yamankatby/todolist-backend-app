import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from './models';
import { loginValidator, registerValidator } from './validators';

export const register = async (request: Request, response: Response) => {
	const { error } = registerValidator(request.body);
	if (error) {
		response.status(400).send({ message: error.details[0].message });
		return;
	}

	try {
		const { name, email, password } = request.body;

		const emailExists = await User.findOne({ email });
		if (emailExists) {
			response.status(400).send({ message: 'Email already registered' });
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			email,
			password: hashPassword,
		});
		const savedUser = await user.save();

		const accessToken = await jwt.sign({ _id: savedUser._id }, process.env.JWT!);
		response.header('access-token', accessToken).send({ accessToken });
	} catch (e) {
		response.status(400).send(e);
	}
};

export const login = async (request: Request, response: Response) => {
	const { error } = loginValidator(request.body);
	if (error) {
		response.status(400).send({ message: error.details[0].message });
		return;
	}

	try {
		const { email, password } = request.body;

		const user = await User.findOne({ email });
		if (!user) {
			response.status(400).send({ message: 'Email or Password wrong' });
			return;
		}

		// @ts-ignore
		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) {
			response.status(400).send({ message: 'Email or Password wrong' });
			return;
		}

		// @ts-ignore
		const accessToken = await jwt.sign({ _id: user._id }, process.env.JWT!);
		response.header('access-token', accessToken).send({ accessToken });
	} catch (e) {
		response.status(400).send(e);
	}
};

export const profile = (request: Request, response: Response) => {
	const { name, email, date } = response.locals.currentUser;
	response.send({ name, email, date });
};
