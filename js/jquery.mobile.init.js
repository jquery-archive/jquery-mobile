//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Global initialization of the library.
//>>label: Init
//>>group: Core


define([
	"jquery",
	"./jquery.mobile.defaults",
	"./jquery.mobile.helpers",
	"./jquery.mobile.data",
	"./jquery.mobile.support",
	"./events/navigate",
	"./navigation/path",
	"./navigation/method",
	"./jquery.mobile.navigation",
	"./widgets/loader",
	"./jquery.mobile.vmouse",
	"jquery.hashchange" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {
	var	$html = $( "html" ),
		$window = $.ui.window;

	//remove initial build class (only present on first pageshow)
	function hideRenderingClass() {
		$html.removeClass( "ui-mobile-rendering" );
	}

	// trigger uiinit event - useful hook for configuring $.ui settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.ui.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.ui.ajaxBlacklist ) {
		$.ui.ajaxEnabled = false;
	}

	// Add ui, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
	// this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
	setTimeout( hideRenderingClass, 5000 );

	$.extend( $.ui, {
		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var path = $.ui.path,
				$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
				hash = path.stripHash( path.stripQueryParams(path.parseLocation().hash) ),
				hashPage = document.getElementById( hash );

			// if no pages are found, create one with body's inner html
			if ( !$pages.length ) {
				$pages = $( "body" ).wrapInner( "<div data-" + $.ui.ns + "role='page'></div>" ).children( 0 );
			}

			// add dialogs, set data-url attrs
			$pages.each(function() {
				var $this = $( this );

				// unless the data url is already set set it to the pathname
				if ( !$this[ 0 ].getAttribute( "data-" + $.ui.ns + "url" ) ) {
					$this.attr( "data-" + $.ui.ns + "url", $this.attr( "id" ) || location.pathname + location.search );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.ui.firstPage = $pages.first();

			// define page container
			$.ui.pageContainer = $.ui.firstPage.parent().addClass( "ui-mobile-viewport" );

			// initialize navigation events now, after uiinit has occurred and the page container
			// has been created but before the rest of the library is alerted to that fact
			$.ui.navreadyDeferred.resolve();

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.ui.showPageLoadingMsg();

			//remove initial build class (only present on first pageshow)
			hideRenderingClass();

			// if hashchange listening is disabled, there's no hash deeplink,
			// the hash is not valid (contains more than one # or does not start with #)
			// or there is no page with that hash, change to the first page in the DOM
			// Remember, however, that the hash can also be a path!
			if ( ! ( $.ui.hashListeningEnabled &&
				$.ui.path.isHashValid( location.hash ) &&
				( $( hashPage ).is( ":jqmData(role='page')" ) ||
					$.ui.path.isPath( hash ) ||
					hash === $.ui.dialogHashKey ) ) ) {

				// Store the initial destination
				if ( $.ui.path.isHashValid( location.hash ) ) {
					$.ui.urlHistory.initialDst = hash.replace( "#", "" );
				}

				// make sure to set initial popstate state if it exists
				// so that navigation back to the initial page works properly
				if( $.event.special.navigate.isPushStateEnabled() ) {
					$.ui.navigate.navigator.squash( path.parseLocation().href );
				}

				$.ui.changePage( $.ui.firstPage, {
					transition: "none",
					reverse: true,
					changeHash: false,
					fromHashChange: true
				});
			} else {
				// trigger hashchange or navigate to squash and record the correct
				// history entry for an initial hash path
				if( !$.event.special.navigate.isPushStateEnabled() ) {
					$window.trigger( "hashchange", [true] );
				} else {
					// TODO figure out how to simplify this interaction with the initial history entry
					// at the bottom js/navigate/navigate.js
					$.ui.navigate.history.stack = [];
					$.ui.navigate( $.ui.path.isPath( location.hash ) ? location.hash : location.href );
				}
			}
		}
	});

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.
	$(function() {
		window.scrollTo( 0, 1 );

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.ui.defaultHomeScroll = ( !$.support.scrollTop || $.ui.window.scrollTop() === 1 ) ? 0 : 1;

		//dom-ready inits
		if ( $.ui.autoInitializePage ) {
			$.ui.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load
		$window.load( $.ui.silentScroll );

		if ( !$.support.cssPointerEvents ) {
			// IE and Opera don't support CSS pointer-events: none that we use to disable link-based buttons
			// by adding the 'ui-disabled' class to them. Using a JavaScript workaround for those browser.
			// https://github.com/jquery/jquery-ui/issues/3558

			$.ui.document.delegate( ".ui-disabled", "vclick",
				function( e ) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			);
		}
	});
}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
