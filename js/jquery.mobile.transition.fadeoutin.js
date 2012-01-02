/*
* "transitions" plugin - Page change tranistions
*/

(function( $, window, undefined ) {

function outInTransitionHandler( name, reverse, $to, $from ) {
	
	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		active	= $.mobile.urlHistory.getActive(),
		touchOverflow = $.support.touchOverflow && $.mobile.touchOverflowEnabled,
		toScroll = active.lastScroll || ( touchOverflow ? 0 : $.mobile.defaultHomeScroll ),
		screenHeight = $.mobile.getScreenHeight(),
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		doneOut = function() {

			if ( $from ) {
				$from
					.removeClass( $.mobile.activePageClass + " out in reverse " + name )
					.height( "" );
			}
			
			$to
				.animationComplete( doneIn )
				.addClass( $.mobile.activePageClass );

			// Send focus to page as it is now display: block
			$.mobile.focusPage( $to );
			
			if( touchOverflow && toScroll ){

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
				$to.height( screenHeight + toScroll );
				
				$.mobile.silentScroll( toScroll );
			}
	
			$to.addClass( name + " in" + reverseClass );
			
		},
		
		doneIn = function() {

			$to
				.removeClass( "out in reverse " + name )
				.parent().removeClass( viewportClass )
				.height( "" );
			
			deferred.resolve( name, reverse, $to, $from, true );
		};
		
	$to
		.parent().addClass( viewportClass );	

	//clear page loader
	$.mobile.hidePageLoadingMsg();
	
	if ( $from ) {
		$from
			.height( screenHeight + $(window ).scrollTop() )
			.animationComplete( doneOut )
			.addClass( name + " out" + reverseClass );
	}
	else {	
		doneOut();
	}

	return deferred.promise();
}

// Make our transition handler public.
$.mobile.outInTransitionHandler = outInTransitionHandler;

// If the default transition handler is the 'none' handler, replace it with our handler.
if ( $.mobile.defaultTransitionHandler === $.mobile.noneTransitionHandler ) {
	$.mobile.defaultTransitionHandler = outInTransitionHandler;
}

})( jQuery, this );
