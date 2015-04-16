/*!
 * jQuery Mobile Base Tag Support @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Base Tag
//>>group: Navigation
//>>description: Dynamic Base Tag Support

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./path",
			"./../ns" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var base,

	// Existing base tag?
	baseElement = $( "head" ).children( "base" ),

	// DEPRECATED as of 1.5.0 and will be removed in 1.6.0. As of 1.6.0 only
	// base.dynamicBaseEnabled will be checked
	getDynamicEnabled = function() {

		// If a value has been set at the old, deprecated location, we return that value.
		// Otherwise we return the value from the new location. We check explicitly for
		// undefined because true and false are both valid values for dynamicBaseEnabled.
		if ( $.mobile.dynamicBaseEnabled !== undefined ) {
			return $.mobile.dynamicBaseEnabled;
		}
		return base.dynamicBaseEnabled;
	};

// base element management, defined depending on dynamic base tag support
// TODO move to external widget
base = {

	// Disable the alteration of the dynamic base tag or links
	dynamicBaseEnabled: true,

	// Make sure base element is defined, for use in routing asset urls that are referenced
	// in Ajax-requested markup
	element: function() {
		if ( !( baseElement && baseElement.length ) ) {
			baseElement = $( "<base>", { href: $.mobile.path.documentBase.hrefNoSearch } )
				.prependTo( $( "head" ) );
		}

		return baseElement;
	},

	// set the generated BASE element's href to a new page's base path
	set: function( href ) {

		// We should do nothing if the user wants to manage their url base manually.
		// Note: Our method of ascertaining whether the user wants to manager their url base
		// manually is DEPRECATED as of 1.5.0 and will be removed in 1.6.0. As of 1.6.0 the
		// flag base.dynamicBaseEnabled will be checked, so the function getDynamicEnabled()
		// will be removed.
		if ( !getDynamicEnabled() ) {
			return;
		}

		// we should use the base tag if we can manipulate it dynamically
		base.element().attr( "href",
			$.mobile.path.makeUrlAbsolute( href, $.mobile.path.documentBase ) );
	},

	// set the generated BASE element's href to a new page's base path
	reset: function( /* href */ ) {

		// DEPRECATED as of 1.5.0 and will be removed in 1.6.0. As of 1.6.0 only
		// base.dynamicBaseEnabled will be checked
		if ( !getDynamicEnabled() ) {
			return;
		}

		base.element().attr( "href", $.mobile.path.documentBase.hrefNoSearch );
	}
};

$.mobile.base = base;

return base;
} );
