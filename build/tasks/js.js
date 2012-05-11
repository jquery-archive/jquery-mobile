var requirejs = require( 'requirejs' ),
	path = require( 'path' ),
	fs = require( 'fs' );

module.exports = function( grunt ) {
	var config = grunt.config.get( 'global' ),
		outputFile = path.join( config.dirs.output, config.names.root ),
		helpers = config.helpers;

	grunt.config.set( 'js', {
		require: {
			baseUrl: 'js',
			name: 'jquery.mobile',
			exclude:[
				'jquery',
				'../external/requirejs/order',
				'../external/requirejs/depend',
				'../external/requirejs/text',
				'../external/requirejs/text!../version.txt'
			],
			out: 'outputFile.compiled.js',
			pragmasOnSave: { jqmBuildExclude: true },
			wrap: { startFile: 'build/wrap.start', endFile: 'build/wrap.end' },
			findNestedDependencies: true,
			skipModuleInsertion: true,
			optimize: 'none'
		}
	});

	grunt.registerTask( 'js_without_deps', 'compile and minify the js', function() {
		var done = this.async(), require = grunt.config.get( 'js' ).require;

		helpers.asyncConfig(function( config ) {
			// pull the includes together using require js
			requirejs.optimize( require );

			// dump the versioned header into the normal js file
			helpers.write( config.ver.header, outputFile + '.js' );

			// add the compiled js to the normal js file, replace the version tag
			// with the contents from version.txt
			helpers.appendFrom( require.out, outputFile + '.js', function( fileContents ) {
				return fileContents.replace( /__version__/, '"' + config.ver.official + '"' );
			});

			// add the min header into the minified file
			var max, min;
			max = grunt.file.read( outputFile + ".js" );
			min = grunt.helper( 'uglify', max, {});

			grunt.file.write( outputFile + ".min.js" , config.ver.min );
			helpers.append( min, outputFile + ".min.js" );

			grunt.log.writeln();
			grunt.helper( 'min_max_info', min, max);
			// TODO add minification of js file

			// remove the requirejs compile output
			fs.unlink( require.out );
			done();
		});
	});

	// NOTE custom dasks don't accept dependencies so we alias
	grunt.registerTask( 'js', 'init js_without_deps' );
};
