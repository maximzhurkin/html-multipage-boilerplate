// Основной конфиг сборки (от него наследуются development и production)

const glob = require('glob');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
	mocks: path.join(__dirname, '../mocks'),
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist')
}

getEntry = function (rule) {
	var result = {};
	var paths = glob.sync(rule);

	paths.forEach(function (path) {
		var filename = path.split('/').slice(-1)[0];
		var entry = filename.split('.').slice(0, -1).join('.');

		if (entry.charAt(0) !== '!') {
			result[entry] = path;
		}
	});
	return result;
}

let pluginsOptions = [];

Object.keys(getEntry(paths.src + '/pages/**/*.pug')).forEach(page => {
	pluginsOptions.push(
		new HtmlWebpackPlugin({
			title: 'Index',
			template: paths.src + '/pages/' + page + '/' + page + '.pug',
			filename: './' + page + '.html',
			chunks: [page],
			inject: 'body',
			minify: false
		})
	);
});

module.exports = {
	stats: {
		children: false,
		assets: false,
		entrypoints: false
	},
	entry: getEntry(paths.src + '/pages/**/*.js'),
	output: {
		path: paths.dist,
		filename: 'assets/js/[id].[hash:8].bundle.js',
		chunkFilename: 'assets/js/[id].[hash:8].chunk.js',
		publicPath: './'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					chunks: 'all',
					test: /node_modules/
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'raw-loader'
					},
					{
						loader: 'pug-html-loader',
						options: {
							pretty: true,
							data: require(paths.src + '/data/data.json')
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/images/[name].[ext]'
				}
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		...pluginsOptions,
		new HtmlWebpackPugPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[id].[hash:8].bundle.css',
			chunkFilename: 'assets/css/[id].[hash:8].chunk.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: paths.src + '/static/images', to: paths.dist + '/assets/images' },
				{ from: paths.src + '/static/favicon', to: paths.dist + '/assets/images/favicon' },
				{ from: paths.src + '/static/fonts', to: paths.dist + '/assets/fonts' },
				{ from: paths.src + '/static/browserconfig.xml', to: paths.dist + '/assets' },
				{ from: paths.src + '/static/site.webmanifest', to: paths.dist + '/assets' },
				{ from: paths.src + '/static/robots.txt', to: paths.dist + '/' },
				{ from: paths.src + '/static/.htaccess', to: paths.dist + '/' },
				{ from: paths.mocks + '/api', to: paths.dist + '/api' },
			]
		}),
	]
}
