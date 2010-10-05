/*
* jQuery Mobile Framework : prototype for "globalnav" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.globalnav = function(settings){
	return $(this).each(function(){ 

		var o = $.extend({
			moreText: 'More',
			iconpos: $(this).data('iconpos') || 'top',
			transition: $(this).data('transition') || 'slideup'
		},settings);
		
		//wrap it with footer classes
		var $globalnav = $(this).addClass('ui-globalnav'),
			numTabs = $globalnav.find('li').length,
			moreIcon = $globalnav.find('a[data-icon]').length ? 'arrow-r' : null;
			
			if( moreIcon == null ){ 
				o.iconpos = null; 
				$globalnav.add( $globalnav.children(0) ).addClass('ui-globalnav-noicons');
			}
			
			$globalnav
				.find('ul')
				.grid({grid: numTabs > 2 ? 'b' : 'a'})		
		
		if(numTabs > 3 ){
			var moreId = o.thisId + "&" + jQuery.mobile.subPageUrlKey  + "=globalnav",
				$navToggle = $('<a href="#'+ moreId +'" data-transition="'+ o.transition +'">' + o.moreText + '</a>'),
				$truncatedLis = $globalnav.find('li:gt(2)'),
				$newPage = $('<div id="'+ moreId +'" class="ui-page ui-globalnav-expanded ui-body-a"><div data-role="header"><h1>' + o.moreText + '</h1></div><div data-role="content"></div></div>'),
				$newPageContent =  $globalnav.find('ul').clone(); 
				
				$newPageContent
					.find('a')
					.buttonMarkup({shadow: false, corners: false, iconpos: o.iconpos});
				
				$newPage.append( $newPageContent ).appendTo('body');
			
			$navToggle
				.wrap('<div class="ui-globalnav-toggle"></div>')
				.parent()
				.appendTo($globalnav);
			
			$navToggle.buttonMarkup({corners: false, shadow:false, iconpos: o.iconpos, icon: moreIcon});	
				
			$globalnav.addClass('ui-globalnav-collapsed');
		
			$truncatedLis.addClass('ui-globalnav-truncate');
		}	
		
		
		
		$globalnav
			.find('ul a')
			.buttonMarkup({corners: false, shadow:false, iconpos: o.iconpos})
			.bind('tap',function(){
				//NOTE: we'll need to find a way to highlight an active tab at load as well
				$globalnav.find('.ui-btn-active').removeClass('ui-btn-active');
				$(this).addClass('ui-btn-active');
			});

	});
};	
})(jQuery);