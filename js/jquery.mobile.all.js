(function() {
	var src = [
	//	'jquery.js',
		//---
		'jquery.ui.widget.js',
		'jquery.mobile.widget.js',
		'jquery.mobile.media.js',
		'jquery.mobile.support.js',
		'jquery.mobile.vmouse.js',
		'jquery.mobile.event.js',
		'jquery.mobile.hashchange.js',
		'jquery.mobile.page.js',
		'jquery.mobile.core.js',
		'jquery.mobile.navigation.js',
		'jquery.mobile.fixHeaderFooter.js',
		'jquery.mobile.forms.checkboxradio.js',
		'jquery.mobile.forms.textinput.js',
		'jquery.mobile.forms.select.js',
		'jquery.mobile.buttonMarkup.js',
		'jquery.mobile.forms.button.js',
		'jquery.mobile.forms.slider.js',
		'jquery.mobile.collapsible.js',
		'jquery.mobile.controlGroup.js',
		'jquery.mobile.fieldContain.js',
		'jquery.mobile.listview.js',
		'jquery.mobile.listview.filter.js',
		'jquery.mobile.dialog.js',
		'jquery.mobile.navbar.js',
		'jquery.mobile.grid.js',
		'jquery.mobile.init.js'
	];

	for (var i = 0; i < src.length; ++i) {
		var uri = 'mobile/js/' + src[i];
		document.write('<script type="text/javascript" src="' + uri + '"></' + 'script>');
	}

})();