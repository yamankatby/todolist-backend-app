import { NextFunction, Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';

import User from '../auth/model';
import { jwt_key } from './constants';
import { Controller } from './types';

export const errorHandler = (error: any, request: Request, response: Response) => {
	response.status(error.status || 500).json({ message: error.message });
};

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
	const error = new Error('404 Not found');
	// @ts-ignore
	error.status = 404;
	next(error);
};

export const errorCatcher = (controller: Controller) => (request: Request, response: Response, next: NextFunction) => {
	return controller(request, response, next).catch(next);
};

export const generateAccessToken = (id: string, email: string) => {
	return jsonWebToken.sign({ id, email }, jwt_key, { expiresIn: '3d' });
};

export const _authorization = async (request: Request, response: Response, next: NextFunction) => {
	const accessToken = request.headers.authorization;
	if (!accessToken) {
		response.status(401).json({ message: '401 Unauthorized' });
		return;
	}

	try {
		// @ts-ignore
		const email = await jsonWebToken.verify(accessToken, jwt_key).email;
		response.locals.currentUser = await User.findOne({ email });
		next();
	} catch (e) {
		response.status(401).json({ message: '401 Unauthorized' });
	}
};