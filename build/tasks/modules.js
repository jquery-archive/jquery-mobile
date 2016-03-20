#!/usr/bin/env node
module.exports = function( grunt ) {
"use strict";

var css = require( "css" ),
	esprima = require( "esprima" ),
	path = require( "path" ),
	cssFiles = {
		theme: { present: {}, list: [] },
		structure: { present: {}, list: [] }
	};

// Ensure that modules specified via the --modules option are in the same
// order as the one in which they appear in js/jquery.mobile.js. To achieve
// this, we parse js/jquery.mobile.js and reconstruct the array of
// dependencies listed therein.
function makeModulesList( modules ) {
	var parsedFile, desiredModulesHash, listedModules, index, singleListedModule,
		fixedModules = [],
		jsFile = grunt.file.read( path.join( "js", "jquery.mobile.js" ) );

	modules = modules.split( "," );

	// This is highly dependent on the contents of js/jquery.mobile.js. It assumes that all
	// dependencies are listed flatly in the first argument of the first expression in the
	// file.
	if ( jsFile ) {
		parsedFile = esprima.parse( jsFile, { raw: true, comment: true } );

		// Descend into the parsed file to grab the array of deps
		if ( parsedFile && parsedFile.body && parsedFile.body.length > 0 &&
				parsedFile.body[ 0 ] && parsedFile.body[ 0 ].expression &&
				parsedFile.body[ 0 ].expression.arguments &&
				parsedFile.body[ 0 ].expression.arguments.length &&
				parsedFile.body[ 0 ].expression.arguments.length > 0 &&
				parsedFile.body[ 0 ].expression.arguments[ 0 ] &&
				parsedFile.body[ 0 ].expression.arguments[ 0 ].elements &&
				parsedFile.body[ 0 ].expression.arguments[ 0 ].elements.length > 0 ) {

			listedModules = parsedFile.body[ 0 ].expression.arguments[ 0 ].elements;
			desiredModulesHash = {};

			// Convert list of desired modules to a hash
			for ( index = 0; index < modules.length; index++ ) {
				desiredModulesHash[ modules[ index ] ] = true;
			}

			// Then, if a listed module is in the hash of desired modules, add it to the
			// list containing the desired modules in the correct order
			for ( index = 0; index < listedModules.length; index++ ) {
				singleListedModule = listedModules[ index ].value.replace( /^\.\//, "" );
				if ( desiredModulesHash[ singleListedModule ] ) {
					fixedModules.push( singleListedModule );
				}
			}

			// If we've found all the desired modules we can return the list of modules
			// assembled, because that list contains the modules in the correct order.
			if ( fixedModules.length === modules.length ) {
				modules = fixedModules;
			}
		}
	}

	return modules;
}
;

grunt.registerTask( "modules", function() {
	var modulesList = grunt.option( "modules" ),
		requirejsModules = grunt.config( "requirejs.js.options.include" ),
		onBuildWrite = grunt.config( "requirejs.js.options.onBuildWrite" ),
		onModuleBundleComplete = grunt.config( "requirejs.js.options.onModuleBundleComplete" );

	if ( !modulesList ) {
		return;
	}

	if ( !requirejsModules ) {
		throw ( new Error( "Missing configuration key 'requirejs.js.options.include" ) );
	}

	grunt.config( "requirejs.js.options.include", makeModulesList( modulesList ) );

	grunt.config( "requirejs.js.options.onBuildWrite", function( moduleName, path, contents ) {
		var index, match,

			// We parse the file for the special comments in order to assemble a list of
			// structure and theme CSS files to serve as the basis for custom theme and
			// structure files which we then feed to the optimizer
			parsedFile = esprima.parse( contents, { comment: true } ),
			addCSSFile = function( file ) {
				file = file.trim();
				if ( !cssFiles[ match[ 1 ] ].present[ file ] ) {
					cssFiles[ match[ 1 ] ].list.push( file );
					cssFiles[ match[ 1 ] ].present[ file ] = true;
				}
			};

		if ( parsedFile.comments && parsedFile.comments.length > 0 ) {
			for ( index = 0; index < parsedFile.comments.length; index++ ) {
				match = parsedFile.comments[ index ].value
					.match( /^>>css\.(theme|structure): (.*)/ );

				// Parse the special comment and add the files listed on the right hand
				// side of the flag to the appropriate list of CSS files
				if ( match && match.length > 2 ) {
					match[ 2 ].split( "," ).forEach( addCSSFile );
				}
			}
		}

		return onBuildWrite ? onBuildWrite.apply( this, arguments ) : contents;
	} );

	grunt.config( "requirejs.js.options.onModuleBundleComplete", function() {

		// We assume that the source for the structure file is called
		// "jquery.mobile.structure.css", that the source for the theme file is called
		// "jquery.mobile.theme.css", and that the source for the combined theme+structure file
		// is called "jquery.mobile.css"
		var cssFileContents, structure, theme, all,
			allFiles = grunt.config( "cssbuild.all.files" ),
			destinationPath = grunt.config.process( "<%= dirs.tmp %>" ),

			// Traverse the tree produced by the CSS parser and update import paths
			updateImportUrl = function( cssFilePath, cssRoot ) {
				var index, item, match, filename;

				for ( index in cssRoot ) {
					item = cssRoot[ index ];

					if ( item && item.type === "import" ) {

						// NB: The regex below assumes there's no whitespace in the
						// @import reference, i.e. url("path/to/filename");
						match = item.import.match( /(url\()(.*)(\))$/ );
						if ( match ) {

							// Strip the quotes from around the filename
							filename = match[ 2 ]
								.substr( 1, match[ 2 ].length - 2 );

							// Replace theme and structure with our custom
							// reference
							if ( path.basename( filename ) ===
							"jquery.mobile.theme.css" ) {
								item.import =
									"url(\"jquery.mobile.custom.theme.css\")";
							} else if ( path.basename( filename ) ===
							"jquery.mobile.structure.css" ) {
								item.import =
									"url(\"jquery.mobile.custom.structure.css\")";

							// Adjust the relative path for all other imports
							} else {
								item.import =

									// Url(
									match[ 1 ] +

									// Quotation mark
									match[ 2 ].charAt( 0 ) +

									// Path adjusted to be relative to the
									// temporary directory
									path.relative( destinationPath,
										path.normalize( path.join( cssFilePath,
											filename ) ) ) +

									// Quotation mark
									match[ 2 ].charAt( 0 ) +

									// )
									match[ 3 ];
							}
						}
					} else if ( typeof item === "object" ) {
						updateImportUrl( cssFilePath, item );
					}
				}

				return cssRoot;
			};

		// Find the entries for the structure, the theme, and the combined
		// theme+structure file, because we want to update them to point to our
		// custom-built version
		allFiles.forEach( function( singleCSSFile ) {
			if ( path.basename( singleCSSFile.src ) ===
			"jquery.mobile.structure.css" ) {
				structure = singleCSSFile;
			} else if ( path.basename( singleCSSFile.src ) ===
			"jquery.mobile.theme.css" ) {
				theme = singleCSSFile;
			} else if ( path.basename( singleCSSFile.src ) ===
			"jquery.mobile.css" ) {
				all = singleCSSFile;
			}
		} );

		// Create temporary structure file and update the grunt config
		// reference
		cssFileContents = "";
		if ( cssFiles.structure.list.length > 0 ) {
			cssFiles.structure.list.forEach( function( file ) {

				// Recalculate relative path from destination in the temporary
				// directory
				file = path.relative( destinationPath,

					// Css files are originally relative to "js/"
					path.join( "js", file ) );
				cssFileContents += "@import url(\"" + file + "\");\n";
			} );
			structure.src = path.join( destinationPath,
				"jquery.mobile.custom.structure.css" );
			grunt.file.write( structure.src, cssFileContents,
				{ encoding: "utf8" } );
		}

		// Create temporary theme file and update the grunt config reference
		cssFileContents = "";
		if ( cssFiles.theme.list.length > 0 ) {
			cssFiles.theme.list.forEach( function( file ) {

				// Recalculate relative path from destination in the temporary
				// directory
				file = path.relative( destinationPath,

					// Css files are originally relative to "js/"
					path.join( "js", file ) );
				cssFileContents += "@import url(\"" + file + "\");\n";
			} );
			theme.src = path.join( destinationPath,
				"jquery.mobile.custom.theme.css" );
			grunt.file.write( theme.src, cssFileContents,
				{ encoding: "utf8" } );
		}

		// Create temporary theme+structure file by replacing references to the
		// standard theme and structure files with references to the custom
		// theme and structure files created above, and update the grunt config
		// reference
		cssFileContents = css.stringify( updateImportUrl(
			path.dirname( all.src ),
			css.parse( grunt.file.read( all.src, { encoding: "utf8" } ) ) ) );
		all.src = path.join( destinationPath, "jquery.mobile.custom.css" );
		grunt.file.write( all.src, cssFileContents, { encoding: "utf8" } );

		// Update grunt configuration
		grunt.config( "cssbuild.all.files", allFiles );

		if ( onModuleBundleComplete ) {
			return onModuleBundleComplete.apply( this, arguments );
		}
	} );
} );
};
