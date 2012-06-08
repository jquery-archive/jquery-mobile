var fs = require( 'fs' ),
	path = require( 'path' ),
	child_process = require( 'child_process' ),
	glob = require( 'glob-whatev' );

module.exports = function( grunt ) {
	grunt.registerTask( 'config:async', 'git hashes for output headers', function() {
		var done = this.async(), global = grunt.config.get( 'global' );

		// Get the long form sha output for inclusion in the non minified js and css
		child_process.exec( global.ver.gitLongSha, function( err, stdout, stderr ){
			global.shas.build_sha = stdout;
			global.ver.min = grunt.template.process( global.ver.min, global.shas );

			// Get the short form sha output for inclusion in the minified js and css
			child_process.exec( global.ver.gitShortSha, function( err, stdout, stderr ) {
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