import { Express } from 'express';
import { forIn } from 'redux-immutable-helper';
import { RoutesMap } from './types';

import { _authorization, errorCatcher } from './utilities';
import authRoutes from '../auth/router';

export const listener = (express: Express) => (routesMap: RoutesMap) => {
	forIn(routesMap, (key, route) => {
		if (route.method === 'GET' && !route.authorized) {
			express.get(route.path, route.controller);
		} else if (route.method === 'GET' && route.authorized) {
			express.get(route.path, _authorization, route.controller);
		} else if (route.method === 'POST' && !route.authorized) {
			express.post(route.path, errorCatcher(route.controller));
		} else if (route.method === 'POST' && route.authorized) {
			express.post(route.path, _authorization, errorCatcher(route.controller));
		}
	});
};

export default (express: Express) => {
	express.get('/', (request, response) => {
		response.send('Hello From TodoApp Backend!');
	});

	const listen = listener(express);
	listen(authRoutes);
}