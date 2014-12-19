//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Scroll events including: scrollstart, scrollstop
//>>label: Scroll
//>>group: Events

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, window, undefined ) {
	var scrollEvent = "touchmove scroll";

	// setup new event shortcuts
	$.each( [ "scrollstart", "scrollstop" ], function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,
		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				var originalEventType = event.type;

				scrolling = state;

				event.type = scrolling ? "scrollstart" : "scrollstop";
				$.event.dispatch.call( thisObject, event );
				event.type = originalEventType;
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		},
		teardown: function() {
			$( this ).unbind( scrollEvent );
		}
	};

	$.each({
		scrollstop: "scrollstart"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			},
			teardown: function() {
				$( this ).unbind( sourceEvent );
			}
		};
	});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
