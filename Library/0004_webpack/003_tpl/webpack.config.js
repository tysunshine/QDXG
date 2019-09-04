var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "js/[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.ejs$/,
				loader: "ejs-loader"
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		})
	],
	mode: "development"	// 设置mode
}

