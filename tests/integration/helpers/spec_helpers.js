var listViewHelper = {};

(function ($, lvh, undefined ) {
	
	var current_page
		, pageShowFired = false;
	

 	lvh.resetForPage = function(new_page) {
		//remove any old event listeners from the current page if defined
		if(current_page)
			current_page.die('pageshow', lvh.pageshowHandler);
			
		pageShowFired = false;
		current_page = new_page;
		current_page.live('pageshow', lvh.pageshowHandler);
	}
	
	lvh.currentPage = function() {
		return current_page;
	}
	
	lvh.transitionComplete = function() {
		return pageShowFired;
	}
	
	lvh.pageshowHandler = function() {
		pageShowFired = true;
	}
	
	lvh.showResultsWhenComplete = function() {
		if($('.jasmine_reporter .running').length == 0) {
			$('.ui-page-active').css('display', 'none');
		} else {
			setTimeout(lvh.showResultsWhenComplete, 500);
		}
	}
	
	setTimeout(lvh.showResultsWhenComplete, 500);
})(jQuery, listViewHelper)