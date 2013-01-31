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
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-css" );
	grunt.loadNpmTasks( "grunt-git-authors" );
	grunt.loadNpmTasks( "grunt-qunit-junit" );
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
					cwd: dist,
					banner: banner.minified,
					sourceMapPrefix: 1,
					sourceMap: path.join( dist, name ) + ".min.map",
					beautify: {
						ascii_only: true
					}
				},
				files: {
					"dist/jquery.mobile.min.js": path.join( dist, name ) + ".js",
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

		copy: {
			images: {
				src: "css/themes/default/images",
				dest: path.join( dist, "images" ),
			}
		},

		zip: {
			dist: {
				options: {
					baseDir: dist
				},
				// Files to zip together
				src: [
					path.join( dist, "**" ),
					"!<%= zip.dist.dest %>"
				],

				// Destination of zip file
				dest: path.join( dist, name ) + ".zip"
			}
		},

		connect: {
			server: {
				options: {
					port: httpPort,
					base: '.',
					middleware: function(connect, options) {
						return [
							function(req, res, next){
								var bundle = grunt.config.process( "<%= requirejs.js.options.out %>" );
								if (req.url === "/js/") {
									grunt.log.debug( req.url + " requested, serving: " + bundle );
									res.end( grunt.file.read( bundle ) );
								} else {
									next();
								}
							},

							// Serve static files.
							connect.static(options.base),
							// Make empty directories browsable.
							connect.directory(options.base)
						];
					}
				}
			}
		},

		qunit_junit: {
			options: {
				dest: "build/test-results",
				namer: function (url) {
					var match = url.match(/tests\/([^\/]*)\/(.*)$/);
					return match[2].replace(/\//g, '.').replace(/\.html/, '' ).replace(/\?/, "-");
				}
			}
		},

		qunit: {
			options: {
				timeout: 30000
			},

			files: {},

			http: {
				options: {
					urls: (function() {
						// Find the test files
						var suites = grunt.util._.without( ( grunt.option( "suites" ) || "" ).split( "," ), "" ),
							patterns, paths,
							versionedPaths = [],
							jQueries = grunt.util._.without( ( grunt.option( "jquery" ) || "" ).split( "," ), "" );

						if ( suites.length ) {
							patterns = [];
							suites.forEach( function( unit ) {
								patterns = patterns.concat( [ "tests/unit/" + unit + "/index.html", "tests/unit/" + unit + "/*/index.html", "tests/unit/" + unit + "/**/*-tests.html" ] );
							});
						} else {
							patterns = [ "tests/unit/*/*/index.html", "tests/unit/**/*-tests.html" ];
						}

						paths = grunt.file.expand( patterns ).sort();

						if ( jQueries.length ) {
							paths.forEach( function( path ) {
								versionedPaths = versionedPaths.concat( jQueries.map( function( jQVersion ) {
									return path + "?jquery=" + jQVersion;
								}) );
							})
						}

						if ( versionedPaths.length ) {
							paths = versionedPaths;
						}

						return paths.map( function( path ) {
							return "http://localhost:<%= connect.server.options.port %>/" + path
						});
					}())
				}
			}
		}

	});

	grunt.registerTask( "js",  [ "config:dev", "requirejs", "concat:js", "uglify" ] );
	grunt.registerTask( "js:release",  [ "config:dev", "requirejs", "concat:js", "uglify" ] );
	grunt.registerTask( "css", [ "config:dev", "cssbuild", "cssmin" ] );
	grunt.registerTask( "css:release", [ "cssbuild", "cssmin" ] );

	grunt.registerTask( "dist:common", [ "copy:images", "zip:dist" ] );

	grunt.registerTask( "dist", [ "js", "css", "dist:common" ] );
	grunt.registerTask( "dist:release", [ "js:release", "css:release", "dist:common" ] );

	grunt.registerTask( "test", [ "config:dev", "requirejs", "connect", "qunit:http" ] );
	grunt.registerTask( "test:ci", [ "qunit_junit", "connect", "qunit:http" ] );

	// Default grunt
	grunt.registerTask( "default", [ "dist" ] );

};