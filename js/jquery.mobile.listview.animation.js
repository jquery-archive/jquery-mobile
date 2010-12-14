(function($) {
	$.fn.swing = function() {  
		
		return this.each(function() {
			var $this = $(this);
				$this.addClass("swing-wrapper no-border");
				
				$this.children("li").each(function(i, el) {
					$(this).css("-webkit-animation-duration", ((.3/$(this).length)*(i+1))+"s");
				});
						
				$(this).closest(".ui-page").bind("pageshow", function() {
					$this.addClass("go");
				});
				$(this).closest(".ui-page").bind("pagehide", function() {
					$this.removeClass("swing-wrapper no-border go");
				});
				
		});
	};

// Blind Down

	var methods = {
		down : function( ) {
			var myheight = function(element) {
				var h = window.getComputedStyle(element).height;
				h = parseFloat(h);
				return h;	
			}
			var blindDown = function($this) {
				var children = $this.children(),
					lastElHeight = 0,
					totalHeight = 0;
					
				$this.addClass("blindDown-wrapper no-border");
				children.each(function(i, el) {
					$(el).css({
						"webkitTransform": "translate(0px, "+totalHeight + "px)",
						"opacity": 1
					});
					lastElHeight = myheight(el);
					totalHeight+=lastElHeight;
				});
				$this.css("height",  totalHeight+15);
				totalHeight = lastElHeight =  0;
			}
			
			return this.each(function() {
				var first = 0;
				var $this = $(this);
				$this.closest(".ui-page").bind("pageshow", function() {
					blindDown($this);
				});
				
				$(this).closest(".ui-page").bind("pagehide", function() {
					$this.removeClass("blindDown-wrapper no-border");
				});
								
			});
		}
	};
	
	$.fn.blind = function(method) {
		// Method calling logic
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.blind' );
		} 
	};
})(jQuery);


