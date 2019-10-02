const Joi = require('@hapi/joi');

const registerValidation = (data) => Joi.validate(data, {
	name: Joi.string().required().min(6).max(255),
	email: Joi.string().required().min(6).max(255).email(),
	password: Joi.string().required().min(6).max(124),
});

exports.registerValidation = registerValidation;
