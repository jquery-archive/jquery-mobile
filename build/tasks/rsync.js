/*
 * Adapted from https://github.com/maxdaten/grunt-rsync
 *
 * Copyright (c) 2012 Jan-Philip Loos
 * Licensed under the MIT license.
 */

module.exports = function ( grunt ) {
	'use strict';

	var _ = grunt.util._,
		async = grunt.util.async,
		path = require( "path" );

	grunt.registerMultiTask( "rsync", "Copy files to a (remote) machine with rsync.", function () {
		var done = this.async(),
			options = _.clone( this.options({
				user: process.env.USER,
				host: "localhost",
				cwd: ".",
				remoteBase: "~",
				verbose: false,
				preserveTimes: false,
				preservePermissions: true,
				compression: true,
				createDirs: true,
				recursive: true,
				additionalOptions: []
			}) ),
			dry = grunt.option( "no-write" ),
			args = [],
			url = ( options.user ? options.user + "@" : "" ) + options.host + ":" + options.remoteBase;

		// these flags must be set before the src/dest args
		if ( options.recursive ) {
			args.push( "-r" );
		}

		if ( options.verbose ) {
			args.push( "-v" );
		}

		if ( options.preserveTimes ) {
			args.push( "-t" );
		}

		if ( options.preservePermissions ) {
			args.push( "-p" );
		}

		if ( options.compression ) {
			args.push( "-z" );
		}

		if ( options.createDirs ) {
			args.push( "--dirs" );
		}

		if ( dry ) {
			args.push( "--dry-run" );
		}

		if ( options.additionalOptions.length ) {
			args = args.concat( options.additionalOptions );
		}

		var detectDestType = function(dest) {
			if ( _.endsWith( dest, '/' ) ) {
				return 'directory';
			} else {
				return 'file';
			}
		};

		var unixifyPath = function( filepath ) {
			if (process.platform === 'win32') {
				return filepath.replace(/\\/g, '/');
			} else {
				return filepath;
			}
		};

		if ( dry ) {
			grunt.log.writeln( "Running in dry mode" );
		}

		async.forEach(
			this.files,
			function( filePair, nextFilePair ) {
				var isExpandedPair = filePair.orig.expand || false;
				var src = filePair.src[0],
					dest;

				async.forEach(
					filePair.src,
					function(src, next) {
						dest = url + filePair.dest;
						grunt.log.writeln( "Copying '" + src + "' to '" + dest + "'" );
						grunt.util.spawn(
							{
								cmd: "rsync",
								args: args.concat([
									src,
									dest
								])
							},
							next
						);
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