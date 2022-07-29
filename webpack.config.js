const { resolve } = require('path');

const PUBLIC_PATH = resolve(__dirname, 'public');
const BUILD_PATH = resolve(__dirname, 'dist');
const LIB_PATH = resolve(__dirname, 'lib');

const SRC_PATH = resolve(__dirname, 'src');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	plugins: [
		new CopyPlugin({
			patterns: [
			  {
				from: `${PUBLIC_PATH}/index.html`,
				to: `${BUILD_PATH}/index.html`,
			  },{
				from: `${PUBLIC_PATH}/styles.css`,
				to: `${BUILD_PATH}/styles.css`,
			  },
			  {
				from: `${LIB_PATH}/templates.js`,
				to: `${BUILD_PATH}/templates.js`,
			  },
			],
		  }),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new webpack.ProvidePlugin({
			dust: 'dustjs-linkedin',
		}),
	],
	entry: `${SRC_PATH}/index.js`,
	output: {
		filename: 'bundle.js',
		path: BUILD_PATH,
	},

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
			},
			{
				test: /\.dust$/,
				use: {
					loader: 'dust-loader',
					options: {
						rootDir: `${SRC_PATH}/templates`,
					},
				},
			},
		],
	},
	devServer: {
		static: {directory: PUBLIC_PATH},
		compress: true,
		port: 8080,
	},

};
