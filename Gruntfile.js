module.exports = function( grunt ) {
	"use strict";

	var _ = grunt.util._,

		replaceCombinedCssReference = function( content, processedName ) {
			return content.replace( /\.\.\/css\//, "css/" )
				.replace( /jquery\.mobile\.css/gi, processedName + ".min.css" );
		},

		// Ensure that modules specified via the --modules option are in the same
		// order as the one in which they appear in js/jquery.mobile.js. To achieve
		// this, we parse js/jquery.mobile.js and reconstruct the array of
		// dependencies listed therein.
		makeModulesList = function( modules ) {
			var start, end, index,
				modulesHash = {},
				fixedModules = [],
				jsFile = grunt.file.read( path.join( "js", "jquery.mobile.js" ) );

			modules = modules.split( "," );

			// This is highly dependent on the contents of js/jquery.mobile.js
			if ( jsFile ) {
				start = jsFile.indexOf( "[" );
				if ( start > -1 ) {
					start++;
					end = jsFile.indexOf( "]" );
					if ( start < jsFile.length &&
						end > -1 && end < jsFile.length && end > start ) {

						// Convert list of desired modules to a hash
						for ( index = 0 ; index < modules.length ; index++ ) {
							modulesHash[ modules[ index ] ] = true;
						}

						// Split list of modules from js/jquery.mobile.js into an array
						jsFile = jsFile
							.slice( start, end )
							.match( /"[^"]*"/gm );

						// Add each desired module to the fixed list of modules in the
						// correct order
						for ( index = 0 ; index < jsFile.length ; index++ ) {

							// First we need to touch up each module from js/jquery.mobile.js
							jsFile[ index ] = jsFile[ index ]
								.replace( /"/g, "" )
								.replace( /^.\//, "" );

							// Then, if it's in the hash of desired modules, add it to the
							// list containing the desired modules in the correct order
							if ( modulesHash[ jsFile[ index ] ] ) {
								fixedModules.push( jsFile[ index ] );
							}
						}

						// If we've found all the desired modules, we re-create the comma-
						// separated list and return it.
						if ( fixedModules.length === modules.length ) {
							modules = fixedModules;
						}
					}
				}
			}

			return modules;
		},
		path = require( "path" ),
		httpPort =  Math.floor( 9000 + Math.random()*1000 ),
		name = "jquery.mobile",
		dist = "dist" + path.sep,
		copyrightYear = grunt.template.today( "UTC:yyyy" ),
		banner = {
			normal: [
				"/*!",
				"* jQuery Mobile <%= version %>",
				"* <%if ( headHash ) {%>Git HEAD hash: <%= headHash %> <> <% } %>Date: "+ grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
				"* http://jquerymobile.com",
				"*",
				"* Copyright 2010, " + copyrightYear + " jQuery Foundation, Inc. and other contributors",
				"* Released under the MIT license.",
				"* http://jquery.org/license",
				"*",
				"*/",
				"",
				"",
				"" ].join( grunt.util.linefeed ),
			minified: "/*! jQuery Mobile <%= version %> | <%if ( headShortHash ) {%>Git HEAD hash: <%= headShortHash %> <> <% } %>" + grunt.template.today( "UTC:yyyy-mm-dd" ) + "T" + grunt.template.today( "UTC:HH:MM:ss" ) + "Z | (c) 2010, " + copyrightYear + " jQuery Foundation, Inc. | jquery.org/license */\n"
		},
		dirs = {
			dist: dist,
			cdn: {
				noversion: path.join( dist, "cdn-noversion" ),
				git: path.join( dist, "git" )
			},
			tmp: path.join( dist, "tmp" )
		},
		files = {
			css: {
				structure: {
					src: "css/structure/jquery.mobile.structure.css",
					unminified: name + ".structure<%= versionSuffix %>.css"
				},
				theme: {
					src: "css/themes/default/jquery.mobile.theme.css",
					unminified: name + ".theme<%= versionSuffix %>.css"
				},
				bundle: {
					src: "css/themes/default/jquery.mobile.css",
					unminified: name + "<%= versionSuffix %>.css"
				},
				inlinesvg: {
					src: "css/themes/default/jquery.mobile.inline-svg.css",
					unminified: name + ".inline-svg<%= versionSuffix %>.css"
				},
				inlinepng: {
					src: "css/themes/default/jquery.mobile.inline-png.css",
					unminified: name + ".inline-png<%= versionSuffix %>.css"
				},
				externalpng: {
					src: "css/themes/default/jquery.mobile.external-png.css",
					unminified: name + ".external-png<%= versionSuffix %>.css"
				},
				icons: {
					src: "css/themes/default/jquery.mobile.icons.css",
					unminified: name + ".icons<%= versionSuffix %>.css"
				}
			},
			getCSSFiles: function( destDir ) {
				destDir = destDir || ".";
				var list = [];
				_.values( files.css ).forEach( function( value ) {
					list.push({
						src: value.src,
						dest: path.join( destDir, value.unminified )
					});
				});
				return list;
			},
			getMinifiedCSSFiles: function( destDir ) {
				destDir = destDir || ".";
				var list = [];
				_.values( files.css ).forEach( function( value ) {
					list.push({
						src: path.join( destDir, value.unminified ),
						dest: path.join( destDir, value.minified )
					});
				});
				return list;
			},
			cdn: [
				name + "<%= versionSuffix %>.js",
				name + "<%= versionSuffix %>.min.js",
				name + "<%= versionSuffix %>.min.map",

				"<%= files.css.structure.unminified %>",
				"<%= files.css.structure.minified %>",
				"<%= files.css.bundle.unminified %>",
				"<%= files.css.bundle.minified %>",
				"<%= files.css.inlinesvg.unminified %>",
				"<%= files.css.inlinesvg.minified %>",
				"<%= files.css.inlinepng.unminified %>",
				"<%= files.css.inlinepng.minified %>",
				"<%= files.css.externalpng.unminified %>",
				"<%= files.css.externalpng.minified %>",
				"<%= files.css.icons.unminified %>",
				"<%= files.css.icons.minified %>",

				"images/*.*",
				"images/icons-png/**"
			],

			distZipContent: [
				"<%= files.cdn %>",

				"<%= files.css.theme.unminified %>",
				"<%= files.css.theme.minified %>",

				"images/icons-svg/**",
				"demos/**"
			],

			zipFileName: name + "<%= versionSuffix %>.zip",

			distZipOut: path.join( dist, name + "<%= versionSuffix %>.zip" ),

			cdnNoversionZipOut: path.join( "<%= dirs.cdn.noversion %>","<%= files.zipFileName %>" )
		};

	// Add minified property to files.css.*
	_.forEach( files.css, function( o ) {
		o.minified = o.unminified.replace( /\.css$/, ".min.css" );
	});

	// Project configuration.
	grunt.config.init({
		pkg: grunt.file.readJSON( "package.json" ),

		version: "<%= pkg.version %>",

		versionSuffix: "",

		headHash: "",

		headShortHash: "",

		dirs: dirs,

		files: files,

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
						"!js/jquery.ui.widget.js",
						"!js/widgets/jquery.ui.tabs.js",
						"!js/jquery.ui.core.js"
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

					include: ( grunt.option( "modules" ) ?
						makeModulesList( grunt.option( "modules" ) ) :
						[ "jquery.mobile" ] ),

					exclude: [
						"jquery",
						"json",
						"json!../package.json"
					],

					out: path.join( dist, name ) + "<%= versionSuffix %>.js",

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

				src: [ path.join( dist, name ) + "<%= versionSuffix %>.js" ],
				dest: path.join( dist, name ) + "<%= versionSuffix %>.js"
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
					sourceMap: path.join( dist, name ) + "<%= versionSuffix %>.min.map",
					sourceMappingURL: name + "<%= versionSuffix %>.min.map",
					beautify: {
						ascii_only: true
					}
				},
				files: {
					"dist/jquery.mobile<%= versionSuffix %>.min.js": path.join( dist, name ) + "<%= versionSuffix %>.js"
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
				files: files.getCSSFiles( dist )
			}
		},

		cssmin: {
			options: {
				banner: banner.minified,
				keepSpecialComments: 0
			},
			minify: {
				files: files.getMinifiedCSSFiles( dist ),
			}
		},

		copy: {
			images: {
				expand: true,
				cwd: "css/themes/default/images",
				src: "**",
				dest: path.join( dist, "images/" )
			},
			"demos.nested-includes": {
				options: {
					// TODO duplicated in demos.firstpass
					processContent: function( content, srcPath ) {
						content = content.replace( /^\s*<\?php include\(\s*['"]([^'"]+)['"].*$/gmi,
							function( match, includePath /*, offset, string */ ) {

								var fileToInclude = path.resolve( path.join( path.dirname( srcPath ), includePath ) );
								return grunt.file.read( fileToInclude );
							}
						);
						return content;
					}
				},
				files: [
					{
						expand: true,
						src: [ "demos/jqm-contents.php", "demos/jqm-navmenu.php", "demos/jqm-search.php" ],
						dest: dist
					}
				]

			},
			"demos.processed": {
				options: {
					processContent: function( content, srcPath ) {
						var processedName = grunt.config.process( name + "<%= versionSuffix %>" );
						content = content.replace( /_assets\/js\/">/gi, "_assets/js/index.js\">" );
						content = content.replace( /\.\.\/js\//gi, "js/" );
						content = content.replace( /js\/"/gi, "js/" + processedName + ".min.js\"" );
						content = replaceCombinedCssReference( content, processedName );
						content = content.replace( /^\s*<\?php include\(\s*['"]([^'"]+)['"].*$/gmi,
							function( match, includePath /*, offset, string */ ) {
								var fileToInclude, newSrcPath = srcPath;

								// If we've already handled the nested includes use the version
								// that was copied to the dist folder
								// TODO use the config from copy:demos.nested.files
								if( includePath.match(/jqm\-contents.php|jqm\-navmenu.php|jqm\-search.php/) ) {
									newSrcPath = "dist/" + newSrcPath;
								}

								fileToInclude = path.resolve( path.join(path.dirname(newSrcPath), includePath) );

								return grunt.file.read( fileToInclude );
							}
						);
						content = content.replace( /\.php/gi, ".html" );

						// Demos that separately refer to the structure need to be processed here
						content = content.replace( /css\/structure\/jquery\.mobile\.structure\.css/gi,
							path.join( "css", "themes", "default", processedName + ".structure" + ".min.css" ) );

						// References to the icons CSS file need to be processed here
						content = content.replace( /css\/themes\/default\/jquery\.mobile\.icons\.css/gi,
							path.join( "..", "jquery.mobile.icons.min.css" ) );
						return content;
					}
				},
				files: [
					{
						expand: true,
						src: [ "index.php", "demos/**/*.php", "demos/**/*.html", "!demos/navigation-php-redirect/**" ],
						dest: dist,
						ext: ".html"
					}
				]
			},
			"demos.backbone": {
				options: {
					processContent: function( content /*, srcPath */ ) {
						var processedName = grunt.config.process( name + "<%= versionSuffix %>" );
						content = content.replace( /"jquery": "\.\.\/\.\.\/\.\.\/js\/jquery"/,
								"\"jquery\": \"../../js/jquery\"" );
						content = replaceCombinedCssReference( content, processedName );

						// Update dependency to jquery.mobile claimed by jquerymobile.js
						content = content.replace( /\[ "\.\.\/\.\.\/js\/\?noext" \]/,
							"[ \"../../../" + processedName + "\" ]" );
						return content;
					}
				},
				files: [
					{
						expand: true,
						src: [ "demos/backbone-requirejs/**/*" ],
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
						src: [
							"images/**"
						].concat( _.pluck( files.getMinifiedCSSFiles(), "dest" ) ),
						dest: path.join( dist, "demos/css/themes/default/" )
					},
					{
						expand: true,
						src: [ "demos/**/*", "!**/*.php", "!**/*.html", "!demos/backbone-requirejs/**/*" ],
						dest: dist
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
			},
			noversion: {
				options: {
					processContent: function( content, srcPath ) {
						if ( /\.min.js$|\.min.map$/.test( srcPath ) ) {
							// We need to rewrite the map info
							var re = new RegExp( grunt.template.process( "<%= versionSuffix %>" ), "g" );
							content = content.replace( re, "" );
						}
						return content;
					},
				},
				files: {
					// WARNING: This will be modified by the config:copy:noversion task
					cwd: dist,
					src: "<%= files.cdn %>",
					dest: "<%= dirs.tmp %>"
				}
			},
			git: {
				options: {
					processContent: function( content, srcPath ) {
						if ( /\.min.js$|\.min.map$/.test( srcPath ) ) {
							// We need to rewrite the map info
							var re = new RegExp( grunt.template.process( name ), "g" );
							content = content.replace( re, name + "-git" );
						}
						return content;
					},
					processContentExclude: [ "**/*.zip", "**/*.gif", "**/*.png" ]
				},
				files: {
					// WARNING: This will be modified by the config:copy:git task
					cwd: dist,
					src: "<%= files.cdn %>",
					dest: "<%= dirs.cdn.git %>"
				}
			}
		},

		"hash-manifest": {
			noversion: {
				options: {
					algo: "md5",
					cwd: "<%= dirs.tmp %>"
				},
				src: [ "**/*" ],
				dest: "MANIFEST"
			}
		},

		compress: {
			dist: {
				options: {
					archive: "<%= files.distZipOut %>"
				},
				files: [
					{
						expand: true,
						cwd: dist,
						src: "<%= files.distZipContent %>"
					}
				]
			},
			"cdn-noversion": {
				options: {
					archive: "<%= files.cdnNoversionZipOut %>"
				},
				files: [
					{
						expand: true,
						cwd: "<%= dirs.tmp %>",
						src: [ "**/*" ]
					}
				]
			}
		},

		connect: {
			server: {
				options: {
					port: httpPort,
					base: ".",
					middleware: function( connect, options ) {
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
					return match[2].replace(/\//g, ".").replace(/\.html/, "" ).replace(/\?/, "-");
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
							types = _.without( ( grunt.option( "types" ) || "" ).split( "," ), "" ).sort().reverse(), // So that unit runs before integration
							patterns, paths,
							prefixes = ["tests/unit/", "tests/integration/"],
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
							.filter( function( testPath ) {
								if ( grunt.file.isDir( testPath ) ) {
									testPath = path.join( testPath, "index.html" );
								}
								return grunt.file.exists( testPath );
							})
							.map( function( path ) {
								// Some of our tests (ie. navigation) don't like having the index.html too much
								return path.replace( /\/\index.html$/, "/" );
							});

						paths = grunt.util._.uniq( paths );

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

		curl: {
			options: {
				baseUrl: "http://code.origin.jquery.com/mobile/",
				querystring: "?reload=1",
				cwd: dist
			},
			release: {
				files: {
					"<%= pkg.version %>/": [
						path.join( dist, name + "*.js" ),
						path.join( dist, name + ".min.map" ),
						path.join( dist, name + "*.css" ),
					]
				}
			}
		},

		release: {
			options: {
				versionRegExp: /^(\d)\.(\d+)\.(\d)(-(?:alpha|beta|rc)\.\d|pre)?$/
			}
		},

		clean: {
			dist: [ dist ],
            git: [ path.join( dist, "git" ) ],
			tmp: [ "<%= dirs.tmp %>" ],
			"cdn-noversion": [ "<%= dirs.cdn.noversion %>" ]
		}
	});

	// grunt plugins
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-compress" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-git-authors" );
	grunt.loadNpmTasks( "grunt-qunit-junit" );
	grunt.loadNpmTasks( "grunt-hash-manifest" );

	// load the project's default tasks
	grunt.loadTasks( "build/tasks");

	grunt.registerTask( "lint", [ "jshint" ] );

	grunt.registerTask( "changelog", ["changelog:create"] );

	grunt.registerTask( "js", [ "requirejs", "concat:js" ] );
	grunt.registerTask( "js:release",  [ "js", "uglify", "copy:sourcemap" ] );

	grunt.registerTask( "css", [ "cssbuild" ] );
	grunt.registerTask( "css:release", [ "css", "cssmin" ] );

	grunt.registerTask( "demos", [ "concat:demos", "copy:demos.nested-includes", "copy:demos.processed", "copy:demos.unprocessed", "copy:demos.backbone" ] );

	grunt.registerTask( "cdn", [ "release:init", "clean:tmp", "config:copy:noversion", "copy:noversion", "hash-manifest:noversion", "compress:cdn-noversion", "clean:tmp" ] );

	grunt.registerTask( "dist", [ "config:fetchHeadHash", "js:release", "css:release", "copy:images", "demos", "compress:dist"  ] );
	grunt.registerTask( "dist:release", [ "release:init", "dist", "cdn" ] );
	grunt.registerTask( "dist:git", [ "dist", "clean:git", "config:copy:git:-git", "copy:git" ] );

	grunt.registerTask( "test", [ "jshint", "config:fetchHeadHash", "js:release", "connect", "qunit:http" ] );
	grunt.registerTask( "test:ci", [ "qunit_junit", "connect", "qunit:http" ] );

	grunt.registerTask( "deploy", [ "release:init", "release:fail-if-pre", "dist:release" ] ); // TODO: Add copy to cdn repo and add / commit / push
	grunt.registerTask( "release", [ "clean:dist", "release:init", "release:check-git-status", "release:set-version", "release:tag", "recurse:deploy", "release:set-next-version" ] );

	// Default grunt
	grunt.registerTask( "default", [ "dist" ] );

};
