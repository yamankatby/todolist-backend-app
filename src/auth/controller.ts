import * as bcrypt from 'bcryptjs';
import { Controller } from '../config/types';

import User from './model';
import { generateAccessToken } from '../config/utilities';

export const register: Controller = async (request, response) => {
	const { name, email, phone, password } = request.body;
	if (await User.findOne({ email })) {
		response.status(400).json('This email has been used before.');
		return;
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const user = new User({
		name,
		email,
		phone,
		password: hashPassword,
	});
	await user.save();

	const accessToken = generateAccessToken(user._id, email);
	response.status(200).json({ accessToken });
};

export const login: Controller = async (request, response) => {
	const { email, password } = request.body;

	const user = await User.findOne({ email });
	if (!user) {
		return;
	}
// @ts-ignore
	const comparePassword = bcrypt.compare(password, user.password);
	if (!comparePassword) {
		return;
	}
// @ts-ignore
	const accessToken = generateAccessToken(user._id, user.email);
	response.status(200).json({ accessToken });
};

export const profile: Controller = async (request, response) => {
	// const { name, email } = request.currentUser;
	// response.status(200).json({ name, email });
};