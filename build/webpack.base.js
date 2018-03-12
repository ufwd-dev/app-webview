'use strict';
const path = require('path');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'framework7/dist/css/framework7.min.css',
			path.resolve(__dirname, '../src/main.js')
		]
	},
	output: {
		path: path.resolve(__dirname, '../static'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.runtime.min.js',
			'framework7$': 'framework7/dist/js/framework7.min.js',
			'framework7-vue$': 'framework7-vue/dist/framework7-vue.min.js',
			'template7$': 'template7/dist/template7.min.js',
			'dom7$': 'dom7/dist/dom7.min.js',
			'@': path.resolve(__dirname, '../src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(['css-loader'])
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	],
	node: false
}
