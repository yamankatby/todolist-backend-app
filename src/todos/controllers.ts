import { Request, Response } from 'express';
import User from '../users/models';
import Todo from './models';

import { createValidator, removeValidator, toggleValidator } from './validators';
import { todoMapper } from './mapper';

export const index = async (request: Request, response: Response) => {
	const currentUser = (await User.findOne({ _id: response.locals.currentUser._id }).populate('todos'))!;
	const todos = currentUser!.toObject().todos;
	response.send(todoMapper(todos));
};

export const create = async (request: Request, response: Response) => {
	const { error } = createValidator(request.body);
	if (error) {
		response.status(400).send({ message: error.details[0].message });
		return;
	}

	try {
		const { name } = request.body;
		const currentUser = (await User.findOne({ _id: response.locals.currentUser._id }))!;

		const todo = new Todo({
			name,
			createdBy: currentUser._id,
		});
		const savedTodo = await todo.save();

		currentUser.todos.push(todo);
		await currentUser.save();

		response.send(todoMapper(savedTodo));
	} catch (e) {
		response.status(400).send(e);
	}
};

export const toggle = async (request: Request, response: Response) => {
	const { error } = toggleValidator(request.query);
	if (error) {
		response.status(400).send({ message: error.details[0].message });
		return;
	}

	try {
		const { id } = request.query;
		const currentUser = (await User.findOne({ _id: response.locals.currentUser._id }))!;

		const todo = await Todo.findOne({ _id: id, createdBy: currentUser._id });
		if (!todo) {
			response.status(400).send('Couldn\'t find the Todo');
			return;
		}

		await todo.update({ completed: !todo.completed }, { new: true, runValidators: true }).exec();
		response.status(200).send();
	} catch (e) {
		response.status(400).send(e);
	}
};

export const remove = async (request: Request, response: Response) => {
	const { error } = removeValidator(request.query);
	if (error) {
		response.status(400).send({ message: error.details[0].message });
		return;
	}

	try {
		const { id } = request.query;
		const currentUser = (await User.findOne({ _id: response.locals.currentUser._id }))!;

		const todo = await Todo.findOne({ _id: id, createdBy: currentUser._id });
		if (!todo) {
			response.status(400).send('Couldn\'t find the Todo');
			return;
		}

		await todo.remove();
		response.status(200).send();
	} catch (e) {
		response.status(400).send(e);
	}
};
