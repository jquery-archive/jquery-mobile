//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Generates dividers for listview items
//>>label: Listview Autodividers
//>>group: Widgets
define( [ "jquery", "./listview" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

function defaultAutodividersSelector( elt ) {
	// look for the text in the given element
	var text = $.trim( elt.text() ) || null;

	if ( !text ) {
		return null;
	}

	// create the text for the divider (first uppercased letter)
	text = text.slice( 0, 1 ).toUpperCase();

	return text;
}

$.widget( "mobile.listview", $.mobile.listview, {
	options: {
		autodividers: false,
		autodividersSelector: defaultAutodividersSelector
	},

	_afterListviewRefresh: function() {
		var el = this.element;
		this._off( el, "listviewafterrefresh" );
		this._replaceDividers();
		this.refresh();
		this._on( el, { listviewafterrefresh: "_afterListviewRefresh" } );
	},

	_replaceDividers: function() {
		var i, lis, li, dividerText,
			lastDividerText = null,
			list = this.element,
			divider;

		list.find( "li:jqmData(role='list-divider')" ).remove();

		lis = list.find( "li" );

		for ( i = 0; i < lis.length ; i++ ) {
			li = lis[ i ];
			dividerText = this.options.autodividersSelector( $( li ) );

			if ( dividerText && lastDividerText !== dividerText ) {
				divider = document.createElement( "li" );
				divider.appendChild( document.createTextNode( dividerText ) );
				divider.setAttribute( "data-" + $.mobile.ns + "role", "list-divider" );
				li.parentNode.insertBefore( divider, li );
			}

			lastDividerText = dividerText;
		}
	},

	_create: function() {
		this._super();

		if ( !this.options.autodividers ) {
			return;
		}

		this._afterListviewRefresh();
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
