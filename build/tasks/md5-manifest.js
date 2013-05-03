module.exports = function( grunt ) {
	"use strict";

	var crypto = require( "crypto" ),
		fs = require( "fs" ),
		path = require( "path" );

	grunt.registerMultiTask( "md5-manifest", "Create list of md5 hashes", function() {
		// remove dest file before creating it, to make sure itself is not included
		if ( fs.existsSync( this.data.dest ) ) {
			fs.unlinkSync( this.data.dest );
		}

		var dest = this.files[ 0 ].orig.dest,
			dir = this.files[ 0 ].orig.cwd || "",
			hashes = [];

		this.files.forEach( function( filePair ) {
			var hash = crypto.createHash( "md5" ),
				fileName = filePair.src[ 0 ];
			if ( grunt.file.isFile( fileName ) ) {
				grunt.log.debug( "Hashing '" + fileName + "'" );
				hash.update( grunt.file.read( fileName, "ascii" ) );
				hashes.push( path.normalize( fileName.replace( dir, "." ) ) + " " + hash.digest( "hex" ) );
			}
		});

		grunt.file.write( dest, hashes.join( "\n" ) + "\n" );
		grunt.log.writeln( "Wrote " + dest + " with " + hashes.length + " hashes" );
	});
};