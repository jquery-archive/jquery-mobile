var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' );

module.exports = function( grunt ) {
	var min = {}, config = grunt.config.get( 'global' ),
		outputFile = path.join( config.dirs.output, config.names.root ),
		helpers = config.helpers;

	grunt.config.set( 'js', {
		require: {
			baseUrl: 'js',
			name: 'jquery.mobile',
			exclude: [
				'jquery',
				'../external/requirejs/order',
				'../external/requirejs/depend',
				'../external/requirejs/text',
				'../external/requirejs/text!../version.txt'
			],
			out: outputFile + '.compiled.js',
			pragmasOnSave: { jqmBuildExclude: true },
			wrap: { startFile: 'build/wrap.start', endFile: 'build/wrap.end' },
			findNestedDependencies: true,
			skipModuleInsertion: true,
			optimize: 'none'
		}
	});

	helpers.configExtend( 'concat', {
		js: {
			src: [ '<banner:global.ver.header>', outputFile + '.compiled.js' ],
			dest: outputFile + '.js'
		}
	});

	// setup minification
	min[ outputFile + '.min.js' ] = [ "<banner:global.ver.min>", outputFile + '.js' ];
	grunt.config.set( 'min', min );

	grunt.registerTask( 'js:compile', function() {
		var require = grunt.config.get( 'js' ).require,
			global_config = grunt.config.get( 'global' );

		// pull the includes together using require js
		requirejs.optimize( require );

		// replace the version with the value in version.text
		helpers.sed( require.out, function( fileContents ) {
			return fileContents.replace( /__version__/, '"' + global_config.ver.official + '"' );
		});
	});

	grunt.registerTask( 'js:cleanup', 'compile and minify the js', function() {
		var require = grunt.config.get( 'js' ).require;

		// remove the requirejs compile output
		fs.unlink( require.out );
	});

	// NOTE custom dasks don't accept dependencies so we alias
	grunt.registerTask( 'js', 'custom_init config:async js:compile concat:js min js:cleanup' );
};
