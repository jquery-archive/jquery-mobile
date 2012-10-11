//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: placeholder
//>>label: AJAX Navigation System
//>>group: Navigation

// TODO break out pushstate support test so we don't depend on the whole thing
define([ "jquery",
	 "./../../jquery.mobile.support" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {
	var $win = $( window ), self, history;

	$.event.special.navigate = self = {
		bound: false,

		popstate: function( event ) {
			var newEvent = new $.Event( "navigate" ),
				state = event.originalEvent.state;

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// NOTE the `|| {}` is there to ensure consistency between
			//      the popstate navigate event and the hashchange navigate
			//      event data
			$win.trigger( newEvent, {
				state: state || {}
			});
		},

		hashchange: function( event, data ) {
			var newEvent = new $.Event( "navigate" );

			// Make sure the original event is tracked for the end
			// user to inspect incase they want to do something special
			newEvent.originalEvent = event;

			// Trigger the hashchange with state provided by the user
			// that altered the hash
			$win.trigger( newEvent, {
				// Users that want to fully normalize the two events
				// will need to do history management down the stack and
				// add the state to the event before this binding is fired
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

			if( $.support.pushState ) {
				$win.bind( "popstate.navigate", self.popstate );
			} else {
				$win.bind( "hashchange.navigate", self.hashchange );
			}
		}
	};
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
