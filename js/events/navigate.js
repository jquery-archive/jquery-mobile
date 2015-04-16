/*!
 * jQuery Mobile Navigate Event @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Navigate
//>>group: Events
//>>description: Provides a wrapper around hashchange and popstate
//>>docs: http://api.jquerymobile.com/navigate/
//>>demos: http://api.jquerymobile.com/@VERSION/navigation/

// TODO break out pushstate support test so we don't depend on the whole thing
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./../ns",
			"./../support" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var $win = $.mobile.window, self,
	dummyFnToInitNavigate = function() {};

$.event.special.beforenavigate = {
	setup: function() {
		$win.on( "navigate", dummyFnToInitNavigate );
	},

	teardown: function() {
		$win.off( "navigate", dummyFnToInitNavigate );
	}
};

$.event.special.navigate = self = {
	bound: false,

	pushStateEnabled: true,

	originalEventName: undefined,

	// If pushstate support is present and push state support is defined to
	// be true on the mobile namespace.
	isPushStateEnabled: function() {
		return $.support.pushState &&
			$.mobile.pushStateEnabled === true &&
			this.isHashChangeEnabled();
	},

	// !! assumes mobile namespace is present
	isHashChangeEnabled: function() {
		return $.mobile.hashListeningEnabled === true;
	},

	// TODO a lot of duplication between popstate and hashchange
	popstate: function( event ) {
		var newEvent, beforeNavigate, state;

		if ( event.isDefaultPrevented() ) {
			return;
		}

		newEvent = new $.Event( "navigate" );
		beforeNavigate = new $.Event( "beforenavigate" );
		state = event.originalEvent.state || {};

		beforeNavigate.originalEvent = event;
		$win.trigger( beforeNavigate );

		if ( beforeNavigate.isDefaultPrevented() ) {
			return;
		}

		if ( event.historyState ) {
			$.extend( state, event.historyState );
		}

		// Make sure the original event is tracked for the end
		// user to inspect incase they want to do something special
		newEvent.originalEvent = event;

		// NOTE we let the current stack unwind because any assignment to
		//      location.hash will stop the world and run this event handler. By
		//      doing this we create a similar behavior to hashchange on hash
		//      assignment
		setTimeout( function() {
			$win.trigger( newEvent, {
				state: state
			} );
		}, 0 );
	},

	hashchange: function( event /*, data */ ) {
		var newEvent = new $.Event( "navigate" ),
			beforeNavigate = new $.Event( "beforenavigate" );

		beforeNavigate.originalEvent = event;
		$win.trigger( beforeNavigate );

		if ( beforeNavigate.isDefaultPrevented() ) {
			return;
		}

		// Make sure the original event is tracked for the end
		// user to inspect incase they want to do something special
		newEvent.originalEvent = event;

		// Trigger the hashchange with state provided by the user
		// that altered the hash
		$win.trigger( newEvent, {
			// Users that want to fully normalize the two events
			// will need to do history management down the stack and
			// add the state to the event before this binding is fired
			// TODO consider allowing for the explicit addition of callbacks
			//      to be fired before this value is set to avoid event timing issues
			state: event.hashchangeState || {}
		} );
	},

	// TODO We really only want to set this up once
	//      but I'm not clear if there's a beter way to achieve
	//      this with the jQuery special event structure
	setup: function( /* data, namespaces */ ) {
		if ( self.bound ) {
			return;
		}

		self.bound = true;

		if ( self.isPushStateEnabled() ) {
			self.originalEventName = "popstate";
			$win.bind( "popstate.navigate", self.popstate );
		} else if ( self.isHashChangeEnabled() ) {
			self.originalEventName = "hashchange";
			$win.bind( "hashchange.navigate", self.hashchange );
		}
	}
};

return $.event.special.navigate;
} );
