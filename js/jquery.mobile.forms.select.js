/*
* jQuery Mobile Framework : "customSelect" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){
$.fn.customSelect = function(options){
	return $(this).each(function(){	
		//extendable options
		var o = $.extend({
			closeText: 'close',
			chooseText: 'Choose one:'
		}, options);
		
		var select = $(this),
			label = $('label[for='+ select.attr('id') +']').addClass('ui-select'),
			buttonId = select.attr('id')+'-button',
			menuId = 	select.attr('id')+'-menu',
			thisPage = $(this).closest('.ui-page'),
			//create menu button		
			button = $('<a href="#">'+ $(this.options.item(this.selectedIndex)).text() +'</a>')
				.buttonMarkup({
						iconpos: 'right',
						icon: 'arrow-d'
					})
					.attr({
						'role': 'button',
						'title': 'select menu',
						'id': buttonId,
						'aria-haspopup': 'true',
						'aria-owns': menuId
					})
					// FIXME why mousedown? doesn't seem to work on desktop browsers
					.mousedown(function(){
						select.trigger('showmenu');
						return false;
					})
					.insertBefore(select),
			menuPage = $( "<div data-role='dialog'>"+
								"<div data-role='header' data-theme='b'>"+
									"<a href='#' class='ui-btn-left' data-icon='delete' data-iconpos='notext'>"+ o.closeText +"</a><div class='ui-title'>" + o.chooseText + "</div></div>"+
								"<div data-role='content'></div></div>"+
							"</div>" )
							.appendTo( "body" )
							.page(),	
			menuPageContent = menuPage.find('.ui-content'),								
			listbox = $('<div class="ui-listbox ui-listbox-overlay ui-body-a ui-overlay-shadow ui-corner-all pop"></div>'),
			list = $('<ul class="ui-listbox-list" id="'+ menuId +'" role="listbox" aria-labelledby="'+ buttonId +'"></ul>')
						.appendTo(listbox);
						

		//populate menu
		select.find('option').each(function(i){
			var thisclass = select[0].selectedIndex == i ? 'ui-btn-active' : '';
			var thisselected = select[0].selectedIndex == i ? ' aria-selected="true"' : '';
			$('<li></li>')
				.addClass(thisclass)
				.attr("data-icon","checkbox-on")
				.append( $('<a href="#" class="ui-listbox-option"'+thisselected+' role="option">'+ $(this).text() +'</a>') )
				.appendTo(list);
		});
		

		list.listview();
		
		
				//select properties,events
		select
			.change(function(){ 
				var ele = select.get(0);
				button.find('.ui-btn-text').text($(ele.options.item(ele.selectedIndex)).text()); 
			})
			.focus(function(){
				$(this).blur();
				button.focus();
			})
			.wrap('<div class="ui-select"></div>')
			.attr('tabindex','-1')
			.bind('showmenu',function(){
				$(document).data('currScroll', [$(window).scrollLeft(), $(window).scrollTop()]);
				if(menuHeight > window.innerHeight - 80){
					menuType = "page";		
				}
				else {
					menuType = "overlay";
					listbox.css({
						top: $(window).scrollTop() + (window.innerHeight/2), 
						'margin-top': -menuHeight/2,
						left: window.innerWidth/2
					});
				}

				screen.css({width: $(window).width(), height: $(document).height()}).removeClass('ui-helper-hidden out').addClass('in');
				listbox.removeClass('ui-listbox-hidden');				
				var selectedLI = list.find('.ui-btn-active').focus();

				if(menuType == "page"){
					list.appendTo(menuPageContent);
					$.changePage(thisPage, menuPage, 'slideup', false);
				}
				else{
					list.appendTo(listbox).addClass('in');
				}

			})
			.bind('hidemenu',function(){
				if(menuType == "page"){
					$.changePage(menuPage, thisPage, 'slideup', true);
				}
				else{
					screen.addClass('ui-helper-hidden out');
					listbox.removeClass('in').addClass('ui-listbox-hidden out');
				}
				
				setTimeout(function(){
					button.focus();
					if(menuType == "page"){
						$(window)[0].scrollTo($(document).data('currScroll')[0], $(document).data('currScroll')[1]);
						if(button.offset().top > window.innerHeight){
							$(window)[0].scrollTo(0, button.offset().top);
						}
					}
				}, 50);
			});
		
		
		
		
		//apply click events for items
		list.find('a')
			.click(function(){
				list.find('[aria-selected=true]').removeClass('ui-btn-active').attr('aria-selected',false);
				$(this).addClass('ui-btn-active').attr('aria-selected', true);
				var newIndex = list.find('a').index(this),
					prevIndex = select[0].selectedIndex;
				select[0].selectedIndex = list.find('a').index(this);
				if(newIndex != prevIndex){ 
					select.trigger('change'); 
				}
				select.trigger('hidemenu');
				return false;
			});
		
		//back button
		menuPage.find('.ui-header a').click(function(){
			select.trigger('hidemenu');
			return false;
		});
		
		
		
			
			
		//keyboard events for menu items
		list.keydown(function(event){
			if( !$(this).is('.ui-btn') ){
				//switch logic based on which key was pressed
				switch(event.keyCode){
					//up or left arrow keys
					case 37:
					case 38:
						//if there's a previous option, focus it
						if( $(event.target).parent().prev().length  ){
							$(event.target).blur().parent().prev().find('a').eq(0).focus();
						}	
						//prevent native scroll
						return false;
					break;
					//down or right arrow keys
					case 39:
					case 40:
						//if there's a next option, focus it
						if( $(event.target).parent().next().length ){
							$(event.target).blur().parent().next().find('a').eq(0).focus();
						}	
						//prevent native scroll
						return false;
					break;
					//if enter or space is pressed in menu, trigger click
					case 13:
					case 32:
						 $(event.target).trigger('click'); //should trigger select
						 return false;
					break;
					//tab returns focus to the menu button, and then automatically shifts focus to the next focusable element on the page
					case 9:
						 select.trigger('hidemenu');
					break;	
					event.preventDefault();
				}
			}
		});		

		
		//add list to page
		
		var screen = $('<div class="ui-listbox-screen ui-overlay ui-helper-hidden fadeto"></div>')
							.insertAfter(thisPage);
		listbox.insertAfter(screen);
		//get height for figuring out overlay vs. paged
		var menuHeight = list.outerHeight();
		
		//menu type
		var menuType = "page";
		
		//hide it
		listbox.addClass('ui-listbox-hidden');
				
		//hide on outside click
		screen.click(function(){
			listbox.addClass('ui-listbox-hidden out');
			screen.addClass('ui-helper-hidden out');
		});	
	});
};

})(jQuery);
	
