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
				//add ARIA role
				.attr("role","navigation")
				.find('ul')
				.grid({grid: numTabs > 2 ? 'b' : 'a'});		
		
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