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
		hidePlaceholderMenuItems: true
	},
	_create: function(){
	
		var self = this,
		
			o = this.options,
			
			select = this.element
						.attr( "tabindex", "-1" )
						.wrap( "<div class='ui-select'>" ),		
							
			selectID = select.attr( "id" ),
			
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
				
			menuType;	
			
		//expose to other methods	
		$.extend(self, {
			select: select,
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
			menuType:menuType
		});
					
		
		//create list from select, update state
		self.refresh();
		
		//disable if specified
		if( this.options.disabled ){ this.disable(); }

		//events on native select
		select
			.change(function(){ 
				self.refresh();
			})
			.focus(function(){
				$(this).blur();
				button.focus();
			});		
		
		//button events
		button.bind( $.support.touch ? "touchstart" : "click", function(event){
			self.open();
			event.preventDefault();
		});
		
		//events for list items
		list.delegate("li:not(.ui-disabled, .ui-li-divider)", "click", function(event){
				//update select	
				var newIndex = list.find( "li:not(.ui-li-divider)" ).index( this ),
					prevIndex = select[0].selectedIndex;

				select[0].selectedIndex = newIndex;
				
				//trigger change event
				if(newIndex !== prevIndex){ 
					select.trigger( "change" ); 
				}
				
				self.refresh();
				
				//hide custom select
				self.close();
				event.preventDefault();
			});	
	
		//events on "screen" overlay
		screen.click(function(event){
			self.close();
			event.preventDefault();
		});
	},
	
	_buildList: function(){
		var self = this, 
			optgroups = [],
			o = this.options;
		
		self.list.empty().filter('.ui-listview').listview('destroy');
		
		//populate menu with options from select element
		self.select.find( "option" ).each(function( i ){
			var $this = $(this),
				$parent = $this.parent();
			
			// are we inside an optgroup?
			if( $parent.is("optgroup") ){
				var optLabel = $parent.attr("label");
				
				// has this optgroup already been built yet?
				if( $.inArray(optLabel, optgroups) === -1 ){
					var optgroup = $('<li data-role="list-divider"></li>')
						.text( optLabel )
						.appendTo( self.list );
					
					optgroups.push( optLabel );
				}
			}

			var anchor = $("<a>", { 
				"role": "option", 
				"href": "#",
				"text": $(this).text()
			}),
		
			item = $( "<li>", {"data-icon": "checkbox-on"});
			
			// support disabled option tags
			if( this.disabled ){
				item
					.addClass("ui-disabled")
					.attr("aria-disabled", true);
			}
			
			if( o.hidePlaceholderMenuItems ){
				if( !this.getAttribute('value') || $(this).text().length == 0 || $(this).data('placeholder')){
					item.addClass('ui-selectmenu-placeholder');
				}
			}

			item
				.append( anchor )
				.appendTo( self.list );
		});
		
		//now populated, create listview
		self.list.listview();		
	},
	
	refresh: function( forceRebuild ){
		var self = this,
			select = this.element,
			selected = select[0].selectedIndex;
		
		if( forceRebuild || select[0].options.length > self.list.find('li').length ){
			self._buildList();
		}	
			
		self.button.find( ".ui-btn-text" ).text( $(select[0].options.item(selected)).text() ); 
		self.list
			.find('li:not(.ui-li-divider)').removeClass( $.mobile.activeBtnClass ).attr('aria-selected', false)
			.eq(selected).addClass( $.mobile.activeBtnClass ).find('a').attr('aria-selected', true);		
	},
	
	open: function(){
		if( this.options.disabled ){ return; }
		
		var self = this,
			menuHeight = self.list.outerHeight(),
			menuWidth = self.list.outerWidth(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight,
			screenWidth = window.innerWidth;
			
		//add active class to button
		self.button.addClass( $.mobile.activeBtnClass );
			
		function focusMenuItem(){
			self.list.find( ".ui-btn-active" ).focus();
		}
		
		if( menuHeight > screenHeight - 80 || !$.support.scrollTop ){
			
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
	},
	
	close: function(){
		if( this.options.disabled ){ return; }
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
			self.menuPage.one("pagehide",function(){
				focusButton();
				//return false;
			});
		}
		else{
			self.screen.addClass( "ui-screen-hidden" );
			self.listbox.addClass( "ui-selectmenu-hidden" ).removeAttr( "style" ).removeClass("in");
			focusButton();
		}
		
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
	
