/*
* jQuery Mobile Framework : "ajaxform" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){

//ajax response callbacks
$.formhandlers = {
	'default' : function(data,type){
		return $(data).find('[data-role="content"]:eq(0)');
	}
};

$.fn.ajaxform = function(options){
	return $(this).each(function(){	
		$this = $(this);
	
		//extendable options
		var o = $.extend({
			submitEvents: '',
			method: $this.attr('method'),
			action: $this.attr('action'),
			injectResponse: true,//should be data-attr driven
			dataFilter: $.formhandlers['default'], //should be data-attr driven 
			theme: 'b'
		}, options);
				
		$this.addClass('ui-autoform ui-bar-'+o.theme);
		
		$this.bind(o.submitEvents, function(){
			$(this).submit();
		});
		
		$this.submit(function(){
			$.pageLoading();
			$.ajax({
				url: o.action,
				type: o.method,
				data: $(this).serialize(),
				dataFilter: o.dataFilter,
				success: function(data,textStatus){
					$('.ui-page-active .ui-content').replaceWith( data );
					$.mobilize( $('.ui-page-active [data-role="content"]') );
					$.pageLoading(true);
				}
			});
			return false;
		});
	});
};




})(jQuery);
	
