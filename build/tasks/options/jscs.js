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
			"js/widgets/page.dialog.backcompat.js",
			"js/widgets/page.dialog.js",
			"js/widgets/page.js",
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
			"js/widgets/forms/rangeslider.js",
			"js/widgets/forms/rangeslider.backcompat.js",
			"js/tests/unit/rangeslider/*.js",
			"js/widgets/forms/slider.js",
			"js/widgets/forms/slider.backcompat.js",
			"js/tests/unit/slider/*.js",
			"js/widgets/controlgroup.js",
			"js/widgets/controlgroup.backcompat.js",
			"js/widgets/tabs.ajax.js",
			"js/widgets/enhancer.js",
			"js/widgets/enhancer.backcompat.js",
			"js/degradeInputs.js",
			"js/widgets/popup.arrow.backcompat.js",
			"js/widgets/popup.arrow.js",
			"js/widgets/popup.backcompat.js",
			"js/widgets/popup.js",

			// Tests
			"tests/unit/textinput/settings.js",
			"tests/unit/textinput/textinput_core.js",
			"tests/integration/dialog/dialog_events.js",
			"tests/integration/navigation/navigation_core.js",
			"tests/integration/select/select_cached.js",
			"tests/integration/select/select_core.js",
			"tests/integration/page/page_enhance_within.js",
			"tests/integration/page/page_theme.js",
			"tests/integration/page/page_title_entity.js",
			"tests/unit/dialog/dialog_count.js",
			"tests/unit/init/init_dialog.js",
			"tests/unit/pagecontainer/pagecontainer_core.js",
			"tests/unit/degrade-inputs/degradeInputs.js",
			"tests/unit/enhancer/enhancer.js",
			"tests/integration/popup/popup_core.js",
			"tests/integration/popup/backcompat_core.js",
			"tests/unit/popup/popup_core.js"
		]
	},
	tests: {
		src: "test/**/*.js"
	}
};
