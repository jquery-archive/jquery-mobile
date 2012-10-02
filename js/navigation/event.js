//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: placeholder
//>>label: AJAX Navigation System
//>>group: Navigation
define([
	"jquery",
	"./jquery.mobile.core",
	"./jquery.mobile.support",
	"./navigation/path",
	"./jquery.mobile.navigation",
	"depend!./jquery.hashchange[jquery]" ], function( $ ) {
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
			if( bound ) {
				return;
			}

			bound = true;

			if( $.support.pushState ) {
				$win.bind( "popstate", self.popstate );
			} else {
				$win.bind( "hashchange", self.hashchange );
			}
		}
	};
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
