/*
* jQuery Mobile Framework : common functionality for the custom and native
*                           select menus
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {
	$.mobile.selectShared = function(){
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
			screen = $( "<div>", {"class": "ui-selectmenu-screen ui-screen-hidden"} ).appendTo( thisPage ),
			selectOptions = select.find("option"),
			isMultiple = widget.isMultiple = select[ 0 ].multiple,
			buttonId = selectID + "-button",
			menuId = selectID + "-menu",
			menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' data-" +$.mobile.ns + "theme='"+ widget.options.menuPageTheme +"'>" +
									"<div data-" + $.mobile.ns + "role='header'>" +
									"<div class='ui-title'>" + label.text() + "</div>"+
									"</div>"+
									"<div data-" + $.mobile.ns + "role='content'></div>"+
									"</div>" ).appendTo( $.mobile.pageContainer ).page(),

			listbox =  $("<div>", { "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all ui-body-" + widget.options.overlayTheme + " " + $.mobile.defaultDialogTransition } ).insertAfter(screen),

			list = $( "<ul>", {
				"class": "ui-selectmenu-list",
				"id": menuId,
				"role": "listbox",
				"aria-labelledby": buttonId
			}).attr( "data-" + $.mobile.ns + "theme", widget.options.theme ).appendTo( listbox ),

			header = $( "<div>", {
				"class": "ui-header ui-bar-" + widget.options.theme
			}).prependTo( listbox ),

			headerTitle = $( "<h1>", {
				"class": "ui-title"
			}).appendTo( header ),

			headerClose = $( "<a>", {
				"text": widget.options.closeText,
				"href": "#",
				"class": "ui-btn-left"
			}).attr( "data-" + $.mobile.ns + "iconpos", "notext" ).attr( "data-" + $.mobile.ns + "icon", "delete" ).appendTo( header ).buttonMarkup(),

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
	};
})(jQuery);