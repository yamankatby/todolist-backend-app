import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
	name: string;
	completed: string;
	createBy: any;
	createdAt: Date;
}

const todoSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<ITodo>('Todo', todoSchema);
