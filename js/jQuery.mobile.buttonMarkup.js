/*
* jQuery Mobile Framework : sample plugin for making button-like links
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($){

$.fn.buttonMarkup = function( options ){
	return this.each( function() {
		var el = $( this ),
		    o = $.extend( {}, {
				theme: (function(){
					//if data-theme attr is present
					if(el.is('[data-theme]')){
						return el.attr('data-theme');
					}
					//if not, find closest theme container
					if(el.parents('body').length){
						var themedParent = el.closest('[class*=ui-bar-]'); //this still catches ui-bar-blah... 
						return themedParent.length ? themedParent.attr('class').match(/ui-bar-([a-z])/)[1] : 'c';
					}
					else {
						return 'c';
					}
				})(),
				iconPos: el.attr('data-iconPos'),
				icon: el.attr('data-icon')
			}, $.fn.buttonMarkup.defaults, options),
			
			// Classes Defined
			buttonClass = "ui-btn ui-btn-up-" + o.theme,
			innerClass = "ui-btn-inner",
			iconClass;
		
		if (o.icon) {
			o.icon = 'ui-icon-' + o.icon;
			o.iconPos = o.iconPos || 'left';

			buttonClass += " ui-btn-icon-" + o.iconPos;

			iconClass = "ui-icon " + o.icon;

			if (o.shadow) { iconClass += " ui-icon-shadow" }
		}
		
		
		if (o.corners) { 
			buttonClass += " ui-btn-corner-all";
			innerClass += " ui-btn-corner-all";
		}
		
		if (o.shadow) {
			buttonClass += " ui-shadow";
		}
		
		el
			.attr( 'data-theme', o.theme )
			.addClass( buttonClass )
			.wrapInner( $( '<' + wrapperEls + '>', { className: "ui-btn-text" } ) );
		
		if (o.icon) {
			el.prepend( $( '<span>', { className: iconClass } ) );
		}
		
		el.wrapInner( $('<' + wrapperEls + '>', { className: innerClass }) );
		
		el.clickable();
	});		
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: 'span'
};

})(jQuery);

