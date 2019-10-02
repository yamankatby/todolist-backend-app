var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./build').usersRoutes;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// configure dotenv
dotenv.config();

// connect to database
var database_url = ('mongodb://$UN:$PASS@ds343887.mlab.com:43887/todo-app-backend').replace('$UN', process.env.DATABASE_UN).replace('$PASS', process.env.DATABASE_PASS);
mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Mongoose connected to the Database');
});

module.exports = app;
