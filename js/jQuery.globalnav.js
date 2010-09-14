/*
* jQuery Mobile Framework : prototype for "tabs" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.globalnav = function(settings){
	return $(this).each(function(){ //there should only ever be one of these... is each necessary?
	
		//wrap it with footer classes
		var globalnav = $(this).wrap('<div class="ui-footer ui-bar-a"></div>');
		
		//apply fixed footer markup to ui-footer
		$(document).fixHeaderFooter();
		
		//set up the nav tabs widths (currently evenly divided widths, to be improved later)
		var navtabs = globalnav.find('li');
		navtabs.width(100/navtabs.length+'%');
		
		//apply state on click and at load
		//NOTE: we'll need to find a way to highlight an active tab at load as well
		navtabs.find('a')
			.buttonMarkup({corners: false, iconPos: 'top', icon: 'arrow-u'})
			.bind('tap',function(){
				navtabs.find('.ui-btn-active').removeClass('ui-btn-active');
				$(this).addClass('ui-btn-active');
			});
	});
};	
})(jQuery);