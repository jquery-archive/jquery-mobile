/*
* jQuery Mobile Framework : plugin for making button-like links
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function( jQuery ) {

jQuery.fn.buttonMarkup = function( options ){
	return this.each( function() {
		var el = jQuery( this ),
		    o = jQuery.extend( {}, jQuery.fn.buttonMarkup.defaults, el.data(), options),

			// Classes Defined
			buttonClass,
			innerClass = "ui-btn-inner",
			iconClass;

		if ( attachEvents ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			var themedParent = el.closest("[class*='ui-bar-'],[class*='ui-body-']"); 
			o.theme = themedParent.length ?
				/ui-(bar|body)-([a-z])/.exec( themedParent.attr("class") )[2] :
				"c";
		}

		buttonClass = "ui-btn ui-btn-up-" + o.theme;
		
		if ( o.inline ) {
			buttonClass += " ui-btn-inline";
		}
		
		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.shadow ) {
				iconClass += " ui-icon-shadow"
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;
			
			if ( o.iconpos == "notext" && !el.attr("title") ) {
				el.attr( "title", el.text() );
			}
		}
		
		if ( o.corners ) { 
			buttonClass += " ui-btn-corner-all";
			innerClass += " ui-btn-corner-all";
		}
		
		if ( o.shadow ) {
			buttonClass += " ui-shadow";
		}
		
		el
			.attr( "data-theme", o.theme )
			.addClass( buttonClass );

		var wrap = ("<D class='" + innerClass + "'><D class='ui-btn-text'></D>" +
			( o.icon ? "<span class='" + iconClass + "'></span>" : "" ) +
			"</D>").replace(/D/g, o.wrapperEls);

		el.wrapInner( wrap );
	});		
};

jQuery.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

var attachEvents = function() {
	jQuery(".ui-btn").live({
		mousedown: function() {
			var theme = jQuery(this).attr( "data-theme" );
			jQuery(this).removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
		},
		mouseup: function() {
			var theme = jQuery(this).attr( "data-theme" );
			jQuery(this).removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
		},
		"mouseover focus": function() {
			var theme = jQuery(this).attr( "data-theme" );
			jQuery(this).removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
		},
		"mouseout blur": function() {
			var theme = jQuery(this).attr( "data-theme" );
			jQuery(this).removeClass( "ui-btn-hover-" + theme ).addClass( "ui-btn-up-" + theme );
		}
	});

	attachEvents = null;
};

})(jQuery);
