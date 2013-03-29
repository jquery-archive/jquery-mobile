module.exports = function( grunt ) {
	"use strict";

	var _ = grunt.util._,
		path = require( "path" ),
		httpPort =  Math.floor( 9000 + Math.random()*1000 ),
		name = "jquery.mobile<%= versionSuffix %>",
		dist = "dist",
		banner = {
			normal: [
				"/*",
				"* jQuery Mobile <%= version %>",
				"* <%if ( headHash ) {%>Git HEAD hash: <%= headHash %> <> <% } %>Date: "+ grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
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
			minified: "/*! jQuery Mobile <%= version %> | <%if ( headShortHash ) {%>Git HEAD hash: <%= headShortHash %> <> <% } %>Date: " + grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss TT Z" ) + " | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */\n"
		};

	// grunt plugins
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-compress" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-css" );
	grunt.loadNpmTasks( "grunt-git-authors" );
	grunt.loadNpmTasks( "grunt-qunit-junit" );

	// load the project's default tasks
	grunt.loadTasks( 'build/tasks');

	// Project configuration.
	grunt.config.init({
		pkg: grunt.file.readJSON( "package.json" ),

		version: "<%= pkg.version %>",

		versionSuffix: "",

		headHash: "",

		headShortHash: "",

		jshint: {
			js: {
				options: {
					jshintrc: "js/.jshintrc"
				},
				files: {
					src: [
						"js/**/*.js",
						"!js/jquery.hashchange.js",
						"!js/jquery.js",
						"!js/jquery.ui.widget.js"
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

					include: ( grunt.option( "modules" ) || "jquery.mobile" ).split( "," ),

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
			js: {
				options: {
					banner: banner.normal
				},

				src: [ path.join( dist, name ) + ".js" ],
				dest: path.join( dist, name ) + ".js"
			},
			demos: {
				src: [ "demos/_assets/js/*.js" ],
				dest: path.join( dist, "demos/_assets/js/index.js" )
			}
		},

		uglify: {
			all: {
				options: {
					banner: banner.minified,
					sourceMap: path.join( dist, name ) + ".min.map",
					sourceMappingURL: name + ".min.map",
					beautify: {
						ascii_only: true
					}
				},
				files: {
					"dist/jquery.mobile<%= versionSuffix %>.min.js": path.join( dist, name ) + ".js"
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
				cssImportIgnore: null
			},
			all: {
				files: {
					"dist/jquery.mobile.structure<%= versionSuffix %>.css": "css/structure/jquery.mobile.structure.css",
					"dist/jquery.mobile.theme<%= versionSuffix %>.css": "css/themes/default/jquery.mobile.theme.css",
					"dist/jquery.mobile<%= versionSuffix %>.css": "css/themes/default/jquery.mobile.css"
				}
			}
		},

		cssmin: {
			options: {
				banner: banner.minified
			},
			structure: {
				files: {
					"dist/jquery.mobile.structure<%= versionSuffix %>.min.css": "dist/jquery.mobile.structure<%= versionSuffix %>.css"
				}
			},
			theme: {
				files: {
					"dist/jquery.mobile.theme<%= versionSuffix %>.min.css": "dist/jquery.mobile.theme<%= versionSuffix %>.css"
				}
			},
			bundle: {
				files: {
					"dist/jquery.mobile<%= versionSuffix %>.min.css": "dist/jquery.mobile<%= versionSuffix %>.css"
				}
			}
		},

		copy: {
			images: {
				expand: true,
				cwd: "css/themes/default/images",
				src: "*",
				dest: path.join( dist, "images/" )
			},
			"demos.firstpass": {
				options: {
					processContent: function( content, srcPath ) {
						var processedName = grunt.config.process( name );
						content = content.replace( /_assets\/js\/">/gi, "_assets/js/index.js\">" );
						content = content.replace( /\.\.\/js\//gi, "js/" );
						content = content.replace( /js\/"/gi, "js/" + processedName + ".min.js\"" );
						content = content.replace( /\.\.\/css\//gi, "css/" );
						content = content.replace( /jquery\.mobile\.css/gi, processedName + ".min.css" );
						content = content.replace( /^\s*<\?php include\(\s*['"]([^'"]+)['"].*$/gmi,
							function( match, includePath /*, offset, string */ ) {
								var fileToInclude = path.resolve( path.join( path.dirname( srcPath ), includePath ) );
								return grunt.file.read( fileToInclude );
							}
						);
						content = content.replace( /\.php/gi, ".html" );
						return content;
					}
				},
				files: [
					{
						expand: true,
						src: [ "index.php", "demos/**/*.php" ],
						dest: dist,
						ext: ".html"
					}
				]
			},
			"demos.secondpass": {
				options: {
					processContentExclude: [ "**/*.png", "**/*.gif" ],
					processContent: function( content /*, srcPath*/ ) {
						content = content.replace( /\.php/gi, ".html" );
						return content;
					}
				},
				files: [
					{
						expand: true,
						src: [ "demos/**", "!**/*.php" ],
						dest: dist
					}
				]
			},
			"demos.unprocessed": {
				files: [
					{
						expand: true,
						cwd: "js",
						src: [ "jquery.js" ],
						dest: path.join( dist, "demos/js/" )
					},
					{
						expand: true,
						cwd: dist,
						src: [ "*.js", "*.map" ],
						dest: path.join( dist, "demos/js/" )
					},
					{
						expand: true,
						cwd: dist,
						src: [ "*.css", "images/*" ],
						dest: path.join( dist, "demos/css/themes/default/" )
					},
					{
						expand: true,
						cwd: dist,
						src: "images/*",
						dest: path.join( dist, "demos/" )
					}
				]
			},
			sourcemap: {
				// Processes the sourceMap to fix issue: https://github.com/mishoo/UglifyJS2/issues/47
				options: {
					processContent: function( content /*, srcPath*/ ) {
						content = content.replace( /"dist\//g, "\"" );
						return content;
					}
				},
				files: [
					{
						src: "<%= uglify.all.options.sourceMap %>",
						dest: "<%= uglify.all.options.sourceMap %>"
					}
				]
			}
		},

		compress: {
			dist: {
				options: {
					archive: path.join( dist, name ) + ".zip"
				},
				files: [
					{ expand: true, cwd: dist, src: [ "**", "!" + name + ".zip" ] }
				]
			}
		},

		connect: {
			server: {
				options: {
					port: httpPort,
					base: '.',
					middleware: function( connect, options ) {
						/*jshint */
						return [
							// For requests to "[...]/js/" return the built jquery.mobile.js
							// as opposed to the php combined version
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
							connect[ "static" ](options.base),
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
						var suites = _.without( ( grunt.option( "suites" ) || "" ).split( "," ), "" ),
							types = _.without( ( grunt.option( "types" ) || "" ).split( "," ), "" ),
							patterns, paths, idx, prefixes = ["tests/unit/", "tests/integration/"],
							onePath = "",
							uniquePaths = [],
							versionedPaths = [],
							jQueries = _.without( ( grunt.option( "jqueries" ) || process.env.JQUERIES || "" ).split( "," ), "" );

						if( types.length ){
							prefixes = [];
							types.forEach(function( type ) {
								prefixes.push( "tests/" + type +"/" );
							});
						}

						patterns = [];

						if ( suites.length ) {
							suites.forEach( function( unit ) {
								prefixes.forEach( function( prefix ) {
									patterns = patterns.concat([
										prefix + unit + "/",
										prefix + unit + "/index.html",
										prefix + unit + "/*/index.html",
										prefix + unit + "/**/*-tests.html"
									]);
								});
							});
						} else {
							prefixes.forEach( function( prefix ) {
								patterns = patterns.concat([
									prefix + "*/index.html",
									prefix + "*/*/index.html",
									prefix + "**/*-tests.html"
								]);
							});
						}

						paths = grunt.file.expand( patterns )
							.sort()
							.map( function( path ) {
								// Some of our tests (ie. navigation) don't like having the index.html too much
								return path.replace( /\/\index.html$/, "/" );
							});

						for ( idx in paths ) {
							if ( onePath !== paths[ idx ] ) {
								onePath = paths[ idx ];
								uniquePaths.push( onePath );
							}
						}
						paths = uniquePaths;

						if ( jQueries.length ) {
							paths.forEach( function( path ) {
								versionedPaths = versionedPaths.concat( jQueries.map( function( jQVersion ) {
									return path + "?jquery=" + jQVersion;
								}) );
							});
						}

						if ( versionedPaths.length ) {
							paths = versionedPaths;
						}

						return paths.map( function( path ) {
							return "http://localhost:<%= connect.server.options.port %>/" + path;
						});
					}())
				}
			}
		},

		rsync: {
			options: {
				user: "jqadmin",
				host: "code.origin.jquery.com",
				remoteBase: "/var/www/html/code.jquery.com/mobile/",
				cwd: dist
			},
			release: {
				files: {
					"<%= pkg.version %>/": [
						path.join( dist, name + "*.js" ),
						path.join( dist, name + ".min.map" ),
						path.join( dist, name + "*.css" ),
						path.join( dist, "jquery.mobile.structure<%= versionSuffix %>*.css" ),
						path.join( dist, name + ".zip" ),
						path.join( dist, "demos" ),
						path.join( dist, "images" )
					]
				}
			}
		},

		curl: {
			options: {
				baseUrl: "http://code.origin.jquery.com/mobile/",
				querystring: "?reload",
				cwd: dist
			},
			release: {
				files: {
					"<%= pkg.version %>/": [
						path.join( dist, name + "*.js" ),
						path.join( dist, name + ".min.map" ),
						path.join( dist, name + "*.css" ),
						path.join( dist, "jquery.mobile.structure<%= versionSuffix %>*.css" ),
						path.join( dist, name + ".zip" )
					]
				}
			}
		},

		release: {
			options: {
				versionRegExp: /^(\d)\.(\d+)\.(\d)(-(?:alpha|beta|rc)\.\d|pre)?$/
			}
		},

		clean: [ dist ]
	});

	grunt.registerTask( "lint", [ "jshint" ] );

	grunt.registerTask( "js:release",  [ "requirejs", "concat:js", "uglify", "copy:sourcemap" ] );
	grunt.registerTask( "js", [ "config:dev", "js:release" ] );

	grunt.registerTask( "css:release", [ "cssbuild", "cssmin" ] );
	grunt.registerTask( "css", [ "config:dev", "css:release" ] );

	grunt.registerTask( "demos", [ "concat:demos", "copy:demos.firstpass", "copy:demos.secondpass", "copy:demos.unprocessed" ] );

	grunt.registerTask( "dist", [ "config:fetchHeadHash", "js:release", "css:release", "copy:images", "demos", "compress:dist"  ] );
	grunt.registerTask( "dist:release", [ "release:init", "dist" ] );

	grunt.registerTask( "test", [ "config:fetchHeadHash", "js:release", "connect", "qunit:http" ] );
	grunt.registerTask( "test:ci", [ "qunit_junit", "connect", "qunit:http" ] );

	grunt.registerTask( "deploy", [ "release:init", "release:fail-if-pre", "dist:release", "rsync:release" ] );
	grunt.registerTask( "release", [ "clean", "release:init", "release:check-git-status", "release:set-version", "release:tag", "recurse:deploy", "release:set-next-version" ] );

	// Default grunt
	grunt.registerTask( "default", [ "dist" ] );

};
