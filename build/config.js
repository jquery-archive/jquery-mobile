var fs = require( 'fs' ),
	path = require( 'path' ),
	child_process = require( 'child_process' ),
	glob = require( 'glob-whatev' );

module.exports = function( grunt ) {
	var dirs, names, min = {}, cssmin = {}, rootFile, structureFile, themeFile;

	dirs = {
		output: 'compiled',
		temp: 'tmp'
	};

	names= {
		base: 'jquery.mobile',
		// this will change for the deploy target to include version information
		root: 'jquery.mobile',
		structure: 'jquery.mobile.structure',
		theme: 'jquery.mobile.theme'
	};

	function outputPath( name ){
		return path.join( dirs.output, name );
	}

	rootFile = outputPath( names.root );
	structureFile = outputPath( names.structure );
	themeFile = outputPath( names.theme );

	// Project configuration.
	grunt.config.init({
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,

				// (function(){})() seems acceptable
				immed: false,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true,
				"$": true,

				// qunit globals
				// TODO would be nice to confine these to test files
				module: true,
				ok: true,
				test: true,
				asyncTest: true,
				same: true,
				start: true,
				stop: true,
				expect: true,

				// require js global
				define: true
			}
		},

		lint: {
			files: ['grunt.js', 'js/*.js', 'tests/**/*.js']
		},

		// NOTE these configuration settings are used _after_ compilation has taken place
		//      using requirejs. Thus the .compiled extensions. The exception being the theme concat
		concat: {
			js: {
				src: [ '<banner:global.ver.header>', rootFile + '.compiled.js' ],
				dest: rootFile + '.js'
			},

			structure: {
				src: [ '<banner:global.ver.header>', outputPath( names.structure ) + '.compiled.css' ],
				dest: outputPath( names.structure ) + '.css'
			},

			regular: {
				src: [ '<banner:global.ver.header>', rootFile + '.compiled.css' ],
				dest: rootFile + '.css'
			},

			theme: {
				src: [
					'<banner:global.ver.header>',
					'css/themes/default/jquery.mobile.theme.css'
				],
				dest: outputPath( names.theme ) + '.css'
			}
		},

		// NOTE the keys are filenames which, being stored as variables requires that we use
		//      key based assignment. See below.
		min: undefined,
		cssmin: undefined,

		// JS config, mostly the requirejs configuration
		js: {
			require: {
				baseUrl: 'js',
				name: 'jquery.mobile',
				exclude: [
					'jquery',
					'../external/requirejs/order',
					'../external/requirejs/depend',
					'../external/requirejs/text',
					'../external/requirejs/text!../version.txt'
				],
				out: rootFile + '.compiled.js',
				pragmasOnSave: { jqmBuildExclude: true },
				wrap: { startFile: 'build/wrap.start', endFile: 'build/wrap.end' },
				findNestedDependencies: true,
				skipModuleInsertion: true,
				optimize: 'none'
			}
		},

		// CSS config, mostly the requirejs configuration
		css: {
			theme: process.env.THEME || 'default',

			themeFile: themeFile,

			require: {
				all: {
					cssIn: 'css/themes/default/jquery.mobile.css',
					optimizeCss: 'standard.keepComments.keepLines',
					baseUrl: '.',
					out: rootFile + '.compiled.css'
				},

				structure: {
					cssIn: 'css/structure/jquery.mobile.structure.css',
					out: structureFile + '.compiled.css'
				}
			}
		},

		global: {
			dirs: dirs,

			names: names,

			files: {
				license: 'LICENSE-INFO.txt'
			},

			// other version information is added via the asyncConfig helper that
			// depends on git commands (eg ver.min, ver.header)
			ver: {
				official: grunt.file.read( 'version.txt' ).replace(/\n/, ''),
				min: "/*! jQuery Mobile v<%= build_sha %> jquerymobile.com | jquery.org/license !*/"
			},

			shas: {},

			helpers: {
				// in place file alteration
				sed: function( file, filter ) {
					var id, inputString = fs.readFileSync(file).toString();

					inputString = filter ? filter(inputString) : inputString;

					grunt.file.write( file, inputString );
				},

				// NOTE cargo culting my way to the top :(
				rmdirRecursive: function(dir) {
					if( !path.existsSync(dir) ) {
						return;
					}

					var list = fs.readdirSync(dir);
					for(var i = 0; i < list.length; i++) {
						var filename = path.join(dir, list[i]);
						var stat = fs.statSync(filename);

						if(filename == "." || filename == "..") {
							// pass these files
						} else if(stat.isDirectory()) {
							// rmdir recursively
							this.rmdirRecursive(filename);
						} else {
							// rm fiilename
							fs.unlinkSync(filename);
						}
					}
					fs.rmdirSync(dir);
				}
			}
		}
	});

	// MIN configuration
	min[ rootFile + '.min.js' ] = [ "<banner:global.ver.min>", rootFile + '.js' ];
	grunt.config.set( 'min', min );

	// CSSMIN configuration
	cssmin[ rootFile + '.min.css' ] = [ "<banner:global.ver.min>", rootFile + '.css' ];
	cssmin[ structureFile + '.min.css' ] = [ "<banner:global.ver.min>", structureFile + '.css' ];
	cssmin[ themeFile + '.min.css' ] = [ "<banner:global.ver.min>", themeFile + '.css' ];
	grunt.config.set( 'cssmin', cssmin );

	grunt.registerTask( 'config:async', 'git hashes for output headers', function() {
		var done = this.async(), global = grunt.config.get( 'global' );

		child_process.exec( 'git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd"', function( err, stdout, stderr ){
			global.shas.build_sha = stdout;
			global.ver.min = grunt.template.process( global.ver.min, global.shas );

			child_process.exec( 'git log -1 --format=format:"%H"', function( err, stdout, stderr ) {
				global.shas.head_sha = stdout;

				// NOTE not using a template here because the Makefile depends on the v@VERSION
				global.ver.header = grunt.file.read( global.files.license )
					.replace(/v@VERSION/, global.shas.build_sha );

				grunt.config.set( 'global', global );
				done();
			});
		});
	});

	// TODO could use some cleanup. Eg, can we use grunt's parameter passing functionality
	//      in place of environment variables
	grunt.registerTask( 'config:test', 'glob all the test files', function() {
		var done = this.async(), test_paths, server_paths = [], env = process.env;


		// TODO move the glob to a legit config or pull the one from the qunit config
		test_paths = glob.glob( 'tests/unit/*/' );
		test_paths = test_paths.concat( glob.glob('tests/unit/**/*-tests.html') );

		// select the proper domain + paths
		test_paths.forEach( function( file_path ) {
			var full_path = env.ROOT_DOMAIN + file_path;

			// if no test path is defined or if the path matches that specified in the env
			// add it to the config
			if( !process.env.TEST_PATH || file_path.indexOf(process.env.TEST_PATH) >= 0 ) {
				server_paths.push( full_path );
			}
		});

		// append the jquery version query param where defined
		var paths_with_jquery = [];
		if( env.JQUERY ){
			server_paths.forEach(function( full_path ) {
				env.JQUERY.split( "," ).forEach( function( version ) {
					paths_with_jquery.push(full_path + "?jquery=" + version);
				});
			});

			server_paths = paths_with_jquery;
		}

		grunt.config.set( 'qunit', { all: server_paths });
		done();
	});
};