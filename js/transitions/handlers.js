//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change handlers for integrating with Navigation
//>>label: Transition Handlers
//>>group: Transitions

define( ["jquery", "../jquery.mobile.core", "./serial", "./concurrent"], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	// generate the handlers from the above
	var sequentialHandler = $.mobile.SerialTransition,
	  simultaneousHandler = $.mobile.ConcurrentTransition,
	  defaultGetMaxScrollForTransition = function() {
		  return $.mobile.getScreenHeight() * 3;
	  };

	// Make our transition handler the public default.
	$.mobile.defaultTransitionHandler = sequentialHandler;

	//transition handler dictionary for 3rd party transitions
	$.mobile.transitionHandlers = {
		"default": $.mobile.defaultTransitionHandler,
		"sequential": sequentialHandler,
		"simultaneous": simultaneousHandler
	};

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
