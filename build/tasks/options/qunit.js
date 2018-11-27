var _ = require( "underscore" );
var path = require( "path" );

module.exports = function( grunt ) {
return {
	options: {
		timeout: 60000,
		"--web-security": "no"
	},

	http: {
		options: {
			urls: ( function() {
				var allSuites, patterns, paths,
					testDirs = [ "unit", "integration", "css", "no-bootstrap" ],
					suites = ( grunt.option( "suites" ) || process.env.SUITES || "" )
						.split( "," ),
					types = ( grunt.option( "types" ) || process.env.TYPES || "" )
						.split( "," ),
					versionedPaths = [],
					jQueries = ( grunt.option( "jqueries" ) || process.env.JQUERIES || "" )
						.split( "," ),
					excludes = _.chain( suites )
						.filter( function( suite ) {
							return ( /^-/.test( suite ) );
						} )
							.map( function( suite ) {
								return suite.substring( 1 );
							} )
								.value();

				// Trim empties
				suites = _.without( suites, "" );
				types = _.without( types, "" );
				jQueries = _.without( jQueries, "" );

				// So that unit suites runs before integration suites
				types = types.sort().reverse();

				allSuites = _.chain( grunt.file.expand(
					{
						filter: "isDirectory",
						cwd: "tests"
					},
					_.map( testDirs, function( dir ) {
						return dir + "/*";
					} )
				) )
					.map( function( dir ) {
						return dir.split( "/" )[ 1 ];
					} )
						.difference( excludes )
						.unique()
						.value();

				// Remove negations from list of suites
				suites = _.filter( suites, function( suite ) {
					return ( !/^-/.test( suite ) );
				} );

				if ( types.length ) {
					testDirs = [];
					types.forEach( function( type ) {
						testDirs.push( type );
					} );
				}

				patterns = [];

				if ( !suites.length ) {
					suites = allSuites;
				}

				_.chain( suites )
					.difference( excludes )
					.forEach( function( suite ) {
						testDirs.forEach( function( dir ) {
							dir = "tests/" + dir;

							if ( suite.indexOf( "/" ) >= 0 ) {

								// If the suite is a path, then append it exactly
								patterns.push( dir + "/" + suite );

							} else {

								// If not, append all patterns we care about
								patterns = patterns.concat( [
									dir + "/" + suite + "/index.html",
									dir + "/" + suite + "/*/index.html",
									dir + "/" + suite + "/**/*-tests.html"
								] );
							}
						} );
					} );
				paths = grunt.file.expand( patterns )
					.filter( function( testPath ) {
						if ( grunt.file.isDir( testPath ) ) {
							testPath = path.join( testPath, "index.html" );
						}
						return grunt.file.exists( testPath );
					} )
						.map( function( path ) {

							// Some of our tests (ie. navigation) don't like having the
							// index.html too much
							return path.replace( /\/index.html$/, "/" );
						} );

				paths = grunt.util._.uniq( paths );

				if ( jQueries.length ) {
					paths.forEach( function( path ) {
						versionedPaths = versionedPaths.concat(
							jQueries.map( function( jQVersion ) {
								return path + "?jquery=" + jQVersion;
							} ) );
					} );
				}

				if ( versionedPaths.length ) {
					paths = versionedPaths;
				}

				paths = _.filter( paths, function( path ) {
					var found = false;
					excludes.forEach( function( exclude ) {
						if ( new RegExp( exclude ).test( path ) ) {
							found = true;
						}
					} );
					return !found;
				} );

				return paths.map( function( path ) {
					return "http://localhost:<%= connect.server.options.port %>/" + path;
				} );
			}() )
		}
	}
};
};
