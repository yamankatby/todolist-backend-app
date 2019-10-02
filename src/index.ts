import express, { Request, Response } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import mainRouter from './main/router';
import usersRouter from './users/router';
import todosRouter from './todos/router';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((error: any, request: Request, response: Response) => {
	// set locals, only providing error in development
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};

	// render the error page
	response.status(error.status || 500);
	response.render('error');
});

// configure dotenv
dotenv.config();

// connect to database
const database_url = 'mongodb://$UN:$PASS@ds343887.mlab.com:43887/todo-app-backend'
	.replace('$UN', process.env.DATABASE_UN!)
	.replace('$PASS', process.env.DATABASE_PASS!);

mongoose
	.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Mongoose connected to the Database');
	});

module.exports = app;
