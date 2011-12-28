/*
* "transitions" plugin - Page change tranistions
*/

(function( $, window, undefined ) {

function fadeOutInTransitionHandler( name, reverse, $to, $from ) {

	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		active	= $.mobile.urlHistory.getActive(),
		touchOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled,
		toScroll = active.lastScroll || ( touchOverflow ? 0 : $.mobile.defaultHomeScroll ),
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		screenHeight = $.mobile.getScreenHeight(),
		doneOut = function() {

			if ( $from && $from[ 0 ] !== $to[ 0 ] ) {
				$from.removeClass( $.mobile.activePageClass + " out in reverse " + name );
				if( !touchOverflow ){
					$from.height( "" );
				}
			}
			
			$to.animationComplete( doneIn );
			
			if( !touchOverflow){
				$to.height( screenHeight + toScroll );
			}

			if( touchOverflow && toScroll ){
		
				$to.addClass( "ui-mobile-pre-transition" );
		
				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				//set page's scrollTop to remembered distance
				if( $to.is( ".ui-native-fixed" ) ){
					$to.find( ".ui-content" ).scrollTop( toScroll );
				}
				else{
					$to.scrollTop( toScroll );
				}
			}
			
			
			// Jump to top or prev scroll, sometimes on iOS the page has not rendered yet.
			if( !touchOverflow ){
				$.mobile.silentScroll( toScroll );
				$to.height( "" );
			}
			
			$to.addClass( $.mobile.activePageClass + " " + name + " in" + reverseClass );
			
		},
		
		doneIn = function() {

			$to.removeClass( "out in reverse " + name );

			$to.parent().removeClass( viewportClass );

			deferred.resolve( name, reverse, $to, $from );
		};

	$to.parent().addClass( viewportClass );

	//clear page loader
	$.mobile.hidePageLoadingMsg();
	
	if ( $from ) {
		$from.animationComplete( doneOut );
		$from.addClass( name + " out" + reverseClass );
	}
	else {	
		doneOut();
	}

	return deferred.promise();
}

// Make our transition handler public.
$.mobile.fadeOutInTransitionHandler = fadeOutInTransitionHandler;

// If the default transition handler is the 'none' handler, replace it with our handler.
if ( $.mobile.defaultTransitionHandler === $.mobile.noneTransitionHandler ) {
	$.mobile.defaultTransitionHandler = fadeOutInTransitionHandler;
}

})( jQuery, this );
