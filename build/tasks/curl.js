module.exports = function ( grunt ) {
	'use strict';

	var _ = grunt.util._,
		async = grunt.util.async,
		path = require( "path" );

	var detectDestType = function(dest) {
		if (grunt.util._.endsWith(dest, '/')) {
			return 'directory';
		} else {
			return 'file';
		}
	};

	var unixifyPath = function(filepath) {
		if (process.platform === 'win32') {
			return filepath.replace(/\\/g, '/');
		} else {
			return filepath;
		}
	};

	grunt.registerMultiTask( "curl", "Curls URLs built with files", function () {
		var done = this.async(),
			options = _.clone( this.options({
				baseUrl: "http://localhost/",
				querystring: "",
				cwd: "."
			})),
			dry = grunt.option( "no-write" );

		if ( dry ) {
			grunt.log.writeln( "Running in dry mode" );
		}

		async.forEach(
			this.files,
			function( filePair, nextFilePair ) {
				var isExpandedPair = filePair.orig.expand || false;

				async.forEach(
					filePair.src,
					function( src, next ) {
						var dest,
							url = options.baseUrl;
						if ( detectDestType( filePair.dest ) === 'directory') {
							dest = ( isExpandedPair ) ? filePair.dest : unixifyPath( path.join( filePair.dest, path.relative( options.cwd, src ) ));
						} else {
							dest = filePair.dest;
						}

						url += dest + options.querystring;
						grunt.log.writeln( "Curling '" + url + "'" );
						if ( !dry ) {
							grunt.util.spawn(
								{
									cmd: "curl",
									args: [ url ]
								},
								next
							);
						} else {
							next;
						}

					}, nextFilePair
				);

			},
			function( err ) {
				if ( err ) {
					grunt.log.error( err );
					done( false );
				}
				done( true );
			}
		);
	});
};