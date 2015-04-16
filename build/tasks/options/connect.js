module.exports = function( grunt ) {
return {
	server: {
		options: {
			port: httpPort = Math.floor( 9000 + Math.random() * 1000 ),
			base: ".",
			middleware: function( connect, options ) {
				return [

					// For requests to "[...]/js/" return the built jquery.mobile.js
					// as opposed to the php combined version
					function( req, res, next ) {
						var bundle = grunt.config.process(
							"<%= requirejs.js.options.out %>"
						);
						if ( req.url === "/js/" ) {
							grunt.log.debug( req.url + " requested, serving: " + bundle );
							res.end( grunt.file.read( bundle ) );
						} else {
							next();
						}
					},

					// Serve static files.
					connect[ "static" ]( options.base ),

					// Make empty directories browsable.
					connect.directory( options.base )
				];
			}
		}
	}
};
};
