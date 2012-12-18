//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: placeholder
//>>label: AJAX Navigation System
//>>group: Navigation

// TODO break out pushstate support test so we don't depend on the whole thing
define([ "jquery", "./../jquery.mobile.support" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {
	var $win = $( window ), self, history;

	$.event.special.navigate = self = {
		bound: false,

		pushStateEnabled: true,

		originalEventName: undefined,

		isPushStateEnabled: function() {
			return $.support.pushState && $.mobile && $.mobile.pushStateEnabled;
		},

		// TODO a lot of duplication between popstate and hashchange
		popstate: function( event ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" ),
				state = event.originalEvent.state || {},
				href = location.href;

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
				return;
			}

			if( event.historyState ){
				$.extend(state, event.historyState);
			}

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// NOTE we let the current stack unwind because any assignment to
			//      location.hash will stop the world and run this event handler. By
			//      doing this we create a similar behavior to hashchange on hash
			//      assignment
			setTimeout(function() {
				$win.trigger( newEvent, {
					state: state
				});
			}, 0);
		},

		hashchange: function( event, data ) {
			var newEvent = new $.Event( "navigate" ),
				beforeNavigate = new $.Event( "beforenavigate" );

			$win.trigger( beforeNavigate );

			if( beforeNavigate.isDefaultPrevented() ){
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
			});
		},

		// TODO We really only want to set this up once
		//      but I'm not clear if there's a beter way to achieve
		//      this with the jQuery special event structure
		setup: function( data, namespaces ) {
			if( self.bound ) {
				return;
			}

			self.bound = true;

			if( self.isPushStateEnabled() ) {
				self.originalEventName = "popstate";
				$win.bind( "popstate.navigate", self.popstate );
			} else {
				self.originalEventName = "hashchange";
				$win.bind( "hashchange.navigate", self.hashchange );
			}
		}
	};
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
