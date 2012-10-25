var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	util = require( 'util' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' ),
		helpers = config.helpers;

	grunt.registerTask( 'css:compile', 'use require js to sort out deps', function() {
		var theme = grunt.config.get( 'css' ).theme,
			themeFile = grunt.config.get( 'css' ).themeFile,
			require = grunt.config.get( 'css' ).require;

		// pull the includes together using require js
		requirejs.optimize( require.all );

		// pull the includes together using require js
		requirejs.optimize( require.structure );

		// simple theme file compile
		grunt.file.write( themeFile + '.css', 'css/themes/' + theme + '/jquery.mobile.theme.css' );
	});

	// TODO image copy would be better in compile though not perfect
	grunt.registerTask( 'css:cleanup', 'compile and minify the css', function() {
		var done = this.async(),
			theme = grunt.config.get( 'css' ).theme,
			require = grunt.config.get( 'css' ).require,
			global_config = grunt.config.get( 'global' );

		// remove the requirejs compile output
		fs.unlink( require.all.out );
		fs.unlink( require.structure.out );

		// copy images directory
		var imagesPath = path.join( global_config.dirs.output, 'images' ), fileCount = 0;

		grunt.file.mkdir( imagesPath );
		grunt.file.recurse( 'css/themes/' + theme + '/images', function( full, root, sub, filename ) {

			fileCount++;
			var is = fs.createReadStream( full );
			var os = fs.createWriteStream( path.join(imagesPath, filename) );
			util.pump(is, os, function() {
				fileCount--;
				if( fileCount == 0 ) { done(); }
			});
		});
	});

	// NOTE the progression of events is not obvious from the above
	//      compile -> concat x 3 -> min all -> cleanup the compiled stuff
	grunt.registerTask( 'css', 'custom_init config:async css:compile concat:regular concat:structure concat:theme cssmin css:cleanup' );
};