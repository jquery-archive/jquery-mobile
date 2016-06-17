module.exports = function( grunt ) {

return {
	options: {
		config: true,

		// Check if fix is enabled
		fix: grunt.option( "fix" ) || process.env.FIX || false
	},
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
			"js/widgets/forms/rangeslider.js",
			"js/widgets/forms/rangeslider.backcompat.js",
			"js/widgets/forms/select.js",
			"js/widgets/forms/select.custom.js",
			"js/widgets/forms/select.backcompat.js",
			"js/widgets/forms/select.custom.backcompat.js",
			"js/widgets/forms/slider.js",
			"js/widgets/forms/slider.backcompat.js",
			"js/widgets/controlgroup.js",
			"js/widgets/controlgroup.selectmenu.js",
			"js/widgets/controlgroup.backcompat.js",
			"js/widgets/tabs.ajax.js",
			"js/widgets/toolbar.js",
			"js/widgets/toolbar.backcompat.js",
			"js/widgets/fixedToolbar.js",
			"js/widgets/fixedToolbar.backcompat.js",
			"js/widgets/fixedToolbar.tapToggle.js",
			"js/widgets/enhancer.js",
			"js/widgets/enhancer.backcompat.js",
			"js/degradeInputs.js",
			"js/widgets/popup.arrow.backcompat.js",
			"js/widgets/popup.arrow.js",
			"js/widgets/popup.backcompat.js",
			"js/widgets/popup.js",
			"js/widgets/loader.js",
			"js/widgets/loader.backcompat.js",
			"js/widgets/listview.autodividers.js",
			"js/widgets/listview.backcompat.js",
			"js/widgets/listview.hidedividers.js",
			"js/widgets/listview.js",
			"js/widgets/navbar.js",
			"js/widgets/navbar.backcompat.js",
			"js/widgets/navbar.morebutton.js",
			"js/widgets/panel.js",

			// Tests
			"tests/integration/listview/autodividers_core.js",
			"tests/integration/listview/listview_core.js",
			"tests/integration/listview/backcompat_core.js",
			"tests/unit/textinput/settings.js",
			"tests/unit/textinput/textinput_core.js",
			"tests/integration/dialog/dialog_events.js",
			"tests/integration/navigation/navigation_core.js",
			"tests/css/controlgroup/controlgroup_core.js",
			"tests/integration/dialog-extension/dialog_events.js",
			"tests/integration/select/select_events.js",
			"tests/unit/select/controlgroup_interaction_core.js",
			"tests/unit/select/new_backcompat_core.js",
			"tests/unit/select/new_core.js",
			"tests/unit/select/select_core.js",
			"tests/integration/page/page_enhance_within.js",
			"tests/integration/page/page_theme.js",
			"tests/integration/page/page_title_entity.js",
			"tests/unit/flipswitch/*.js",
			"tests/unit/slider/*.js",
			"tests/unit/rangeslider/*.js",
			"tests/unit/toolbar/*.js",
			"tests/unit/fixed-toolbar/*.js",
			"tests/unit/navbar/*.js",
			"tests/integration/fixed-toolbar/*.js",
			"tests/integration/toolbar/*.js",
			"tests/unit/dialog/dialog_count.js",
			"tests/unit/init/init_dialog.js",
			"tests/unit/pagecontainer/pagecontainer_core.js",
			"tests/unit/degrade-inputs/degradeInputs.js",
			"tests/unit/enhancer/enhancer.js",
			"tests/integration/popup/popup_core.js",
			"tests/integration/popup/backcompat_core.js",
			"tests/unit/popup/popup_core.js",
			"tests/unit/loader/loader_core.js",
			"tests/unit/loader/backcompat_core.js",
			"tests/unit/panel/panel_core.js",
			"tests/unit/content/content_core.js"
		]
	},
	tests: {
		src: "test/**/*.js"
	},
	demos: {
		src: "demos/**/*.js"
	}
};
};
