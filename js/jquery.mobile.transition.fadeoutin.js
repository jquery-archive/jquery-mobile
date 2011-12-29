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
		preTransClass = "ui-mobile-pre-transition",
		doneOut = function() {

			if ( $from ) {
				$from.removeClass( $.mobile.activePageClass + " " + preTransClass + " out in reverse " + name );
			}
			
			$to
				.animationComplete( doneIn )
				.addClass( preTransClass );

			if( touchOverflow && toScroll ){
		
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
			}
	
			$to.addClass( $.mobile.activePageClass + " " + name + " in" + reverseClass );
			
		},
		
		doneIn = function() {

			$to
				.removeClass( "out in reverse " + name + " " + preTransClass )
				.parent().removeClass( viewportClass );
			
			$.mobile.silentScroll( toScroll );	

			deferred.resolve( name, reverse, $to, $from );
		};

	$to.parent().addClass( viewportClass );

	//clear page loader
	$.mobile.hidePageLoadingMsg();
	
	if ( $from ) {
		$from
			.animationComplete( doneOut )
			.addClass( name + " out" + reverseClass );
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
