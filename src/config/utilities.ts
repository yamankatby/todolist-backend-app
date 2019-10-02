import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../users/models';

export const authorization = async (request: Request, response: Response, next: NextFunction) => {
	const accessToken = request.headers.authorization;
	if (!accessToken) {
		response.status(401).send('401 Unauthorized');
		return;
	}

	try {
		// @ts-ignore
		const _id = await jwt.verify(accessToken, process.env.JWT!)._id;
		response.locals.currentUser = await User.findOne({ _id });
		next();
	} catch (e) {
		response.status(401).send('401 Unauthorized');
	}
};
