/*
* jQuery Mobile Framework : "slider" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){
$.fn.slider = function(options){
	return this.each(function(){	
		var control = $(this),
			cType = control[0].nodeName.toLowerCase(),
			sliderClass = (cType == 'select') ? 'ui-slider-switch' : 'ui-btn-corner-all',
			controlID = control.attr('id'),
			labelID = controlID + '-label',
			label = $('[for='+ controlID +']').attr('id',labelID),
			val = (cType == 'input') ? control.val() : control[0].selectedIndex,
			min = (cType == 'input') ? parseFloat(control.attr('min')) : 0,
			max = (cType == 'input') ? parseFloat(control.attr('max')) : control.find('option').length-1,
			percent = val / (max - min) * 100,
			snappedPercent = percent,
			slider = $('<div class="ui-slider '+ sliderClass +' ui-bar-c" role="application"></div>'),
			cornershadows = (cType == 'select') ? false : true,
			handle = $('<a href="#" class="ui-slider-handle" data-theme="c"></a>')
				.appendTo(slider)
				.buttonMarkup({corners: cornershadows, shadow: cornershadows})
				.attr({
					'role': 'slider',
					'aria-valuemin': min,
					'aria-valuemax': max,
					'aria-valuenow': val,
					'aria-valuetext': val,
					'title': val,
					'aria-labelledby': labelID
				}),
			dragging = false;
			
		if(cType == 'select'){
			slider.wrapInner('<div class="ui-slider-inneroffset"></div>');
			var options = control.find('option');
				
			control.find('option').each(function(i){
				var side = (i==0) ?'b':'a',
					theme = (i==0) ?'c':'b'
				$('<span class="ui-slider-label ui-slider-label-'+ side +' ui-btn-down-'+ theme +'">'+$(this).text()+'</span>').appendTo(handle);
			});
			
		}	
		
		function updateControl(val){
			if(cType == 'input'){ 
				control.val(val); 
			}
			else { 
				if(control[0].selectedIndex !== val){
					slider.toggleClass('ui-btn-down-b ui-btn-down-c');
				}
				control[0].selectedIndex = val;
			}
		}
			
		function slideUpdate(event, val){
			if (val){
				percent = parseFloat(val) / (max - min) * 100;
			} else {
				var data = event.originalEvent.touches ? event.originalEvent.touches[ 0 ] : event,
					// a slight tolerance helped get to the ends of the slider
					tol = 4;
				if( !dragging 
						|| data.pageX < slider.offset().left - tol 
						|| data.pageX > slider.offset().left + slider.width() + tol ){ 
					return; 
				}
				percent = Math.round(((data.pageX - slider.offset().left) / slider.width() ) * 100);
			}
			if( percent < 0 ) { percent = 0; }
			if( percent > 100 ) { percent = 100; }
			var newval = Math.round( (percent/100) * max );
			if( newval < min ) { newval = min; }
			if( newval > max ) { newval = max; }
			snappedPercent = Math.round( newval / max * 100 );
			handle
				.css('left', percent + '%')
				.attr({
					'aria-valuenow': (cType == 'input') ? newval : control.find('option').eq(newval).attr('value'),
					'aria-valuetext': (cType == 'input') ? newval : control.find('option').eq(newval).text(),
					'title': newval
				});

			updateControl(newval);
		}
		
		function updateSnap(){
			if(cType == 'select'){
				handle
					.addClass('ui-slider-handle-snapping')
					.css('left', snappedPercent + '%')
					.animationComplete(function(){
						handle.removeClass('ui-slider-handle-snapping');
					});
			}
		}
		
		label.addClass('ui-slider');
		
		control
			.addClass((cType == 'input') ? 'ui-slider-input' : 'ui-slider-switch')
			.keyup(function(e){
				slideUpdate(e, $(this).val() );
			});
					
		slider
			.bind($.support.touch ? "touchstart" : "mousedown", function(event){
				dragging = true;
				if((cType == 'select')){
					val = control[0].selectedIndex;
				}
				slideUpdate(event);
				return false;
			})
			.bind($.support.touch ? "touchmove" : "mousemove", function(event){
				slideUpdate(event);
				return false;
			})
			.bind($.support.touch ? "touchend" : "mouseup", function(event){
				dragging = false;
				if(cType == 'select'){
					if(val == control[0].selectedIndex){
						val = val == 0 ? 1 : 0;
						//tap occurred, but value didn't change. flip it!
						slideUpdate(event,val);
					}
					updateSnap();
				}
				return false;
			})
			.insertAfter(control);
		
		handle
			.css('left', percent + '%')
			.bind('click', function(e){ return false; });	
	});
};
})(jQuery);
	
