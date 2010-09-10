/*
* jQuery Mobile Framework : prototype for "tabs" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.globalnav = function(settings){
	return $(this).each(function(){
		//configurable options
		var o = $.extend({},settings);

		var globalnav = $(this).wrap('<div class="ui-globalnav"></div>');
		
		globalnav.find('a').buttonMarkup({corners: false, iconPos: 'top', icon: 'arrow-u'});
		
		var pageFooter = globalnav.parents('.ui-page:eq(0)').find('.ui-footer');
		if( !pageFooter.length ){
			pageFooter = $('<div class="ui-footer ui-bar-a"></div>').appendTo(globalnav.parents('.ui-page:eq(0)'));
		}
		
		//add to footer
		globalnav.prependTo(pageFooter);
	});
};	
})(jQuery);