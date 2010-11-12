/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
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
		overlayTheme: 'a'
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
					.appendTo( $.pageContainer )
					.page(),	
					
			menuPageContent = menuPage.find( ".ui-content" ),	
					
			screen = $( "<div>", {"class": "ui-listbox-screen ui-overlay ui-screen-hidden fade"})
						.appendTo( thisPage ),		
								
			listbox = $( "<div>", { "class": "ui-listbox ui-listbox-hidden ui-overlay-shadow ui-corner-all pop ui-body-" + o.overlayTheme } )
					.insertAfter(screen),
					
			list = $( "<ul>", { 
					"class": "ui-listbox-list", 
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
		button.click(function(event){
			self.open();
			return false;
		});
		
		//events for list items
		list.delegate("li",'click', function(){
				//update select	
				var newIndex = list.find( "li" ).index( this ),
					prevIndex = select[0].selectedIndex;

				select[0].selectedIndex = newIndex;
				
				//trigger change event
				if(newIndex !== prevIndex){ 
					select.trigger( "change" ); 
				}
				
				self.refresh();
				
				//hide custom select
				self.close();
				return false;
			});	
	
		//events on "screen" overlay
		screen.click(function(){
			self.close();
			return false;
		});	
	},
	
	_buildList: function(){
		var self = this;
		
		self.list.empty().filter('.ui-listview').listview('destroy');
		
		//populate menu with options from select element
		self.select.find( "option" ).each(function( i ){
				var anchor = $("<a>", { 
							"role": "option", 
							"href": "#"
						})
						.text( $(this).text() );
			
			$( "<li>", {"data-icon": "checkbox-on"})
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
			.find('li').removeClass( $.mobile.activeBtnClass ).attr('aria-selected', false)
			.eq(selected).addClass( $.mobile.activeBtnClass ).find('a').attr('aria-selected', true);		
	},
	
	open: function(){
		if( this.options.disabled ){ return; }
		
		var self = this,
			menuHeight = self.list.outerHeight(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight;
			
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
				.removeClass( "ui-listbox-hidden" )
				.css({
					top: scrollTop + (screenHeight/2), 
					"margin-top": -menuHeight/2,
					left: window.innerWidth/2,
					"margin-left": -1* self.listbox.outerWidth() / 2
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
			self.listbox.addClass( "ui-listbox-hidden" ).removeAttr( "style" ).removeClass("in");
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
	
