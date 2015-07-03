/*!
 * jQuery Mobile Defaults @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Defaults
//>>group: Core
//>>description: Default values for jQuery Mobile
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./ns" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.extend( $.mobile, {

	hideUrlBar: true,

	// Keepnative Selector
	keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",

	// Automatically handle clicks and form submissions through Ajax, when same-domain
	ajaxEnabled: true,

	// Automatically load and show pages based on location.hash
	hashListeningEnabled: true,

	// disable to prevent jquery from bothering with links
	linkBindingEnabled: true,

	// Set default page transition - 'none' for no transitions
	defaultPageTransition: "fade",

	// Set maximum window width for transitions to apply - 'false' for no limit
	maxTransitionWidth: false,

	// Set default dialog transition - 'none' for no transitions
	defaultDialogTransition: "pop",

	// Error response message - appears when an Ajax page request fails
	pageLoadErrorMessage: "Error Loading Page",

	// For error messages, which theme does the box use?
	pageLoadErrorMessageTheme: "a",

	// replace calls to window.history.back with phonegaps navigation helper
	// where it is provided on the window object
	phonegapNavigationEnabled: false,

	//automatically initialize the DOM when it's ready
	autoInitializePage: true,

	pushStateEnabled: true,

	// allows users to opt in to ignoring content by marking a parent element as
	// data-ignored
	ignoreContentEnabled: false,

	// default the property to remove dependency on assignment in init module
	pageContainer: $(),

	//enable cross-domain page support
	allowCrossDomainPages: false,

	dialogHashKey: "&ui-state=dialog"
} );
} );
