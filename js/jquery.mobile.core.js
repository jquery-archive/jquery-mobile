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

		//define the url parameter used for referencing widget-generated sub-pages.
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: 'ui-page',

		//anchor links with a data-rel, or pages with a data-role, that match these selectors will be untrackable in history
		//(no change in URL, not bookmarkable)
		nonHistorySelectors: 'dialog',

		//class assigned to page currently in view, and during transitions
		activePageClass: 'ui-page-active',

		//class used for "active" button state, from CSS framework
		activeBtnClass: 'ui-btn-active',

		//automatically handle link clicks through Ajax, when possible
		ajaxLinksEnabled: true,

		//automatically handle form submissions through Ajax, when possible
		ajaxFormsEnabled: true,

		//set default transition - 'none' for no transitions
		defaultTransition: 'slide',

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
	$( window.document ).trigger('mobileinit');


	//support conditions
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}


	//define vars for interal use
	var $window = $(window),
		$html = $('html'),
		$head = $('head'),

		//loading div which appears during Ajax requests
		//will not appear if $.mobile.loadingMessage is false
		$loader = $.mobile.loadingMessage ?
			$('<div class="ui-loader ui-body-a ui-corner-all">'+
						'<span class="ui-icon ui-icon-loading spin"></span>'+
						'<h1>'+ $.mobile.loadingMessage +'</h1>'+
					'</div>')
			: undefined;


	//add mobile, initial load "rendering" classes to docEl
	$html.addClass('ui-mobile ui-mobile-rendering');


	//define & prepend meta viewport tag, if content is defined
	$.mobile.metaViewportContent ? $("<meta>", { name: "viewport", content: $.mobile.metaViewportContent}).prependTo( $head ) : undefined;


	//expose some core utilities
	$.extend($.mobile, {

		// turn on/off page loading message.
		pageLoading: function ( done ) {
			if ( done ) {
				$html.removeClass( "ui-loading" );
			} else {
				if( $.mobile.loadingMessage ){
					var activeLink = $( "." + $.mobile.activeBtnClass ).eq(0),
						yPos = activeLink.length ? activeLink.offset().top : $(window).scrollTop() + 75;
					$loader.appendTo($.mobile.pageContainer).css({top: yPos});
				}
				$html.addClass( "ui-loading" );
			}
		},

		//scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;
			setTimeout(function() {
				window.scrollTo( 0, ypos || 0 );
			},20);
			setTimeout(function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		}
	});


	//dom-ready inits
	$(function(){

		//find present pages
		var $pages = $("[data-role='page']");

		$("[data-role='page'], [data-role='dialog']").each(function(){
			$(this).attr('data-url', $(this).attr('id'));
		});

		//set up active page
		$.mobile.startPage = $.mobile.activePage = $pages.first();

		//set page container
		$.mobile.pageContainer = $.mobile.startPage.parent().addClass('ui-mobile-viewport');

		//cue page loading message
		$.mobile.pageLoading();

		//initialize all pages present
		$pages.page();

		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange", [ true ] );

		//remove rendering class
		$html.removeClass('ui-mobile-rendering');
	});


	//window load event
	//hide iOS browser chrome on load
	$window.load( $.mobile.silentScroll );

})( jQuery, this );
