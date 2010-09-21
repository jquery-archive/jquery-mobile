/*
* jQuery Mobile Framework : "slider" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){
$.fn.slider = function(options){
	return $(this).each(function(){	
		var input = $(this),
			inputID = input.attr('id'),
			labelID = inputID + '-label',
			label = $('[for='+ inputID +']').attr('id',labelID),
			val = input.val(),
			min = parseFloat(input.attr('min')),
			max = parseFloat(input.attr('max')),
			percent = val / (max - min) * 100,
			slider = $('<div class="ui-slider ui-bar-c ui-btn-corner-all" role="application"></div>'),
			handle = $('<a href="#" class="ui-slider-handle" data-theme="a"></a>')
				.appendTo(slider)
				.buttonMarkup({corners: true})
				.attr({
					'role': 'slider',
					'aria-valuemin': min,
					'aria-valuemax': max,
					'aria-valuenow': val,
					'aria-valuetext': val,
					'title': val,
					'aria-labelledby': labelID
				}),
			dragging = false,
			supportTouch = $.support.touch,
			touchStartEvent = supportTouch ? "touchstart" : "mousedown",
			touchStopEvent = supportTouch ? "touchend" : "mouseup",
			touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
			
			function slideUpdate(event, val){
				if(!val){
					var data = event.originalEvent.touches ? event.originalEvent.touches[ 0 ] : event,
						tol = 4; //a slight tolerance helped get to the ends of the slider
					if( !dragging 
							|| data.pageX < slider.offset().left - tol 
							|| data.pageX > slider.offset().left + slider.width() + tol ){ 
						return; 
					}
					percent = Math.round(((data.pageX - slider.offset().left) / slider.width() ) * 100);
				}
				else{
					percent = parseFloat(val) / (max - min) * 100;
				}
				if( percent < 0 ){ percent = 0; }
				if( percent > 100 ){ percent = 100; }
				var newval = Math.round( (percent/100) * max );
				if( newval < min ){ newval = min; }
				if( newval > max ){ newval = max; }
				handle
					.css('left', percent + '%')
					.attr({
						'aria-valuenow': newval,
						'aria-valuetext': newval,
						'title': newval
					});
				input.val(newval); 
			}
			
			label.addClass('ui-slider')
			
			input
				.addClass('ui-slider-input')
				.keyup(function(e){
					slideUpdate(e, $(this).val() );
				});
						
			slider
				.bind(touchStartEvent, function(event){
					dragging = true;
					slideUpdate(event);
					return false;
				})
				.bind(touchMoveEvent, function(event){
					slideUpdate(event);
					return false;
				})
				.bind(touchStopEvent, function(){
					dragging = false;
					return false;
				})
				.insertAfter(input);
			
			handle
				.css('left', percent + '%')
				.bind('click', function(e){ return false; });	
	});
};
})(jQuery);
	
