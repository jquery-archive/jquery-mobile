/*
* jQuery Mobile Framework : "button" plugin - links that proxy to native input/buttons
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true
	},
	_create: function() {
		var $el = this.element,
			o = this.options,
			type;

		// Add ARIA role
		this.button = $( "<div></div>" )
			.text( $el.text() || $el.val() )
			.buttonMarkup({
				theme: o.theme,
				icon: o.icon,
				iconpos: o.iconpos,
				inline: o.inline,
				corners: o.corners,
				shadow: o.shadow,
				iconshadow: o.iconshadow
			})
			.insertBefore( $el )
			.append( $el.addClass( "ui-btn-hidden" ) );

		// Add hidden input during submit
		type = $el.attr( "type" );

		if ( type !== "button" && type !== "reset" ) {

			$el.bind( "vclick", function() {

				var $buttonPlaceholder = $( "<input>", {
							type: "hidden",
							name: $el.attr( "name" ),
							value: $el.attr( "value" )
						})
						.insertBefore( $el );

				// Bind to doc to remove after submit handling
				$( document ).submit(function(){
					 $buttonPlaceholder.remove();
				});
			});
		}

		this.refresh();
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.button.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.button.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	},

	refresh: function() {
		if ( this.element.attr( "disabled" ) ) {
			this.disable();
		} else {
			this.enable();
		}
	}
});
})( jQuery );