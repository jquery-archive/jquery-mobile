/*!
 * jQuery Mobile Selectmenu Controlgroup Integration @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selectmenu Controlgroup Integration
//>>group: Forms
//>>description: Selectmenu integration for controlgroups

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./controlgroup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var uiButtonInlineRegex = /ui-button-inline/g;
var uiShadowRegex = /ui-shadow/g;

return $.widget( "ui.controlgroup", $.ui.controlgroup, {

	_selectmenuOptions: function( position ) {
		var isVertical = ( this.options.direction === "vertical" );
		var inlineClass = isVertical ? "" : "ui-button-inline";

		return {
			classes: {
				middle: {
					"ui-selectmenu": inlineClass,
					"ui-selectmenu-button": ""
				},
				first: {
					"ui-selectmenu": inlineClass,
					"ui-selectmenu-button":
						"ui-corner-" + ( isVertical ? "top" : "left" )
				},
				last: {
					"ui-selectmenu": inlineClass,
					"ui-selectmenu-button":
						"ui-corner-" + ( isVertical ? "bottom" : "right" )
				},
				only: {
					"ui-selectmenu": inlineClass,
					"ui-selectmenu-button": "ui-corner-all"
				}
			}[ position ]
		};
	},

	// The native element of an enhanced and disabled selectmenu widget fails the :visible test.
	// This will cause controlgroup to ignore it in the calculation of the corner classes. Thus, in
	// the case of the selectmenu, we need to transfer the controlgroup information from the native
	// select element to its parent which is still visible.
	//
	// The selectmenu widget's wrapper needs to have the class ui-button-inline, but only when the
	// selectmenu is oriented horizontally. Thus, we remove it here, and allow the refresh() to
	// determine whether it needs to be added.
	//
	// The ui-shadow class needs to be removed here.
	_initWidgets: function() {
		this._superApply( arguments );

		this.childWidgets = this.childWidgets.map( function() {
			var selectmenuWidget = $.data( this, "mobile-selectmenu" );
			if ( selectmenuWidget ) {

				// Transfer data to parent node
				$.data( this.parentNode, "ui-controlgroup-data",
					$.data( this, "ui-controlgroup-data" ) );
				$.removeData( this, "ui-controlgroup-data" );

				// Remove the class ui-button-inline. It may be re-added if this controlgroup is
				// horizontal.
				selectmenuWidget.option( "classes.ui-selectmenu",
					selectmenuWidget.option( "classes.ui-selectmenu" )
						.replace( uiButtonInlineRegex, "" )
						.trim() );
				selectmenuWidget.option( "classes.ui-selectmenu-button",
					selectmenuWidget.option( "classes.ui-selectmenu-button" )
						.replace( uiShadowRegex, "" )
						.trim() );

				return this.parentNode;
			}
			return this;
		} );
	}

} );

} );
