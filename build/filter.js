// This file is used by the AMD web builder service.
// When the micro modules are used the version is pulled as a text module.
// When building with r.js we need to replace the version token by its value since we strip the
// AMD layer with the pragma.

var fs = require( "fs" ),
	path = require( "path" ),
	pkg = require( "../package.json" ),
	buildDir = __dirname,
	copyrightVersionRegExp = /@VERSION/g,
	apiVersionRegExp = /__version__/g,
	copyrightBaseName = "../LICENSE-INFO",
	copyrightRegFile = copyrightBaseName + ".txt",
	copyrightMinFile = copyrightBaseName + ".min.txt";

module.exports = function( contents, ext, callback ) {
var version = pkg.version.trim();

if ( /^\.min/.test( ext ) ) {
	copyrightFile = copyrightMinFile;
} else {
	copyrightFile = copyrightRegFile;
}
fs.readFile( path.join( buildDir, copyrightFile ), "utf8",
	function( err, copyright ) {
		if ( err ) {
			callback( err );
		} else {
			contents = copyright.replace( copyrightVersionRegExp, version ) + "\n" + contents;
			contents = contents.replace( apiVersionRegExp, "\"" + version + "\"" );

			callback( null, contents );
		}
	}
);
};
