import { RoutesMap } from '../config/types';
import { login, profile, register } from './controller';

const root = (name: string) => '/account/'.concat(name);
const routesMap: RoutesMap = {
	register: {
		path: root('register'),
		method: 'POST',
		controller: register,
	},
	login: {
		path: root('login'),
		method: 'POST',
		controller: login,
	},
	profile: {
		path: root('profile'),
		method: 'GET',
		controller: profile,
		authorized: true,
	},
};

export default routesMap;