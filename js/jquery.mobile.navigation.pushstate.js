/*
* jQuery Mobile Framework : history.pushState support, layered on top of hashchange
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
( function( $ ) {

	// For now, let's Monkeypatch this onto the end of $.mobile._registerInternalEvents
	var oldRegisterInternalEvents = $.mobile._registerInternalEvents;

	$.mobile._registerInternalEvents = function(){
		
		// Call previous function
		oldRegisterInternalEvents();
		
		// Initial href without hash becomes base for hash changes
		var initUrl = location.href.split( "#" )[0].match( /[^\/]*\/\/[^\/]+(.*)/ ) && RegExp.$1,
			// Begin with popstate listening disabled, since it fires at onload in chrome
			popListeningEnabled	= false;

		$( window ).bind( "hashchange replacehash", function( e ) {
			if( $.support.pushState ){
				history.replaceState( { hash: location.hash || "#" + initUrl, title: document.title }, document.title, location.href.split( "#" )[ 1 ] );
			}
		});

		// Handle popstate events the occur through history changes
		$( window ).bind( "popstate", function( e ) {
			if( popListeningEnabled ){
				if( e.originalEvent.state ){
					history.replaceState( e.originalEvent.state, e.originalEvent.state.title, initUrl + e.originalEvent.state.hash );
					$( window ).trigger( "hashchange" );
				}
			}
		});

		// Replace the hash before pushstate listening is enabled
		$( window ).trigger( "replacehash" );

		// Enable pushstate listening after window onload
		$( window ).load( function(){
			setTimeout(function(){
				popListeningEnabled = true;
			}, 10 );
		});

	};

})( jQuery );