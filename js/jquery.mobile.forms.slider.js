/*
* jQuery Mobile Framework : "slider" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function ( $ ) {
$.widget( "mobile.slider", $.mobile.widget, {
	options: {
		theme: undefined,
		trackTheme: undefined
	},
	_create: function(){	
		var control = this.element,
			themedParent = control.parents('[class*=ui-bar-],[class*=ui-body-]').eq(0),			
			
			o = $.extend({
				trackTheme: themedParent.length ? themedParent.attr('class').match(/ui-(bar|body)-([a-z])/)[2] : 'c',
				theme: themedParent.length ? themedParent.attr('class').match(/ui-(bar|body)-([a-z])/)[2] : 'c'
			},this.options),
			
			cType = control[0].nodeName.toLowerCase(),
			selectClass = (cType == 'select') ? 'ui-slider-switch' : '',
			controlID = control.attr('id'),
			labelID = controlID + '-label',
			label = $('[for='+ controlID +']').attr('id',labelID),
			val = (cType == 'input') ? control.val() : control[0].selectedIndex,
			min = (cType == 'input') ? parseFloat(control.attr('min')) : 0,
			max = (cType == 'input') ? parseFloat(control.attr('max')) : control.find('option').length-1,
			percent = val / (max - min) * 100,
			snappedPercent = percent,
			slider = $('<div class="ui-slider '+ selectClass +' ui-btn-down-'+o.trackTheme+' ui-btn-corner-all" role="application"></div>'),
			handle = $('<a href="#" class="ui-slider-handle"></a>')
				.appendTo(slider)
				.buttonMarkup({corners: true, theme: o.theme, shadow: true})
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
					corners = (i==0) ? 'right' :'left',
					theme = (i==0) ? ' ui-btn-down-' + o.trackTheme :' ui-btn-active';
				$('<div class="ui-slider-labelbg ui-slider-labelbg-'+ side + theme +' ui-btn-corner-'+ corners+'"></div>').prependTo(slider);	
				$('<span class="ui-slider-label ui-slider-label-'+ side + theme +' ui-btn-corner-'+ corners+'" role="img">'+$(this).text()+'</span>').prependTo(handle);
			});
			
		}	
		
		function updateControl(val){
			if(cType == 'input'){ 
				control.val(val); 
			}
			else { 
				control[0].selectedIndex = val;
			}
			control.trigger("change");
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
			//flip the stack of the bg colors
			if(percent > 60 && cType == 'select'){ 
				
			}
			snappedPercent = Math.round( newval / max * 100 );
			handle.css('left', percent + '%');
			handle.attr({
					'aria-valuenow': (cType == 'input') ? newval : control.find('option').eq(newval).attr('value'),
					'aria-valuetext': (cType == 'input') ? newval : control.find('option').eq(newval).text(),
					'title': newval
				});
			updateSwitchClass(newval);
			updateControl(newval);
		}
		
		function updateSwitchClass(val){
			if(cType == 'input'){return;}
			if(val == 0){ slider.addClass('ui-slider-switch-a').removeClass('ui-slider-switch-b'); }
			else { slider.addClass('ui-slider-switch-b').removeClass('ui-slider-switch-a'); }
		}
		
		updateSwitchClass(val);
		
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
			
		$(document).bind($.support.touch ? "touchmove" : "mousemove", function(event){
			if(dragging){
				slideUpdate(event);
				return false;
			}
		});
					
		slider
			.bind($.support.touch ? "touchstart" : "mousedown", function(event){
				dragging = true;
				if((cType == 'select')){
					val = control[0].selectedIndex;
				}
				slideUpdate(event);
				return false;
			});
			
		slider
			.add(document)	
			.bind($.support.touch ? "touchend" : "mouseup", function(event){
				if(dragging){
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
				}
			});
			
		slider.insertAfter(control);	
		
		handle
			.css('left', percent + '%')
			.bind('click', function(e){ return false; });	
	}
});
})( jQuery );
	
