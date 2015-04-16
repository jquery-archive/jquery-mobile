/*!
 * jQuery Mobile Flow Transition Fallback @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Flow Transition
//>>group: Transitions
//>>description: Flow transition fallback definition for non-3D supporting browsers
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/
//>>css.structure: ../css/structure/jquery.mobile.transition.flow.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../handlers" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.transitionFallbacks.flow = "fade";

} );
