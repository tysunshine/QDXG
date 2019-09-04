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
				test: /\.(png|jpg|svg|gif)$/i,
				loader: 'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]!image-webpack-loader'
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


