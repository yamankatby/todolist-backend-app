"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var morphism_1 = require("morphism");
var todoMap = {
    id: '_id',
    name: 'name',
    completed: 'completed',
    createdAt: 'createdAt',
};
exports.todoMapper = function (data) { return morphism_1.morphism(todoMap, data); };
