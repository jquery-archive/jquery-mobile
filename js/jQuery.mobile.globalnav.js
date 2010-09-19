/*
* jQuery Mobile Framework : prototype for "globalnav" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.globalnav = function(settings){
	return $(this).each(function(){ //there should only ever be one of these... is each necessary?
		if($(this).find('.ui-globalnav').length){ return; }
		
		//remove any other globalnav currently present
		$('[data-role="globalnav"]:has(.ui-globalnav)').remove();	
		
		var o = $.extend({
			fixedAs: 'footer',
			moreText: 'More...',
			thisId: $(this).parents('.ui-page').attr('id') + '-nav'
		},settings);
		
		$(this)
			.attr('id', o.thisId)
			.wrapInner('<div class="ui-bar-a ' + (o.fixedAs == 'footer' ? 'ui-footer' : 'ui-header') + '"><div class="ui-globalnav"></div></div>');
		
		//wrap it with footer classes
		var $globalnav = $(this).find('.ui-globalnav'),
			numTabs = $globalnav.find('li').length;
			
			$globalnav
				.find('ul')
				.grid({grid: numTabs > 2 ? 'b' : 'a'})		
		
		if(numTabs > 3 ){
			var moreId = o.thisId + '-more',
				$navToggle = $('<a href="#'+ moreId +'" data-transition="slideup">' + o.moreText + '</a>'),
				$truncatedLis = $globalnav.find('li:gt(2)'),
				$newPage = $('<div id="'+ moreId +'" class="ui-page ui-globalnav-expanded ui-body-a"><div class="ui-header"><h1>' + o.moreText + '</h1></div><div class="ui-content"></div></div>'),
				$newPageContent =  $globalnav.find('ul').clone(); 
				
				$newPageContent
					.find('a')
					.buttonMarkup({iconPos: 'top', shadow: false, corners: false, theme: 'a', icon: 'arrow-r'})
				
				$newPage.append( $newPageContent ).appendTo('body');
			
			$navToggle
				.wrap('<div class="ui-globalnav-toggle"></div>')
				.parent()
				.appendTo($globalnav);
			
			$navToggle.buttonMarkup({corners: false, iconPos: 'top', icon: 'arrow-r'});	
				
			$globalnav.addClass('ui-globalnav-collapsed');
		
			$truncatedLis.addClass('ui-globalnav-truncate');
		}	
		
		$globalnav
			.find('ul a')
			.buttonMarkup({corners: false, iconPos: 'top', icon: 'arrow-u'})
			.bind('tap',function(){
				//NOTE: we'll need to find a way to highlight an active tab at load as well
				$globalnav.find('.ui-btn-active').removeClass('ui-btn-active');
				$(this).addClass('ui-btn-active');
			});
		
		$(this)
			.appendTo('body')
			.fixHeaderFooter();	
	});
};	
})(jQuery);