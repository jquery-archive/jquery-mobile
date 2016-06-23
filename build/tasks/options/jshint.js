module.exports = {
	js: {
		options: {
			jshintrc: "js/.jshintrc"
		},
		files: {
			src: [
				"js/**/*.js",
				"demos/_assets/js/**/*.js",
				"tests/**/*.js",
				"!js/jquery.js",
				"!js/jquery.ui.widget.js",
				"!js/widgets/jquery.ui.tabs.js",
				"!js/jquery.ui.core.js",
				"!tests/lib/**/*.js",
				"!demos/_assets/js/view-source.js",
				"!demos/_assets/js/syntaxhighlighter.js"
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
