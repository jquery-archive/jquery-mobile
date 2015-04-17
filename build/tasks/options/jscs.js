module.exports = {
	build: {
		src: [ "build/**/*.js", "*.js" ]
	},
	src: {
		src: "js/**/*.js"
	},
	good: {
		src: [

			// Source
			"js/widgets/forms/autogrow.js",
			"js/widgets/forms/clearButton.js",
			"js/widgets/forms/textinput.backcompat.js",
			"js/widgets/forms/textinput.js",
			"js/widgets/accordion.js",
			"js/widgets/widget.backcompat.js",
			"js/widgets/widget.theme.js",
			"js/widgets/forms/button.js",
			"js/widgets/forms/button.backcompat.js",
			"js/widgets/forms/checkboxradio.js",
			"js/widgets/forms/checkboxradio.backcompat.js",
			"js/widgets/forms/flipswitch.js",
			"js/widgets/forms/flipswitch.backcompat.js",
			"tests/unit/flipswitch/*.js",
			"js/widgets/controlgroup.js",
			"js/widgets/controlgroup.backcompat.js",
			"js/widgets/tabs.ajax.js",
			"js/widgets/enhancer.js",
			"js/widgets/enhancer.backcompat.js",
			"js/degradeInputs.js",

			// Tests
			"tests/unit/textinput/settings.js",
			"tests/unit/textinput/textinput_core.js",
			"tests/unit/degrade-inputs/degradeInputs.js",
			"tests/unit/enhancer/enhancer.js"
		]
	},
	tests: {
		src: "test/**/*.js"
	}
};
