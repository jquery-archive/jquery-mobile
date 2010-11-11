/*
* jQuery Mobile Framework : plugin for creating CSS grids
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($, undefined ) {
$.fn.grid = function(options){
	return $(this).each(function(){
		var o = $.extend({
			grid: 'a'
		},options);
		
		$(this).addClass('ui-grid-' + o.grid);
			
		var $kids = $(this).children(),
			iterator;
			
			switch( o.grid ){
				case 'a':
					iterator = 2;
				break;
				case 'b':
					iterator = 3;
				break;
				case 'c':
					iterator = 4;
				break;
				case 'd':
					iterator = 5;
				break;
			}
		
			$kids.filter(':nth-child(' + iterator + 'n+1)').addClass('ui-block-a');
			$kids.filter(':nth-child(' + iterator + 'n+2)').addClass('ui-block-b');
			
		if(iterator > 2){	
			$kids.filter(':nth-child(3n+3)').addClass('ui-block-c');
		}	
		if(iterator> 3){	
			$kids.filter(':nth-child(4n+4)').addClass('ui-block-d');
		}	
		if(iterator > 4){	
			$kids.filter(':nth-child(5n+5)').addClass('ui-block-e');
		}
				
	});	
};
})(jQuery);

