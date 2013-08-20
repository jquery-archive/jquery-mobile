module.exports = function( grunt ) {
	"use strict";

	var _ = grunt.util._,
		path = require( "path" );

	grunt.registerTask( 'config:fetchHeadHash', 'Retrieve git hashes for output headers', function() {
		var done = this.async();

		grunt.util.spawn(
			{
				cmd: "git",
				args: [ "log", "-1", "--format=%H" ]
			},
			function(error, result, code) {
				var hash = "" + result;
				grunt.config.set( "headHash", hash );
				grunt.config.set( "headShortHash", hash.substring( 0, 7 ) );
				done();
			}
		);
	});

	grunt.registerTask( "config:copy:noversion", function() {
		var arrayOfFiles = [];
		var suffixRE = new RegExp( grunt.template.process( "<%= versionSuffix %>" ), "g" );
		var blobRE = new RegExp( "\\*", "g" );
		var src = grunt.template.process( "<%= copy.noversion.files.src %>" );
		var dest = grunt.template.process( "<%= copy.noversion.files.dest %>" );
		src.split( "," ).forEach( function( file ) {
			arrayOfFiles.push({
				expand: blobRE.test( file ),
				src: path.join( "<%= dirs.dist %>", file ),
				dest: path.join( dest, blobRE.test( file ) ? "" : file.replace( suffixRE, "" ) )
			});
		});
		grunt.log.debug( "arrayOfFiles: ", JSON.stringify( arrayOfFiles, null, " " ) );
		grunt.config( "copy.noversion.files", arrayOfFiles );
	});
};