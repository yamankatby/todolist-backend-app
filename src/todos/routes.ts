import { RoutesMap } from '../config/types';
import { create, fetch, remove, toggle } from './controller';

const root = (name: string) => '/todos/'.concat(name);
const routesMap: RoutesMap = {
	fetch: {
		path: root('fetch'),
		method: 'GET',
		controller: fetch,
		authorized: true,
	},
	create: {
		path: root('create'),
		method: 'POST',
		controller: create,
		authorized: true,
	},
	toggle: {
		path: root('toggle'),
		method: 'POST',
		controller: toggle,
		authorized: true,
	},
	remove: {
		path: root('remove'),
		method: 'POST',
		controller: remove,
		authorized: true,
	},
};

export default routesMap;