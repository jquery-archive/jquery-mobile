//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Links options present in the widget to be filtered to the input
//>>label: Filterable-widgetlink
//>>group: Widgets

define( [
	"jquery",
	"./filterable" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// Create a function that will replace the _setOptions function of a widget,
// and will pass the options on to the input of the filterable.
var replaceSetOptions = function( self, orig ) {
		return function( options ) {
			orig.call( this, options );
			self._syncTextInputOptions( options );
		}
	},
	rDividerListItem = /(^|\s)ui-li-divider(\s|$)/,
	origDefaultFilterCallback = $.mobile.filterable.prototype.options.filterCallback;

// Override the default filter callback with one that does not hide list dividers
$.mobile.filterable.prototype.options.filterCallback = function( index, searchValue ) {
	return !this.className.match( rDividerListItem ) &&
		origDefaultFilterCallback.call( this, index, searchValue );
};

$.widget( "mobile.filterable", $.mobile.filterable, {
	_create: function() {
		this._super();

		$.extend( this, {
			_widget: null
		});
	},

	_filterItems: function() {
		var idx, widget, recognizedWidgets;

		this._superApply( arguments );

		if ( this._widget === null ) {

			// Next time the filter gets called, do not try to search for the widget
			this._widget = false;

			recognizedWidgets = [ "controlgroup", "collapsibleset", "listview", "selectmenu" ];

			for ( idx in recognizedWidgets ) {
				widget = this.element.data( "mobile-" + recognizedWidgets[ idx ] );
				if ( widget ) {

					// Tap into _setOptions for a recognized widget so we may synchronize
					// the widget's style with the textinput style, if the textinput is
					// internal
					widget._setOptions = replaceSetOptions( this, widget._setOptions );
					this._syncTextInputOptions( widget.options );
					this._widget = widget;
					break;
				}
			}
		}

		if ( this._widget && $.isFunction( this._widget.refresh ) ) {
			this._widget.refresh();
		}
	},

	_syncTextInputOptions: function( options ) {
		var idx,
			textinputOptions = {};

		// We only sync options if the filterable's textinput is of the internally
		// generated variety, rather than one specified by the user.
		if ( this._isSearchInternal() && $.mobile.textinput ) {

			// Apply only the options understood by textinput
			for ( idx in $.mobile.textinput.prototype.options ) {
				if ( options[ idx ] !== undefined ) {
					textinputOptions[ idx ] = options[ idx ];
				}
			}
			this._search.textinput( "option", textinputOptions );
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
