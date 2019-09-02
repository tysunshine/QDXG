var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, "node_modules"),
				query: {
					presets: ["@babel/preset-env"]
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		})
	]
}