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
		
		//namespace used framework-wide for data-attrs, widget naming, and CSS classes
		ns: "jq-",

		//define the url parameter used for referencing widget-generated sub-pages.
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		//anchor links with a data-rel, or pages with a data-role, that match these selectors will be untrackable in history
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

		//configure meta viewport tag's content attr:
		metaViewportContent: "width=device-width, minimum-scale=1, maximum-scale=1",

		//support conditions that must be met in order to proceed
		gradeA: function(){
			return $.support.mediaquery;
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
		}
	});


	//trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );


	//support conditions
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}
	
	//extend data() to treat namespaced data-attrs the same as non-namespaced ones
	var jqd = $.fn.data;
 
    $.fn.data = function( prop, value ){
 		if( !value && !this.attr( "[data-" + prop + "]" ) && this.attr( "[data-" $.mobile.ns + prop + "]" ) ){
 			prop = $.mobile.ns + prop;
 			return jqd.call( this, prop );	
 		}
    };

	//define vars for interal use
	var $window = $(window),
		$html = $( "html" ),
		$head = $( "head" ),

		//loading div which appears during Ajax requests
		//will not appear if $.mobile.loadingMessage is false
		$loader = $.mobile.loadingMessage ?
			$( "<div class='ui-loader ui-body-a ui-corner-all'>" +
						"<span class='ui-icon ui-icon-loading spin'></span>" +
						"<h1>" + $.mobile.loadingMessage + "</h1>" +
					"</div>" )
			: undefined;


	//add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );


	//define & prepend meta viewport tag, if content is defined
	$.mobile.metaViewportContent ? $( "<meta>", { name: "viewport", content: $.mobile.metaViewportContent}).prependTo( $head ) : undefined;


	//expose some core utilities
	$.extend($.mobile, {

		// turn on/off page loading message.
		pageLoading: function ( done ) {
			if ( done ) {
				$html.removeClass( "ui-loading" );
			} else {
				if( $.mobile.loadingMessage ){
					var activeBtn =$( "." + $.mobile.activeBtnClass ).first();

					$loader
						.appendTo( $.mobile.pageContainer )
						//position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
						.css( {
							top: $.support.scrollTop && $(window).scrollTop() + $(window).height() / 2 ||
							activeBtn.length && activeBtn.offset().top || 100
						} );
				}

				$html.addClass( "ui-loading" );
			}
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
		},

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function(){
			//find present pages
			var $pages = $( "[data-" + $.mobile.ns + "role='page']" );

			//add dialogs, set data-url attrs
			$pages.add( "[data-" + $.mobile.ns + "role='dialog']" ).each(function(){
				$(this).attr( "data-" + $.mobile.ns + "url", $(this).attr( "id" ));
			});

			//define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			//define page container
			$.mobile.pageContainer = $pages.first().parent().addClass( "ui-mobile-viewport" );

			//cue page loading message
			$.mobile.pageLoading();

			// if hashchange listening is disabled or there's no hash deeplink, change to the first page in the DOM
			if( !$.mobile.hashListeningEnabled || !$.mobile.path.stripHash( location.hash ) ){
				$.mobile.changePage( $.mobile.firstPage, false, true, false, true );
			}
			// otherwise, trigger a hashchange to load a deeplink
			else {
				$window.trigger( "hashchange", [ true ] );
			}
		}
	});

	//dom-ready inits
	$($.mobile.initializePage);

	//window load event
	//hide iOS browser chrome on load
	$window.load( $.mobile.silentScroll );
})( jQuery, this );
