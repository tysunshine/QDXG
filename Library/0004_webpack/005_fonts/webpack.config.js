var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?name=fonts/[name]-[hash:5].[ext]'
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


