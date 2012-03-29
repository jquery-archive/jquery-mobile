// This file is used by the AMD web builder service.
// When the micro modules are used the version is pulled as a text module.
// When building with r.js we need to replace the version token by its value since we strip the AMD layer with the pragma.

var fs = require( 'fs' ),
	path = require( 'path' ),
	buildDir = __dirname,
	versionRegExp = /__version__/g,
	version = fs.readFileSync( path.join( buildDir, "../version.txt" ), "utf8" ).trim();

module.exports = function ( contents ) {
	return contents.replace( versionRegExp, '"' + version + '"' );
};
