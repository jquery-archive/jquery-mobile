/*
* jQuery Mobile Framework: "controlgroup" plugin - corner-rounding for groups of buttons, checks, radios, etc
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.fn.controlgroup = function(options){
	
	return $(this).each(function(){
	    var inHeaderFooter = $(this).parents('[data-role="header"],[data-role="footer"]').length > 0 ? true : false;
		var o = $.extend({
			direction: $( this ).data( "type" ) || "vertical",
			shadow: inHeaderFooter ? true : false
		},options);
		var groupheading = $(this).find('>legend'),
			flCorners = inHeaderFooter ?
			    o.direction == 'horizontal' ? ['ui-btn-corner-left', 'ui-btn-corner-right'] : ['ui-btn-corner-top', 'ui-btn-corner-bottom']
		      : o.direction == 'horizontal' ? ['ui-corner-left', 'ui-corner-right'] : ['ui-corner-top', 'ui-corner-bottom'],
			type = $(this).find('input:eq(0)').attr('type');
		
		//replace legend with more stylable replacement div	
		if( groupheading.length ){
			$(this).wrapInner('<div class="ui-controlgroup-controls"></div>');	
			$('<div role="heading" class="ui-controlgroup-label">'+ groupheading.html() +'</div>').insertBefore( $(this).children(0) );	
			groupheading.remove();	
		}
        
        if( inHeaderFooter )
            $(this).addClass('ui-btn-corner-all');
        else
            $(this).addClass('ui-corner-all');
            
	    $(this).addClass('ui-controlgroup ui-controlgroup-'+o.direction);

    	function flipClasses(els){
    		els
    			.removeClass('ui-btn-corner-all ui-shadow')
    			.eq(0).addClass(flCorners[0])
    			.end()
    			.filter(':last').addClass(flCorners[1]).addClass('ui-controlgroup-last');
    	}
    	flipClasses($(this).find('.ui-btn'));
    	flipClasses($(this).find('.ui-btn-inner'));
    	if(o.shadow || inHeaderFooter){
    		$(this).addClass('ui-shadow');
    	}
	});	
};
})(jQuery);