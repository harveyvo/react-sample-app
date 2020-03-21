const merge = require('webpack-merge');
const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { PATH_SRC, PATH_DIST, PATH_PUBLIC, PATH_SRC_INDEX, PATH_NODE_MODULES } = require('./common.js');
const CONFIG = require('./client.js');

const HOST = 'localhost';
const PORT = 4000;

console.log('PATH_SRC_INDEX', PATH_SRC_INDEX);
module.exports = merge(CONFIG, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	entry: {
		main: [`webpack-dev-server/client?http://${HOST}:${PORT}`, 'webpack/hot/only-dev-server', PATH_SRC_INDEX],
	},

	output: {
		filename: 'js/bundle.js',
		chunkFilename: 'js/[name].chunk.js',
	},

	module: {
		// rules: [
		// 	{
		// 		test: /\.less$/,
		// 		use: [
		// 			'style-loader',
		// 			{
		// 				loader: 'css-loader',
		// 				options: {
		// 					modules: 'global',
		// 					importLoaders: 1,
		// 				},
		// 			},
		// 			{
		// 				loader: 'less-loader',
		// 				options: {
		// 					javascriptEnabled: true,
		// 				},
		// 			},
		// 		],
		// 		exclude: [PATH_NODE_MODULES],
		// 		include: [PATH_SRC],
		// 	},
		// 	{
		// 		test: /\.css$/,
		// 		use: ['style-loader', 'css-loader'],
		// 		exclude: [PATH_SRC],
		// 		include: [PATH_NODE_MODULES],
		// 	},
		// ],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: join(PATH_PUBLIC, './index.html'),
			templateParameters: {
				NODE_PATH: process.env.NODE_PATH,
				PUBLIC_URL: process.env.PUBLIC_URL,
				REACT_APP_DEPLOYMENT_ENV: process.env.REACT_APP_DEPLOYMENT_ENV,
			},
		}),
		new webpack.NamedModulesPlugin(),
		new CaseSensitivePathsPlugin(),
	],

	performance: {
		hints: false,
	},

	devServer: {
		hot: true,
		open: true,
		host: HOST,
		port: PORT,
		quiet: false,
		inline: true,
		overlay: false,
		compress: true,
		contentBase: PATH_DIST,
		historyApiFallback: {
			disableDotRule: true,
		},
	},
});
