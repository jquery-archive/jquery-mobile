module.exports = function( grunt ) {
"use strict";

var _ = grunt.util._,
	path = require( "path" );

grunt.registerTask( "config:fetchHeadHash", "Fetch git hashes for output headers", function() {
	var done = this.async();

	grunt.util.spawn(
		{
			cmd: "git",
			args: [ "log", "-1", "--format=%H" ]
		},
		function( error, result, code ) {
			var hash = "" + result;
			grunt.config.set( "headHash", hash );
			grunt.config.set( "headShortHash", hash.substring( 0, 7 ) );
			done();
		}
	);
} );

grunt.registerTask( "config:copy", function( target, suffix ) {
	var arrayOfFiles = [];
	var versionSuffix = grunt.template.process( "<%= versionSuffix %>" );
	suffix = suffix || "";
	var versionSuffixRE = new RegExp( grunt.template.process( "<%= versionSuffix %>" ), "g" );
	var suffixRE = new RegExp( "((\.min)?\.(js|css|map))$", "g" );
	var blobRE = new RegExp( "\\*", "g" );
	var cwd = grunt.template.process( "<%= copy." + target + ".files.cwd %>" );
	var src = grunt.template.process( "<%= copy." + target + ".files.src %>" );
	var dest = grunt.template.process( "<%= copy." + target + ".files.dest %>" );
	src.split( "," ).forEach( function( file ) {
		if ( blobRE.test( file ) ) {
			arrayOfFiles.push( {
				expand: true,
				cwd: cwd,
				src: file,
				dest: dest
			} );
		} else {
			if ( suffix ) {
				arrayOfFiles.push( {
					src: path.join( cwd, file ),
					dest: path.join( dest, file.replace( suffixRE, suffix + "$1" ) )
				} );
			} else {
				arrayOfFiles.push( {
					src: path.join( cwd, file ),
					dest: path.join( dest, file.replace( versionSuffixRE, "" ) )
				} );
			}
		}
	} );
	grunt.log.debug( "arrayOfFiles: ", JSON.stringify( arrayOfFiles, null, " " ) );
	grunt.config( "copy." + target + ".files", arrayOfFiles );
} );
};
