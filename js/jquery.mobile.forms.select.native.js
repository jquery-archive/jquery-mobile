/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.widget( "mobile.nativeselect", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: "arrow-d",
		iconpos: "right",
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		menuPageTheme: "b",
		overlayTheme: "a",
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		initSelector: "select:not(:jqmData(role='slider'))"
	},

	_shared: $.mobile.selectShared,

	_native: function() {
		var widget = this;

		return $.extend( this._shared(), {
			typgeName: 'native',

			button: $( "<div/>" ),

			build: function() {
				var self = this;

				this.select
					.appendTo( self.button )
					.bind( "vmousedown", function() {
						// Add active class to button
						self.button.addClass( $.mobile.activeBtnClass );
					})
					.bind( "focus vmouseover", function() {
						self.button.trigger( "vmouseover" );
					})
					.bind( "vmousemove", function() {
						// Remove active class on scroll/touchmove
						self.button.removeClass( $.mobile.activeBtnClass );
					})
					.bind( "change blur vmouseout", function() {
						self.button.trigger( "vmouseout" )
							.removeClass( $.mobile.activeBtnClass );
					})
					.bind( "change blur", function() {
						self.button.removeClass( "ui-btn-down-" + widget.options.theme );
					});
			},

			refresh: function() {
				var self = this,
				selected = this.selected();

				self.setButtonText();
				self.setButtonCount();
			}
		});
	},

	_create: function() {
		var self = this,

		o = this.options,

		menu = this._native();

		// Expose to other methods
		$.extend( self, menu );
	}
});
})( jQuery );
