module.exports = {
	options: {
		dest: "build/test-results",
		namer: function( url ) {
			var match = url.match( /tests\/([^\/]*)\/(.*)$/ );
			return match[ 2 ].replace( /\//g, "." ).replace( /\.html/, "" ).replace( /\?/, "-" );
		}
	}
};
