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
		nativeMenu: true
	},
	_create: function(){
		
		var self = this,

			o = this.options,

			select = this.element
						.wrap( "<div class='ui-select'>" ),

			selectID = select.attr( "id" ),

			label = $( "label[for="+ selectID +"]" ).addClass( "ui-select" ),
			
			//IE throws an exception at options.item() function when
			//there is no selected item
			//select first in this case 
			selectedIndex = select[0].selectedIndex == -1 ? 0 : select[0].selectedIndex,
			
			button = ( self.options.nativeMenu ? $( "<div/>" ) : $( "<a>", {
					"href": "#",
					"role": "button",
					"id": buttonId,
					"aria-haspopup": "true",
					"aria-owns": menuId
				}) )
				.text( $( select[0].options.item( selectedIndex ) ).text() )
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

			//multi select or not
			isMultiple = self.isMultiple = select[0].multiple;

		//Opera does not properly support opacity on select elements
		//In Mini, it hides the element, but not its text
		//On the desktop,it seems to do the opposite
		//for these reasons, using the nativeMenu option results in a full native select in Opera
		if( o.nativeMenu && window.opera && window.opera.version ){
			select.addClass( "ui-select-nativeonly" );
		}

		//vars for non-native menus
		if( !o.nativeMenu ){
			var options = select.find("option"),

				buttonId = selectID + "-button",

				menuId = selectID + "-menu",

				thisPage = select.closest( ".ui-page" ),

				//button theme
				theme = /ui-btn-up-([a-z])/.exec( button.attr("class") )[1],

				menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' data-" +$.mobile.ns + "theme='"+ o.menuPageTheme +"'>" +
							"<div data-" + $.mobile.ns + "role='header'>" +
								"<div class='ui-title'>" + label.text() + "</div>"+
							"</div>"+
							"<div data-" + $.mobile.ns + "role='content'></div>"+
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
						"aria-labelledby": buttonId
					})
					.attr( "data-" + $.mobile.ns + "theme", theme )
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
						"text": o.closeText,
						"href": "#",
						"class": "ui-btn-left"
					})
					.attr( "data-" + $.mobile.ns + "iconpos", "notext" )
					.attr( "data-" + $.mobile.ns + "icon", "delete" )
					.appendTo( header )
					.buttonMarkup(),

				menuType;
		} //end non native vars

		// add counter for multi selects
		if( isMultiple ){
			self.buttonCount = $('<span>')
				.addClass( 'ui-li-count ui-btn-up-c ui-btn-corner-all' )
				.hide()
				.appendTo( button );
		}

		//disable if specified
		if( o.disabled ){ this.disable(); }

		//events on native select
		select
			.change(function(){
				self.refresh();
			});

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

		//support for using the native select menu with a custom button
		if( o.nativeMenu ){

			select
				.appendTo(button)
				.bind( "vmousedown", function( e ){
					//add active class to button
					button.addClass( $.mobile.activeBtnClass );
				})
				.bind( "focus vmouseover", function(){
					button.trigger( "vmouseover" );
				})
				.bind( "vmousemove", function(){
					//remove active class on scroll/touchmove
					button.removeClass( $.mobile.activeBtnClass );
				})
				.bind( "change blur vmouseout", function(){
					button
						.trigger( "vmouseout" )
						.removeClass( $.mobile.activeBtnClass );
				});


		} else {

			//create list from select, update state
			self.refresh();

			select
				.attr( "tabindex", "-1" )
				.focus(function(){
					$(this).blur();
					button.focus();
				});	

			//button events
			button
				.bind( "vclick keydown" , function( event ){
					if( event.type == "vclick" || 
						event.keyCode && ( event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE ) ){
						self.open();
						event.preventDefault();
					}
				});

			//events for list items
			list
			.attr( "role", "listbox" )
			.delegate( ".ui-li>a", "focusin", function() {
				$( this ).attr( "tabindex", "0" );
			})
			.delegate( ".ui-li>a", "focusout", function() {
				$( this ).attr( "tabindex", "-1" );
			})
			.delegate("li:not(.ui-disabled, .ui-li-divider)", "vclick", function(event){

				// index of option tag to be selected
				var oldIndex = select[0].selectedIndex,
					newIndex = list.find( "li:not(.ui-li-divider)" ).index( this ),
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

				// trigger change if value changed
				if( oldIndex !== newIndex ){
					select.trigger( "change" );
				}

				//hide custom select for single selects only
				if( !isMultiple ){
					self.close();
				}

				event.preventDefault();
			})
			//keyboard events for menu items
			.keydown(function( e ) {
				var target = $( e.target ),
					li = target.closest( "li" );
	
				// switch logic based on which key was pressed
				switch ( e.keyCode ) {
					// up or left arrow keys
					case 38:
						var prev = li.prev();
	
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
						var next = li.next();
					
						// if there's a next option, focus it
						if ( next.length ) {
							target
								.blur()
								.attr( "tabindex", "-1" );
							
							next.find( "a" ).first().focus();
						}	
	
						return false;
					break;
	
					// if enter or space is pressed, trigger click
					case 13:
					case 32:
						 target.trigger( "vclick" );
	
						 return false;
					break;	
				}
			});	

			//events on "screen" overlay
			screen.bind("vclick", function( event ){
				self.close();
			});
			
			//close button on small overlays
			self.headerClose.click(function(){
				if( self.menuType == "overlay" ){
					self.close();
					return false;
				}
			})
		}
	},

	_buildList: function(){
		var self = this,
			o = this.options,
			placeholder = this.placeholder,
			optgroups = [],
			lis = [],
			dataIcon = self.isMultiple ? "checkbox-off" : "false";

		self.list.empty().filter('.ui-listview').listview('destroy');

		//populate menu with options from select element
		self.select.find( "option" ).each(function( i ){
			var $this = $(this),
				$parent = $this.parent(),
				text = $this.text(),
				anchor = "<a href='#'>"+ text +"</a>",
				classes = [],
				extraAttrs = [];

			// are we inside an optgroup?
			if( $parent.is("optgroup") ){
				var optLabel = $parent.attr("label");

				// has this optgroup already been built yet?
				if( $.inArray(optLabel, optgroups) === -1 ){
					lis.push( "<li data-" + $.mobile.ns + "role='list-divider'>"+ optLabel +"</li>" );
					optgroups.push( optLabel );
				}
			}

			//find placeholder text
			if( !this.getAttribute('value') || text.length == 0 || $this.jqmData('placeholder') ){
				if( o.hidePlaceholderMenuItems ){
					classes.push( "ui-selectmenu-placeholder" );
				}
				placeholder = self.placeholder = text;
			}

			// support disabled option tags
			if( this.disabled ){
				classes.push( "ui-disabled" );
				extraAttrs.push( "aria-disabled='true'" );
			}

			lis.push( "<li data-" + $.mobile.ns + "icon='"+ dataIcon +"' class='"+ classes.join(" ") + "' " + extraAttrs.join(" ") +">"+ anchor +"</li>" )
		});

		self.list.html( lis.join(" ") );
		
		self.list.find( "li" )
			.attr({ "role": "option", "tabindex": "-1" })
			.first().attr( "tabindex", "0" );

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

		if( !self.options.nativeMenu && ( forceRebuild || select[0].options.length != self.list.find('li').length )){
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

		if( !self.options.nativeMenu ){
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
		}
	},

	open: function(){
		if( this.options.disabled || this.options.nativeMenu ){ return; }

		var self = this,
			menuHeight = self.list.parent().outerHeight(),
			menuWidth = self.list.parent().outerWidth(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight,
			screenWidth = window.innerWidth;

		//add active class to button
		self.button.addClass( $.mobile.activeBtnClass );

		//remove after delay
		setTimeout(function(){
			self.button.removeClass( $.mobile.activeBtnClass );
		}, 300);

		function focusMenuItem(){
			self.list.find( ".ui-btn-active" ).focus();
		}

		if( menuHeight > screenHeight - 80 || !$.support.scrollTop ){

			//for webos (set lastscroll using button offset)
			if( scrollTop == 0 && btnOffset > screenHeight ){
				self.thisPage.one('pagehide',function(){
					$(this).jqmData('lastScroll', btnOffset);
				});
			}

			self.menuPage.one('pageshow', function() {
				// silentScroll() is called whenever a page is shown to restore
				// any previous scroll position the page may have had. We need to
				// wait for the "silentscroll" event before setting focus to avoid
				// the browser's "feature" which offsets rendering to make sure
				// whatever has focus is in view.
				$(window).one("silentscroll", function(){ focusMenuItem(); });
			});

			self.menuType = "page";
			self.menuPageContent.append( self.list );
			$.mobile.changePage(self.menuPage, 'pop', false, true);
		}
		else {
			self.menuType = "overlay";

			self.screen
				.height( $(document).height() )
				.removeClass('ui-screen-hidden');

			//try and center the overlay over the button
			var roomtop = btnOffset - scrollTop,
				roombot = scrollTop + screenHeight - btnOffset,
				halfheight = menuHeight / 2,
				maxwidth = parseFloat(self.list.parent().css('max-width')),
				newtop, newleft;

			if( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ){
				newtop = btnOffset + ( self.button.outerHeight() / 2 ) - halfheight;
			}
			else{
				//30px tolerance off the edges
				newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
			}

			// if the menuwidth is smaller than the screen center is
			if (menuWidth < maxwidth) {
				newleft = (screenWidth - menuWidth) / 2;
			} else { //otherwise insure a >= 30px offset from the left
				newleft = self.button.offset().left + self.button.outerWidth() / 2 - menuWidth / 2;
				// 30px tolerance off the edges
				if (newleft < 30) {
					newleft = 30;
				} else if ((newleft + menuWidth) > screenWidth) {
					newleft = screenWidth - menuWidth - 30;
				}
			}

			self.listbox
				.append( self.list )
				.removeClass( "ui-selectmenu-hidden" )
				.css({
					top: newtop,
					left: newleft
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
		if( this.options.disabled || !this.isOpen || this.options.nativeMenu ){ return; }
		var self = this;

		function focusButton(){
			setTimeout(function(){
				self.button.focus();
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

