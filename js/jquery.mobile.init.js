/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $( window );

 	//trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	//support conditions
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	//add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	//define & prepend meta viewport tag, if content is defined
	//NOTE: this is now deprecated. We recommend placing the meta viewport element in
	//the markup from the start.
	$.mobile.metaViewportContent && !$head.find( "meta[name='viewport']" ).length ? $( "<meta>", { name: "viewport", content: $.mobile.metaViewportContent}).prependTo( $head ) : undefined;

	//loading div which appears during Ajax requests
	//will not appear if $.mobile.loadingMessage is false
	var $loader = $.mobile.loadingMessage ?
		$( "<div class='ui-loader ui-body-a ui-corner-all'>" +
		 	 "<span class='ui-icon ui-icon-loading spin'></span>" +
			 "<h1>" + $.mobile.loadingMessage + "</h1>" +
			 "</div>" )
		: undefined;


	$.extend($.mobile, {
		// turn on/off page loading message.
		pageLoading: function ( done ) {
			if ( done ) {
				$html.removeClass( "ui-loading" );
			} else {
				if( $.mobile.loadingMessage ){
					var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

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

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function(){
			//find present pages
			var $pages = $( "[data-role='page']" );

			//add dialogs, set data-url attrs
			$pages.add( "[data-role='dialog']" ).each(function(){
				var $this = $(this);

				// unless the data url is already set set it to the id
				if( !$this.data('url') ){
					$this.attr( "data-url", $this.attr( "id" ) );
				}
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
	$( $.mobile.initializePage );

	//window load event
	//hide iOS browser chrome on load
	$window.load( $.mobile.silentScroll );
})( jQuery, this );
