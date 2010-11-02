/*
* jQuery Mobile Framework : "customSelect" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){
$.fn.customSelect = function(options){
	return $(this).each(function(){	
		var select = $(this)
						.attr( "tabindex", "-1" )
						.wrap( "<div class='ui-select'>" ),
			selectID = select.attr( "id" ),
			label = $( "label[for="+ selectID +"]" )
						.addClass( "ui-select" ),
				
		//extendable options
		o = $.extend({
			chooseText: label.text(),
			theme: select.data("theme")
		}, options),

		buttonId = selectID + "-button",
		menuId = selectID + "-menu",
		thisPage = select.closest( ".ui-page" ),
		menuType,
		currScroll,		
		button = $( "<a>", { 
				"href": "#",
				"role": "button",
				"id": buttonId,
				"aria-haspopup": "true",
				"aria-owns": menuId 
			})
			.text( $( this.options.item(this.selectedIndex) ).text() )
			.insertBefore( select )
			.buttonMarkup({
				iconpos: 'right',
				icon: 'arrow-d',
				theme: o.theme
			}),
		menuPage = $( "<div data-role='dialog' data-theme='a'>" +
					"<div data-role='header' data-theme='b'>" +
						"<div class='ui-title'>" + o.chooseText + "</div>"+
					"</div>"+
					"<div data-role='content'></div>"+
				"</div>" )
				.appendTo( $.pageContainer )
				.page(),	
		menuPageContent = menuPage.find( ".ui-content" ),			
		screen = $( "<div>", {
						"class": "ui-listbox-screen ui-overlay ui-screen-hidden fade"
				})
				.appendTo( thisPage ),					
		listbox = $( "<div>", { "class": "ui-listbox ui-listbox-hidden ui-body-a ui-overlay-shadow ui-corner-all pop"} )
				.insertAfter(screen),
		list = $( "<ul>", { 
				"class": "ui-listbox-list", 
				"id": menuId, 
				"role": "listbox", 
				"aria-labelledby": buttonId
			})
			.appendTo( listbox );
			
		//populate menu
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
		
		
		
		function showmenu(){
			var menuHeight = list.outerHeight();
			currScroll = [ $(window).scrollLeft(), $(window).scrollTop() ];
			
			if( menuHeight > window.innerHeight - 80 || !$.support.scrollTop ){
				menuType = "page";		
				menuPageContent.append( list );
				$.changePage(menuPage, undefined);
			}
			else {
				menuType = "overlay";
				
				screen
					.height( $(document).height() )
					.removeClass('ui-screen-hidden');
					
				listbox
					.append( list )
					.removeClass( "ui-listbox-hidden" )
					.css({
						top: $(window).scrollTop() + (window.innerHeight/2), 
						"margin-top": -menuHeight/2,
						left: window.innerWidth/2,
						"margin-left": -1* listbox.outerWidth() / 2
					})
					.addClass("in");
			}
		};
		
		function hidemenu(){
			if(menuType == "page"){			
				$.changePage([menuPage,thisPage], undefined, true);
			}
			else{
				screen.addClass( "ui-screen-hidden" );
				listbox.addClass( "ui-listbox-hidden" ).removeAttr( "style" ).removeClass("in");
			}
		};
		
		//page show/hide events
		menuPage
			.bind("pageshow", function(){
				list.find( ".ui-btn-active" ).focus();
				return false;
			})
			.bind("pagehide", function(){
				window.scrollTo(currScroll[0], currScroll[1]);
				select.focus();
				listbox.append( list ).removeAttr('style');
				return false;
			});
			

		//select properties,events
		select
			.change(function(){ 
				var $el = select.get(0);
				button.find( ".ui-btn-text" ).text( $($el.options.item($el.selectedIndex)).text() ); 
			})
			.focus(function(){
				$(this).blur();
				button.focus();
			});		
		
		//button events
		button.mousedown(function(event){
				showmenu();
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
				hidemenu();
				return false;
			});	
	
		//hide on outside click
		screen.click(function(){
			hidemenu();
			return false;
		});	
	});
};

})(jQuery);
	
