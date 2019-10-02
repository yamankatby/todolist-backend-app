"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var redux_immutable_helper_1 = require("redux-immutable-helper");
var router_1 = __importDefault(require("./main/router"));
var router_2 = __importDefault(require("./users/router"));
var router_3 = __importDefault(require("./todos/router"));
var app = express_1.default();
var root = redux_immutable_helper_1.array(__dirname.split('/')).pop().toArray().reduce(function (previousValue, currentValue) { return previousValue.concat(currentValue + "/"); }, '');
// view engine setup
app.set('views', path_1.default.join(root, 'views'));
app.set('view engine', 'pug');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(root, 'public')));
app.use('/', router_1.default);
app.use('/users', router_2.default);
app.use('/todos', router_3.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (error, request, response) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};
    // render the error page
    response.status(error.status || 500);
    response.render('error');
});
// configure dotenv
dotenv_1.default.config();
// connect to database
var database_url = 'mongodb://$UN:$PASS@ds343887.mlab.com:43887/todo-app-backend'
    .replace('$UN', process.env.DATABASE_UN)
    .replace('$PASS', process.env.DATABASE_PASS);
mongoose_1.default
    .connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log('Mongoose connected to the Database');
});
module.exports = app;
