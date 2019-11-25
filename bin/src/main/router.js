"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (request, response) {
    response.render('index', { title: 'TodoList Backend App' });
});
exports.default = router;
