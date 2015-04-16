/*!
 * jQuery Mobile Concurrent Transition @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Transition Concurrent
//>>group: Transitions
//>>description: Animated page change with concurrent transition style application
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./transition" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.ConcurrentTransition = function() {
	this.init.apply( this, arguments );
};

$.extend( $.mobile.ConcurrentTransition.prototype, $.mobile.Transition.prototype, {
	sequential: false,

	beforeDoneIn: function() {
		if ( this.$from ) {
			this.cleanFrom();
		}
	},

	beforeStartOut: function( screenHeight, reverseClass, none ) {
		this.doneOut( screenHeight, reverseClass, none );
	}
} );

return $.mobile.ConcurrentTransition;
} );
