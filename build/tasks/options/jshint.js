module.exports = {
	js: {
		options: {
			jshintrc: "js/.jshintrc"
		},
		files: {
			src: [
				"js/**/*.js",
				"!js/jquery.js",
				"!js/jquery.ui.widget.js",
				"!js/widgets/jquery.ui.tabs.js",
				"!js/jquery.ui.core.js"
			]
		}
	},
	grunt: {
		options: {
			jshintrc: ".jshintrc"
		},
		files: {
			src: [ "Gruntfile.js" ]
		}
	}
};