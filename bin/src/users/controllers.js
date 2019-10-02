"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var models_1 = __importDefault(require("./models"));
var validators_1 = require("./validators");
exports.register = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, name_1, email, password, emailExists, salt, hashPassword, user, savedUser, accessToken, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = validators_1.registerValidator(request.body).error;
                if (error) {
                    response.status(400).send({ message: error.details[0].message });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                _a = request.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, models_1.default.findOne({ email: email })];
            case 2:
                emailExists = _b.sent();
                if (emailExists) {
                    response.status(400).send({ message: 'Email already registered' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                hashPassword = _b.sent();
                user = new models_1.default({
                    name: name_1,
                    email: email,
                    password: hashPassword,
                });
                return [4 /*yield*/, user.save()];
            case 5:
                savedUser = _b.sent();
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.JWT)];
            case 6:
                accessToken = _b.sent();
                response.header('access-token', accessToken).send({ accessToken: accessToken });
                return [3 /*break*/, 8];
            case 7:
                e_1 = _b.sent();
                response.status(400).send(e_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.login = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, email, password, user, passwordValid, accessToken, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = validators_1.loginValidator(request.body).error;
                if (error) {
                    response.status(400).send({ message: error.details[0].message });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                _a = request.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, models_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    response.status(400).send({ message: 'Email or Password wrong' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                passwordValid = _b.sent();
                if (!passwordValid) {
                    response.status(400).send({ message: 'Email or Password wrong' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT)];
            case 4:
                accessToken = _b.sent();
                response.header('access-token', accessToken).send({ accessToken: accessToken });
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                response.status(400).send(e_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.profile = function (request, response) {
    var _a = response.locals.currentUser, name = _a.name, email = _a.email, date = _a.date;
    response.send({ name: name, email: email, date: date });
};
