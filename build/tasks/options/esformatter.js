module.exports = {
	options: {
		preset: "jquery",
		plugins: [ "esformatter-jquery-chain" ]
	},
	files: {
		src: [
			"js/**/*.js",
			"tests/**/*.js",
			"build/**/*.js",
			"*.js"
		]
	}
};
