module.exports = function( grunt ) {
	var path = require( "path" );

	// Ensure that modules specified via the --modules option are in the same
	// order as the one in which they appear in js/jquery.mobile.js. To achieve
	// this, we parse js/jquery.mobile.js and reconstruct the array of
	// dependencies listed therein.
	var makeModulesList = function( modules ) {
		var start, end, index,
			modulesHash = {},
			fixedModules = [],
			jsFile = grunt.file.read( path.join( "js", "jquery.mobile.js" ) );

		modules = modules.split( "," );

		// This is highly dependent on the contents of js/jquery.mobile.js
		if ( jsFile ) {
			start = jsFile.indexOf( "[" );
			if ( start > -1 ) {
				start++;
				end = jsFile.indexOf( "]" );
				if ( start < jsFile.length &&
					end > -1 && end < jsFile.length && end > start ) {

					// Convert list of desired modules to a hash
					for ( index = 0 ; index < modules.length ; index++ ) {
						modulesHash[ modules[ index ] ] = true;
					}

					// Split list of modules from js/jquery.mobile.js into an array
					jsFile = jsFile
						.slice( start, end )
						.match( /"[^"]*"/gm );

					// Add each desired module to the fixed list of modules in the
					// correct order
					for ( index = 0 ; index < jsFile.length ; index++ ) {

						// First we need to touch up each module from js/jquery.mobile.js
						jsFile[ index ] = jsFile[ index ]
							.replace( /"/g, "" )
							.replace( /^.\//, "" );

						// Then, if it's in the hash of desired modules, add it to the
						// list containing the desired modules in the correct order
						if ( modulesHash[ jsFile[ index ] ] ) {
							fixedModules.push( jsFile[ index ] );
						}
					}

					// If we've found all the desired modules, we re-create the comma-
					// separated list and return it.
					if ( fixedModules.length === modules.length ) {
						modules = fixedModules;
					}
				}
			}
		}

		return modules;
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

				include: ( grunt.option( "modules" ) ?
					makeModulesList( grunt.option( "modules" ) ) :
					[ "jquery.mobile" ] ),

				exclude: [
					"jquery",
					"json",
					"json!../package.json"
				],

				out: path.join( "dist", "<%= name %>" ) + "<%= versionSuffix %>.js",

				pragmasOnSave: {
					jqmBuildExclude: true
				},

				//File paths are relative to the build file, or if running a commmand
				//line build, the current directory.
				wrap: {
					startFile: "build/wrap.start",
					endFile: "build/wrap.end"
				},

				onBuildWrite: function (moduleName, path, contents) {
					return contents.replace( /__version__/g, grunt.config.process(
						"\"<%= boom %>\""
					));
				}
			}
		}
	};
};
