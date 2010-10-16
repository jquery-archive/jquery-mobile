//set up the theme switcher on the homepage
$('div').live('pagecreate',function(){
	if( !$(this).is('.ui-dialog,.ui-navbar-expanded')){ 
		$('<a href="#">Switch theme</a>')
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
				return false;
			});
	}	
});