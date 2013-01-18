module.exports = function( grunt ) {
	"use strict";

	var distpaths = [
		"dist/jquery.mobile.js",
		"dist/jquery.mobile.min.map",
		"dist/jquery.mobile.min.js"
	];

	// grunt plugins
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-css" );
	grunt.loadNpmTasks( "grunt-git-authors" );
	grunt.loadNpmTasks( "grunt-junit" );


	// Project configuration.
	grunt.config.init({
		pkg: grunt.file.readJSON( "package.json" ),

		jshint: {
			js: {
				options: {
					jshintrc: "js/.jshintrc"
				},
				files: {
					src: "js/**/*.js"
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
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: "js",
					dir: "dist",
					optimize: "none",

					//Finds require() dependencies inside a require() or define call.
					findNestedDependencies: true,

					//If skipModuleInsertion is false, then files that do not use define()
					//to define modules will get a define() placeholder inserted for them.
					//Also, require.pause/resume calls will be inserted.
					//Set it to true to avoid this. This is useful if you are building code that
					//does not use require() in the built project or in the JS files, but you
					//still want to use the optimization tool from RequireJS to concatenate modules
					//together.
					skipModuleInsertion: true,

					mainConfigFile: "js/requirejs.config.js",

					name: "jquery.mobile",
					exclude: [
						"jquery",
						"depend",
						"text",
						"text!../version.txt"
					],

					pragmasOnSave: {
						jqmBuildExclude: true
					},

					//File paths are relative to the build file, or if running a commmand
					//line build, the current directory.
					wrap: {
						startFile: "build/wrap.start",
						endFile:   "build/wrap.end"
					},

					dirExclusionRegExp: /^\.|^build|^compiled|^tmp/
				}
			}
		},

		uglify: {
			all: {
				files: {
					"dist/jquery.mobile.min.js": [ "dist/jquery.mobile.js" ]
				},
				options: {
					banner: "/*! jQuery Mobile v<%= pkg.version %> | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */",
					sourceMap: "dist/jquery.mobile.min.map",
					beautify: {
						ascii_only: true
					}
				}
			}
		},

		qunit: {
			options: {
				timeout: 10000
			},
			all: [
				"tests/unit/**/*.html",
				"!tests/unit/checkboxradio/form-result.html",
				"!tests/unit/core/index.html",
				"!tests/unit/dialog/dialog-no-hash.html",
				"!tests/unit/dialog/index.html",
				"!tests/unit/event/index.html",
				"!tests/unit/kitchensink/index.html",
				"!tests/unit/init/**",
				"!tests/unit/listview/cache-tests/*",
				"!tests/unit/listview/push-state-disabled-tests.html",
				"!tests/unit/loader/**",
				"!tests/unit/navigation/**",
				"!tests/unit/popup/back-two.html",
				"!tests/unit/popup/other.html",
				"!tests/unit/popup/popup-sequence-test-dialog.html",
				"!tests/unit/select/cached*"
			]
		}

	});

	// Default grunt
	grunt.registerTask( "default", [ "requirejs", "uglify" ] );

};