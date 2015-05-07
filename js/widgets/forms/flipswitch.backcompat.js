/*!
 * jQuery Mobile Flipswitch Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Flipswitch
//>>group: Forms
//>>description: Deprecated rangeslider features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget.backcompat",
			"./flipswitch" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.flipswitch", $.mobile.flipswitch, {
		options: {
			corners: true,
			mini: false,
			wrapperClass: null
		},
		classProp: "ui-flipswitch"
	} );

	$.widget( "mobile.flipswitch", $.mobile.flipswitch, $.mobile.widget.backcompat );

}

return $.mobile.flipswitch;

} );
