var fs = require( 'fs' ),
	path = require( 'path' ),
	child_process = require( 'child_process' ),
	glob = require( 'glob-whatev' );

module.exports = function( grunt ) {
	var global = {
		dirs : {
			output: 'compiled',
			temp: 'tmp'
		},

		files: {
			license: 'LICENSE-INFO.txt'
		},

		names: {
		  base: 'jquery.mobile',
			// this will change for the deploy target to include version information
			root: 'jquery.mobile',
			structure: 'jquery.mobile.structure',
			theme: 'jquery.mobile.theme'
		},

		// other version information is added via the asyncConfig helper that
		// depends on git commands (eg ver.min, ver.header)
		ver: {
			official: grunt.file.read( 'version.txt' ).replace(/\n/, ''),
			min: "/*! jQuery Mobile v<%= build_sha %> jquerymobile.com | jquery.org/license !*/"
		},

		shas: {},

		helpers: {
			// in place
			sed: function( file, filter ) {
				var id, inputString = fs.readFileSync(file).toString();

				inputString = filter ? filter(inputString) : inputString;

				grunt.file.write( file, inputString );
			},

			configExtend: function( prop, extension ) {
				var config = grunt.config.get( prop ) || {};

				for( p in extension ){
					config[p] = extension[p];
				}

				grunt.config.set( prop, config );
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
			},

			asyncConfig: function( callback ) {
				child_process.exec( 'git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd"', function( err, stdout, stderr ){
					global.shas.build_sha = stdout;
					global.ver.min = grunt.template.process( global.ver.min, global.shas );

					child_process.exec( 'git log -1 --format=format:"%H"', function( err, stdout, stderr ) {
						global.shas.head_sha = stdout;

						// NOTE not using a template here because the Makefile depends on the v@VERSION
						global.ver.header = grunt.file.read( global.files.license )
							.replace(/v@VERSION/, global.shas.build_sha );
						callback( global );
					});
				});
			}
		}
	};

	grunt.config.set( 'global', global );

	grunt.registerTask( 'config:async', 'git hashes for output headers', function() {
		var done = this.async();

		grunt.config.get( 'global' ).helpers.asyncConfig(function(config) {
			grunt.config.set( 'global', config );
			done();
		});
	});

	grunt.registerTask( 'test:config', 'glob all the test files', function() {
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