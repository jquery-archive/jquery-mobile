module.exports = function( grunt ) {
	"use strict";
	grunt.registerTask( 'config:dev', 'Retrieve git hashes for output headers', function() {
		var done = this.async();

		grunt.util.spawn(
			{
				cmd: "git",
				args: [ "log", "-1", "--format=format:Git Build: SHA1: %H <> Date: %cd" ],
				fallback: grunt.config.process( "\"<%= pkg.version %>\"" )
			},
			function(error, result, code) {
				grunt.config.set( "version", result );
				done();
			}
		);
	});
};