/*!
 * jQuery Mobile Library @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"require",
			"jquery-ui/widget",
			"./widgets/loader",
			"./widgets/loader.backcompat",
			"./events",
			"./events/navigate",
			"./navigation/path",
			"./navigation/history",
			"./navigation/navigator",
			"./navigation/method",
			"./widgets/pagecontainer.transitions",
			"./transitions/handlers",
			"./transitions/visuals",
			"./animationComplete",
			"./navigation",
			"./degradeInputs",
			"./widgets/page.dialog",
			"./widgets/page.dialog.backcompat",
			"./widgets/pagecontainer",
			"./widgets/collapsible",
			"./widgets/collapsibleSet",
			"./grid",
			"./widgets/navbar",
			"./widgets/navbar.backcompat",
			"./widgets/navbar.morebutton",
			"./widgets/listview",
			"./widgets/listview.backcompat",
			"./widgets/listview.autodividers",
			"./widgets/listview.hidedividers",
			"./nojs",
			"./jquery-ui/widgets/accordion",
			"./jquery-ui/widgets/checkboxradio",
			"./jquery-ui/widgets/button",
			"./widgets/forms/button",
			"./widgets/forms/button.backcompat",
			"./widgets/forms/checkboxradio",
			"./widgets/forms/checkboxradio.backcompat",
			"./widgets/forms/slider",
			"./widgets/forms/slider.backcompat",
			"./widgets/forms/slider.tooltip",
			"./widgets/forms/flipswitch",
			"./widgets/forms/flipswitch.backcompat",
			"./widgets/forms/rangeslider",
			"./widgets/forms/rangeslider.backcompat",
			"./widgets/forms/textinput",
			"./widgets/forms/textinput.backcompat",
			"./widgets/forms/clearButton",
			"./widgets/forms/autogrow",
			"./widgets/forms/select.backcompat",
			"./widgets/forms/select.custom",
			"./widgets/forms/select.custom.backcompat",
			"./jquery-ui/widgets/controlgroup",
			"./widgets/controlgroup",
			"./widgets/enhancer.backcompat",
			"./widgets/controlgroup.backcompat",
			"./widgets/controlgroup.selectmenu",
			"./widgets/toolbar",
			"./widgets/fixedToolbar",
			"./widgets/fixedToolbar.backcompat",
			"./widgets/popup",
			"./widgets/popup.backcompat",
			"./widgets/popup.arrow",
			"./widgets/popup.arrow.backcompat",
			"./widgets/panel",
			"./widgets/table",
			"./widgets/table.columntoggle",
			"./widgets/table.columntoggle.popup",
			"./widgets/table.reflow",
			"./widgets/filterable",
			"./jquery-ui/widgets/tabs",
			"./widgets/tabs.ajax",
			"./zoom",
			"./zoom/iosorientationfix" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function() {
require( [ "./init" ], function() {} );
} );
