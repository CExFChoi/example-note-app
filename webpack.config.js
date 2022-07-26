const { resolve } = require('path');

const PUBLIC_PATH = resolve(__dirname, 'public');
const SRC_PATH = resolve(__dirname, 'src');
const webpack = require('webpack');

module.exports = {
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new webpack.ProvidePlugin({
			dust: 'dustjs-linkedin',
		}),
	],
	resolve: {

		fallback: {
			net: false,
			tls: false,
			dns: false,
			url: false,
			assert: false,
			path: false,
			crypto: false,
			http: false,
			https: false,
			stream: false,
			zlib: false,
			util: false,
			os: false,
			buffer: false,
		},
	},
	entry: `${SRC_PATH}/index.js`,
	output: {
		filename: 'bundle.js',
		path: PUBLIC_PATH,
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
