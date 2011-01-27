/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: 'arrow-d',
		iconpos: 'right',
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		menuPageTheme: 'b',
		overlayTheme: 'a',
		hidePlaceholderMenuItems: true,
		closeText: 'Close',
		useNativeMenu: false
	},
	_create: function(){

		var self = this,

			o = this.options,

			select = this.element
						.wrap( "<div class='ui-select'>" ),

			selectID = select.attr( "id" ),

			isMultiple = self.isMultiple = select[0].multiple,

			options = select.find("option"),

			label = $( "label[for="+ selectID +"]" ).addClass( "ui-select" ),

			buttonId = selectID + "-button",

			menuId = selectID + "-menu",

			thisPage = select.closest( ".ui-page" ),

			button = $( "<a>", {
					"href": "#",
					"role": "button",
					"id": buttonId,
					"aria-haspopup": "true",
					"aria-owns": menuId
				})
				.text( $( select[0].options.item(select[0].selectedIndex) ).text() )
				.insertBefore( select )
				.buttonMarkup({
					theme: o.theme,
					icon: o.icon,
					iconpos: o.iconpos,
					inline: o.inline,
					corners: o.corners,
					shadow: o.shadow,
					iconshadow: o.iconshadow
				}),

			theme = /ui-btn-up-([a-z])/.exec( button.attr("class") )[1],

			menuPage = $( "<div data-role='dialog' data-theme='"+ o.menuPageTheme +"'>" +
						"<div data-role='header'>" +
							"<div class='ui-title'>" + label.text() + "</div>"+
						"</div>"+
						"<div data-role='content'></div>"+
					"</div>" )
					.appendTo( $.mobile.pageContainer )
					.page(),

			menuPageContent = menuPage.find( ".ui-content" ),

			menuPageClose = menuPage.find( ".ui-header a" ),

			screen = $( "<div>", {"class": "ui-selectmenu-screen ui-screen-hidden"})
						.appendTo( thisPage ),

			listbox = $( "<div>", { "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all pop ui-body-" + o.overlayTheme } )
					.insertAfter(screen),

			list = $( "<ul>", {
					"class": "ui-selectmenu-list",
					"id": menuId,
					"role": "listbox",
					"aria-labelledby": buttonId,
					"data-theme": theme
				})
				.appendTo( listbox ),

			header = $( "<div>", {
					"class": "ui-header ui-bar-" + theme
				})
				.prependTo( listbox ),

			headerTitle = $( "<h1>", {
					"class": "ui-title"
				})
				.appendTo( header ),

			headerClose = $( "<a>", {
					"data-iconpos": "notext",
					"data-icon": "delete",
					"text": o.closeText,
					"href": "#",
					"class": "ui-btn-left"
				})
				.appendTo( header )
				.buttonMarkup(),

			menuType;

		// set to native menu
		o.useNativeMenu = select.is( "[data-native]");

		// add counter for multi selects
		if( isMultiple ){
			self.buttonCount = $('<span>')
				.addClass( 'ui-li-count ui-btn-up-c ui-btn-corner-all' )
				.hide()
				.appendTo( button );
		}

		//expose to other methods
		$.extend(self, {
			select: select,
			optionElems: options,
			selectID: selectID,
			label: label,
			buttonId:buttonId,
			menuId:menuId,
			thisPage:thisPage,
			button:button,
			menuPage:menuPage,
			menuPageContent:menuPageContent,
			screen:screen,
			listbox:listbox,
			list:list,
			menuType:menuType,
			header:header,
			headerClose:headerClose,
			headerTitle:headerTitle,
			placeholder: ''
		});

		//create list from select, update state
		self.refresh();

		//disable if specified
		if( o.disabled ){ this.disable(); }

		//events on native select
		select
			.change(function(){
				self.refresh();
			});

		//support for using the native select menu with a custom button
		if( o.useNativeMenu ){

			select
				.appendTo(button)
				.bind( "touchstart mousedown", function( e ){
					//add active class to button
					button.addClass( $.mobile.activeBtnClass );

					//ensure button isn't clicked
					e.stopPropagation();
				})
				.bind( "focus mouseover", function(){
					button.trigger( "mouseover" );
				})
				.bind( "blur mouseout", function(){
					button
						.trigger( "mouseout" )
						.removeClass( $.mobile.activeBtnClass );
				});

			button.attr( "tabindex", "-1" );
		} else {

			select
				.attr( "tabindex", "-1" )
				.focus(function(){
					$(this).blur();
					button.focus();
				});

			//button events
			button
				.bind( "touchstart" , function( event ){
					//set startTouches to cached copy of
					$( this ).data( "startTouches", $.extend({}, event.originalEvent.touches[ 0 ]) );
				})
				.bind( $.support.touch ? "touchend" : "mouseup" , function( event ){
					//if it's a scroll, don't open
					if( $( this ).data( "moved" ) ){
						$( this ).removeData( "moved" );
					} else {
						self.open();
					}
					event.preventDefault();
				})
				.bind( "touchmove", function( event ){
					//if touch moved enough, set data moved and don't open menu
					var thisTouches = event.originalEvent.touches[ 0 ],
					startTouches = $( this ).data( "startTouches" ),
					deltaX = Math.abs(thisTouches.pageX - startTouches.pageX),
					deltaY = Math.abs(thisTouches.pageY - startTouches.pageY);

					if( deltaX > 10 || deltaY > 10 ){
						$( this ).data( "moved", true );
					}
				});
		}

		//events for list items
		list.delegate("li:not(.ui-disabled, .ui-li-divider)", "click", function(event){
			// clicking on the list item fires click on the link in listview.js.
			// to prevent this handler from firing twice if the link isn't clicked on,
			// short circuit unless the target is the link
			if( !$(event.target).is("a") ){ return; }

			// index of option tag to be selected
			var newIndex = list.find( "li:not(.ui-li-divider)" ).index( this ),
				option = self.optionElems.eq( newIndex )[0];

			// toggle selected status on the tag for multi selects
			option.selected = isMultiple ? !option.selected : true;

			// toggle checkbox class for multiple selects
			if( isMultiple ){
				$(this)
					.find('.ui-icon')
					.toggleClass('ui-icon-checkbox-on', option.selected)
					.toggleClass('ui-icon-checkbox-off', !option.selected);
			}

			// trigger change
			select.trigger( "change" );

			//hide custom select for single selects only
			if( !isMultiple ){
				self.close();
			}

			event.preventDefault();
		});

		//events on "screen" overlay + close button
		screen
			.add( headerClose )
			.add( menuPageClose )
			.bind("click", function(event){
				self.close();
				event.preventDefault();

				// if the dialog's close icon was clicked, prevent the dialog's close
				// handler from firing. selectmenu's should take precedence
				if( $.contains(menuPageClose[0], event.target) ){
					event.stopImmediatePropagation();
				}
			});
	},

	_buildList: function(){
		var self = this,
			optgroups = [],
			o = this.options,
			placeholder = this.placeholder;

		self.list.empty().filter('.ui-listview').listview('destroy');

		//populate menu with options from select element
		self.select.find( "option" ).each(function( i ){
			var $this = $(this),
				$parent = $this.parent(),
				text = $this.text();

			// are we inside an optgroup?
			if( $parent.is("optgroup") ){
				var optLabel = $parent.attr("label");

				// has this optgroup already been built yet?
				if( $.inArray(optLabel, optgroups) === -1 ){
					$("<li>", {
						"data-role":"list-divider",
						"text": optLabel
					}).appendTo( self.list );

					optgroups.push( optLabel );
				}
			}

			var anchor = $("<a>", {
				"role": "",
				"href": "#",
				"text": text
			}),

			item = $( "<li>", { "data-icon": false });

			if( !this.getAttribute('value') || text.length == 0 || $this.data('placeholder') ){
				if( o.hidePlaceholderMenuItems ){
					item.addClass('ui-selectmenu-placeholder');
				}

				placeholder = self.placeholder = text;
			}

			// multiple select defaults
			if( self.isMultiple ){
				item.data('icon', 'checkbox-off');
			}

			// support disabled option tags
			if( this.disabled ){
				item.addClass("ui-disabled")
					.attr("aria-disabled", true);
			}

			item
				.append( anchor )
				.appendTo( self.list );
		});

		// hide header close link for single selects
		if( !this.isMultiple ){
			this.headerClose.hide();
		}

		// hide header if it's not a multiselect and there's no placeholder
		if( !this.isMultiple && !placeholder.length ){
			this.header.hide();
		} else {
			this.headerTitle.text( this.placeholder );
		}

		//now populated, create listview
		self.list.listview();
	},

	refresh: function( forceRebuild ){
		var self = this,
			select = this.element,
			isMultiple = this.isMultiple,
			options = this.optionElems = select.find("option"),
			selected = options.filter(":selected"),

			// return an array of all selected index's
			indicies = selected.map(function(){
				return options.index( this );
			}).get();

		if( forceRebuild || select[0].options.length > self.list.find('li').length ){
			self._buildList();
		}

		self.button
			.find( ".ui-btn-text" )
			.text(function(){
				if( !isMultiple ){
					return selected.text();
				}

				return selected.length ?
					selected.map(function(){ return $(this).text(); }).get().join(', ') :
					self.placeholder;
			});

		// multiple count inside button
		if( isMultiple ){
			self.buttonCount[ selected.length > 1 ? 'show' : 'hide' ]().text( selected.length );
		}

		self.list
			.find( 'li:not(.ui-li-divider)' )
			.removeClass( $.mobile.activeBtnClass )
			.attr( 'aria-selected', false )
			.each(function( i ){
				if( $.inArray(i, indicies) > -1 ){
					var item = $(this).addClass( $.mobile.activeBtnClass );

					// aria selected attr
					item.find( 'a' ).attr( 'aria-selected', true );

					// multiple selects: add the "on" checkbox state to the icon
					if( isMultiple ){
						item.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
					}
				}
			});
	},

	open: function(){
		if( this.options.disabled ){ return; }

		var self = this,
			menuHeight = self.list.outerHeight(),
			menuWidth = self.list.outerWidth(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight,
			screenWidth = window.innerWidth,
			dialogUsed = self.list.parents('.ui-dialog').length;

		//add active class to button
		self.button.addClass( $.mobile.activeBtnClass );

		function focusMenuItem(){
			self.list.find( ".ui-btn-active" ).focus();
		}

		// NOTE addresses issue with firefox outerHeight when the parent dialog
		//      is display: none. Upstream?
		if( dialogUsed || menuHeight > screenHeight - 80 || !$.support.scrollTop ){

			//for webos (set lastscroll using button offset)
			if( scrollTop == 0 && btnOffset > screenHeight ){
				self.thisPage.one('pagehide',function(){
					$(this).data('lastScroll', btnOffset);
				});
			}

			self.menuPage.one('pageshow',focusMenuItem);

			self.menuType = "page";
			self.menuPageContent.append( self.list );
			$.mobile.changePage(self.menuPage, 'pop', false, false);
		}
		else {
			self.menuType = "overlay";

			self.screen
				.height( $(document).height() )
				.removeClass('ui-screen-hidden');

			self.listbox
				.append( self.list )
				.removeClass( "ui-selectmenu-hidden" )
				.position({
					my: "center center",
					at: "center center",
					of: self.button,
					collision: "fit"
				})
				.addClass("in");

			focusMenuItem();
		}

		// wait before the dialog can be closed
		setTimeout(function(){
		 	self.isOpen = true;
		}, 400);
	},

	close: function(){
		if( this.options.disabled || !this.isOpen ){ return; }
		var self = this;

		function focusButton(){
			setTimeout(function(){
				self.button.focus();

				//remove active class from button
				self.button.removeClass( $.mobile.activeBtnClass );
			}, 40);

			self.listbox.removeAttr('style').append( self.list );
		}

		if(self.menuType == "page"){
			$.mobile.changePage([self.menuPage,self.thisPage], 'pop', true, false);
			self.menuPage.one("pagehide", focusButton);
		}
		else{
			self.screen.addClass( "ui-screen-hidden" );
			self.listbox.addClass( "ui-selectmenu-hidden" ).removeAttr( "style" ).removeClass("in");
			focusButton();
		}

		// allow the dialog to be closed again
		this.isOpen = false;
	},

	disable: function(){
		this.element.attr("disabled",true);
		this.button.addClass('ui-disabled').attr("aria-disabled", true);
		return this._setOption( "disabled", true );
	},

	enable: function(){
		this.element.attr("disabled",false);
		this.button.removeClass('ui-disabled').attr("aria-disabled", false);
		return this._setOption( "disabled", false );
	}
});
})( jQuery );

