/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {

	//jQuery.mobile configurable options
	$.extend( $.mobile, {

		//namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		//define the url parameter used for referencing widget-generated sub-pages.
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		//anchor links with a data-rel, or pages with a  data-role, that match these selectors will be untrackable in history
		//(no change in URL, not bookmarkable)
		nonHistorySelectors: "dialog",

		//class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		//class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		//automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		//automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// TODO: deprecated - remove at 1.0
		//automatically handle link clicks through Ajax, when possible
		ajaxLinksEnabled: true,

		// TODO: deprecated - remove at 1.0
		//automatically handle form submissions through Ajax, when possible
		ajaxFormsEnabled: true,

		//set default transition - 'none' for no transitions
		defaultTransition: "slide",

		//show loading message during Ajax requests
		//if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",

		//error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		//support conditions that must be met in order to proceed
		//default enhanced qualifications are media query support OR IE 7+
		gradeA: function(){
			return $.support.mediaquery || $.mobile.browser.ie && $.mobile.browser.ie >= 7;
		},

		//TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		//scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			ypos = ypos || 0;
			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout(function() {
				window.scrollTo( 0, ypos );
				$(document).trigger( "silentscroll", { x: 0, y: ypos });
			},20);

			setTimeout(function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		}
	});

	//mobile version of data and removeData and hasData methods
	//ensures all data is set and retrieved using jQuery Mobile's data namespace
  $.fn.jqmData = function( prop, value ){
    return this.data( prop ? $.mobile.ns + prop : prop, value );
  };

  $.jqmData = function( elem, prop, value ){
    return $.data( elem, prop && $.mobile.ns + prop, value );
  };

  $.fn.jqmRemoveData = function( prop ){
    return this.removeData( $.mobile.ns + prop );
  };

  $.jqmRemoveData = function( elem, prop ){
    return $.removeData( elem, prop && $.mobile.ns + prop );
  };

  $.jqmHasData = function( elem, prop ){
    return $.hasData( elem, prop && $.mobile.ns + prop );
  };


	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace(/:jqmData\(([^)]*)\)/g, "[data-" + ($.mobile.ns || "") + "$1]");

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [node] ).length > 0;
	};
})( jQuery, this );
