var fs = require( 'fs' ), rmrf = require( 'rimraf' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' );

	grunt.registerTask( 'clean', 'ensure the output directory is present', function() {
		rmrf.sync( config.dirs.output );
		rmrf.sync( config.dirs.temp );
	});
};