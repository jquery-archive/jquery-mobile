/*
* jQuery Mobile Framework : "button" plugin - links that proxy to native input/buttons
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function ( $ ) {
$.widget( "mobile.button", $.mobile.widget, {
	options: {},
	_create: function(){
		var $el = this.element,
			type = $el.attr('type');
			$el
				.addClass('ui-btn-hidden')
				.attr('tabindex','-1');
		
		//add ARIA role
		$( "<a>", { 
				"href": "#",
				"role": "button",
				"aria-label": $el.attr( "type" ) 
			} )
			.text( $el.text() || $el.val() )
			.insertBefore( $el )
			.click(function(){
				if( type == "submit" ){
					$(this).closest('form').submit();
				}
				else{
					$el.click(); 
				}

				return false;
			})
			.buttonMarkup({
				theme: $el.data("theme"), 
				icon: $el.data("icon"),
				iconpos: $el.data("iconpos"),
				inline: $el.data("inline"),
				corners: $el.data("corners"),
				shadow: $el.data("shadow"),
				iconshadow: $el.data("icon-shadow")
			});
	}
});
})( jQuery );