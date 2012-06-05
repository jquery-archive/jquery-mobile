var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	util = require( 'util' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' ),
		cssmin = {},
		regularFile = path.join( config.dirs.output, config.names.root ),
		structureFile = path.join( config.dirs.output, config.names.structure ),
		themeFile = path.join( config.dirs.output, config.names.theme ),
		helpers = config.helpers;

	grunt.config.set( 'css', {
		theme: process.env.THEME || 'default',

		require: {
			all: {
				cssIn: 'css/themes/default/jquery.mobile.css',
				optimizeCss: 'standard.keepComments.keepLines',
				baseUrl: '.',
				out: regularFile + '.compiled.css'
			},

			structure: {
				cssIn: 'css/structure/jquery.mobile.structure.css',
				out: structureFile + '.compiled.css'
			}
		}
	});

	// setup css min configuration
	cssmin[ regularFile + '.min.css' ] = [ "<banner:global.ver.min>", regularFile + '.css' ];
	cssmin[ structureFile + '.min.css' ] = [ "<banner:global.ver.min>", structureFile + '.css' ];
	cssmin[ themeFile + '.min.css' ] = [ "<banner:global.ver.min>", themeFile + '.css' ];
	grunt.config.set( 'cssmin', cssmin );

	grunt.registerTask( 'css:compile', 'use require js to sort out deps', function() {
		var require = grunt.config.get( 'css' ).require;

		// pull the includes together using require js
		requirejs.optimize( require.all );

		// pull the includes together using require js
		requirejs.optimize( require.structure );

		// simple theme file compile
		grunt.file.write( themeFile + '.css', 'css/themes/default/jquery.mobile.theme.css' );
	});

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
		grunt.file.recurse( path.join('css', 'themes', theme, 'images'), function( full, root, sub, filename ) {

			fileCount++;
			var is = fs.createReadStream( full );
			var os = fs.createWriteStream( path.join(imagesPath, filename) );
			util.pump(is, os, function() {
				fileCount--;
				if( fileCount == 0 ) { done(); }
			});
		});
	});

	grunt.registerTask( 'css', 'custom_init config:async css:compile concat:regular concat:structure concat:theme cssmin css:cleanup' );
};