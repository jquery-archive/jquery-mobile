//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Default values for jQuery Mobile
//>>label: Defaults
//>>group: Core
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.ns", "json!../package.json" ], function( jQuery, ns, pkg ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
	var __version__ = ( pkg && pkg.version ) || "dev";
//>>excludeEnd("jqmBuildExclude");
	var mobile = $.mobile;

	// Version of the jQuery Mobile Framework
	mobile.version = __version__;

	// Deprecated and no longer used in 1.4 remove in 1.5
	// Define the url parameter used for referencing widget-generated sub-pages.
	// Translates to example.html&ui-page=subpageIdentifier
	// hash segment before &ui-page= is used to make Ajax request
	mobile.subPageUrlKey = "ui-page";

	mobile.hideUrlBar = true;

	// Keepnative Selector
	mobile.keepNative = ":jqmData(role='none'), :jqmData(role='nojs')";

	// Deprecated in 1.4 remove in 1.5
	// Class assigned to page currently in view, and during transitions
	mobile.activePageClass = "ui-page-active";

	// Deprecated in 1.4 remove in 1.5
	// Class used for "active" button state, from CSS framework
	mobile.activeBtnClass = "ui-btn-active";

	// Deprecated in 1.4 remove in 1.5
	// Class used for "focus" form element state, from CSS framework
	mobile.focusClass = "ui-focus";

	// Automatically handle clicks and form submissions through Ajax, when same-domain
	mobile.ajaxEnabled = true;

	// Automatically load and show pages based on location.hash
	mobile.hashListeningEnabled = true;

	// disable to prevent jquery from bothering with links
	mobile.linkBindingEnabled = true;

	// Set default page transition - 'none' for no transitions
	mobile.defaultPageTransition = "fade";

	// Set maximum window width for transitions to apply - 'false' for no limit
	mobile.maxTransitionWidth = false;

	// Minimum scroll distance that will be remembered when returning to a page
	// Deprecated remove in 1.5
	mobile.minScrollBack = 0;

	// DEPRECATED: the following property is no longer in use, but defined until 2.0 to prevent conflicts
	mobile.touchOverflowEnabled = false;

	// Set default dialog transition - 'none' for no transitions
	mobile.defaultDialogTransition = "pop";

	// Error response message - appears when an Ajax page request fails
	mobile.pageLoadErrorMessage = "Error Loading Page";

	// For error messages, which theme does the box uses?
	mobile.pageLoadErrorMessageTheme = "a";

	// replace calls to window.history.back with phonegaps navigation helper
	// where it is provided on the window object
	mobile.phonegapNavigationEnabled = false;

	//automatically initialize the DOM when it's ready
	mobile.autoInitializePage = true;

	mobile.pushStateEnabled = true;

	// allows users to opt in to ignoring content by marking a parent element as
	// data-ignored
	mobile.ignoreContentEnabled = false;

	mobile.buttonMarkup = {
		hoverDelay: 200
	};

	// disable the alteration of the dynamic base tag or links in the case
	// that a dynamic base tag isn't supported
	mobile.dynamicBaseEnabled = true;

	// default the property to remove dependency on assignment in init module
	mobile.pageContainer = $();
})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
