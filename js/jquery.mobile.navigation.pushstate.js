/*
* jQuery Mobile Framework : history.pushState support, layered on top of hashchange
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
( function( $, window ) {
	// For now, let's Monkeypatch this onto the end of $.mobile._registerInternalEvents
	// Scope self to pushStateHandler so we can reference it sanely within the
	// methods handed off as event handlers
	var	pushStateHandler = {},
		self = pushStateHandler,
		$win = $( window ),
		url = $.mobile.path.parseUrl( location.href );

	$.extend( pushStateHandler, {
		// TODO move to a path helper, this is rather common functionality
		initialFilePath: (function() {
			return url.pathname + url.search;
		})(),

		initialHref: url.hrefNoHash,

		// Flag for tracking if a Hashchange naturally occurs after each popstate + replace
		hashchangeFired: false,

		state: function() {
			return {
				hash: location.hash || "#" + self.initialFilePath,
				title: document.title,

				// persist across refresh
				initialHref: self.initialHref
			};
		},

		// on hash change we want to clean up the url
		// NOTE this takes place *after* the vanilla navigation hash change
		// handling has taken place and set the state of the DOM
		onHashChange: function( e ) {
			var href, state;

			self.hashchangeFired = true;

			// only replaceState when the hash doesn't represent an embeded page
			if( $.mobile.path.isPath(location.hash) ) {

				// propulate the hash when its not available
				state = self.state();

				// make the hash abolute with the current href
				href = $.mobile.path.makeUrlAbsolute( state.hash.replace("#", ""), location.href );

				// replace the current url with the new href and store the state
				history.replaceState( state, document.title, href );
			}
		},

		// on popstate (ie back or forward) we need to replace the hash that was there previously
		// cleaned up by the additional hash handling
		onPopState: function( e ) {
			var poppedState = e.originalEvent.state;

			// if there's no state its not a popstate we care about, ie chrome's initial popstate
			// or forward popstate
			if( poppedState ) {

				// replace the current url with the equivelant hash so that the hashchange binding in vanilla nav
				// can do its thing one triggered below
			 	history.replaceState( poppedState, poppedState.title, poppedState.initialHref + poppedState.hash );

				// Urls that reference subpages will fire their own hashchange, so we don't want to trigger 2 in that case.
				self.hashchangeFired = false;

				setTimeout(function() {
					if( !self.hashchangeFired ) {
						$win.trigger( "hashchange" );
					}

					self.hashchangeFired = false;
				}, 0);
			}
		},

		init: function() {
			$win.bind( "hashchange", self.onHashChange );

			// Handle popstate events the occur through history changes
			$win.bind( "popstate", self.onPopState );

			// if there's no hash, we need to replacestate for returning to home
			if ( location.hash === "" ) {
				history.replaceState( self.state(), document.title, location.href );
			}
		}
	});

	$( function() {
		if( $.mobile.pushStateEnabled && $.support.pushState ){
			pushStateHandler.init();
		}
	});
})( jQuery, this );