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
	
	// override ajaxEnabled on platforms that have known conflicts with hash history updates 
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if( window.blackberry && !window.WebKitPoint || window.operamini && Object.prototype.toString.call( window.operamini ) === "[object OperaMini]" ){
		$.mobile.ajaxEnabled = false;
	}

	//add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	//loading div which appears during Ajax requests
	//will not appear if $.mobile.loadingMessage is false
	var $loader = $.mobile.loadingMessage ?		$( "<div class='ui-loader ui-body-a ui-corner-all'>" + "<span class='ui-icon ui-icon-loading spin'></span>" + "<h1>" + $.mobile.loadingMessage + "</h1>" + "</div>" )	: undefined;

	$.extend($.mobile, {
		// turn on/off page loading message.
		showPageLoadingMsg: function() {
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
		},

		hidePageLoadingMsg: function() {
			$html.removeClass( "ui-loading" );
		},

		// XXX: deprecate for 1.0
		pageLoading: function ( done ) {
			if ( done ) {
				$.mobile.hidePageLoadingMsg();
			} else {
				$.mobile.showPageLoadingMsg();
			}
		},

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function(){
			//find present pages
			var $pages = $( ":jqmData(role='page')" );

			//add dialogs, set data-url attrs
			$pages.add( ":jqmData(role='dialog')" ).each(function(){
				var $this = $(this);

				// unless the data url is already set set it to the id
				if( !$this.jqmData('url') ){
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) );
				}
			});

			//define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			//define page container
			$.mobile.pageContainer = $pages.first().parent().addClass( "ui-mobile-viewport" );

			//cue page loading message
			$.mobile.showPageLoadingMsg();

			// if hashchange listening is disabled or there's no hash deeplink, change to the first page in the DOM
			if( !$.mobile.hashListeningEnabled || !$.mobile.path.stripHash( location.hash ) ){
				$.mobile.changePage( $.mobile.firstPage, { transition: "none", reverse: true, changeHash: false, fromHashChange: true } );
			}
			// otherwise, trigger a hashchange to load a deeplink
			else {
				$window.trigger( "hashchange", [ true ] );
			}
		}
	});
	
	//initialize events now, after mobileinit has occurred
	$.mobile._registerInternalEvents();
	
	//check which scrollTop value should be used by scrolling to 1 immediately at domready
	//then check what the scroll top is. Android will report 0... others 1
	//note that this initial scroll won't hide the address bar. It's just for the check.
	$(function(){
		window.scrollTo( 0, 1 );
	
		//if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		//it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		//so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $(window).scrollTop() === 1 ) ? 0 : 1;
	
		//dom-ready inits
		$( $.mobile.initializePage );
	
		//window load event
		//hide iOS browser chrome on load
		$window.load( $.mobile.silentScroll );
	});
})( jQuery, this );
