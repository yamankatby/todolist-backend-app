import Joi from '@hapi/joi';

export const registerValidator = (data: any) =>
	Joi.validate(data, {
		name: Joi.string()
			.required()
			.min(6)
			.max(255),
		email: Joi.string()
			.required()
			.min(6)
			.max(255)
			.email(),
		password: Joi.string()
			.required()
			.min(6)
			.max(124),
	});

export const loginValidator = (data: any) =>
	Joi.validate(data, {
		email: Joi.string()
			.required()
			.min(6)
			.max(255)
			.email(),
		password: Joi.string()
			.required()
			.min(6)
			.max(124),
	});
