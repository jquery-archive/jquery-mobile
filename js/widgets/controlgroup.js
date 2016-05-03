/*!
 * jQuery Mobile Controlgroup @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Controlgroups
//>>group: Forms
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget",
			"./widget.theme",
			"jquery-ui/controlgroup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.controlgroup", $.ui.controlgroup, {
	options: {
		theme: "inherit"
	},

	// The native element of an enhanced and disabled selectmenu widget fails the :visible test.
	// This will cause controlgroup to ignore it in the calculation of the corner classes. Thus, in
	// the case of the selectmenu, we need to transfer the controlgroup information from the native
	// select element to its parent which is still visible.
	_initWidgets: function() {
		this._superApply( arguments );

		this.childWidgets = this.childWidgets.map( function() {
			if ( $.data( this, "mobile-selectmenu" ) ) {

				// Transfer data to parent node
				$.data( this.parentNode, "ui-controlgroup-data",
					$.data( this, "ui-controlgroup-data" ) );
				$.removeData( this, "ui-controlgroup-data" );

				return this.parentNode;
			}
			return this;
		} );
	},

	_create: function() {
		this._super();
		this._on( this.document, {
			"pagecontainershow": function( event, ui ) {
				if ( $.contains( ui.toPage[ 0 ], this.element[ 0 ] ) ) {
					this.refresh();
				}
			}
		} );
	},

	_hasSingleChild: function() {
		var childCount = this.childWidgets.length;
		if ( this.options.excludeInvisible ) {
			childCount = this.childWidgets.filter( ":visible" ).length;
		}
		return ( childCount === 1 );
	},

	// Carefully avoiding the use of the function arguments because they've changed upstream
	_buildSimpleOptions: function( position ) {
		var key;
		var result = this._superApply( arguments );

		// If the controlgroup contains only one child it gets ui-corner-all
		if ( position === "last" && this._hasSingleChild() ) {
			for ( key in result.classes ) {
				result.classes[ key ] = "ui-corner-all";
			}
		}
		return result;
	},

// JSCS doesn't like the _abc_def notation, so we disable it here
// jscs:disable
	_selectmenu_options: function( position ) {
// jscs:enable
		var isVertical = ( this.options.direction === "vertical" );
		var inlineSelect = isVertical ? null : "ui-button-inline";
		return {
			classes: {
				middle: {
					"ui-selectmenu-wrapper": inlineSelect,
					"ui-selectmenu-button": null
				},
				first: {
					"ui-selectmenu-wrapper": inlineSelect,
					"ui-selectmenu-button":
						"ui-corner-" + ( isVertical ? "top" : "left" )
				},
				last: {
					"ui-selectmenu-wrapper": inlineSelect,
					"ui-selectmenu-button":
						"ui-corner-" + ( isVertical ? "bottom" : "right" )
				},
				single: {
					"ui-selectmenu-wrapper": inlineSelect,
					"ui-selectmenu-button": "ui-corner-all"
				}
			}[ ( position === "last" && this._hasSingleChild() ) ?
				"single" : position ]
		};
	},

	// Deprecated as of 1.5.0 and will be removed in 1.6.0
	// This method is no longer necessary since controlgroup no longer has a wrapper
	container: function() {
		return this.element;
	},

	_themeElements: function() {
		return [
			{
				element: this.widget(),
				prefix: "ui-group-theme-"
			}
		];
	}
} );

$.widget( "ui.controlgroup", $.ui.controlgroup, $.mobile.widget.theme );

return $.ui.controlgroup;

} );
