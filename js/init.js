/*!
 * jQuery Mobile Init @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Init
//>>group: Core
//>>description: Global initialization of the library.

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./defaults",
			"./helpers",
			"./data",
			"./support",
			"./widgets/enhancer",
			"./events/navigate",
			"./navigation/path",
			"./navigation/method",
			"./navigation",
			"./widgets/loader",
			"./vmouse" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var $html = $( "html" ),
	$window = $.mobile.window;

//remove initial build class (only present on first pageshow)
function hideRenderingClass() {
	$html.removeClass( "ui-mobile-rendering" );
}

// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
$.mobile.document.trigger( "mobileinit" );

// support conditions
// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
// otherwise, proceed with the enhancements
if ( !$.mobile.gradeA() ) {
	return;
}

// override ajaxEnabled on platforms that have known conflicts with hash history updates
// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
if ( $.mobile.ajaxBlacklist ) {
	$.mobile.ajaxEnabled = false;
}

// Add mobile, initial load "rendering" classes to docEl
$html.addClass( "ui-mobile ui-mobile-rendering" );

// This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
// this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
setTimeout( hideRenderingClass, 5000 );

$.extend( $.mobile, {
	// find and enhance the pages in the dom and transition to the first page.
	initializePage: function() {
		// find present pages
		var pagecontainer,
			path = $.mobile.path,
			$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
			hash = path.stripHash( path.stripQueryParams( path.parseLocation().hash ) ),
			theLocation = $.mobile.path.parseLocation(),
			hashPage = hash ? document.getElementById( hash ) : undefined;

		// if no pages are found, create one with body's inner html
		if ( !$pages.length ) {
			$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
		}

		// add dialogs, set data-url attrs
		$pages.each( function() {
			var $this = $( this );

			// unless the data url is already set set it to the pathname
			if ( !$this[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) ) {
				$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) ||
					path.convertUrlToDataUrl( theLocation.pathname + theLocation.search ) );
			}
		} );

		// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
		$.mobile.firstPage = $pages.first();

		// define page container
		pagecontainer = $.mobile.firstPage.parent().pagecontainer();

		// initialize navigation events now, after mobileinit has occurred and the page container
		// has been created but before the rest of the library is alerted to that fact
		$.mobile.navreadyDeferred.resolve();

		// cue page loading message
		$.mobile.loading( "show" );

		//remove initial build class (only present on first pageshow)
		hideRenderingClass();

		// if hashchange listening is disabled, there's no hash deeplink,
		// the hash is not valid (contains more than one # or does not start with #)
		// or there is no page with that hash, change to the first page in the DOM
		// Remember, however, that the hash can also be a path!
		if ( !( $.mobile.hashListeningEnabled &&
				$.mobile.path.isHashValid( location.hash ) &&
				( $( hashPage ).is( ":jqmData(role='page')" ) ||
				$.mobile.path.isPath( hash ) ||
				hash === $.mobile.dialogHashKey ) ) ) {

			// make sure to set initial popstate state if it exists
			// so that navigation back to the initial page works properly
			if ( $.event.special.navigate.isPushStateEnabled() ) {
				$.mobile.navigate.navigator.squash( path.parseLocation().href );
			}

			pagecontainer.pagecontainer( "change", $.mobile.firstPage, {
				transition: "none",
				reverse: true,
				changeUrl: false,
				fromHashChange: true
			} );
		} else {
			// trigger hashchange or navigate to squash and record the correct
			// history entry for an initial hash path
			if ( !$.event.special.navigate.isPushStateEnabled() ) {
				$window.trigger( "hashchange", [ true ] );
			} else {
				// TODO figure out how to simplify this interaction with the initial history entry
				// at the bottom js/navigate/navigate.js
				$.mobile.navigate.history.stack = [];
				$.mobile.navigate( $.mobile.path.isPath( location.hash ) ? location.hash : location.href );
			}
		}
	}
} );

$( function() {
	//Run inlineSVG support test
	$.support.inlineSVG();

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.

	// hide iOS browser chrome on load if hideUrlBar is true this is to try and do it as soon as possible
	if ( $.mobile.hideUrlBar ) {
		window.scrollTo( 0, 1 );
	}

	// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
	// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
	// so if it's 1, use 0 from now on
	$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ) ? 0 : 1;

	//dom-ready inits
	if ( $.mobile.autoInitializePage ) {
		$.mobile.initializePage();
	}

	if ( !$.support.cssPointerEvents ) {
		// IE and Opera don't support CSS pointer-events: none that we use to disable link-based buttons
		// by adding the 'ui-disabled' class to them. Using a JavaScript workaround for those browser.
		// https://github.com/jquery/jquery-mobile/issues/3558

		// DEPRECATED as of 1.4.0 - remove ui-disabled after 1.4.0 release
		// only ui-state-disabled should be present thereafter
		$.mobile.document.delegate( ".ui-state-disabled,.ui-disabled", "vclick",
			function( e ) {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		);
	}
} );
} );
