import Joi from '@hapi/joi';

export const createValidator = (data: any) =>
	Joi.validate(data, {
		name: Joi.string().required(),
	});

export const toggleValidator = (data: any) =>
	Joi.validate(data, {
		id: Joi.string().required(),
	});

export const removeValidator = (data: any) =>
	Joi.validate(data, {
		id: Joi.string().required(),
	});
