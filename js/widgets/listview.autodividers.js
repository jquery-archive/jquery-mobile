/*!
 * jQuery Mobile Listview Autodividers @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Listview Autodividers
//>>group: Widgets
//>>description: Generates dividers for listview items
//>>docs: http://api.jquerymobile.com/listview/#option-autodividers
//>>demos: http://demos.jquerymobile.com/@VERSION/listview/#Autodividers

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./listview" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var dividerClassRegex = /\bui-listview-item-divider\b/;

function defaultAutodividersSelector( elt ) {

	// Look for the text in the given element
	var text = $.trim( elt.text() ) || null;

	if ( !text ) {
		return null;
	}

	// Create the text for the divider (first uppercased letter)
	text = text.slice( 0, 1 ).toUpperCase();

	return text;
}

return $.widget( "mobile.listview", $.mobile.listview, {
	options: {
		autodividers: false,
		autodividersSelector: defaultAutodividersSelector
	},

	_beforeListviewRefresh: function() {
		if ( this.options.autodividers ) {
			this._replaceDividers();
		}
		return this._superApply( arguments );
	},

	_replaceDividers: function() {
		var existingDivider, existingDividerText, lastDividerText,
			items = this._getChildrenByTagName( this.element[ 0 ], "li", "LI" );

		items.each( $.proxy( function( index, item ) {
			var divider, dividerText;

			item = $( item );

			// This tests whether the item is a divider - first we check the class name, and second
			// we check the slower way, via the data attribute
			if ( ( item[ 0 ].className && item[ 0 ].className.match( dividerClassRegex ) ) ||
					item[ 0 ].getAttribute( "data-" + $.mobile.ns + "role" ) === "list-divider" ) {

				// The last item can't be a divider
				if ( index === items.length - 1 ) {
					item.remove();
					return false;
				}

				// If the previous item was a divider, remove it
				if ( existingDivider ) {
					existingDivider.remove();
				}

				// The current item becomes the previous divider
				existingDivider = item;
				existingDividerText = item.text();

				// If we've found a divider for a heading that already has a divider, remove it to
				// coalesce two adjacent groups with identical headings
				if ( existingDividerText === lastDividerText ) {
					existingDivider.remove();
					existingDivider = null;
					existingDividerText = null;
				}
			} else {
				dividerText = this.options.autodividersSelector( item );

				// If this item is preceded by a suitable divider reuse it
				if ( existingDivider ) {
					if ( existingDividerText === dividerText ) {

						// We prevent the generation of a divider below by setting the
						// lastDividerText here
						lastDividerText = existingDividerText;
					} else {

						// The preceding item is not a suitable divider
						existingDivider.remove();
					}

					// We only keep a reference to an existing divider for one iteration, because
					// the item immediately succeeding an existing divider will inform us as to
					// whether the divider we've found is suitable for the current group
					existingDivider = null;
					existingDividerText = null;
				}

				// If we haven't found a suitable divider and a new group has started, generate a
				// new divider
				if ( dividerText && lastDividerText !== dividerText ) {
					divider = document.createElement( "li" );
					divider.appendChild( document.createTextNode( dividerText ) );
					divider.setAttribute( "data-" + $.mobile.ns + "role", "list-divider" );
					item.before( divider );
				}

				lastDividerText = dividerText;
			}
		}, this ) );
	}
} );

} );
