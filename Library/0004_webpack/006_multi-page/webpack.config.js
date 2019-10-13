var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/entrys/index.js',
		news: './src/entrys/news.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-loader'
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: path.resolve(__dirname, "src"),
				exclude: path.resolve(__dirname, "node_modules"),
				query: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test:/\.css$/,
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
				test: /\.s[ac]ss$/,
				loader: "style-loader!css-loader!postcss-loader!sass-loader",
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'pages/index.html',
			chunks: ['index']
		}),
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'pages/news.html',
			chunks: ['news']
		})
	],
	mode: "development"	// 设置mode
}