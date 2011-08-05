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
				var self = this;

				this.button.find( ".ui-btn-text" ).text( function() {
					if ( !self.isMultiple ) {
						return self.selected().text();
					}

					return self.selected().length ? self.selected().map( function() {
						return $( this ).text();
					}).get().join( ", " ) : self.placeholder;
				});
			},

			_focusButton : function() {
				var self = this;

				setTimeout( function() {
					self.button.focus();
				}, 40);
			},

			disable: function() {
				this._setDisable( true );
				this.button.addClass( "ui-disabled" );
			},

			enable: function() {
				this._setDisable( false );
				this.button.removeClass( "ui-disabled" );
			},

			_setDisable: function( value ) {
				this.element.attr( "disabled", value );
				this.button.attr( "aria-disabled", value );
				return this._setOption( "disabled", value );
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

				// multiple count inside button
				if ( self.isMultiple ) {
					self.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
				}
			}
		});
	},

	_custom: function() {
		var widget = this, common = this._common();

		return $.extend(common, {
			typeName: 'custom',

			button:	$( "<a>", {
				"href": "#",
				"role": "button",
				// TODO value is undefined at creation
				"id": common.buttonId,
				"aria-haspopup": "true",

				// TODO value is undefined at creation
				"aria-owns": common.menuId
			}),

			build: function() {
				var self = this, parentWidget = widget;

				// Create list from select, update state
				widget.refresh();

				self.select.attr( "tabindex", "-1" )
					.focus(function() {
						$(this).blur();
						button.focus();
					});

				// Button events
				self.button.bind( "vclick keydown" , function( event ) {
					if ( event.type == "vclick" ||
							event.keyCode && ( event.keyCode === $.mobile.keyCode.ENTER ||
							event.keyCode === $.mobile.keyCode.SPACE ) ) {

						widget.open();
						event.preventDefault();
					}
				});

				// Events for list items
				self.list.attr( "role", "listbox" )
					.delegate( ".ui-li>a", "focusin", function() {
						$( this ).attr( "tabindex", "0" );
					})
					.delegate( ".ui-li>a", "focusout", function() {
						$( this ).attr( "tabindex", "-1" );
					})
					.delegate( "li:not(.ui-disabled, .ui-li-divider)", "vclick", function( event ) {

						// index of option tag to be selected
						var oldIndex = self.select[ 0 ].selectedIndex,
								newIndex = self.list.find( "li:not(.ui-li-divider)" ).index( this ),
								option = widget.optionElems.eq( newIndex )[ 0 ];

						// toggle selected status on the tag for multi selects
						option.selected = self.isMultiple ? !option.selected : true;

						// toggle checkbox class for multiple selects
						if ( self.isMultiple ) {
							$( this ).find( ".ui-icon" )
								.toggleClass( "ui-icon-checkbox-on", option.selected )
								.toggleClass( "ui-icon-checkbox-off", !option.selected );
						}

						// trigger change if value changed
						if ( self.isMultiple || oldIndex !== newIndex ) {
							self.select.trigger( "change" );
						}

						//hide custom select for single selects only
						if ( !self.isMultiple ) {
							widget.close();
						}

						event.preventDefault();
					})
					.keydown(function( event ) {  //keyboard events for menu items
						var target = $( event.target ),
						li = target.closest( "li" ),
						prev, next;

						// switch logic based on which key was pressed
						switch ( event.keyCode ) {
							// up or left arrow keys
						 case 38:
							prev = li.prev();

							// if there's a previous option, focus it
							if ( prev.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								prev.find( "a" ).first().focus();
							}

							return false;
							break;

							// down or right arrow keys
						 case 40:
							next = li.next();

							// if there's a next option, focus it
							if ( next.length ) {
								target
									.blur()
									.attr( "tabindex", "-1" );

								next.find( "a" ).first().focus();
							}

							return false;
							break;

							// If enter or space is pressed, trigger click
						 case 13:
						 case 32:
							target.trigger( "vclick" );

							return false;
									break;
						}
					});

				// button refocus ensures proper height calculation
				// by removing the inline style and ensuring page inclusion
				self.menuPage.bind( "pagehide", function() {
					self.list.appendTo( self.listbox );
					self._focusButton();
				});

				// Events on "screen" overlay
				self.screen.bind( "vclick", function( event ) {
					widget.close();
				});

				// Close button on small overlays
				self.headerClose.click( function() {
					if ( menuType == "overlay" ) {
						widget.close();
						return false;
					}
				});
			},

			refresh: function( forceRebuild ){
				var self = this,
					select = this.element,
					isMultiple = this.isMultiple,
					options = this.optionElems = select.find( "option" ),
					selected = this.selected(),
					// return an array of all selected index's
					indicies = this.selectedIndices();

				if (  forceRebuild || select[0].options.length != self.list.find( "li" ).length ) {
					self._buildList();
				}

				self.setButtonText();

				// multiple count inside button
				if ( self.isMultiple ) {
					self.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
				}

				self.list.find( "li:not(.ui-li-divider)" )
					.removeClass( $.mobile.activeBtnClass )
					.attr( "aria-selected", false )
					.each(function( i ) {

						if ( $.inArray( i, indicies ) > -1 ) {
							var item = $( this ).addClass( $.mobile.activeBtnClass );

							// Aria selected attr
							item.find( "a" ).attr( "aria-selected", true );

							// Multiple selects: add the "on" checkbox state to the icon
							if ( self.isMultiple ) {
								item.find( ".ui-icon" ).removeClass( "ui-icon-checkbox-off" ).addClass( "ui-icon-checkbox-on" );
							}
						}
					});
			},

			close: function() {
				if ( this.options.disabled || !this.isOpen ) {
					return;
				}

				var self = this;

				if ( self.menuType == "page" ) {
					// rebind the page remove that was unbound in the open function
					// to allow for the parent page removal from actions other than the use
					// of a dialog sized custom select
					self.thisPage.bind( "pagehide.remove", function() {
						$(this).remove();
					});

					// doesn't solve the possible issue with calling change page
					// where the objects don't define data urls which prevents dialog key
					// stripping - changePage has incoming refactor
					window.history.back();
				}	else {
					self.screen.addClass( "ui-screen-hidden" );
					self.listbox.addClass( "ui-selectmenu-hidden" ).removeAttr( "style" ).removeClass( "in" );
					self.list.appendTo( self.listbox );
					self._focusButton();
				}

				// allow the dialog to be closed again
				this.isOpen = false;
			},

			open: function() {
				if ( this.options.disabled ) {
					return;
				}

				var self = this,
				menuHeight = self.list.parent().outerHeight(),
				menuWidth = self.list.parent().outerWidth(),
						scrollTop = $( window ).scrollTop(),
						btnOffset = self.button.offset().top,
						screenHeight = window.innerHeight,
						screenWidth = window.innerWidth;

				//add active class to button
				self.button.addClass( $.mobile.activeBtnClass );

				//remove after delay
				setTimeout( function() {
					self.button.removeClass( $.mobile.activeBtnClass );
				}, 300);

				function focusMenuItem() {
					self.list.find( ".ui-btn-active" ).focus();
				}

				if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {
					// prevent the parent page from being removed from the DOM,
					// otherwise the results of selecting a list item in the dialog
					// fall into a black hole
					self.thisPage.unbind( "pagehide.remove" );

					//for webos (set lastscroll using button offset)
					if ( scrollTop == 0 && btnOffset > screenHeight ) {
						self.thisPage.one( "pagehide", function() {
							$( this ).jqmData( "lastScroll", btnOffset );
						});
					}

					self.menuPage.one( "pageshow", function() {
						// silentScroll() is called whenever a page is shown to restore
						// any previous scroll position the page may have had. We need to
						// wait for the "silentscroll" event before setting focus to avoid
						// the browser"s "feature" which offsets rendering to make sure
						// whatever has focus is in view.
						$( window ).one( "silentscroll", function() {
							focusMenuItem();
						});

						self.isOpen = true;
					});

					self.menuType = "page";
					self.menuPageContent.append( self.list );
					$.mobile.changePage( self.menuPage, {
						transition: $.mobile.defaultDialogTransition
					});
				} else {
					self.menuType = "overlay";

					self.screen.height( $(document).height() )
						.removeClass( "ui-screen-hidden" );

					// Try and center the overlay over the button
					var roomtop = btnOffset - scrollTop,
					roombot = scrollTop + screenHeight - btnOffset,
					halfheight = menuHeight / 2,
					maxwidth = parseFloat( self.list.parent().css( "max-width" ) ),
					newtop, newleft;

					if ( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ) {
						newtop = btnOffset + ( self.button.outerHeight() / 2 ) - halfheight;
					} else {
						// 30px tolerance off the edges
						newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
					}

					// If the menuwidth is smaller than the screen center is
					if ( menuWidth < maxwidth ) {
						newleft = ( screenWidth - menuWidth ) / 2;
					} else {

						//otherwise insure a >= 30px offset from the left
						newleft = self.button.offset().left + self.button.outerWidth() / 2 - menuWidth / 2;

						// 30px tolerance off the edges
						if ( newleft < 30 ) {
							newleft = 30;
						} else if ( (newleft + menuWidth) > screenWidth ) {
							newleft = screenWidth - menuWidth - 30;
						}
					}

					self.listbox.append( self.list )
						.removeClass( "ui-selectmenu-hidden" )
						.css({
							top: newtop,
							left: newleft
						})
						.addClass( "in" );

					focusMenuItem();

					// duplicate with value set in page show for dialog sized selects
					self.isOpen = true;
				}
			},

			_buildList: function() {
				var self = this,
					o = this.options,
					placeholder = this.placeholder,
					optgroups = [],
					lis = [],
					dataIcon = self.isMultiple ? "checkbox-off" : "false";

				self.list.empty().filter( ".ui-listview" ).listview( "destroy" );

				// Populate menu with options from select element
				self.select.find( "option" ).each( function( i ) {
					var $this = $( this ),
					$parent = $this.parent(),
					text = $this.text(),
					anchor = "<a href='#'>"+ text +"</a>",
							classes = [],
					extraAttrs = [];

					// Are we inside an optgroup?
					if ( $parent.is( "optgroup" ) ) {
						var optLabel = $parent.attr( "label" );

						// has this optgroup already been built yet?
						if ( $.inArray( optLabel, optgroups ) === -1 ) {
							lis.push( "<li data-" + $.mobile.ns + "role='list-divider'>"+ optLabel +"</li>" );
							optgroups.push( optLabel );
						}
					}

					// Find placeholder text
					// TODO: Are you sure you want to use getAttribute? ^RW
					if ( !this.getAttribute( "value" ) || text.length == 0 || $this.jqmData( "placeholder" ) ) {
						if ( o.hidePlaceholderMenuItems ) {
							classes.push( "ui-selectmenu-placeholder" );
						}
						placeholder = self.placeholder = text;
					}

					// support disabled option tags
					if ( this.disabled ) {
						classes.push( "ui-disabled" );
						extraAttrs.push( "aria-disabled='true'" );
					}

					lis.push( "<li data-" + $.mobile.ns + "option-index='" + i + "' data-" + $.mobile.ns + "icon='"+ dataIcon +"' class='"+ classes.join(" ") + "' " + extraAttrs.join(" ") +">"+ anchor +"</li>" );
				});

				self.list.html( lis.join(" ") );

				self.list.find( "li" )
					.attr({ "role": "option", "tabindex": "-1" })
					.first().attr( "tabindex", "0" );

				// Hide header close link for single selects
				if ( !this.isMultiple ) {
					this.headerClose.hide();
				}

				// Hide header if it's not a multiselect and there's no placeholder
				if ( !this.isMultiple && !placeholder.length ) {
					this.header.hide();
				} else {
					this.headerTitle.text( this.placeholder );
				}

				// Now populated, create listview
				self.list.listview();
			}
		});
	},

	_create: function() {

		var self = this,

			o = this.options,

			menu = self.options.nativeMenu ? this._native(this.element) : this._custom(),

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

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.selectmenu.prototype.options.initSelector, e.target )
		.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
		.selectmenu();
});

})( jQuery );
