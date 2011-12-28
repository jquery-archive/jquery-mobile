/*
* "transitions" plugin - Page change tranistions
*/

(function( $, window, undefined ) {

function css3TransitionHandler( name, reverse, $to, $from ) {

	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		active	= $.mobile.urlHistory.getActive(),
		touchOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled,
		toScroll = active.lastScroll || ( touchOverflow ? 0 : $.mobile.defaultHomeScroll ),
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		screenHeight = $.mobile.getScreenHeight(),
		doneFunc = function() {

			$to.add( $from ).removeClass( "out in reverse " + name );

			if ( $from && $from[ 0 ] !== $to[ 0 ] ) {
				$from.removeClass( $.mobile.activePageClass );
			}

			$to.parent().removeClass( viewportClass );
			
			//reset $to height back
			if( !touchOverflow ){
				$to.height( "" );
			}

			// Jump to top or prev scroll, sometimes on iOS the page has not rendered yet.
			if( !touchOverflow ){
				$.mobile.silentScroll( toScroll );
			}

			//trigger show/hide events
			if( $from ) {
				if( !touchOverflow ){
					$from.height( "" );
				}
			}

			deferred.resolve( name, reverse, $to, $from );
		};

	$to.animationComplete( doneFunc );

	$to.parent().addClass( viewportClass );
	
	// Scroll to top, hide addr bar
	window.scrollTo( 0, $.mobile.defaultHomeScroll );
	
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

	//clear page loader
	$.mobile.hidePageLoadingMsg();
	
	if ( $from ) {
		$from.addClass( name + " out" + reverseClass );
	}
	
	$to.addClass( $.mobile.activePageClass + " " + name + " in" + reverseClass );

	return deferred.promise();
}

// Make our transition handler public.
$.mobile.css3TransitionHandler = css3TransitionHandler;

// If the default transition handler is the 'none' handler, replace it with our handler.
if ( $.mobile.defaultTransitionHandler === $.mobile.noneTransitionHandler ) {
	$.mobile.defaultTransitionHandler = css3TransitionHandler;
}

})( jQuery, this );
