/*
* jQuery Mobile Framework : prototype for "navbar" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.navbar = function(settings){
	return $(this).each(function(){ 

		var o = $.extend({
			moreText: 'More',
			iconpos: $(this).data('iconpos') || 'top',
			transition: $(this).data('transition') || 'slideup'
		},settings);
		
		//wrap it with footer classes
		var $navbar = $(this).addClass('ui-navbar'),
			numTabs = $navbar.find('li').length,
			moreIcon = $navbar.find('a[data-icon]').length ? 'arrow-r' : null;
			
			if( moreIcon == null ){ 
				o.iconpos = null; 
				$navbar.add( $navbar.children(0) ).addClass('ui-navbar-noicons');
			}
			
			$navbar
				.find('ul')
				.grid({grid: numTabs > 2 ? 'b' : 'a'})		
		
		if(numTabs > 3 ){
			var $navToggle = $('<a href="#" data-transition="'+ o.transition +'">' + o.moreText + '</a>'),
				$truncatedLis = $navbar.find('li:gt(2)'),
				$newPage = $('<div data-role="page" class="ui-navbar-expanded" data-theme="a"><div data-role="header" data-theme="b"><a href="#">Back</a><div class="ui-title">' + o.moreText + '</div></div><div data-role="content"></div></div>'),
				$newPageContent =  $navbar.find('ul').clone(),
				$currPage = $navbar.parents('.ui-page:eq(0)');
				
				$newPageContent
					.find('a')
					.buttonMarkup({shadow: false, corners: false, iconpos: o.iconpos, theme: 'a'});
				
				$newPage.append( $newPageContent ).appendTo('body').page();
			
			
			$navToggle
				.wrap('<div class="ui-navbar-toggle"></div>')
				.parent()
				.appendTo($navbar);
			
			$navToggle	
				.buttonMarkup({corners: false, shadow:false, iconpos: o.iconpos, icon: moreIcon})
				.click(function(){
					$.changePage( $currPage, $newPage, o.transition );
					return false;
				});	
				
			$newPage.find('.ui-btn-left').click(function(){
				$.changePage( $newPage, $currPage, o.transition );
				return false;
			});	
				
			$navbar.addClass('ui-navbar-collapsed');
		
			$truncatedLis.addClass('ui-navbar-truncate');
		}	
		
		
		
		$navbar
			.find('ul a')
			.buttonMarkup({corners: false, shadow:false, iconpos: o.iconpos})
			.bind('tap',function(){
				//NOTE: we'll need to find a way to highlight an active tab at load as well
				$navbar.find('.ui-btn-active').removeClass('ui-btn-active');
				$(this).addClass('ui-btn-active');
			});

	});
};	
})(jQuery);