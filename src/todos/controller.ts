import { Controller } from '../config/types';

import User from '../auth/model';
import Todo from './model';

export const fetch: Controller = async (request, response) => {
	const currentUser = await User.findOne({ _id: response.locals.currentUser._id }).populate('todos');
	const todos = currentUser!.toObject().todos.map((todo: any) => ({
		id: todo._id,
		text: todo.text,
		completed: todo.completed,
	}));

	response.status(200).json(todos);
};

export const create: Controller = async (request, response) => {
	const { text } = request.body;
	const { _id } = response.locals.currentUser;

	const user = await User.findOne({ _id });
	const todo = new Todo({
		text: text,
		completed: false,
		_createdBy: _id,
	});
	todo.save(() => {
		// @ts-ignore
		user.todos.push(todo);
		user!.save();
	});

	response.status(200).json(todo.toObject());
};

export const toggle: Controller = async (request, response) => {
	const id = request.param('id');
	const todo = await Todo.findOne({ _id: id });
	if (todo === null) {
		return;
	}

	await todo.update({ completed: true }, { new: true, runValidators: true }).exec();
	response.status(200).json({});
};

export const remove: Controller = async (request, response) => {
	const id = request.param('id');
	await Todo.findOneAndRemove({ _id: id });

	response.status(200).json({});
};