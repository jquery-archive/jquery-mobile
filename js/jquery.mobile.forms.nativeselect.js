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
		initSelector: "select:not(jqmData(native-menu='false')):not(:jqmData(role='slider'))"
	},

	_common: function(){
		var widget = this,
				select = this.element.wrap( "<div class='ui-select'>" );

		// if not, try to find closest theme container
		// TODO move to core as findCurrentTheme
		if ( !widget.options.theme ) {
			var themedParent = select.closest( "[class*='ui-bar-'],[class*='ui-body-']" );
			widget.options.theme = themedParent.length ?
				/ui-(bar|body)-([a-z])/.exec( themedParent.attr( "class" ) )[2] :
				"c";
		}

		var selectID  = select.attr( "id" ),
				label = $( "label[for='"+ selectID +"']" ).addClass( "ui-select" ),
				thisPage = select.closest( ".ui-page" ),
				screen = $( "<div>", {"class": "ui-selectmenu-screen ui-screen-hidden"} )
			.appendTo( thisPage ),
		selectOptions = select.find("option"),
		isMultiple = widget.isMultiple = select[ 0 ].multiple,
		buttonId = selectID + "-button",
		menuId = selectID + "-menu",
		menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' data-" +$.mobile.ns + "theme='"+ widget.options.menuPageTheme +"'>" +
									"<div data-" + $.mobile.ns + "role='header'>" +
									"<div class='ui-title'>" + label.text() + "</div>"+
									"</div>"+
									"<div data-" + $.mobile.ns + "role='content'></div>"+
									"</div>" )
			.appendTo( $.mobile.pageContainer )
			.page(),

		listbox =  $("<div>", { "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all ui-body-" + widget.options.overlayTheme + " " + $.mobile.defaultDialogTransition } )
			.insertAfter(screen),

		list = $( "<ul>", {
			"class": "ui-selectmenu-list",
			"id": menuId,
			"role": "listbox",
			"aria-labelledby": buttonId
		})
			.attr( "data-" + $.mobile.ns + "theme", widget.options.theme )
			.appendTo( listbox ),

		header = $( "<div>", {
			"class": "ui-header ui-bar-" + widget.options.theme
		})
			.prependTo( listbox ),

		headerTitle = $( "<h1>", {
			"class": "ui-title"
				})
			.appendTo( header ),

		headerClose = $( "<a>", {
			"text": widget.options.closeText,
			"href": "#",
			"class": "ui-btn-left"
		})
			.attr( "data-" + $.mobile.ns + "iconpos", "notext" )
			.attr( "data-" + $.mobile.ns + "icon", "delete" )
			.appendTo( header )
			.buttonMarkup(),

		menuPageContent = menuPage.find( ".ui-content" ),

		menuPageClose = menuPage.find( ".ui-header a" );

		return {
			select: select,
					selectID: selectID,
			buttonId: buttonId,
			menuId: menuId,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			screen: screen,
			selectOptions: selectOptions,
			isMultiple: isMultiple,
			theme: widget.options.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: "",

			selectedIndices: function() {
				this.selected().map( function() {
					return selectOptions.index( this );
				}).get();
			},

			selected: function() {
				return this.selectOptions.filter( ":selected" );
			},

			setButtonText: function() {
				var self = this, selected = this.selected();

				this.button.find( ".ui-btn-text" ).text( function() {
					if ( !self.isMultiple ) {
						return selected.text();
					}

					return selected.length ? selected.map( function() {
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
		};
	},

	_native: function() {
		var widget = this;

		return $.extend( this._common(), {
			typeName: 'native',

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

		menu = this._native(),

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
			self.buttonCount = $( "<span>" )
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
})( jQuery );
