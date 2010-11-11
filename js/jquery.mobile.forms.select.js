/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function ( $ ) {
$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: undefined
	},
	_create: function(){
	
		var self = this,
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
					iconpos: 'right',
					icon: 'arrow-d',
					theme: this.options.theme
				}),
				
			theme = /ui-btn-up-([a-z])/.exec( button.attr("class") )[1],
				
			menuPage = $( "<div data-role='dialog' data-theme='"+ theme +"'>" +
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
								
			listbox = $( "<div>", { "class": "ui-listbox ui-listbox-hidden ui-overlay-shadow ui-corner-all pop ui-body-" + theme } )
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
					
		//populate menu with options from select element
		select.find( "option" ).each(function( i ){
			var selected = (select[0].selectedIndex == i),
				anchor = $("<a>", { 
							"aria-selected": selected, 
							"role": "option", 
							"href": "#"
						})
						.text( $(this).text() );
			
			$( "<li>", {
					"class": selected ? "ui-btn-active" : '', 
					"data-icon": "checkbox-on"
				})
				.append( anchor )
				.appendTo( list );
		});
		
		//now populated, create listview
		list.listview();
		
		

		
		//page show/hide events
		menuPage
			.bind("pageshow", function(){
				list.find( ".ui-btn-active" ).focus();
				return false;
			})
			.bind("pagehide", function(){
				select.focus();
				listbox.append( list ).removeAttr('style');
				return false;
			});
			

		//select properties,events
		select
			.change(function(){ 
				self.refresh();
			})
			.focus(function(){
				$(this).blur();
				button.focus();
			});		
		
		//button events
		button.mousedown(function(event){
			self.open();
			return false;
		});
		
		//apply click events for items
		list
			.find("li")
			.mousedown(function(){
				//deselect active
				list.find( "li" )
					.removeClass( "ui-btn-active" )
					.children(0)
					.attr( "aria-selected", "false");
					
				//select this one	
				$(this)
					.addClass( "ui-btn-active" )
					.find( "a" )
					.attr( "aria-selected", "true");
				
				//update select	
				var newIndex = list.find( "li" ).index( this ),
					prevIndex = select[0].selectedIndex;

				select[0].selectedIndex = newIndex;
				
				//trigger change event
				if(newIndex !== prevIndex){ 
					select.trigger( "change" ); 
				}
				
				//hide custom select
				self.close();
				return false;
			});	
	
		//hide on outside click
		screen.click(function(){
			self.open();
			return false;
		});	
	},
	
	open: function(){
		var self = this,
			menuHeight = self.list.outerHeight(),
			scrollTop = $(window).scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = window.innerHeight;
		
		
		
		if( menuHeight > screenHeight - 80 || !$.support.scrollTop ){
			
			//for webos (set lastscroll using button offset)
			if( scrollTop == 0 && btnOffset > screenHeight ){
				self.thisPage.one('pagehide',function(){
					$(this).data('lastScroll', btnOffset);
				});	
			}
		
			self.menuType = "page";		
			self.menuPageContent.append( self.list );
			$.changePage(self.menuPage, 'pop', false, false);
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
		}
	},
	
	close: function(){
		var self = this;
		if(self.menuType == "page"){			
			$.changePage([self.menuPage,self.thisPage], 'pop', true, false);
		}
		else{
			self.screen.addClass( "ui-screen-hidden" );
			self.listbox.addClass( "ui-listbox-hidden" ).removeAttr( "style" ).removeClass("in");
		}
	},
	
	refresh: function(){
		var select = this.element;
		select.prev().find( ".ui-btn-text" ).text( $(select[0].options.item(select[0].selectedIndex)).text() ); 
		//TODO - refresh should populate the menu with new options from the select
	},
	
	disable: function(){
		this.element.attr("disabled",true);
		this.element.prev('a').addClass('ui-disabled');
	},
	
	enable: function(){
		this.element.attr("disabled",false);
		this.element.prev('a').removeClass('ui-disabled');
	}
});
})( jQuery );
	
