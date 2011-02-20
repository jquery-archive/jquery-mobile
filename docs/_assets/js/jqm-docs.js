//set up the theme switcher on the homepage
$('div').live('pagecreate',function(event){
	if( !$(this).is('.ui-dialog')){ 
		$('<a href="#themeswitcher" data-'+ $.mobile.ns +'rel="dialog" data-'+ $.mobile.ns +'transition="pop">Switch theme</a>')
			.buttonMarkup({
				'icon':'gear',
				'inline': true,
				'shadow': false,
				'theme': 'd'
			})
			.appendTo( $(this).find('.ui-content') )
			.wrap('<div class="jqm-themeswitcher">')
			.click(function(){
				$.themeswitcher();
			});
	}	
	event.stopPropagation();
});