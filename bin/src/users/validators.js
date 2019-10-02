"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.registerValidator = function (data) {
    return joi_1.default.validate(data, {
        name: joi_1.default.string()
            .required()
            .min(6)
            .max(255),
        email: joi_1.default.string()
            .required()
            .min(6)
            .max(255)
            .email(),
        password: joi_1.default.string()
            .required()
            .min(6)
            .max(124),
    });
};
exports.loginValidator = function (data) {
    return joi_1.default.validate(data, {
        email: joi_1.default.string()
            .required()
            .min(6)
            .max(255)
            .email(),
        password: joi_1.default.string()
            .required()
            .min(6)
            .max(124),
    });
};
