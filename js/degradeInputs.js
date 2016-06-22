/*!
 * jQuery Mobile Degrade Inputs @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Degrade Inputs
//>>group: Utilities
//>>description: Degrades HTM5 input types to compatible HTML4 ones.
//>>docs: http://api.jquerymobile.com/jQuery.mobile.degradeInputsWithin/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"defaults" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.degradeInputs = {
	range: "number",
	search: "text"
};

// Auto self-init widgets
$.mobile.degradeInputsWithin = function( target ) {
	target = typeof target === "string" ? $( target ) : target;

	// Degrade inputs to avoid poorly implemented native functionality
	target.find( "input" ).not( $.mobile.keepNative ).each( function() {
		var html, findstr, repstr,
			element = $( this ),
			type = this.getAttribute( "type" ),
			optType = $.mobile.degradeInputs[ type ] || "text";

		if ( $.mobile.degradeInputs[ type ] ) {
			html = $( "<div>" ).html( element.clone() ).html();

			findstr = /\s+type=["']?\w+['"]?/;
			repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"";

			element.replaceWith( html.replace( findstr, repstr ) );
		}
	} );

};

var hook = function() {
	$.mobile.degradeInputsWithin( this.addBack() );
};

( $.enhance = $.extend( $.enhance, $.extend( { hooks: [] }, $.enhance ) ) ).hooks.unshift( hook );
return $.mobile.degradeInputsWithin;
} );
