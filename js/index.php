<?php
$type = 'text/javascript';
$files = array(
	'../LICENSE-INFO.txt',
	// note that define is only included here as a means
	// to revert to the pre async include, and should not be
	// used in other build methods
	'jquery.mobile.define.js',
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
	'jquery.mobile.navigation.pushstate.js',
	'jquery.mobile.transition.js',
	'jquery.mobile.transition.pop.js',
	'jquery.mobile.transition.slide.js',
	'jquery.mobile.transition.slidedown.js',
	'jquery.mobile.transition.slideup.js',
	'jquery.mobile.transition.flip.js',
	'jquery.mobile.transition.flow.js',
	'jquery.mobile.transition.turn.js',
	'jquery.mobile.degradeInputs.js',
	'jquery.mobile.dialog.js',
	'jquery.mobile.page.sections.js',
	'jquery.mobile.collapsible.js',
	'jquery.mobile.collapsibleSet.js',
	'jquery.mobile.fieldContain.js',
	'jquery.mobile.grid.js',
	'jquery.mobile.navbar.js',
	'jquery.mobile.listview.js',
	'jquery.mobile.listview.filter.js',
	'jquery.mobile.nojs.js',
	'jquery.mobile.forms.checkboxradio.js',
	'jquery.mobile.forms.button.js',
	'jquery.mobile.forms.slider.js',
	'jquery.mobile.forms.textinput.js',
	'jquery.mobile.forms.select.custom.js',
	'jquery.mobile.forms.select.js',
	'jquery.mobile.buttonMarkup.js',
	'jquery.mobile.controlGroup.js',
	'jquery.mobile.links.js',
	'jquery.mobile.fixedToolbar.js',
	'jquery.mobile.zoom.js',
	'jquery.mobile.zoom.iosorientationfix.js',
	'jquery.mobile.init.js'
);

require_once('../combine.php');
