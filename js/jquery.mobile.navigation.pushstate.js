/*
* jQuery Mobile Framework : history.pushState support, layered on top of hashchange
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
( function( $, window ) {

	// For now, let's Monkeypatch this onto the end of $.mobile._registerInternalEvents
	var oldRegisterInternalEvents = $.mobile._registerInternalEvents;

	$.mobile._registerInternalEvents = function(){
		
		// Call previous function
		oldRegisterInternalEvents();
		
		// Initial href without hash becomes base for hash changes
		// TODO - get this value from $.mobile.path ?
		var initialFilePath		= location.href.split( "#" )[0].match( /[^\/]*\/\/[^\/]+(.*)/ ) && RegExp.$1,
		
			// Begin with popstate listening disabled, since it fires at onload in chrome
			popListeningEnabled	= false,
			
			// Support for nested lists and any other clientside-generated subpages
			subkey = "&" + $.mobile.subPageUrlKey,
			
			// Support for dialog hash urls
			dialog	= "&ui-state",
			
			// Cache window
			$win = $( window );

		$win.bind( "hashchange replacehash", function( e ) {

			if( $.support.pushState ){
				var hash = location.hash || "#" + initialFilePath,
					href = hash.replace( "#", "" );
				
				//support dialog urls	
				if( href ){
					if( href.indexOf( dialog ) > -1 ){
						href = href.split( dialog ).join( "#" + dialog );
					}
					else if( href.indexOf( subkey ) > -1 ){
						href = href.split( subkey ).join( "#" + subkey );
					}
				}

				history.replaceState( { hash: hash, title: document.title }, document.title, href );
			}
		});

		// Handle popstate events the occur through history changes
		$win.bind( "popstate", function( e ) {
			if( popListeningEnabled ){
				
				if( e.originalEvent.state ){
					history.replaceState( e.originalEvent.state, e.originalEvent.state.title, initialFilePath + e.originalEvent.state.hash );

					// Urls that reference subpages will fire their own hashchange, so we don't want to trigger 2 in that case.
					var fired = false;

					$win.bind( "hashchange.popstatetest", function(){
						fired = true;
					});

					setTimeout(function(){

						$win.unbind( "hashchange.popstatetest" );

						if( !fired ){
							$win.trigger( "hashchange" );
						}
					}, 100);

				}
			}
		});
		
		// Replace the hash before pushstate listening is enabled
		$win.trigger( "replacehash" );

		// Enable pushstate listening *after window onload
		// to ignore the initial pop that Chrome calls at onload
		$win.load( function(){
			setTimeout(function(){
				popListeningEnabled = true;
			}, 0 );
		});

	};

})( jQuery, this );