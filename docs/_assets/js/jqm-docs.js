//set up the theme switcher on the homepage
$('div').live('pagecreate',function(event){
	if( !$(this).is('.ui-dialog')){ 
		var appendEl = $(this).find('.ui-footer:last');
		
		if( !appendEl.length ){
			appendEl = $(this).find('.ui-content');
		}
		
		$('<a href="#themeswitcher" data-'+ $.mobile.ns +'rel="dialog" data-'+ $.mobile.ns +'transition="pop">Switch theme</a>')
			.buttonMarkup({
				'icon':'gear',
				'inline': true,
				'shadow': false,
				'theme': 'd'
			})
			.appendTo( appendEl )
			.wrap('<div class="jqm-themeswitcher">')
			.bind( "vclick", function(){
				$.themeswitcher();
			});
	}	
	event.stopPropagation();
});

//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'vclick',  function(){
		$(this).trigger("collapse")
	});
});

function setDefaultTransition(){
	$.mobile.defaultPageTransition = $( window ).width() >= 650 ? "fade" : "slide";
}

//set default documentation 
$( document ).bind( "mobileinit", setDefaultTransition );
$(function(){
	$( window ).bind( "throttledresize", setDefaultTransition );
});