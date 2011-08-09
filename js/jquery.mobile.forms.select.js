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

	_button: function(){
		return $( "<div/>" );
	},

	_theme: function(){
		var themedParent, theme;
		// if no theme is defined, try to find closest theme container
		// TODO move to core as something like findCurrentTheme
		themedParent = this.select.closest( "[class*='ui-bar-'], [class*='ui-body-']" );
		theme = themedParent.length ?
			/ui-(bar|body)-([a-z])/.exec( themedParent.attr( "class" ) )[2] :
			"c";

		return theme;
	},

	selected: function() {
		return this.selectOptions.filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		this.selected().map( function() {
			return self.selectOptions.index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this, selected = this.selected();

		this.button.find( ".ui-btn-text" ).text( function() {
			if ( !self.isMultiple ) {
				return self.selected().text();
			}

			return self.selected().length ? self.selected().map( function() {
				return $( this ).text();
			}).get().join( ", " ) : self.placeholder;
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_create: function() {
		// Allows for extension of the native select for custom selects and other plugins
		// see select.custom for example extension
		// TODO explore plugin registration
		this.select = this.element.wrap( "<div class='ui-select'>" );
		this.isMultiple = this.select[ 0 ].multiple;
		this.options.theme = this._theme();
		this.selectOptions = this.select.find("option");

		this._trigger( "beforeCreate" );

		this.button = this._button();

		var self = this,

			menu = this,

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
	},

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
				self.button.removeClass( "ui-btn-down-" + self.options.theme );
			});
	},

	refresh: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-disabled" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.selectmenu.prototype.options.initSelector, e.target )
		.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
		.selectmenu();
});
})( jQuery );
