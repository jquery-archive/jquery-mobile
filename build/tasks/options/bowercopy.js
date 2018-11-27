module.exports = function( grunt ) {
return {
	options: {

		// Bower components folder will be removed afterwards
		clean: true,
		ignore: [ "jquery" ],
		destPrefix: "external"
	},
	tests: {
		files: {
			"qunit/qunit.js": "qunit/qunit/qunit.js",
			"qunit/qunit.css": "qunit/qunit/qunit.css",
			"qunit/LICENSE.txt": "qunit/LICENSE.txt",
			"qunit-assert-classes/qunit-assert-classes.js":
			"qunit-assert-classes/qunit-assert-classes.js",
			"qunit-assert-classes/LICENSE.txt": "qunit-assert-classes/LICENSE",
			"jshint/jshint.js": "jshint/dist/jshint.js"
		}
	},
	demos: {
		files: {
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.js":
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.js",
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.css":
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.css",
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.theme.css":
			"jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.theme.css"
		}
	},
	requirejs: {
		files: {
			"requirejs/require.js": "requirejs/require.js",
			"requirejs/plugins/json.js": "requirejs-plugins/src/json.js",
			"requirejs/plugins/text.js": "requirejs-text/text.js"
		}
	},
	"jquery": {
		files: {
			"jquery/": "jquery-1.11.3/dist/"
		}
	},
	"jquery-ui": {
		options: {
			copyOptions: {
				process: function( content ) {
					var version = grunt
						.file
						.readJSON( "bower.json" )
						.dependencies[ "jquery-ui" ];
					if ( /#/.test( version ) ) {
						version = version.split( "#" )[ 1 ];
					}
					return content.replace( /@VERSION/g, version );
				}
			}
		},
		files: {
			"jquery-ui/data.js": "jquery-ui/ui/data.js",
			"jquery-ui/disable-selection.js": "jquery-ui/ui/disable-selection.js",
			"jquery-ui/escape-selector.js": "jquery-ui/ui/escape-selector.js",
			"jquery-ui/focusable.js": "jquery-ui/ui/focusable.js",
			"jquery-ui/form.js": "jquery-ui/ui/form.js",
			"jquery-ui/form-reset-mixin.js": "jquery-ui/ui/form-reset-mixin.js",
			"jquery-ui/ie.js": "jquery-ui/ui/ie.js",
			"jquery-ui/jquery-1-7.js": "jquery-ui/ui/jquery-1-7.js",
			"jquery-ui/keycode.js": "jquery-ui/ui/keycode.js",
			"jquery-ui/labels.js": "jquery-ui/ui/labels.js",
			"jquery-ui/LICENSE.txt": "jquery-ui/LICENSE.txt",
			"jquery-ui/plugin.js": "jquery-ui/ui/plugin.js",
			"jquery-ui/safe-active-element.js": "jquery-ui/ui/safe-active-element.js",
			"jquery-ui/safe-blur.js": "jquery-ui/ui/safe-blur.js",
			"jquery-ui/scroll-parent.js": "jquery-ui/ui/scroll-parent.js",
			"jquery-ui/tabbable.js": "jquery-ui/ui/tabbable.js",
			"jquery-ui/unique-id.js": "jquery-ui/ui/unique-id.js",
			"jquery-ui/version.js": "jquery-ui/ui/version.js",
			"jquery-ui/widget.js": "jquery-ui/ui/widget.js",
			"jquery-ui/widgets/accordion.js": "jquery-ui/ui/widgets/accordion.js",
			"jquery-ui/widgets/button.js": "jquery-ui/ui/widgets/button.js",
			"jquery-ui/widgets/checkboxradio.js": "jquery-ui/ui/widgets/checkboxradio.js",
			"jquery-ui/widgets/controlgroup.js": "jquery-ui/ui/widgets/controlgroup.js",
			"jquery-ui/widgets/datepicker.js": "jquery-ui/ui/widgets/datepicker.js",
			"jquery-ui/widgets/tabs.js": "jquery-ui/ui/widgets/tabs.js"
		}
	}
};
};
