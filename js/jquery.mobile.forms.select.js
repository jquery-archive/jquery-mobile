/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.mobile.widget, {
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

	_create: function() {

		if (this.options.nativeMenu ) {
			var menu = $( this.element ).nativeselect().data( "nativeselect" );
		} else {
			var menu = $( this.element ).customselect().data( "customselect" );
		}

		var self = this,

			o = this.options,

			// IE throws an exception at options.item() function when
			// there is no selected item
			// select first in this case
			selectedIndex = menu.select[ 0 ].selectedIndex == -1 ? 0 : menu.select[ 0 ].selectedIndex,

			// TODO values buttonId and menuId are undefined here
			button = menu.button
				.text( $( menu.select[ 0 ].options.item( selectedIndex ) ).text() )
				.insertBefore( menu.select )
				.buttonMarkup( {
					theme: o.theme,
					icon: o.icon,
					iconpos: o.iconpos,
					inline: o.inline,
					corners: o.corners,
					shadow: o.shadow,
					iconshadow: o.iconshadow
				}),

			// Multi select or not
			isMultiple = self.isMultiple = menu.select[ 0 ].multiple;

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( o.nativeMenu && window.opera && window.opera.version ) {
			menu.select.addClass( "ui-select-nativeonly" );
		}

		// Add counter for multi selects
		if ( menu.isMultiple ) {
			menu.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-btn-up-c ui-btn-corner-all" )
				.hide()
				.appendTo( button );
		}

		// Disable if specified
		if ( o.disabled ) {
			this.disable();
		}

		// Events on native select
		menu.select.change( function() {
			self.refresh();
		});

		// Expose to other methods
		$.extend( self, menu );

		menu.build();
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.selectmenu.prototype.options.initSelector, e.target )
		.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
		.selectmenu();
});

})( jQuery );
