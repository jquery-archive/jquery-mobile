/*!
 * jQuery Mobile Custom Select @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selects: Custom menus
//>>group: Forms
//>>description: Select menu extension for menu styling, placeholder options, and multi-select.
//>>docs: http://api.jquerymobile.com/selectmenu/
//>>demos: http://demos.jquerymobile.com/@VERSION/selectmenu-custom/
//>>css.structure: ../css/structure/jquery.mobile.forms.select.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../navigation",
			"./select",
			"../toolbar",
			"../listview",
			"../page.dialog.backcompat",
			"../popup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var unfocusableItemSelector = ".ui-disabled,.ui-state-disabled,.ui-listview-item-divider," +
		".ui-screen-hidden";

return $.widget( "mobile.selectmenu", $.mobile.selectmenu, {
	options: {
		classes: {
			"ui-selectmenu-custom-header-close-button": "ui-corner-all"
		},
		overlayTheme: null,
		dividerTheme: null,
		hidePlaceholderMenuItems: true,
		closeText: "Close"
	},

	_ns: function() {
		return "ui-";
	},

	_create: function() {
		var o = this.options;

		this._origTabIndex = ( this.element.attr( "tabindex" ) === undefined ) ? false :
			this.element.attr( "tabindex" );

		// Custom selects cannot exist inside popups, so revert the "nativeMenu" option to true if
		// a parent is a popup
		o.nativeMenu = o.nativeMenu ||
			( this.element.closest( "[data-" + this._ns() +
			"role='popup'],:mobile-popup" ).length > 0 );

		return this._super();
	},

	_handleSelectFocus: function() {
		this.element.blur();
		this.button.focus();
	},

	_handleKeydown: function( event ) {
		this._super( event );
		this._handleButtonVclickKeydown( event );
	},

	_handleButtonVclickKeydown: function( event ) {
		if ( this.options.disabled || this.isOpen || this.options.nativeMenu ) {
			return;
		}

		if ( event.type === "vclick" ||
				event.keyCode &&
					( event.keyCode === $.ui.keyCode.ENTER ||
						event.keyCode === $.ui.keyCode.SPACE ) ) {

			this._decideFormat();
			if ( this.menuType === "overlay" ) {
				this.button
					.attr( "href", "#" + this.popupId )
					.attr( "data-" + this._ns() + "rel", "popup" );
			} else {
				this.button
					.attr( "href", "#" + this.dialogId )
					.attr( "data-" + this._ns() + "rel", "dialog" );
			}
			this.isOpen = true;

			// Do not prevent default, so the navigation may have a chance to actually open the
			// chosen format
		}
	},

	_handleListFocus: function( e ) {
		var params = ( e.type === "focusin" ) ?
			{ tabindex: "0", event: "vmouseover" } :
			{ tabindex: "-1", event: "vmouseout" };

		$( e.target )
			.attr( "tabindex", params.tabindex )
			.trigger( params.event );
	},

	_goToAdjacentItem: function( item, target, direction ) {
		var adjacent = item[ direction + "All" ]()
			.not( unfocusableItemSelector + ",[data-" + this._ns() + "role='placeholder']" )
				.first();

		// If there's a previous option, focus it
		if ( adjacent.length ) {
			target
				.blur()
				.attr( "tabindex", "-1" );

			adjacent.find( "a" ).first().focus();
		}
	},

	_handleListKeydown: function( event ) {
		var target = $( event.target ),
			li = target.closest( "li" );

		// Switch logic based on which key was pressed
		switch ( event.keyCode ) {

		// Up or left arrow keys
		case 38:
			this._goToAdjacentItem( li, target, "prev" );
			return false;

		// Down or right arrow keys
		case 40:
			this._goToAdjacentItem( li, target, "next" );
			return false;

		// If enter or space is pressed, trigger click
		case 13:
		case 32:
			target.trigger( "click" );
			return false;
		}
	},

	// Focus the button before the page containing the widget replaces the dialog page
	_handleBeforeTransition: function( event, data ) {
		var focusButton;

		if ( data && data.prevPage && data.prevPage[ 0 ] === this.menuPage[ 0 ] ) {
			focusButton = $.proxy( function() {
				this._delay( function() {
					this._focusButton();
				} );
			}, this );

			if ( data.options && data.options.transition && data.options.transition !== "none" ) {
				data.prevPage.animationComplete( focusButton );
			} else {
				focusButton();
			}
		}
	},

	_handleHeaderCloseClick: function() {
		if ( this.menuType === "overlay" ) {
			this.close();
			return false;
		}
	},

	_handleListItemClick: function( event ) {
		var anchors,
			listItem = $( event.target ).closest( "li" ),

			// Index of option tag to be selected
			oldIndex = this.element[ 0 ].selectedIndex,
			newIndex = $.mobile.getAttribute( listItem, "option-index" ),
			option = this._selectOptions().eq( newIndex )[ 0 ];

		// Toggle selected status on the tag for multi selects
		option.selected = this.isMultiple ? !option.selected : true;

		// Toggle checkbox class for multiple selects
		if ( this.isMultiple ) {
			anchors = listItem.find( "a" );
			this._toggleClass( anchors, null, "ui-checkbox-on", option.selected );
			this._toggleClass( anchors, null, "ui-checkbox-off", !option.selected );
		}

		// If it's not a multiple select, trigger change after it has finished closing
		if ( !this.isMultiple && oldIndex !== newIndex ) {
			this._triggerChange = true;
		}

		// Trigger change if it's a multiple select
		// Hide custom select for single selects only - otherwise focus clicked item
		// We need to grab the clicked item the hard way, because the list may have been rebuilt
		if ( this.isMultiple ) {
			this.element.trigger( "change" );
			this.list.find( "li:not(.ui-listview-item-divider)" ).eq( newIndex )
				.find( "a" ).first().focus();
		} else {
			this.close();
		}

		event.preventDefault();
	},

	build: function() {
		if ( this.options.nativeMenu ) {
			return this._super();
		}

		var selectId, popupId, dialogId, label, thisPage, isMultiple, menuId,
			themeAttr, overlayTheme, overlayThemeAttr, dividerThemeAttr,
			menuPage, menuPageHeader, listbox, list, header, headerTitle, menuPageContent,
			menuPageClose, headerClose, headerCloseIcon,
			o = this.options;

		selectId = this.selectId;
		popupId = selectId + "-listbox";
		dialogId = selectId + "-dialog";
		label = this.label;
		thisPage = this.element.closest( ".ui-page" );
		isMultiple = this.element[ 0 ].multiple;
		menuId = selectId + "-menu";
		themeAttr = o.theme ? ( " data-" + this._ns() + "theme='" + o.theme + "'" ) : "";
		overlayTheme = o.overlayTheme || o.theme || null;
		overlayThemeAttr = overlayTheme ? ( " data-" + this._ns() +
		"overlay-theme='" + overlayTheme + "'" ) : "";
		dividerThemeAttr = ( o.dividerTheme && this.element.children( "optgroup" ).length > 0 ) ?
			( " data-" + this._ns() + "divider-theme='" + o.dividerTheme + "'" ) : "";
		menuPage = $( "<div data-" + this._ns() + "role='page' " +
			"data-" + this._ns() + "dialog='true'>" +
			"<div></div>" +
			"</div>" )
			.attr( "id", dialogId );
		menuPageContent = menuPage.children();

		// Adding the data-type attribute allows the dialog widget to place the close button before
		// the toolbar is instantiated
		menuPageHeader = $( "<div data-" + this._ns() + "type='header'><h1></h1></div>" )
			.prependTo( menuPage );
		listbox = $( "<div></div>" )
			.attr( "id", popupId )
			.insertAfter( this.element )
			.popup();
		list = $( "<ul role='listbox' aria-labelledby='" +
			this.buttonId + "'" + themeAttr + dividerThemeAttr + "></ul>" )
			.attr( "id", menuId )
			.appendTo( listbox );
		header = $( "<div>" )
			.prependTo( listbox );
		headerTitle = $( "<h1></h1>" ).appendTo( header );

		menuPage.page();

		// Instantiate the toolbars after everything else so that when they are created they find
		// the page in which they are contained.
		menuPageHeader.add( header ).toolbar( { type: "header" } );

		this._addClass( menuPage, "ui-selectmenu-custom" );
		this._addClass( menuPageContent, null, "ui-content" );
		this._addClass( listbox, null, "ui-selectmenu-custom" );
		this._addClass( list, null, "ui-selectmenu-custom-list" );

		if ( this.isMultiple ) {
			headerClose = $( "<a>", {
				"role": "button",
				"href": "#"
			} );
			headerCloseIcon = $( "<span>" );
			this._addClass( headerCloseIcon, "ui-selectmenu-custom-header-close-button-icon",
				"ui-icon ui-icon-delete" );
			headerClose.append( headerCloseIcon );
			this._addClass( headerClose, "ui-selectmenu-custom-header-close-button",
				"ui-button ui-toolbar-header-button-left ui-button-icon-only" );
			headerClose.appendTo( header );
		}

		$.extend( this, {
			selectId: selectId,
			menuId: menuId,
			popupId: popupId,
			dialogId: dialogId,
			thisPage: thisPage,
			menuPage: menuPage,
			menuPageHeader: menuPageHeader,
			label: label,
			isMultiple: isMultiple,
			theme: o.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: ""
		} );

		// Create list from select, update state
		this.refresh();

		this.element.attr( "tabindex", "-1" );
		this._on( this.element, { focus: "_handleSelectFocus" } );

		// Button events
		this._on( this.button, {
			vclick: "_handleButtonVclickKeydown"
		} );

		// Events for list items
		this.list.attr( "role", "listbox" );
		this._on( this.list, {
			"focusin": "_handleListFocus",
			"focusout": "_handleListFocus",
			"keydown": "_handleListKeydown",
			"click li:not(.ui-disabled,.ui-state-disabled,.ui-listview-item-divider)":
				"_handleListItemClick"
		} );

		// Events on the popup
		this._on( this.listbox, { popupafterclose: "_popupClosed" } );

		// Close button on small overlays
		if ( this.isMultiple ) {
			this._on( this.headerClose, { click: "_handleHeaderCloseClick" } );
		}

		this._on( this.document, { pagecontainerbeforetransition: "_handleBeforeTransition" } );

		return this;
	},

	_popupClosed: function() {
		this.close();
		this._delayedTrigger();
	},

	_delayedTrigger: function() {
		if ( this._triggerChange ) {
			this.element.trigger( "change" );
		}
		this._triggerChange = false;
	},

	_isRebuildRequired: function() {
		var list = this.list.find( "li" ),
			options = this._selectOptions().not( ".ui-screen-hidden" );

		// TODO exceedingly naive method to determine difference ignores value changes etc in favor
		// of a forcedRebuild from the user in the refresh method
		return options.text() !== list.text();
	},

	selected: function() {
		return this._selectOptions()
			.filter( ":selected:not( [data-" + this._ns() + "placeholder='true'] )" );
	},

	refresh: function( force ) {
		var indices, items;

		if ( this.options.nativeMenu ) {
			return this._super( force );
		}

		if ( force || this._isRebuildRequired() ) {
			this._buildList();
		}

		indices = this.selectedIndices();

		this.setButtonText();
		this.setButtonCount();

		items = this.list.find( "li:not(.ui-listview-item-divider)" );
		this._removeClass( items.find( "a" ), null, "ui-button-active" );

		items.attr( "aria-selected", false );

		items.each( $.proxy( function( i, element ) {
			var anchors,
				item = $( element );
			if ( $.inArray( i, indices ) > -1 ) {

				// Aria selected attr
				item.attr( "aria-selected", true );

				// Multiple selects: add the "on" checkbox state to the icon
				if ( this.isMultiple ) {
					anchors = item.find( "a" );
					this._removeClass( anchors, null, "ui-checkbox-off" );
					this._addClass( anchors, null, "ui-checkbox-on" );
				} else {
					if ( item.hasClass( "ui-screen-hidden" ) ) {
						this._addClass( item.next().find( "a" ), null, "ui-button-active" );
					} else {
						this._addClass( item.find( "a" ), null, "ui-button-active" );
					}
				}
			} else if ( this.isMultiple ) {
				anchors = item.find( "a" );
				this._removeClass( anchors, null, "ui-checkbox-on" );
				this._addClass( anchors, null, "ui-checkbox-off" );
			}
		}, this ) );
	},

	close: function() {
		if ( this.options.disabled || !this.isOpen ) {
			return;
		}

		if ( this.menuType === "page" ) {
			if ( this.menuPage.hasClass( "ui-page-active" ) ) {
				$.mobile.back();
			}
		} else {
			this.listbox.popup( "close" );
		}

		this._focusButton();

		// Allow the dialog to be closed again
		this.isOpen = false;
	},

	open: function() {
		this.button.click();
	},

	_focusMenuItem: function() {
		var selector = this.list.find( "a.ui-button-active" );
		if ( selector.length === 0 ) {
			selector = this.list.find( "li:not(" + unfocusableItemSelector +
				",[data-" + this._ns() + "role='placeholder'] ) a.ui-button" );
		}
		selector.first().focus();
	},

	_setTheme: function( key, value ) {
		this.listbox.popup( "option", key, value );

		// We cannot pass inherit to the dialog because pages are supposed to set the theme for
		// the pagecontainer in which they reside. If they set it to inherit the pagecontainer
		// will not inherit from anything above it.
		if ( value !== "inherit" ) {
			this.menuPage.page( "option", key, value );
		}

		if ( key === "theme" ) {
			this.header.toolbar( "option", key, value );
			this.menuPageHeader.toolbar( "option", key, value );
		}
	},

	_setOption: function( key, value ) {
		if ( !this.options.nativeMenu && ( key === "theme" || key === "overlayTheme" ) ) {
			this._setTheme( key, value );
		}

		if ( key === "hidePlaceholderMenuItems" ) {
			this._superApply( arguments );
			this.refresh( true );
			return;
		}

		if ( key === "closeText" ) {
			this.headerClose.text( value );
		}

		return this._superApply( arguments );
	},

	_decideFormat: function() {
		var pageWidget,
			theWindow = this.window,
			selfListParent = this.list.parent(),
			menuHeight = selfListParent.outerHeight(),
			scrollTop = theWindow.scrollTop(),
			buttonOffset = this.button.offset().top,
			screenHeight = theWindow.height();

		if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

			this.menuPage.appendTo( this.element.closest( ".ui-pagecontainer" ) );
			this.menuPageClose = this.menuPage.find( ".ui-toolbar-header a" );

			// Prevent the parent page from being removed from the DOM, otherwise the results of
			// selecting a list item in the dialog fall into a black hole
			pageWidget = this.thisPage.page( "instance" );
			pageWidget._off( pageWidget.document, "pagecontainerhide" );

			// For WebOS/Opera Mini (set lastscroll using button offset)
			if ( scrollTop === 0 && buttonOffset > screenHeight ) {
				this.thisPage.one( "pagehide", function() {
					$( this ).data( $.camelCase( this._ns() + "lastScroll" ), buttonOffset );
				} );
			}

			this._on( this.document, {
				pagecontainershow: "_handlePageContainerShow",
				pagecontainerhide: "_handlePageContainerHide"
			} );

			this.menuType = "page";
			this.menuPageContent.append( this.list );
			this.menuPage
				.find( "div .ui-toolbar-title" )
					.text( this.label.getEncodedText() || this.placeholder );
		} else {
			this.menuType = "overlay";

			this.listbox.one( { popupafteropen: $.proxy( this, "_focusMenuItem" ) } );
		}
		this._setTheme( "theme", this.options.theme );
		this._setTheme( "overlayTheme", this.options.overlayTheme );
	},

	_handlePageContainerShow: function( event, data ) {
		if ( data.toPage[ 0 ] === this.menuPage[ 0 ] ) {
			this._off( this.document, "pagecontainershow" );
			this._focusMenuItem();
		}
	},

	_handlePageContainerHide: function( event, data ) {
		if ( data.prevPage[ 0 ] === this.menuPage[ 0 ] ) {
			this._off( this.document, "pagecontainershow" );

			// After the dialog's done, we may want to trigger change if the value has actually
			// changed
			this._delayedTrigger();

			// TODO centralize page removal binding / handling in the page plugin.
			// Suggestion from @jblas to do refcounting.
			//
			// TODO extremely confusing dependency on the open method where the pagehide.remove
			// bindings are stripped to prevent the parent page from disappearing. The way we're
			// keeping pages in the DOM right now sucks
			//
			// Rebind the page remove that was unbound in the open function to allow for the parent
			// page removal from actions other than the use of a dialog sized custom select
			//
			// Doing this here provides for the back button on the custom select dialog
			this.thisPage.page( "bindRemove" );
			this.menuPage.detach();
			this.list.appendTo( this.listbox );
			this.close();
		}
	},

	_buildList: function() {
		var o = this.options,
			placeholder = this.placeholder,
			needPlaceholder = true,
			dataIcon = "false",
			optionsList, numOptions, select,
			dataPrefix = "data-" + this._ns(),
			dataIndexAttr = dataPrefix + "option-index",
			dataIconAttr = dataPrefix + "icon",
			dataRoleAttr = dataPrefix + "role",
			dataPlaceholderAttr = dataPrefix + "placeholder",
			fragment = document.createDocumentFragment(),
			isPlaceholderItem = false,
			optGroup,
			i,
			option, optionElement, parent, text, anchor, classes,
			optLabel, divider, item;

		this.list.empty().filter( ".ui-listview" ).listview( "destroy" );
		optionsList = this._selectOptions();
		numOptions = optionsList.length;
		select = this.element[ 0 ];

		for ( i = 0; i < numOptions; i++, isPlaceholderItem = false ) {
			option = optionsList[ i ];
			optionElement = $( option );

			// Do not create options based on ui-screen-hidden select options
			if ( optionElement.hasClass( "ui-screen-hidden" ) ) {
				continue;
			}

			parent = option.parentNode;
			classes = [];

			// Although using .text() here raises the risk that, when we later paste this into the
			// list item we end up pasting possibly malicious things like <script> tags, that risk
			// only arises if we do something like $( "<li><a href='#'>" + text + "</a></li>" ). We
			// don't do that. We do document.createTextNode( text ) instead, which guarantees that
			// whatever we paste in will end up as text, with characters like <, > and & escaped.
			text = optionElement.text();
			anchor = document.createElement( "a" );
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

			if ( needPlaceholder &&
				( !option.getAttribute( "value" ) ||
					text.length === 0 ||
					optionElement.data( $.camelCase( this._ns() + "placeholder" ) ) ) ) {
				needPlaceholder = false;
				isPlaceholderItem = true;

				// If we have identified a placeholder, record the fact that it was us who have
				// added the placeholder to the option. Mark it retroactively in the select.
				if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
					this._removePlaceholderAttr = true;
				}
				option.setAttribute( dataPlaceholderAttr, true );
				if ( o.hidePlaceholderMenuItems ) {
					classes.push( "ui-screen-hidden" );
				}
				if ( placeholder !== text ) {
					placeholder = this.placeholder = text;
				}
			}

			item = document.createElement( "li" );
			if ( option.disabled ) {
				classes.push( "ui-state-disabled" );
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
			if ( this.isMultiple ) {
				this._addClass( $( anchor ), null, "ui-button ui-checkbox-off ui-icon-end" );
			}

			item.appendChild( anchor );
			fragment.appendChild( item );
		}

		this.list[ 0 ].appendChild( fragment );

		// Hide header if it's not a multiselect and there's no placeholder
		if ( !this.isMultiple && !placeholder.length ) {
			this._addClass( this.header, null, "ui-screen-hidden" );
		} else {
			this.headerTitle.text( this.placeholder );
		}

		// Now populated, create listview
		this.list.listview();
	},

	_button: function() {
		var attributes = {
				"href": "#",
				"role": "button",

				// TODO value is undefined at creation
				"id": this.buttonId,
				"aria-haspopup": "true",

				// TODO value is undefined at creation
				"aria-owns": this.menuId
			};
		attributes[ "data-" + this._ns() + "transition" ] = "pop";

		if ( this._origTabIndex ) {
			attributes.tabindex = this._origTabIndex;
		}
		return this.options.nativeMenu ? this._super() : $( "<a>", attributes );
	},

	_destroy: function() {

		if ( !this.options.nativeMenu ) {
			this.close();

			// Restore the tabindex attribute to its original value
			if ( this._origTabIndex !== undefined ) {
				if ( this._origTabIndex !== false ) {
					this.element.attr( "tabindex", this._origTabIndex );
				} else {
					this.element.removeAttr( "tabindex" );
				}
			}

			// Remove the placeholder attribute if we were the ones to add it
			if ( this._removePlaceholderAttr ) {
				this._selectOptions().removeAttr( "data-" + this._ns() + "placeholder" );
			}

			// Remove the popup
			this.listbox.remove();

			// Remove the dialog
			this.menuPage.remove();
		}

		// Chain up
		this._super();
	}
} );

} );
