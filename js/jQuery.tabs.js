/*
* jQuery Mobile Framework : prototype for "tabs" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.tabs = function(settings){
	//configurable options
	var o = $.extend({
		trackState: true, 
		alwaysScrollToTop: true,
		fixedAsFooter: false
	},settings);
	
	return $(this).each(function(){
		//reference to tabs container
		var tabs = $(this);

		//set app mode
		$(this).attr('role','application'); 
		
		//nav is first ul
		var tabsNav = tabs.find('ul:first');
		
		//body is nav's next sibling
		var tabsBody = $(tabsNav.find('a:eq(0)').attr('href')).parent();
		
		var tabIDprefix = 'ui-tab-';

		var tabIDsuffix = '-enhanced';
		
		//add class to nav, tab body
		tabsNav
			.addClass('ui-tabs-nav '+(o.fixedAsFooter?'ui-bar-a':'ui-bar-c'))
			.attr('role','tablist');
			
		tabsBody
			.addClass('ui-tabs-body ui-body ui-body-c');
		
		//find tab panels, add class and aria
		tabsBody.find('>div').each(function(){
			$(this)
				.addClass('ui-tabs-panel')
				.attr('role','tabpanel')
				.attr('aria-hidden', true)
				.attr('aria-labelledby', tabIDprefix + $(this).attr('id'))
				.attr('id', $(this).attr('id') + tabIDsuffix);
		});
		
		//set role of each tab
		tabsNav.find('li').each(function(){
			$(this)
				.attr('role','tab')
				.attr('id', tabIDprefix+$(this).find('a').attr('href').split('#')[1]);
		})
		.width(100/tabsNav.find('li').length+'%');


		//switch selected on click
		tabsNav
			.find('a')
			.attr('tabindex','-1')
			.buttonMarkup({corners: false, iconPos: (o.fixedAsFooter?'top':'bottom'), icon: (o.fixedAsFooter?'arrow-u':'arrow-d')});
			
		//generic select tab function
		function selectTab(tab,fromHashChange){
			if(o.trackState && !fromHashChange){ 
				pushState("tab", tab.attr("href"));
			}
			else{	
				//unselect tabs
				tabsNav.find('li.ui-tabs-selected')
					.removeClass('ui-tabs-selected')
					.find('a')
						.removeClass('ui-btn-active')
						.attr('tabindex','-1');
				//set selected tab item	
				tab
					.attr('tabindex','0')
					.addClass('ui-btn-active')
					.parent()
					.addClass('ui-tabs-selected');
				//unselect  panels
				tabsBody.find('div.ui-tabs-panel-selected').attr('aria-hidden',true).removeClass('ui-tabs-panel-selected');
				//select active panel
				$( tab.attr('href') + tabIDsuffix ).addClass('ui-tabs-panel-selected').attr('aria-hidden',false);
				
				if(o.fixedAsFooter){ 
					//window.scrollTo(0,0); 
					$('.ui-fixed-top,.ui-fixed-bottom').trigger('overlayIn'); 
					setTimeout(function(){ $('.ui-fixed-top,.ui-fixed-bottom').trigger('setTop');  },100);
				}

			}
		};			

			
		tabsNav.find('a')
			.click(function(e){
				selectTab($(this));
				$(this).focus();
				return false;
			})
			.keydown(function(event){
				var currentTab = $(this).parent();
				var ret = true;
				switch(event.keyCode){
					case 37://left
					case 38://up
						if(currentTab.prev().size() > 0){
							selectTab(currentTab.prev().find('a'));
							currentTab.prev().find('a').eq(0).focus();
							ret = false;
						}
					break;
					case 39: //right
					case 40://down
						if(currentTab.next().size() > 0){
							selectTab(currentTab.next().find('a'));
							currentTab.next().find('a').eq(0).focus();
							ret = false;
						}
					break;
					case 36: //home key
						selectTab(tabsNav.find('li:first a'));
						tabsNav.find('li:first a').eq(0).focus();
						ret = false;
					break;
					case 35://end key
						selectTab(tabsNav.find('li:last a'));
						tabsNav.find('li:last a').eq(0).focus();
						ret = false;
					break;
				}
				return ret;
			});
			
		//if tabs are rotating, stop them upon user events	
		tabs.bind('click keydown focus',function(){
			if(o.autoRotate){ clearInterval(tabRotator); }
		});
		
		//function to select a tab from the url hash
		function selectTabFromHash(hash){
			var currHash = hash || getState("tab");
			if(!currHash){ currHash = '';}
			var hashedTab = tabsNav.find('a[href=#'+ currHash.replace('#','') +']');
		    if( hashedTab.size() > 0){
		    	selectTab(hashedTab,true);	
		    }
		    else {
		    	selectTab( tabsNav.find('a:first'),true);
		    }
		    //return true/false
		    return !!hashedTab.size();
		}
		
		$(window).bind('hashchange',function(){
			var tab = getState("tab");
			if(tab){
				selectTabFromHash(tab,true);
			}
			else{
				selectTab( tabsNav.find('a:first'),true);
			}
		});

		//set tab from hash at page load, if no tab hash, select first tab
		selectTabFromHash(null,true);

		if(o.fixedAsFooter){
			var footer = $('.ui-footer', $(this).parents('.ui-page'));
			if(!footer.length){
				footer = $('<div class="ui-footer ui-bar-a"></div>').appendTo($(this).parents('.ui-page'));
			}
			tabsNav.prependTo(footer);
		}	
	});
};

var curState = {};

function pushState( name, value ) {
	curState[ name ] = value;
	window.location.hash = jQuery.param( curState );
}

function getState( name ) {
	var found = (new RegExp("(?:^|&)" + name + "=(.*?)(?:&|$)")).exec( window.location.hash );
	return found ? found[1] : null;
}

})(jQuery);
