//set up the theme switcher on the homepage
$(function(){
	var lvli = $('#jqm-home ul:eq(2) li:eq(1)');
	lvli
		.clone()
		.find('a:eq(0)')
		.attr('href', '#')
		.text('Theme switcher')
		.click(function(){
			$.themeswitcher();
			return false;
		})
		.end()
		.insertBefore(lvli);
});