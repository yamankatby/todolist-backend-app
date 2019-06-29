import 'babel-core/register';
import 'babel-polyfill';

import mongoose from 'mongoose';

import { database_url, port } from './config/constants';
import app from './app';

mongoose.connect(database_url, { useNewUrlParser: true }).then(() => {
	console.warn('Mongoose connected to the Database');
});
mongoose.connection.on('error', (e) => {
	console.error(`Error during connecting to Mongoose _ ${e.message}`);
});

app.set('port', port);
app.listen(app.get('port'), () => {
	console.warn(`Express running on PORT ${port}`);
});