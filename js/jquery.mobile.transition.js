
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Page change transition core
//>>label: Transition Core

define( [ "jquery", "./jquery.mobile.core" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

function outInTransitionHandler( name, reverse, $to, $from ) {
	
	// override name if there's no 3D transform support and a fallback is defined, or if not, to "none"
	if( name && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ name ] ){
		name = $.mobile.transitionFallbacks[ name ];
	}
	
	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		active	= $.mobile.urlHistory.getActive(),
		toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
		screenHeight = $.mobile.getScreenHeight(),
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
		none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
		doneOut = function() {

			if ( $from ) {
				$from
					.removeClass( $.mobile.activePageClass + " out in reverse " + name )
					.height( "" );
			}
			
			$to.addClass( $.mobile.activePageClass );
			
			if( !none ){
				$to.animationComplete( doneIn );
			}

			// Send focus to page as it is now display: block
			$.mobile.focusPage( $to );
			
			// Jump to top or prev scroll, sometimes on iOS the page has not rendered yet.
			$to.height( screenHeight + toScroll );
				
			$.mobile.silentScroll( toScroll );
			
			$to.addClass( name + " in" + reverseClass );
			
			if( none ){
				doneIn();
			}
			
		},
		
		doneIn = function() {
			$to
				.removeClass( "out in reverse " + name )
				.height( "" )
				.parent().removeClass( viewportClass );
			
			deferred.resolve( name, reverse, $to, $from, true );
		};
		
	$to
		.parent().addClass( viewportClass );
	
	if ( $from && !none ) {
		$from
			.animationComplete( doneOut )
			.height( screenHeight + $(window ).scrollTop() )
			.addClass( name + " out" + reverseClass );
	}
	else {	
		doneOut();
	}

	return deferred.promise();
}

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = outInTransitionHandler;

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"default": $.mobile.defaultTransitionHandler
};

$.mobile.transitionFallbacks = {};

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");