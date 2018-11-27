/*!
 * jQuery Mobile Navigate Method @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Navigate Method
//>>group: Navigation
//>>description: A wrapper for the primary Navigator and History objects in jQuery Mobile
//>>docs: http://api.jquerymobile.com/jQuery.mobile.navigate/
//>>demos: http://demos.jquerymobile.com/@VERSION/navigation/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./path",
			"./history",
			"./navigator" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

// TODO consider queueing navigation activity until previous activities have completed
//      so that end users don't have to think about it. Punting for now
// TODO !! move the event bindings into callbacks on the navigate event
$.mobile.navigate = function( url, data, noEvents ) {
	$.mobile.navigate.navigator.go( url, data, noEvents );
};

// expose the history on the navigate method in anticipation of full integration with
// existing navigation functionalty that is tightly coupled to the history information
$.mobile.navigate.history = new $.mobile.History();

// instantiate an instance of the navigator for use within the $.navigate method
$.mobile.navigate.navigator = new $.mobile.Navigator( $.mobile.navigate.history );

var loc = $.mobile.path.parseLocation();
$.mobile.navigate.history.add( loc.href, { hash: loc.hash } );

return $.mobile.navigate;
} );
