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
					//if not, try to find closest theme container
					else if( el.parents('body').length ) {
						var themedParent = el.closest('[class*=ui-bar-],[class*=ui-body-]'); 
						return themedParent.length ? themedParent.attr('class').match(/ui-(bar|body)-([a-z])/)[2] : 'c';
					}
					else{
						return 'c';
					}
				})(),
				iconpos: el.data('iconpos'),
				icon: el.data('icon'),
				inline: el.data('inline')
			}, $.fn.buttonMarkup.defaults, options),
			
			// Classes Defined
			buttonClass = "ui-btn ui-btn-up-" + o.theme,
			innerClass = "ui-btn-inner",
			iconClass;
		
		if( o.inline ){
			buttonClass += " ui-btn-inline";
		}
		
		if (o.icon) {
			o.icon = 'ui-icon-' + o.icon;

			iconClass = "ui-icon " + o.icon;

			if (o.shadow) { iconClass += " ui-icon-shadow" }
			o.iconpos = o.iconpos || 'left';
		}
		
		if (o.iconpos){
			buttonClass += " ui-btn-icon-" + o.iconpos;
			
			if( o.iconpos == 'notext' && !el.attr('title') ){
				el.attr('title', el.text() );
			}
			
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
			.wrapInner( $( '<' + o.wrapperEls + '>', { className: "ui-btn-text" } ) );
		
		if (o.icon) {
			el.prepend( $( '<span>', { className: iconClass } ) );
		}
		
		el.wrapInner( $('<' + o.wrapperEls + '>', { className: innerClass }) );
		
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

