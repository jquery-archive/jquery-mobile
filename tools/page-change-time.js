/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

// This is code that can be used as a simple bookmarklet for timing
// the load, enhancment, and transition of a changePage() request.

(function( $, window, undefined ) {


	function getTime() {
		return ( new Date() ).getTime();
	}

	var startChange, stopChange, startLoad, stopLoad,  startEnhance, stopEnhance, startTransition, stopTransition, lock = 0;

	$( document )
		.bind( "pagebeforechange", function( e, data) {
				if ( typeof data.toPage === "string" ) {
					startChange = stopChange = startLoad = stopLoad = startEnhance = stopEnhance = startTransition = stopTransition = getTime();
				}
			})
		.bind( "pagebeforeload", function() {
				startLoad = stopLoad = getTime();
			})
		.bind( "pagebeforecreate", function() {
				if ( ++lock === 1 ) {
					stopLoad = startEnhance = stopEnhance = getTime();
				}
			})
		.bind( "pageinit", function() {
				if ( --lock === 0 ) {
					stopEnhance = getTime();
				}
			})
		.bind( "pagebeforeshow", function() {
				startTransition = stopTransition = getTime();
			})
		.bind( "pageshow", function() {
				stopTransition = getTime();
			})
		.bind( "pagechange", function( e, data ) {
				if ( typeof data.toPage === "object" ) {
					stopChange = getTime();

					alert("load + processing: " + ( stopLoad - startLoad )
							+ "\nenhance: " + ( stopEnhance - startEnhance )
							+ "\ntransition: " + ( stopTransition - startTransition )
							+ "\ntotalTime: " + ( stopChange - startChange ) );

					startChange = stopChange = startLoad = stopLoad = startEnhance = stopEnhance = startTransition = stopTransition = 0;
				}
			});


})( jQuery, window );