"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.createValidator = function (data) {
    return joi_1.default.validate(data, {
        name: joi_1.default.string().required(),
    });
};
exports.toggleValidator = function (data) {
    return joi_1.default.validate(data, {
        id: joi_1.default.string().required(),
    });
};
exports.editValidator = function (data) {
    return joi_1.default.validate(data, {
        id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
    });
};
exports.removeValidator = function (data) {
    return joi_1.default.validate(data, {
        id: joi_1.default.string().required(),
    });
};
