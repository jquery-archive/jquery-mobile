module.exports = function( grunt ) {
var requirejs = require( "requirejs" ),
	async = grunt.util.async;

requirejs.define( "node/print", [], function() {
	return function print( msg ) {
		if ( msg.substring( 0, 5 ) === "Error" ) {
			grunt.log.errorlns( msg );
			grunt.fail.warn( "RequireJS failed." );
		} else {
			grunt.log.oklns( msg );
		}
	};
} );

function expandFiles( files ) {
	return grunt.util._.pluck( grunt.file.expandMapping( files ), "src" );
}

grunt.registerMultiTask( "cssbuild", "Resolve CSS @imports and concat files", function() {
	var done = this.async(),
		_ = grunt.util._,
		options = _.clone( this.options( {
			banner: ""
		} ) ),
		banner = options.banner;

	delete options.banner;

	async.forEach( this.files,
		function( file, callback ) {
			var src = grunt.template.process( file.orig.src[ 0 ] ),
				dest = file.dest;

			grunt.log.debug( "Building '" + src + "' -> '" + dest + "'" );

			async.series( [
				function( next ) {

					// Pull the includes together using require js
					requirejs.optimize(
						_.extend( {
							cssIn: src,
							out: dest
						}, options
						), function( response ) {
							next();
						} );
				},
				function( next ) {
					var contents = grunt.file.read( dest );
					if ( banner ) {
						contents = banner + contents;
					}
					grunt.file.write( dest, contents );
					grunt.log.writeln( "File '" + dest + "' written." );
					next();
				}
			], callback );
		}, done
	);
} );
};
