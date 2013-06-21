/*
* custom "selectmenu" plugin
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extension to select menus to support menu styling, placeholder options, and multi-select features.
//>>label: Selects: Custom menus
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.select.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../jquery.mobile.core",
	"../../jquery.mobile.navigation",
	"../dialog",
	"./select",
	"../listview",
	"../page",
	"../popup" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var unfocusableItemSelector = ".ui-disabled,.ui-li-divider,.ui-screen-hidden,:jqmData(role='placeholder')",
	goToAdjacentItem = function( item, target, direction ) {
		var adjacent = item[ direction + "All" ]()
			.not( unfocusableItemSelector )
			.first();

		// if there's a previous option, focus it
		if ( adjacent.length ) {
			target
				.blur()
				.attr( "tabindex", "-1" );

			adjacent.find( "a" ).first().focus();
		}
	};

$.widget( "mobile.selectmenu", $.mobile.selectmenu, {
	_create: function() {
		var o = this.options;

		// Custom selects cannot exist inside popups, so revert the "nativeMenu"
		// option to true if a parent is a popup
		o.nativeMenu = o.nativeMenu || ( this.element.parents( ":jqmData(role='popup'),:mobile-popup" ).length > 0 );

		return this._super();
	},

	build: function() {
		var selectID, prefix, popupID, dialogID, label, thisPage, isMultiple, menuId, themeAttr, overlayThemeAttr,
			dividerThemeAttr, menuPage, listbox, list, header, headerTitle, menuPageContent, menuPageClose, headerClose, self;

		if ( this.options.nativeMenu ) {
			return this._super();
		}

		self = this;
		selectID = this.selectID;
		prefix = ( selectID ? selectID : ( ( $.mobile.ns || "" ) + "uuid-" + this.uuid ) );
		popupID = prefix + "-listbox";
		dialogID = prefix + "-dialog";
		label = this.label;
		thisPage = this.element.closest( ".ui-page" );
		isMultiple = this.element[ 0 ].multiple;
		menuId = selectID + "-menu";
		themeAttr = this.options.theme ? ( " data-" + $.mobile.ns + "theme='" + this.options.theme + "'" ) : "";
		overlayThemeAttr = this.options.overlayTheme ? ( " data-" + $.mobile.ns + "theme='" + this.options.overlayTheme + "'" ) : "";
		dividerThemeAttr = ( this.options.dividerTheme && isMultiple ) ? ( " data-" + $.mobile.ns + "divider-theme='" + this.options.dividerTheme + "'" ) : "";
		menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' class='ui-selectmenu' id='" + dialogID + "'" + themeAttr + overlayThemeAttr + ">" +
			"<div data-" + $.mobile.ns + "role='header'>" +
			"<div class='ui-title'>" + label.getEncodedText() + "</div>"+
			"</div>"+
			"<div data-" + $.mobile.ns + "role='content'></div>"+
			"</div>" );
		listbox = $( "<div id='" + popupID + "' class='ui-selectmenu'>" ).insertAfter( this.select ).popup({ theme: this.options.overlayTheme });
		list = $( "<ul class='ui-selectmenu-list' id='" + menuId + "' role='listbox' aria-labelledby='" + this.buttonId + "'" + themeAttr + dividerThemeAttr + ">" ).appendTo( listbox );
		header = $( "<div class='ui-header ui-bar-" + ( this.options.theme ? this.options.theme : "inherit" ) + "'>" ).prependTo( listbox );
		headerTitle = $( "<h1 class='ui-title'>" ).appendTo( header );

		if ( this.isMultiple ) {
			headerClose = $( "<a>", {
				"text": this.options.closeText,
				"href": "#",
				"class": "ui-btn ui-corner-all ui-btn-left ui-btn-icon-notext ui-icon-delete"
			}).appendTo( header );
		}

		$.extend( this, {
			selectID: selectID,
			menuId: menuId,
			popupID: popupID,
			dialogID: dialogID,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			isMultiple: isMultiple,
			theme: this.options.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: ""
		});

		// Create list from select, update state
		self.refresh();

		if ( self._origTabIndex === undefined ) {
			// Map undefined to false, because self._origTabIndex === undefined
			// indicates that we have not yet checked whether the select has
			// originally had a tabindex attribute, whereas false indicates that
			// we have checked the select for such an attribute, and have found
			// none present.
			self._origTabIndex = ( self.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : self.select.attr( "tabindex" );
		}
		self.select.attr( "tabindex", "-1" ).focus(function() {
			$( this ).blur();
			self.button.focus();
		});

		// Button events
		self.button.bind( "vclick keydown" , function( event ) {
			if ( self.options.disabled || self.isOpen ) {
				return;
			}

			if (event.type === "vclick" ||
					event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE)) {

				self._decideFormat();
				if ( self.menuType === "overlay" ) {
					self.button.attr( "href", "#" + self.popupID ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "popup" );
				} else {
					self.button.attr( "href", "#" + self.dialogID ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
				}
				self.isOpen = true;
				// Do not prevent default, so the navigation may have a chance to actually open the chosen format
			}
		});

		// Events for list items
		self.list.attr( "role", "listbox" )
			.bind( "focusin", function( e ) {
				$( e.target )
					.attr( "tabindex", "0" )
					.trigger( "vmouseover" );

			})
			.bind( "focusout", function( e ) {
				$( e.target )
					.attr( "tabindex", "-1" )
					.trigger( "vmouseout" );
			})
			.delegate( "li:not(.ui-disabled, .ui-li-divider)", "click", function( event ) {

				// index of option tag to be selected
				var oldIndex = self.select[ 0 ].selectedIndex,
					newIndex = self.list.find( "li:not(.ui-li-divider)" ).index( this ),
					option = self._selectOptions().eq( newIndex )[ 0 ];

				// toggle selected status on the tag for multi selects
				option.selected = self.isMultiple ? !option.selected : true;

				// toggle checkbox class for multiple selects
				if ( self.isMultiple ) {
					$( this ).find( "a" )
						.toggleClass( "ui-icon-checkbox-on", option.selected )
						.toggleClass( "ui-icon-checkbox-off", !option.selected );
				}

				// trigger change if value changed
				if ( self.isMultiple || oldIndex !== newIndex ) {
					self.select.trigger( "change" );
				}

				// hide custom select for single selects only - otherwise focus clicked item
				// We need to grab the clicked item the hard way, because the list may have been rebuilt
				if ( self.isMultiple ) {
					self.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
						.find( "a" ).first().focus();
				}
				else {
					self.close();
				}

				event.preventDefault();
			})
			.keydown(function( event ) {  //keyboard events for menu items
				var target = $( event.target ),
					li = target.closest( "li" );

				// switch logic based on which key was pressed
				switch ( event.keyCode ) {
					// up or left arrow keys
				case 38:
					goToAdjacentItem( li, target, "prev" );
					return false;
					// down or right arrow keys
				case 40:
					goToAdjacentItem( li, target, "next" );
					return false;
					// If enter or space is pressed, trigger click
				case 13:
				case 32:
					target.trigger( "click" );

					return false;
				}
			});

		// button refocus ensures proper height calculation
		// by removing the inline style and ensuring page inclusion
		self.menuPage.bind( "pagehide", function() {
			// TODO centralize page removal binding / handling in the page plugin.
			// Suggestion from @jblas to do refcounting
			//
			// TODO extremely confusing dependency on the open method where the pagehide.remove
			// bindings are stripped to prevent the parent page from disappearing. The way
			// we're keeping pages in the DOM right now sucks
			//
			// rebind the page remove that was unbound in the open function
			// to allow for the parent page removal from actions other than the use
			// of a dialog sized custom select
			//
			// doing this here provides for the back button on the custom select dialog
			$.mobile._bindPageRemove.call( self.thisPage );
		});

		// Events on the popup
		self.listbox.bind( "popupafterclose", function() {
			self.close();
		});

		// Close button on small overlays
		if ( self.isMultiple ) {
			self.headerClose.click(function() {
				if ( self.menuType === "overlay" ) {
					self.close();
					return false;
				}
			});
		}

		// track this dependency so that when the parent page
		// is removed on pagehide it will also remove the menupage
		self.thisPage.addDependents( this.menuPage );

		return this;
	},

	_isRebuildRequired: function() {
		var list = this.list.find( "li" ),
			options = this._selectOptions();

		// TODO exceedingly naive method to determine difference
		// ignores value changes etc in favor of a forcedRebuild
		// from the user in the refresh method
		return options.text() !== list.text();
	},

	selected: function() {
		return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
	},

	refresh: function( force ) {
		var self, indices;

		if ( this.options.nativeMenu ) {
			return this._super( force );
		}

		self = this;
		if ( force || this._isRebuildRequired() ) {
			self._buildList();
		}

		indices = this.selectedIndices();

		self.setButtonText();
		self.setButtonCount();

		self.list.find( "li:not(.ui-li-divider)" )
			.find( "a" ).removeClass( $.mobile.activeBtnClass ).end()
			.attr( "aria-selected", false )
			.each(function( i ) {

				if ( $.inArray( i, indices ) > -1 ) {
					var item = $( this );

					// Aria selected attr
					item.attr( "aria-selected", true );

					// Multiple selects: add the "on" checkbox state to the icon
					if ( self.isMultiple ) {
						item.find( "a" ).removeClass( "ui-icon-checkbox-off" ).addClass( "ui-icon-checkbox-on" );
					} else {
						if ( item.hasClass( "ui-screen-hidden" ) ) {
							item.next().find( "a" ).addClass( $.mobile.activeBtnClass );
						} else {
							item.find( "a" ).addClass( $.mobile.activeBtnClass );
						}
					}
				}
			});
	},

	close: function() {
		if ( this.options.disabled || !this.isOpen ) {
			return;
		}

		var self = this;

		if ( self.menuType === "page" ) {
			self.menuPage.dialog( "close" );
			self.list.appendTo( self.listbox );
		} else {
			self.listbox.popup( "close" );
		}

		self._focusButton();
		// allow the dialog to be closed again
		self.isOpen = false;
	},

	open: function() {
		this.button.click();
	},

	_decideFormat: function() {
		var self = this,
			$window = $.mobile.window,
			selfListParent = self.list.parent(),
			menuHeight = selfListParent.outerHeight(),
			scrollTop = $window.scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = $window.height();

		function focusMenuItem() {
			var selector = self.list.find( "a." + $.mobile.activeBtnClass );
			if ( selector.length === 0 ) {
				selector = self.list.find( "li:not(" + unfocusableItemSelector + ") a.ui-btn" );
			}
			selector.first().focus();
		}

		if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

			self.menuPage.appendTo( $.mobile.pageContainer ).page();
			self.menuPageContent = self.menuPage.find( ".ui-content" );
			self.menuPageClose = self.menuPage.find( ".ui-header a" );

			// prevent the parent page from being removed from the DOM,
			// otherwise the results of selecting a list item in the dialog
			// fall into a black hole
			self.thisPage.unbind( "pagehide.remove" );

			//for WebOS/Opera Mini (set lastscroll using button offset)
			if ( scrollTop === 0 && btnOffset > screenHeight ) {
				self.thisPage.one( "pagehide", function() {
					$( this ).jqmData( "lastScroll", btnOffset );
				});
			}

			self.menuPage
				.one( "pageshow", function() {
					focusMenuItem();
				})
				.one( "pagehide", function() {
					self.close();
				});

			self.menuType = "page";
			self.menuPageContent.append( self.list );
			self.menuPage.find( "div .ui-title" ).text( self.label.text() );
		} else {
			self.menuType = "overlay";

			self.listbox.one( "popupafteropen", focusMenuItem );
		}
	},

	_buildList: function() {
		var self = this,
			o = this.options,
			placeholder = this.placeholder,
			needPlaceholder = true,
			dataIcon = this.isMultiple ? "checkbox-off" : "false",
			$options, numOptions, select,
			dataPrefix = "data-" + $.mobile.ns,
			dataIndexAttr = dataPrefix + "option-index",
			dataIconAttr = dataPrefix + "icon",
			dataRoleAttr = dataPrefix + "role",
			dataPlaceholderAttr = dataPrefix + "placeholder",
			fragment = document.createDocumentFragment(),
			isPlaceholderItem = false,
			optGroup,
			i,
			option, $option, parent, text, anchor, classes,
			optLabel, divider, item;

		self.list.empty().filter( ".ui-listview" ).listview( "destroy" );
		$options = this.select.find( "option" );
		numOptions = $options.length;
		select = this.select[ 0 ];

		for ( i = 0; i < numOptions;i++, isPlaceholderItem = false) {
			option = $options[i];
			$option = $( option );
			parent = option.parentNode;
			text = $option.text();
			anchor  = document.createElement( "a" );
			classes = [];

			anchor.setAttribute( "href", "#" );
			anchor.appendChild( document.createTextNode( text ) );

			// Are we inside an optgroup?
			if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
				optLabel = parent.getAttribute( "label" );
				if ( optLabel !== optGroup ) {
					divider = document.createElement( "li" );
					divider.setAttribute( dataRoleAttr, "list-divider" );
					divider.setAttribute( "role", "option" );
					divider.setAttribute( "tabindex", "-1" );
					divider.appendChild( document.createTextNode( optLabel ) );
					fragment.appendChild( divider );
					optGroup = optLabel;
				}
			}

			if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
				needPlaceholder = false;
				isPlaceholderItem = true;

				// If we have identified a placeholder, record the fact that it was
				// us who have added the placeholder to the option and mark it
				// retroactively in the select as well
				if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
					this._removePlaceholderAttr = true;
				}
				option.setAttribute( dataPlaceholderAttr, true );
				if ( o.hidePlaceholderMenuItems ) {
					classes.push( "ui-screen-hidden" );
				}
				if ( placeholder !== text ) {
					placeholder = self.placeholder = text;
				}
			}

			item = document.createElement( "li" );
			if ( option.disabled ) {
				classes.push( "ui-disabled" );
				item.setAttribute( "aria-disabled", true );
			}
			item.setAttribute( dataIndexAttr, i );
			item.setAttribute( dataIconAttr, dataIcon );
			if ( isPlaceholderItem ) {
				item.setAttribute( dataPlaceholderAttr, true );
			}
			item.className = classes.join( " " );
			item.setAttribute( "role", "option" );
			anchor.setAttribute( "tabindex", "-1" );
			item.appendChild( anchor );
			fragment.appendChild( item );
		}

		self.list[0].appendChild( fragment );

		// Hide header if it's not a multiselect and there's no placeholder
		if ( !this.isMultiple && !placeholder.length ) {
			this.header.addClass( "ui-screen-hidden" );
		} else {
			this.headerTitle.text( this.placeholder );
		}

		// Now populated, create listview
		self.list.listview();
	},

	_button: function() {
		return this.options.nativeMenu ?
			this._super() :
			$( "<a>", {
				"href": "#",
				"role": "button",
				// TODO value is undefined at creation
				"id": this.buttonId,
				"aria-haspopup": "true",

				// TODO value is undefined at creation
				"aria-owns": this.menuId
			});
	},

	_destroy: function() {

		if ( !this.options.nativeMenu ) {
			this.close();

			// Restore the tabindex attribute to its original value
			if ( this._origTabIndex !== undefined ) {
				if ( this._origTabIndex !== false ) {
					this.select.attr( "tabindex", this._origTabIndex );
				} else {
					this.select.removeAttr( "tabindex" );
				}
			}

			// Remove the placeholder attribute if we were the ones to add it
			if ( this._removePlaceholderAttr ) {
				this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
			}

			// Remove the popup
			this.listbox.remove();

			// Remove the dialog
			this.menuPage.remove();
		}

		// Chain up
		this._super();
	}
});

//auto self-init widgets - custom select needs to be enhanced after popup to
// make sure that it reverts to native select
$.mobile._enhancer.add( "mobile.selectmenu", { dependencies: [ "mobile.popup" ] } );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
