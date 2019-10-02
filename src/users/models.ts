import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	date: Date;
	todos: {}[];
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
	todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

export default mongoose.model<IUser>('User', userSchema);
