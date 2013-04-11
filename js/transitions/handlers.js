//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change handlers for integrating with Navigation
//>>label: Transition Handlers
//>>group: Transitions

define( ["jquery", "../jquery.mobile.core", "./serial", "./concurrent"], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	// generate the handlers from the above
	var defaultGetMaxScrollForTransition = function() {
		return $.mobile.getScreenHeight() * 3;
	};

	//transition handler dictionary for 3rd party transitions
	$.mobile.transitionHandlers = {
		"default": $.mobile.defaultTransitionHandler,
		"sequential": function( name, reverse, to, from ) {
			return (new $.mobile.SerialTransition( name, reverse, to, from )).transition();
		},

		"simultaneous": function( name, reverse, to, from ) {
			return (new $.mobile.ConcurrentTransition( name, reverse, to, from )).transition();
		}
	};

	// Make our transition handler the public default.
	$.mobile.defaultTransitionHandler = $.mobile.transitionHandlers.sequential;
	$.mobile.transitionHandlers["default"] = $.mobile.defaultTransitionHandler;

	$.mobile.transitionFallbacks = {};

	// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
	$.mobile._maybeDegradeTransition = function( transition ) {
		if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
			transition = $.mobile.transitionFallbacks[ transition ];
		}

		return transition;
	};

	// Set the getMaxScrollForTransition to default if no implementation was set by user
	$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
