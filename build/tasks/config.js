var fs = require( 'fs' ),
	path = require( 'path' ),
	child_process = require( 'child_process' );

module.exports = function( grunt ) {
	var global = {
		dirs : {
			output: 'compiled',
			temp: 'tmp'
		},

		files: {
			license: 'LICENSE-INFO.txt'
		},

		names: {
		  base: 'jquery.mobile',
			// this will change for the deploy target to include version information
			root: 'jquery.mobile',
			structure: 'jquery.mobile.structure',
			theme: 'jquery.mobile.theme'
		},

		// other version information is added via the asyncConfig helper that
		// depends on git commands (eg ver.min, ver.header)
		ver: {
			official: grunt.file.read( 'version.txt' ).replace(/\n/, ''),
			min: "/*! jQuery Mobile v<%= build_sha %> jquerymobile.com | jquery.org/license !*/"
		},

		shas: {},

		helpers: {
			write: function( text, output ) {
				fs.writeFileSync(output, text);
			},

			writeFrom: function( input, output ) {
				this.write(fs.readFileSync(input).toString(), output);
			},

			append: function( input, output, filter ) {
				var id = fs.openSync(output, 'a+'), inputString;

				inputString = fs.readFileSync(input).toString();
				inputString = filter ? filter(inputString) : inputString;

				fs.writeSync( id, inputString );
				fs.closeSync( id );
			},

			// NOTE cargo culting my way to the top :(
			rmdirRecursive: function(dir) {
				if( !path.existsSync(dir) ) {
					return;
				}

				var list = fs.readdirSync(dir);
				for(var i = 0; i < list.length; i++) {
					var filename = path.join(dir, list[i]);
					var stat = fs.statSync(filename);

					if(filename == "." || filename == "..") {
						// pass these files
					} else if(stat.isDirectory()) {
						// rmdir recursively
						rmdir(filename);
					} else {
						// rm fiilename
						fs.unlinkSync(filename);
					}
				}
				fs.rmdirSync(dir);
			},

			asyncConfig: function( callback ) {
				child_process.exec( 'git log -1 --format=format:"Git Build: SHA1: %H <> Date: %cd"', function( err, stdout, stderr ){
					global.shas.build_sha = stdout;
					global.ver.min = grunt.template.process( global.ver.min, global.shas );

					child_process.exec( 'git log -1 --format=format:"%H"', function( err, stdout, stderr ) {
						global.shas.head_sha = stdout;

						// NOTE not using a template here because the Makefile depends on the v@VERSION
						global.ver.header = grunt.file.read( global.files.license )
							.replace(/v@VERSION/, global.shas.build_sha );
						callback( global );
					});
				});
			}
		}
	};

	grunt.config.set( 'global', global );
};