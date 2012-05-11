var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
  sqwish = require ( 'sqwish' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' ),
		regularFile = path.join( config.dirs.output, config.names.root ),
		structureFile = path.join( config.dirs.output, config.names.structure ),
		themeFile = path.join( config.dirs.output, config.names.theme ),
		helpers = config.helpers;

	grunt.config.set( 'css', {
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

	grunt.registerTask( 'css_without_deps', 'compile and minify the css', function() {
		var done = this.async(), require = grunt.config.get( 'css' ).require;

		helpers.asyncConfig(function( config ) {
			// pull the includes together using require js
			requirejs.optimize( require.all );

			// dump the versioned header into the normal css file
			grunt.file.write( regularFile + '.css', config.ver.header );

			// add the compiled css to the normal css file
			helpers.appendFrom( regularFile + '.css', require.all.out );

			helpers.minify({
				output: regularFile + ".min.css",
				input: regularFile + ".css",
				header: config.ver.min,
				minCallback: function( unminified ) {
					return sqwish.minify( unminified, false );
				}
			});

			// pull the includes together using require js
			requirejs.optimize( require.structure );

			// dump the versioned header into the structure css file
			grunt.file.write( structureFile + '.css', config.ver.header );

			// add the compiled css to the normal css file
			helpers.appendFrom( structureFile + '.css', require.all.out );

			// add the min header into the minified file
			grunt.file.write( structureFile + ".min.css", config.ver.min );

			// minify the structure css
			helpers.minify({
				output: structureFile + ".min.css",
				input: structureFile + ".css",
				header: config.ver.min,
				minCallback: function( unminified ) {
					return sqwish.minify( unminified, false );
				}
			});

			// dump the versioned header into the theme css file
			grunt.file.write( themeFile + '.css',  config.ver.header );

			// dump the theme css into the theme css file
			helpers.appendFrom( themeFile + '.css', 'css/themes/default/jquery.mobile.theme.css' );

			// minify the theme css
			helpers.minify({
				output: themeFile + ".min.css",
				input: themeFile + ".css",
				header: config.ver.min,
				minCallback: function( unminified ) {
					return sqwish.minify( unminified, false );
				}
			});

			// remove the requirejs compile output
			fs.unlink( require.all.out );
			fs.unlink( require.structure.out );

			// TODO cp the theme images
			done();
		});
	});

	grunt.registerTask( 'css', 'init css_without_deps' );
};