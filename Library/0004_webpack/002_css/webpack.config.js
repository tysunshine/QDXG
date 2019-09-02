var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
                			importLoaders: 1
                		}
					},
					"postcss-loader"
				]
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!postcss-loader!sass-loader"
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		})
	]
}

