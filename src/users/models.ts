import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
	name: string;
	email: string;
	password: string;
	date: Date;
}

const userSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 124,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model<User>('User', userSchema);
