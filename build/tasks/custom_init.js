var fs = require( 'fs' ), path = require( 'path' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' );

	// TODO having issues overriding default init task
	grunt.registerTask( 'custom_init', 'ensure the output directory is present', function() {
		if( !path.existsSync(config.dirs.output) ) {
			fs.mkdirSync( config.dirs.output );
		}
	});
};