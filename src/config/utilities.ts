import { NextFunction, Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';

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

export const generateAccessToken = (userId: string, userEmail: string) => {
	return jsonWebToken.sign({ userId, userEmail }, jwt_key, { expiresIn: '3d' });
};