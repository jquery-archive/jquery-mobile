/*
* jQuery Mobile Framework : "navbar" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: 'top',
		grid: null
	},
	_create: function(){
		var $navbar = this.element,
			$navbtns = $navbar.find("a")
			i=0,
			j=0;
			$navbar
			.addClass('ui-navbar')
			.attr("role","navigation")
			.find("ul")
			.grid({grid: this.options.grid });	
			$navbtns.each(function(){
			var icon= $(this).attr("data-iconpos") ? $(this).attr("data-iconpos") : "top",
			iconpos =$(this).filter( ":jqmData(icon)").length ? icon: undefined,
			notext=$(this).filter(":jqmData(iconpos='notext')");
			if( !iconpos ){ 
				i++;
			}
			if(iconpos=="notext") {
				iconpos="top";
				notext.text("");
			}
			$(this)
			.buttonMarkup({
				corners:	false, 
				shadow:		false, 
				iconpos:	iconpos
			});
			j++;
		});
		if(i==j)
			$navbar.addClass("ui-navbar-noicons");
		$navbar.delegate("a", "vclick",function(event){
			$navbtns.not( ".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
			$( this ).addClass( $.mobile.activeBtnClass );
		});	
	}
});
})( jQuery );