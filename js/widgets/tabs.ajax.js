//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extension to make Tabs widget aware of jQuery Mobile's navigation
//>>label: Tabs
//>>group: Widgets

define( [
	"jquery",
	"../defaults",
	"../navigation/path",
	"jquery-ui/tabs" ], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

( function( $, undefined ) {

$.widget( "ui.tabs", $.ui.tabs, {
	_isLocal: function( anchor ) {
		var path, baseUrl, absUrl;

		if ( $.mobile.ajaxEnabled ) {
			path = $.mobile.path;
			absUrl = path.makeUrlAbsolute( anchor.getAttribute( "href" ) );

			return ( path.isSameDomain( absUrl, path.documentBase.href ) &&
				path.parseUrl( absUrl ).pathname === path.documentBase.pathname );
		}

		return this._superApply( arguments );
	}
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
