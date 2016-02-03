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
	requirejs: {
		files: {
			"requirejs/require.js": "requirejs/require.js"
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
			"jquery-ui/core.js": "jquery-ui/ui/core.js",
			"jquery-ui/version.js": "jquery-ui/ui/version.js",
			"jquery-ui/form.js": "jquery-ui/ui/form.js",
			"jquery-ui/form-reset-mixin.js": "jquery-ui/ui/form-reset-mixin.js",
			"jquery-ui/form-reset-mixin.js": "jquery-ui/ui/form-reset-mixin.js",
			"jquery-ui/widget.js": "jquery-ui/ui/widget.js",
			"jquery-ui/accordion.js": "jquery-ui/ui/accordion.js",
			"jquery-ui/tabs.js": "jquery-ui/ui/tabs.js",
			"jquery-ui/button.js": "jquery-ui/ui/button.js",
			"jquery-ui/checkboxradio.js": "jquery-ui/ui/checkboxradio.js",
			"jquery-ui/controlgroup.js": "jquery-ui/ui/controlgroup.js",
			"jquery-ui/LICENSE.txt": "jquery-ui/LICENSE.txt"
		}
	}
};
};
