import mongoose from 'mongoose';
import { IUser } from '../config/types';

const UserSchema = new mongoose.Schema<IUser>({
	name: String,
	email: String,
	phone: String,
	password: String,
});

export default mongoose.model('IUser', UserSchema);