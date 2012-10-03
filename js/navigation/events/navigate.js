//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: placeholder
//>>label: AJAX Navigation System
//>>group: Navigation

// TODO break out pushstate support test so we don't
//      depend on the whole thing
define([ "jquery",
				 "./../../jquery.mobile.support" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {
	var $win = $( window ), self, bound;

	$.event.special.navigate = self = {
		bound: false,

		popstate: function( event ) {
			$win.trigger( new $.Event( "navigate" ), {
				from: "popstate",
				state: event.originalEvent.state
			});
		},

		hashchange: function( event ) {
			$win.trigger( new $.Event( "navigate" ), {
				from: "hashchange",
				state: {}
			});
		},

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
