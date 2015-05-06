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
//>>description: Changes input type to another after custom enhancements are made (ex. range > numeric).
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
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};

// Auto self-init widgets
$.mobile.degradeInputsWithin = function( target ) {
	target = $( target );

	// Degrade inputs to avoid poorly implemented native functionality
	target.find( "input" ).not( $.mobile.keepNative ).each( function() {
		var html, hasType, findstr, repstr,
			element = $( this ),
			type = this.getAttribute( "type" ),
			optType = $.mobile.degradeInputs[ type ] || "text";

		if ( $.mobile.degradeInputs[ type ] ) {
			html = $( "<div>" ).html( element.clone() ).html();

			// In IE browsers, the type sometimes doesn't exist in the cloned markup,
			// so we replace the closing tag instead
			hasType = html.indexOf( " type=" ) > -1;
			findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/;
			repstr = " type=\"" + optType + "\" data-" + $.mobile.ns +
				"type=\"" + type + "\"" + ( hasType ? "" : ">" );

			element.replaceWith( html.replace( findstr, repstr ) );
		}
	} );

};

var degradeHook = function() {
	$.mobile.degradeInputsWithin( this.addBack() );
};

$.fn.enhance = $.fn.enhance || $.noop;
$.fn.enhance.hooks ? $.fn.enhance.hooks.push( degradeHook ) : $.fn.enhance.hooks = [ degradeHook ];

return $.mobile.degradeInputsWithin;

} );
