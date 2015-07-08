/*!
 * jQuery Mobile Listview Hide Dividers @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Listview Hide Dividers
//>>group: Widgets
//>>description: Hides dividers when all items in the section they designate become hidden
//>>docs: http://api.jquerymobile.com/listview/#option-hideDividers
//>>demos: http://demos.jquerymobile.com/@VERSION/listview/

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

var rdivider = /(^|\s)ui-listview-item-divider($|\s)/,
	rhidden = /(^|\s)ui-screen-hidden($|\s)/;

return $.widget( "mobile.listview", $.mobile.listview, {
	options: {
		hideDividers: false
	},

	_afterListviewRefresh: function() {
		var items, idx, item,
			hideDivider = true;

		this._superApply( arguments );

		if ( this.options.hideDividers ) {
			items = this._getChildrenByTagName( this.element[ 0 ], "li", "LI" );
			for ( idx = items.length - 1; idx > -1; idx-- ) {
				item = items[ idx ];
				if ( item.className.match( rdivider ) ) {
					if ( hideDivider ) {
						item.className = item.className + " ui-screen-hidden";
					}
					hideDivider = true;
				} else {
					if ( !item.className.match( rhidden ) ) {
						hideDivider = false;
					}
				}
			}
		}
	}
} );

} );
