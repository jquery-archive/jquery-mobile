module.exports = function( grunt ) {
	"use strict";

	grunt.registerTask( "recurse", function() {
		var done = this.async(),
			args = [].slice.call( arguments ),
			gruntArgs = process.argv.slice( 1 ).filter( function( arg ) { return /^--/.test( arg ); });


		var child = grunt.util.spawn({
			cmd: process.argv[1] + ( process.platform === "win32" ? ".cmd" : "" ),
			args: gruntArgs.concat( args ),
		}, function( err, result ) {
			if ( err ) {
				grunt.log.error( result.stderr );
				done( err );
				return;
			}

			grunt.log.writeln( result.stdout.replace("Done, without errors.", "") );

			done();
		});

		child.stdout.setEncoding( "utf8" );
		child.stdout.on( "data", function( data ) {
			grunt.log.write( data );
		});
	});
};