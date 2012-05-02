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

		shas: {},

		helpers: {
			write: function( text, output ) {
				fs.writeFileSync(output, text);
			},

			writeFrom: function( input, output ) {
				this.write(fs.readFileSync(input).toString(), output);
			},

			append: function( input, output ) {
				var id = fs.openSync(output, 'a+');
				fs.writeSync( id, fs.readFileSync(input).toString() );
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
					global.ver_min = "/*! jQuery Mobile v" + global.shas.build_sha + " jquerymobile.com | jquery.org/license !*/";
					child_process.exec( 'git log -1 --format=format:"%H"', function( err, stdout, stderr ) {
						global.shas.head_sha = stdout;
						global.ver_header = fs.readFileSync( global.files.license )
							.toString()
							.replace(/v@VERSION/, global.shas.build_sha );

						callback( global );
					});
				});
			}
		}
	};

	grunt.config.set( 'global', global );
};