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
			appendFrom: function( output, input, filter ) {
				var inputString = fs.readFileSync(input).toString();

				this.append( output, inputString, filter );
			},

			append: function( output, input, filter ) {
				var id = fs.openSync(output, 'a+');

				input = filter ? filter(input) : input;

				fs.writeSync( id, input );
				fs.closeSync( id );
			},

			minify: function( opts ) {
				var max = grunt.file.read( opts.input ),
					min = opts.minCallback(max);

				// add the min header into the minified file, and then the min css
				grunt.file.write( opts.output, opts.header );
				this.append( opts.output, min );

				grunt.helper( "min_max_info", min, max );
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
						this.rmdirRecursive(filename);
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