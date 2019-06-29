import { compare, hash } from 'bcryptjs';
import { Controller, IUser } from '../config/types';

import User from './model';
import { generateAccessToken } from '../config/utilities';

export const register: Controller = async (request, response) => {
	const { name, email, phone, password } = request.body;
	if (await User.findOne({ email })) {
		response.status(400).json('This email has been used before.');
		return;
	}

	const hashPassword = await hash(password, 10);
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

	const isExists = await User.findOne({ email });
	if (isExists === null) {
		response.status(400).json({ message: 'Looks like you have entered wrong user credentials' });
		return;
	}

	const user: IUser = isExists.toObject();

	const comparePassword = compare(password, user.password);
	if (!comparePassword) {
		response.status(400).json({ message: 'Looks like you have entered wrong user credentials' });
		return;
	}

	const accessToken = generateAccessToken(user._id, user.email);
	response.status(200).json({ accessToken });
};

export const profile: Controller = async (request, response) => {
	const { name, email, phone } = response.locals.currentUser;
	response.status(200).json({ name, email, phone });
};