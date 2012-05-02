var fs = require( 'fs' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' );

	grunt.registerTask( 'clean', 'ensure the output directory is present', function() {
		config.helpers.rmdirRecursive( config.dirs.output );
		config.helpers.rmdirRecursive( config.dirs.temp );
	});
};