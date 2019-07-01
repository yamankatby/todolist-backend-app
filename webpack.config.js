const path = require('path');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
	entry: './src/index.ts',
	mode: NODE_ENV,
	target: 'node',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					'ts-loader',
				],
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};