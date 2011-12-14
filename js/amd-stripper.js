/*
 * Strips output of AMD builder from define
 *
 * Usage:
 *
 * node amd-stripper.js in out
 * or
 * cat in | node amd-stripper.js > out
 */

(function (console, args, readFileFunc) {
    var env, fs,
        fileName, content, destFileName,
        exists,
        readFile = typeof readFileFunc !== 'undefined' ? readFileFunc : null;


	if (typeof process !== 'undefined') {
        env = 'node';

        //Get the fs module via Node's require before it
        //gets replaced. Used in require/node.js
        fs = require('fs');
        path = require('path');

        readFile = function (path) {
            return fs.readFileSync(path, 'utf8');
        };

        exists = function (fileName) {
            return path.existsSync(fileName);
        };

        fileName = process.argv[2];

		destFileName = process.argv[3];
    }

	if ( fileName ) {
		if ( exists(fileName) ) {
			content = readFile( fileName );
		} else {
			console.log( "Could not find file: " + fileName );
			if ( env === 'node') {
				process.exit(1);
			}
		}
	} else {
		content = fs.readFileSync('/dev/stdin').toString();
	}

	content = content
		.replace(/^define\((:?'[^']+'\s*,\s*)?(:?\[[^\]]*\]\s*,\s*)?[);]*\s*function.*\{/mg, "(function() {") // Get rid of the define wrap header
		.replace(/^}\);?\s*\/\*/mg, "}());\n\n/*") // Get rid of the define wrap footer
		.replace(/}\);(\s*\/\/ Script:)/g, "}());\n\n$1") // Get rid of the define wrap footer before @Cowboy's plugin
		.replace(/}\);?\s*\(function\(.*\)\s*\{\s*require\([^\(]*?\)\s*;\s*\}\);/g, "}());\n") // Get rid of require( [init] ) function
		.replace(/}\);?(\s*}\([^\)]*\)\);?)$/, "}());\n$1")
		.replace(/\s*\(function\(.*\)\s*\{\s*\}\([^)]*\)\);/g, ""); // Get rid of empty functions

	if ( destFileName ) {
		fs.writeFileSync(destFileName, content, 'utf-8');
	} else {
		console.log( content );
	}
}((typeof console !== 'undefined' ? console : undefined),
  (typeof Packages !== 'undefined' ? Array.prototype.slice.call(arguments, 0) : []),
  (typeof readFile !== 'undefined' ? readFile : undefined)));