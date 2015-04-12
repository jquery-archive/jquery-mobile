module.exports = function( grunt ) {
	var path = require( "path" ),
		esprima = require( "esprima" ),
		grabFactory = function( contents ) {
			var range,
				parsedFile = esprima.parse( contents, { range: true } );

			// Descend into the parsed file to find the factory function. If we do not find it we
			// return the contents as-is.
			if ( parsedFile && parsedFile.body && parsedFile.body[ 0 ] &&
					parsedFile.body[ 0 ].expression && parsedFile.body[ 0 ].expression.arguments &&
					parsedFile.body[ 0 ].expression.arguments[ 0 ] &&
					parsedFile.body[ 0 ].expression.arguments[ 0 ].range &&
					parsedFile.body[ 0 ].expression.arguments[ 0 ].range.length >= 2 ) {

				range = parsedFile.body[ 0 ].expression.arguments[ 0 ].range;

				// Turn the factory into an IIFE
				contents = "( " +
					contents.substr( range[ 0 ], range[ 1 ] - range[ 0 ] ) +
					" )( jQuery )";
			}
			return contents;
		};

	return {
		js: {
			options: {
				baseUrl: "js",

				optimize: "none",

				//Finds require() dependencies inside a require() or define call.
				findNestedDependencies: true,

				//If skipModuleInsertion is false, then files that do not use define()
				//to define modules will get a define() placeholder inserted for them.
				//Also, require.pause/resume calls will be inserted.
				//Set it to true to avoid this. This is useful if you are building code that
				//does not use require() in the built project or in the JS files, but you
				//still want to use the optimization tool from RequireJS to concatenate
				//modules together.
				skipModuleInsertion: true,

				mainConfigFile: "js/requirejs.config.js",

				include: [ "jquery.mobile" ],

				exclude: [ "jquery" ],

				excludeShallow: [ "jquery.mobile" ],

				out: path.join( "dist", "<%= name %>" ) + "<%= versionSuffix %>.js",

				//File paths are relative to the build file, or if running a commmand
				//line build, the current directory.
				wrap: {
					startFile: "build/wrap.start",
					endFile: "build/wrap.end"
				},

				onBuildWrite: function( moduleName, path, contents ) {
					return grabFactory( contents.replace( /@VERSION/g, grunt.config.process(
						"<%= version %>"
					) ) );
				}
			}
		}
	};
};
