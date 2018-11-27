/*!
 * jQuery Mobile Listview @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Listview
//>>group: Widgets
//>>description: Applies listview styling of various types (standard, numbered, split button, etc.)
//>>docs: http://api.jquerymobile.com/listview/
//>>demos: http://demos.jquerymobile.com/@VERSION/listview/
//>>css.structure: ../css/structure/jquery.mobile.listview.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"./addFirstLastClasses" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

function addItemToDictionary( itemClassDict, element, key, extra ) {

	// Construct the dictionary key from the key class and the extra class
	var dictionaryKey = [ key ].concat( extra ? [ extra ] : [] ).join( "|" );

	if ( !itemClassDict[ dictionaryKey ] ) {
		itemClassDict[ dictionaryKey ] = [];
	}

	itemClassDict[ dictionaryKey ].push( element );
}

var getAttribute = $.mobile.getAttribute,
	countBubbleClassRegex = /\bui-listview-item-count-bubble\b/;

function filterBubbleSpan() {
	var child, parentNode,
		anchorHash = { "a": true, "A": true };

	for ( child = this.firstChild ; !!child ; child = child.nextSibling ) {

		// Accept list item when we've found an element with class
		// ui-listview-item-count-bubble
		if ( child.className && child.className.match( countBubbleClassRegex ) ) {
			return true;
		}

		// Descend into anchor, remembering where we've been
		if ( anchorHash[ child.nodeName ] ) {
			parentNode = child;
			child = child.firstChild;
		}

		// When done with anchor, resume checking children of list item
		if ( !child && parentNode ) {
			child = parentNode;
			parentNode = null;
		}
	}
}

return $.widget( "mobile.listview", $.extend( {
	version: "@VERSION",

	options: {
		classes: {
			"ui-listview-inset": "ui-corner-all ui-shadow"
		},
		theme: "inherit",
		dividerTheme: "inherit",
		icon: "caret-r",
		splitIcon: "caret-r",
		splitTheme: "inherit",
		inset: false,
		enhanced: false
	},

	_create: function() {
		this._addClass( "ui-listview" );
		if ( this.options.inset ) {
			this._addClass( "ui-listview-inset" );
		}
		this._refresh( true );
	},

	// We only handle the theme option through the theme extension. Theme options concerning list
	// items such as splitTheme and dividerTheme have to be handled in refresh().
	_themeElements: function() {
		return [ {
			element: this.element,
			prefix: "ui-group-theme-"
		} ];
	},

	_setOption: function( key, value ) {
		if ( key === "inset" ) {
			this._toggleClass( this.element, "ui-listview-inset", null, !!value );
		}

		return this._superApply( arguments );
	},

	_getChildrenByTagName: function( ele, lcName, ucName ) {
		var results = [],
			dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		ele = ele.firstChild;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				results.push( ele );
			}
			ele = ele.nextSibling;
		}
		return $( results );
	},

	_beforeListviewRefresh: $.noop,
	_afterListviewRefresh: $.noop,

	updateItems: function( items ) {
		this._refresh( false, items );
	},

	refresh: function() {
		this._refresh();
	},

	_processListItem: function( /* item */ ) {
		return true;
	},

	_processListItemAnchor: function( /* a */ ) {
		return true;
	},

	_refresh: function( create, items ) {
		var buttonClass, pos, numli, item, itemClass, itemExtraClass, itemTheme, itemIcon, icon, a,
			isDivider, value, last, splittheme, li, dictionaryKey, span, allItems, newSpan,
			currentOptions = this.options,
			list = this.element,
			ol = !!$.nodeName( list[ 0 ], "ol" ),
			start = list.attr( "start" ),
			itemClassDict = {};

		// Check if a start attribute has been set while taking a value of 0 into account
		if ( ol && ( start || start === 0 ) ) {
			list.css( "counter-reset", "listnumbering " + ( parseInt( start, 10 ) - 1 ) );
		}

		this._beforeListviewRefresh();

		// We need all items even if a set was passed in - we just won't iterate over them in the
		// main refresh loop.
		allItems = this._getChildrenByTagName( list[ 0 ], "li", "LI" );
		li = items || allItems;

		for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "ui-listview-item";
			itemExtraClass = undefined;

			if ( create || this._processListItem( item ) ) {
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				isDivider = ( getAttribute( item[ 0 ], "role" ) === "list-divider" );
				value = item.attr( "value" );
				itemTheme = getAttribute( item[ 0 ], "theme" );

				if ( a.length && ( ( this._processListItemAnchor( a ) && !isDivider ) ||
						create ) ) {
					itemIcon = getAttribute( item[ 0 ], "icon" );
					icon = ( itemIcon === false ) ? false : ( itemIcon || currentOptions.icon );

					buttonClass = "ui-button";

					if ( itemTheme ) {
						buttonClass += " ui-button-" + itemTheme;
					}

					if ( a.length > 1 ) {
						itemClass += " ui-listview-item-has-alternate";

						last = a.last();
						splittheme = getAttribute( last[ 0 ], "theme" ) ||
							currentOptions.splitTheme || itemTheme;

						newSpan = false;
						span = last.children( ".ui-listview-item-split-icon" );
						if ( !span.length ) {
							span = $( "<span>" );
							newSpan = true;
						}

						addItemToDictionary( itemClassDict, span[ 0 ],
							"ui-listview-item-split-icon", "ui-icon ui-icon-" +
								( getAttribute( last[ 0 ], "icon" ) || itemIcon ||
									currentOptions.splitIcon ) );
						addItemToDictionary( itemClassDict, last[ 0 ],
							"ui-listview-item-split-button",
							"ui-button ui-button-icon-only" +
								( splittheme ? " ui-button-" + splittheme : "" ) );
						last.attr( "title", $.trim( last.getEncodedText() ) );

						if ( newSpan ) {
							last.empty().prepend( span );
						}

						// Reduce to the first anchor, because only the first gets the buttonClass
						a = a.first();
					} else if ( icon ) {

						newSpan = false;
						span = a.children( ".ui-listview-item-icon" );
						if ( !span.length ) {
							span = $( "<span>" );
							newSpan = true;
						}

						addItemToDictionary( itemClassDict, span[ 0 ], "ui-listview-item-icon",
							"ui-icon ui-icon-" + icon + " ui-widget-icon-floatend" );

						if ( newSpan ) {
							a.prepend( span );
						}
					}

					// Apply buttonClass to the (first) anchor
					addItemToDictionary( itemClassDict, a[ 0 ], "ui-listview-item-button",
						buttonClass );
				} else if ( isDivider ) {
					itemClass += " ui-listview-item-divider";
					itemExtraClass = "ui-bar-" + ( itemTheme || currentOptions.dividerTheme ||
						currentOptions.theme || "inherit" );

					item.attr( "role", "heading" );
				} else if ( a.length <= 0 ) {
					itemClass += " ui-listview-item-static";
					itemExtraClass = "ui-body-" + ( itemTheme ? itemTheme : "inherit" );
				}
				if ( ol && value ) {
					item.css( "counter-reset", "listnumbering " + ( parseInt( value, 10 ) - 1 ) );
				}
			}

			// Instead of setting item class directly on the list item
			// at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.
			addItemToDictionary( itemClassDict, item[ 0 ], itemClass, itemExtraClass );
		}

		// Set the appropriate listview item classes on each list item.
		// The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( dictionaryKey in itemClassDict ) {

			// Split the dictionary key back into key classes and extra classes and construct the
			// _addClass() parameter list
			this._addClass.apply( this,
				[ $( itemClassDict[ dictionaryKey ] ) ]
					.concat( dictionaryKey.split( "|" ) ) );
		}

		this._addClass(
			li.filter( filterBubbleSpan ),
			"ui-listview-item-has-count" );

		this._afterListviewRefresh();

		// NOTE: Using the extension addFirstLastClasses is deprecated as of 1.5.0 and this and the
		// extension itself will be removed in 1.6.0.
		this._addFirstLastClasses( allItems, this._getVisibles( allItems, create ), create );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

} );
