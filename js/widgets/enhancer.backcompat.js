/*!
 * jQuery Mobile Enhancer Backcompat@VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Enhancer
//>>group: Widgets
//>>description: Enables declarative initalization of widgets
//>>docs: http://api.jquerymobile.com/enhancer/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget",
			"widgets/enhancer" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {
if ( $.mobileBackcompat !== false ) {
	var originalGenerator = $.fn.enhance.initGenerator,
		filter = function( elements ) {
			elements = elements.not( $.mobile.keepNative );

			if ( $.mobile.ignoreContentEnabled ) {
				elements.each( function() {
					if ( $( this ).closest( "[data-" + $.mobile.ns + "enhance='false']" ).length ) {
						elements = elements.not( this );
					}
				} );
			}
			return elements;
		},
		generator = function( prototype, ns ) {
			return prototype.initSelector ||
				$[ prototype.namespace ][ prototype.widgetName ].prototype.initSelector ||
				originalGenerator( prototype, ns );
		};

	$.fn.enhance._filter = filter;
	$.fn.enhance.initGenerator = generator;

}
} );
