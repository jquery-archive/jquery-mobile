var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' );

module.exports = function( grunt ) {
	var min = {}, config = grunt.config.get( 'global' ),
		helpers = config.helpers;

	grunt.registerTask( 'js:compile', function() {
		var require = grunt.config.get( 'js' ).require,
			global_config = grunt.config.get( 'global' );

		// pull the includes together using require js
		requirejs.optimize( require );

		// replace the version with the value in version.text
		grunt.file.copy( require.out, require.out, { process: function( fileContents ) {
			return fileContents.replace( /__version__/, '"' + global_config.ver.official + '"' );
		}});
	});

	grunt.registerTask( 'js:cleanup', 'compile and minify the js', function() {
		var require = grunt.config.get( 'js' ).require;

		// remove the requirejs compile output
		fs.unlink( require.out );
	});

	// NOTE custom dasks don't accept dependencies so we alias
	grunt.registerTask( 'js', 'custom_init config:async js:compile concat:js min js:cleanup' );
};
