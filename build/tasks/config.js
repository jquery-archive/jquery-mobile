module.exports = function( grunt ) {
	"use strict";
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
};