
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Page change transition core
//>>label: Transition Core
//>>group: Transitions
//>>css: ../css/themes/default/jquery.mobile.theme.css, ../css/structure/jquery.mobile.transitions.css

define( [ "jquery", "./jquery.mobile.core" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

var createHandler = function( sequential ){
	
	// Default to sequential
	if( sequential === undefined ){
		sequential = true;
	}
	
	return function( name, reverse, $to, $from ) {

		var deferred = new $.Deferred(),
			reverseClass = reverse ? " reverse" : "",
			active	= $.mobile.urlHistory.getActive(),
			toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
			screenHeight = $.mobile.getScreenHeight(),
			maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
			none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
			toggleViewportClass = function(){
				$.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
			},
			cleanFrom = function(){
				$from
					.removeClass( $.mobile.activePageClass + " out in reverse " + name )
					.height( "" );
			},
			startOut = function(){
				// if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
				if( !sequential ){
					doneOut();
				}
				else {
					$from.animationComplete( doneOut );	
				}
				
				// Set the from page's height and start it transitioning out
				// Note: setting an explicit height helps eliminate tiling in the transitions
				$from
					.height( screenHeight + $(window ).scrollTop() )
					.addClass( name + " out" + reverseClass );
			},
			
			doneOut = function() {

				if ( $from && sequential ) {
					cleanFrom();
				}
				
				startIn();
			},
			
			startIn = function(){	
			
				$to.addClass( $.mobile.activePageClass );				
			
				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				// Set to page height
				$to.height( screenHeight + toScroll );
				
				// By using scrollTo instead of silentScroll, we can keep things better in order
				window.scrollTo( 0, toScroll );
				
				if( !none ){
					$to.animationComplete( doneIn );
				}
				
				$to.addClass( name + " in" + reverseClass );
				
				if( none ){
					doneIn();
				}
				
			},
		
			doneIn = function() {
			
				if ( !sequential ) {
					
					if( $from ){
						cleanFrom();
					}
				}
			
				$to
					.removeClass( "out in reverse " + name )
					.height( "" );
				
				toggleViewportClass();
				
				// In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
				// This ensures we jump to that spot after the fact, if we aren't there already.
				if( $( window ).scrollTop() !== toScroll ){
					window.scrollTo( 0, toScroll );
				}

				deferred.resolve( name, reverse, $to, $from, true );
			};

		toggleViewportClass();
	
		if ( $from && !none ) {
			startOut();
		}
		else {
			doneOut();
		}

		return deferred.promise();
	};
}

// generate the handlers from the above
var sequentialHandler = createHandler(),
	simultaneousHandler = createHandler( false );

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = sequentialHandler;

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"default": $.mobile.defaultTransitionHandler,
	"sequential": sequentialHandler,
	"simultaneous": simultaneousHandler
};

$.mobile.transitionFallbacks = {};

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");