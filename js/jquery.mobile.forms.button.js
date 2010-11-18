/*
* jQuery Mobile Framework : "button" plugin - links that proxy to native input/buttons
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($, undefined ) {
$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null, 
		icon: null,
		iconpos: null,
		inline: null,
		corners: true,
		shadow: true,
		iconshadow: true
	},
	_create: function(){
		var $el = this.element,
			o = this.options,
			type = $el.attr('type');
			$el
				.addClass('ui-btn-hidden')
				.attr('tabindex','-1');
		
		//add ARIA role
		this.button = $( "<a>", { 
				"href": "#",
				"role": "button",
				"aria-label": $el.attr( "type" ) 
			} )
			.text( $el.text() || $el.val() )
			.insertBefore( $el )
			.click(function(){
				if(!o.disabled){
					if( type == "submit" ){
						$(this).closest('form').submit();
					}
					else{
						$el.click(); 
					}
				}

				return false;
			})
			.buttonMarkup({
				theme: o.theme, 
				icon: o.icon,
				iconpos: o.iconpos,
				inline: o.inline,
				corners: o.corners,
				shadow: o.shadow,
				iconshadow: o.iconshadow
			});
	},

	enable: function(){
		this.element.attr("disabled", false);
		this.button.removeClass("ui-disabled").attr("aria-disabled", false);
		return this._setOption("disabled", false);
	},

	disable: function(){
		this.element.attr("disabled", true);
		this.button.addClass("ui-disabled").attr("aria-disabled", true);
		return this._setOption("disabled", true);
	}
});
})( jQuery );