( function( window ) {

window.navHelper = {
	redirect: function( filename, paramPairs ) {
		var search,
			pairs = [];

		search = location.search.replace( "?", "" );

		if ( search ) {
			pairs = search.split( "&" );
		}

		pairs = pairs.concat( paramPairs ? paramPairs : [] );

		location.href = location.href.toString()
				.replace( /\/[^\/]*\?|\/[^\/]*$/, "/" + filename )
				.replace( search, "" ) + ( pairs.length ? "?" + pairs.join( "&" ) : "" );
	},

	pushStateRedirect: function( filename ) {
		this.redirect( filename, [ "push-state=false" ] );
	}
};

} )( window );
