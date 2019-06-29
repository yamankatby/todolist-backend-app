import express from 'express';
import expressValidator from 'express-validator';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { errorHandler, notFoundHandler } from './config/utilities';
import routes from './config/routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());
routes(app);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;