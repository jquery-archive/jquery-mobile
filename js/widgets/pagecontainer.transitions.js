/*!
 * jQuery Mobile Page Container @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Content Management
//>>group: Navigation
//>>description: Widget to create page container which manages pages and transitions
//>>docs: http://api.jquerymobile.com/pagecontainer/
//>>demos: http://demos.jquerymobile.com/@VERSION/navigation/
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./pagecontainer",

			// For $.mobile.navigate.history
			"../navigation/method",
			"../transitions/handlers" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {
return $.widget( "mobile.pagecontainer", $.mobile.pagecontainer, {
	_getTransitionHandler: function( transition ) {
		transition = $.mobile._maybeDegradeTransition( transition );

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick off the transition.
		return $.mobile.transitionHandlers[ transition ] || $.mobile.defaultTransitionHandler;
	},

	_performTransition: function( transition, reverse, to, from ) {
		var TransitionHandler = this._getTransitionHandler( transition );

		return ( new TransitionHandler( transition, reverse, to, from ) ).transition(
			$.mobile.navigate.history.getActive().lastScroll || $.mobile.defaultHomeScroll );
	}
} );
} );
