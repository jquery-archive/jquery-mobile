/*!
 * jQuery Mobile Serial Transition @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Transition Serial
//>>group: Transitions
//>>description: Animated page change with serial transition style application
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../animationComplete",
			"./transition" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.SerialTransition = function() {
	this.init.apply( this, arguments );
};

$.extend( $.mobile.SerialTransition.prototype, $.mobile.Transition.prototype, {
	sequential: true,

	beforeDoneOut: function() {
		if ( this.$from ) {
			this.cleanFrom();
		}
	},

	beforeStartOut: function( screenHeight, reverseClass, none ) {
		this.$from.animationComplete( $.proxy( function() {
			this.doneOut( screenHeight, reverseClass, none );
		}, this ) );
	}
} );

return $.mobile.SerialTransition;
} );
