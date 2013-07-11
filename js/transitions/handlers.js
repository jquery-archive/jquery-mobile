//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change handlers for integrating with Navigation
//>>label: Transition Handlers
//>>group: Transitions

define( ["jquery", "../jquery.mobile.core", "./serial", "./concurrent"], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	// generate the handlers from the above
	var defaultGetMaxScrollForTransition = function() {
		return $.ui.getScreenHeight() * 3;
	};

	//transition handler dictionary for 3rd party transitions
	$.ui.transitionHandlers = {
		"default": $.ui.defaultTransitionHandler,
		"sequential": function( name, reverse, to, from ) {
			return (new $.ui.SerialTransition( name, reverse, to, from )).transition();
		},

		"simultaneous": function( name, reverse, to, from ) {
			return (new $.ui.ConcurrentTransition( name, reverse, to, from )).transition();
		}
	};

	// Make our transition handler the public default.
	$.ui.defaultTransitionHandler = $.ui.transitionHandlers.sequential;
	$.ui.transitionHandlers["default"] = $.ui.defaultTransitionHandler;

	$.ui.transitionFallbacks = {};

	// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
	$.ui._maybeDegradeTransition = function( transition ) {
		if ( transition && !$.support.cssTransform3d && $.ui.transitionFallbacks[ transition ] ) {
			transition = $.ui.transitionFallbacks[ transition ];
		}

		return transition;
	};

	// Set the getMaxScrollForTransition to default if no implementation was set by user
	$.ui.getMaxScrollForTransition = $.ui.getMaxScrollForTransition || defaultGetMaxScrollForTransition;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
