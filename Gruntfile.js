module.exports = function( grunt ) {
	"use strict";

	var path = require( "path" ),
		httpPort =  Math.floor( 9000 + Math.random()*1000 ),
		name = "jquery.mobile",
		dist = "dist",
		distpaths = [
			path.join( dist, name ) + ".js",
			path.join( dist, name ) + ".min.map",
			path.join( dist, name ) + ".min.js"
		],
		banner = {
			normal: [
				"/*",
				"* jQuery Mobile <%= version %>",
				"* http://jquerymobile.com",
				"*",
				"* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors",
				"* Released under the MIT license.",
				"* http://jquery.org/license",
				"*",
				"*/",
				"",
				"",
				"" ].join( grunt.util.linefeed ),
			minified: "/*! jQuery Mobile <%= version %> | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */"
		};

	// grunt plugins
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-css" );
	grunt.loadNpmTasks( "grunt-git-authors" );
	grunt.loadNpmTasks( "grunt-junit" );
	grunt.loadNpmTasks( "grunt-zip" );

	// load the project's default tasks
	grunt.loadTasks( 'build/tasks');

	// Project configuration.
	grunt.config.init({
		pkg: grunt.file.readJSON( "package.json" ),

		version: "v<%= pkg.version %>",

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
			js: {
				options: {
					baseUrl: "js",

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

					name: name,

					exclude: [
						"jquery",
						"depend",
						"json",
						"json!../package.json"
					],

					out: path.join( dist, name ) + ".js",

					pragmasOnSave: {
						jqmBuildExclude: true
					},

					//File paths are relative to the build file, or if running a commmand
					//line build, the current directory.
					wrap: {
						startFile: "build/wrap.start",
						endFile: "build/wrap.end"
					},

					onBuildWrite: function (moduleName, path, contents) {
						return contents.replace(/__version__/g, grunt.config.process( "\"<%= version %>\"" ) );
					}
				}
			}
		},

		concat: {
			options: {
				banner: banner.normal
			},
			js: {
				src: [ path.join( dist, name ) + ".js" ],
				dest: path.join( dist, name ) + ".js"
			}
		},

		uglify: {
			all: {
				options: {
					banner: banner.minified,
					sourceMapRoot: dist,
					sourceMapPrefix: 1,
					sourceMap: path.join( dist, name ) + ".min.map",
					beautify: {
						ascii_only: true
					}
				},
				files: {
					"dist/jquery.mobile.min.js": [ path.join( dist, name ) + ".js" ]
				}
			}
		},

		cssbuild: {
			options: {
				banner: banner.normal,

				//Allow CSS optimizations. Allowed values:
				//- "standard": @import inlining, comment removal and line returns.
				//Removing line returns may have problems in IE, depending on the type
				//of CSS.
				//- "standard.keepLines": like "standard" but keeps line returns.
				//- "none": skip CSS optimizations.
				//- "standard.keepComments": keeps the file comments, but removes line
				//returns.  (r.js 1.0.8+)
				//- "standard.keepComments.keepLines": keeps the file comments and line
				//returns. (r.js 1.0.8+)
				optimizeCss: "standard.keepComments.keepLines",

				//If optimizeCss is in use, a list of of files to ignore for the @import
				//inlining. The value of this option should be a string of comma separated
				//CSS file names to ignore (like 'a.css,b.css'. The file names should match
				//whatever strings are used in the @import calls.
				cssImportIgnore: null,
			},
			all: {
				files: {
					"dist/jquery.mobile.structure.css": "css/structure/jquery.mobile.structure.css",
					"dist/jquery.mobile.theme.css": "css/themes/default/jquery.mobile.theme.css",
					"dist/jquery.mobile.css": "css/themes/default/jquery.mobile.css"
				}
			}
		},

		cssmin: {
			options: {
				banner: banner.minified
			},
			structure: {
				files: {
					"dist/jquery.mobile.structure.min.css": "dist/jquery.mobile.structure.css"
				}
			},
			theme: {
				files: {
					"dist/jquery.mobile.theme.min.css": "dist/jquery.mobile.theme.css"
				}
			},
			bundle: {
				files: {
					"dist/jquery.mobile.min.css": "dist/jquery.mobile.css"
				}
			}
		},

		zip: {
			dist: {
				options: {
					baseDir: dist
				},
				
				// Files to zip together
				src: [ dist + "/*.js", dist + "/*.css" ],

				// Destination of zip file
				dest: path.join( dist, name ) + ".zip"
			}
		},

		connect: {
			server: {
				options: {
					port: httpPort,
					base: '.'
				}
			}
		},

		qunit: {
			options: {
				timeout: 10000
			},
			files: [
				"tests/unit/**/index.html",
				"!tests/unit/core/index.html",
				"!tests/unit/dialog/index.html",
				"!tests/unit/event/index.html",
				"!tests/unit/kitchensink/index.html",
				"!tests/unit/init/**",
				"!tests/unit/listview/cache-tests/*",
				"!tests/unit/loader/**",
				"!tests/unit/navigation/**",
				"!tests/unit/select/cached*",
				"!tests/unit/support/index.html"
			],
			http: {
				options: {
					urls: [
//						"http://localhost:<%= connect.server.options.port %>/tests/unit/core/index.html",
						"http://localhost:<%= connect.server.options.port %>/tests/unit/dialog/index.html",
						"http://localhost:<%= connect.server.options.port %>/tests/unit/event/index.html",
						"http://localhost:<%= connect.server.options.port %>/tests/unit/support/index.html"
//				"!tests/unit/kitchensink/index.html",
//				"!tests/unit/init/**",
//				"!tests/unit/listview/cache-tests/*",
//				"!tests/unit/listview/push-state-disabled-tests.html",
//				"!tests/unit/loader/**",
//				"!tests/unit/navigation/**",
//				"!tests/unit/popup/back-two.html",
//				"!tests/unit/popup/other.html",
//				"!tests/unit/popup/popup-sequence-test-dialog.html",
//				"!tests/unit/select/cached*"

					]
				}

			}
		}

	});

	grunt.registerTask( "js",  [ "config:dev", "requirejs", "concat:js", "uglify" ] );
	grunt.registerTask( "js:release",  [ "config:dev", "requirejs", "concat:js", "uglify" ] );
	grunt.registerTask( "css", [ "config:dev", "cssbuild", "cssmin" ] );
	grunt.registerTask( "css:release", [ "cssbuild", "cssmin" ] );

	grunt.registerTask( "dist", [ "js", "css" ] );
	grunt.registerTask( "dist:release", [ "js:release", "css:release" ] );

	grunt.registerTask( "test", [ "qunit:files", "connect", "qunit:http" ] );

	// Default grunt
	grunt.registerTask( "default", [ "dist" ] );

};