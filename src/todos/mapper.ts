import { morphism, Schema } from 'morphism';
import { ITodo } from './models';

const todoMap: Schema<ITodo> = {
	id: '_id',
	name: 'name',
	completed: 'completed',
	createdAt: 'createdAt',
};

export const todoMapper = (data: any) => morphism(todoMap, data);
