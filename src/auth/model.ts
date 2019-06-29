import mongoose from 'mongoose';
import { IUser } from '../config/types';

const UserSchema = new mongoose.Schema<IUser>({
	name: String,
	email: String,
	phone: String,
	password: String,

	todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

export default mongoose.model('User', UserSchema);