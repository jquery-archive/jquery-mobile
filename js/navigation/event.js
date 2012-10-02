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

		history: {
			popstate: function( event, data ) {
				$win.trigger( new $.Event( "navigate" ), $.extend(data, {
					from: "popstate"
				}));
			}
    },

		setup: function( data, namespaces ) {
			if( bound ) {
				return;
			}

			bound = true;

			if( $.support.pushState ) {
				$win.bind( "popstate", function( event ) {
					self.history.popstate( event, data );
				});
			} else {
				$win.bind( "hashchange", function( event ) {
					$win.trigger( new $.Event( "navigate" ), $.extend(data, {
						from: "hashchange"
					}));
				});
			}
		}
	};
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
