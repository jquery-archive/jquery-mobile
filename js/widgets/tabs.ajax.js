//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extension to make Tabs widget aware of jQuery Mobile's navigation
//>>label: Tabs
//>>group: Widgets

define( [
	"jquery",
	"../defaults",
	"../navigation/path",
	"../navigation/base",
	"jquery-ui/tabs" ], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

( function( $, undefined ) {

$.widget( "ui.tabs", $.ui.tabs, {
	_isLocal: function( anchor ) {
		var path, baseUrl, absUrl;

		if ( $.mobile.ajaxEnabled ) {
			path = $.mobile.path;
			baseUrl = path.parseUrl( $.mobile.base.element.attr( "href" ) );
			absUrl = path.parseUrl( path.makeUrlAbsolute( anchor.getAttribute( "href" ),
				baseUrl ) );

			return ( path.isSameDomain( absUrl.href, baseUrl.href ) &&
				absUrl.pathname === baseUrl.pathname );
		}

		return this._superApply( arguments );
	}
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
