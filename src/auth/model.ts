import mongoose from 'mongoose';

import jsonWebToken from 'jsonwebtoken';
import { jwt_key } from '../config/constants';
import bcrypt from 'bcryptjs';

interface User {
	isExists: (email: string) => boolean,
	comparePassword: (password: string) => boolean,
	generateAccessToken: () => string,
}

export const UserSchema = new mongoose.Schema<User>({
	name: String,
	email: String,
	phone: String,
	password: String,
});

UserSchema.methods.generateAccessToken = function () {
	const { _id, email } = this;
	return jsonWebToken.sign({ _id, email }, jwt_key, { expiresIn: '3d' });
};

UserSchema.methods.comparePassword = function (password) {
	bcrypt.compare(password, this.password).then((result => {
		return result;
	}));
	return false;
};

export default mongoose.model('User', UserSchema);