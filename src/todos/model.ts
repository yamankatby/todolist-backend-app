import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
	text: String,
	completed: Boolean,

	_createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Todo', TodoSchema);