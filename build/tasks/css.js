var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' ),
		outputFile = path.join( config.dirs.output, config.names.root ),
	  structureFile = path.join( config.dirs.output, config.names.structure ),
	  themeFile = path.join( config.dirs.output, config.names.theme ),
		helpers = config.helpers;

	grunt.config.set( 'css', {
		require: {
			all: {
				cssIn: 'css/themes/default/jquery.mobile.css',
				optimizeCss: 'standard.keepComments.keepLines',
				baseUrl: '.',
				out: outputFile + '.compiled.css'
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
			requirejs.optimize( require.all );
			helpers.write( config.ver_header, outputFile + '.css' );
			helpers.append( require.all.out, outputFile + '.css' );
			helpers.write( config.ver_min, outputFile + ".min.css" );

			// TODO add minification for all css file

			requirejs.optimize( require.structure );
			helpers.write( config.ver_header, structureFile + '.css' );
			helpers.append( require.all.out, structureFile + '.css' );
			helpers.write( config.ver_min, structureFile + ".min.css" );

			// TODO add minification for structure css file

			helpers.write( config.ver_header, themeFile + '.css' );
			helpers.append( 'css/themes/default/jquery.mobile.theme.css', themeFile + '.css' );

			// TODO add minification for theme

			fs.unlink( require.all.out );
			fs.unlink( require.structure.out );
			done();
		});
	});

	grunt.registerTask( 'css', 'init css_without_deps' );
};