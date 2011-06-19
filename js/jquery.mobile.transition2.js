/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

( function( $, window, undefined ) {

    /**
     * Transition handler that uses CSS3 transitions instead of CSS3 animations.
     * @param name
     * @param reverse
     * @param $to
     * @param $from
     */
function css3Transition2Handler( name, reverse, $to, $from )
{
	var deferred = new $.Deferred(),
		reverseClass = reverse ? " reverse" : "",
		viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
		doneFunc = function() {
			$to.add( $from ).removeClass( "transition out2 in2 reverse start end " + name );
			if ( $from ) {
				$from.removeClass( $.mobile.activePageClass );
			}
            $to.parent().removeClass( viewportClass );
			deferred.resolve( name, reverse, $to, $from );
		};
	$to.transitionComplete( doneFunc );
	
	$to.parent().addClass( viewportClass );
	if ( $from ) {
		$from.addClass( "transition2 "+name + " out2" + reverseClass +" start");
	}
	$to.addClass( $.mobile.activePageClass + " transition2 " + name + " in2" + reverseClass +" start");

    // Set the end point of the transition some time later,
    // so that the transition is really executed!
    window.setTimeout(function() {
        if ($from) {
            $from.addClass('end');
        }
        $to.addClass('end');
    },10);
	return deferred.promise();
}

// Make our transition handler public.
$.mobile.css3Transition2Handler = css3Transition2Handler;

// If the css3transitionHandler ist set, but we are on android, replace it with our handler.
if ( $.mobile.browser.android && $.mobile.defaultTransitionHandler === $.mobile.css3TransitionHandler ) {
    $.mobile.defaultTransitionHandler = css3Transition2Handler;
    // For android, we need to set a special style to the page container to prevent flickering
    $('div').live('pagebeforeshow',function(event, ui){
        $(this).parent().css('-webkit-transform', 'translate3d(0,0,0)');
    });
}

})( jQuery, this );

