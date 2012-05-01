//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Generates dividers for listview items
//>>label: Listview Autodividers
define( [ "jquery", "./jquery.mobile.listview" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.listview.prototype.options.autodividers = false;
$.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
	// look for the first anchor in the item
	var text = elt.find( 'a' ).text() || elt.text() || null;

	if ( !text ) {
		return null;
	}

	// create the text for the divider (first uppercased letter)
	text = text.slice( 0, 1 ).toUpperCase();

	return text;
};

$( document ).on( "listviewcreate", "ul,ol", function() {

	var list = $( this ),
			listview = list.data( "listview" );

	if ( !listview.options.autodividers ) {
		return;
	}

	var replaceDividers = function () {
		list.find( 'li:jqmData(role=list-divider)' ).remove();

		var lis = list.find( 'li' );

		var lastDividerText = null;
		var li;
		var dividerText;
		var i = 0;

		for ( i ; i < lis.length ; i++ ) {
			li = lis[i];
			dividerText = listview.options.autodividersSelector( $( li ) );

			if ( dividerText && lastDividerText !== dividerText ) {
				var divider = document.createElement( 'li' );
				divider.appendChild( document.createTextNode( dividerText ) );
				divider.setAttribute( 'data-' + $.mobile.ns + 'role', 'list-divider' );
				li.parentNode.insertBefore( divider, li );
			}

			lastDividerText = dividerText;
		}
	};

	var afterListviewRefresh = function () {
		list.off( 'listviewafterrefresh', afterListviewRefresh );
		replaceDividers();
		listview.refresh();
		list.on( 'listviewafterrefresh', afterListviewRefresh );
	};

	afterListviewRefresh();

});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
