module.exports = {
	plugins: [
		require("autoprefixer")({
			overrideBrowserslist: ["last 100 versions", "ie9", "ie8", "ie7"]
		})
	]
}