/*!
 * jQuery Mobile Enhancer @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Enhancer Widget Crawler
//>>group: Widgets
//>>description: Adds support for custom initSlectors on widget prototypes
//>>docs: http://api.jquerymobile.com/enhancer/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../core",
			"widgets/enhancer" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var widgetCrawler = function( elements, _childConstructors ) {
		$.each( _childConstructors, function( index, constructor ) {
			var prototype = constructor.prototype,
				plugin = $.enhance,
				selector = plugin.initGenerator( prototype ),
				found;

			if( !selector ) {
				return;
			}

			found = elements.find( selector );

			if ( plugin._filter ) {
				found = plugin._filter( found );
			}

			found[ prototype.widgetName ]();
			if ( constructor._childConstructors && constructor._childConstructors.length > 0 ) {
				widgetCrawler( elements, constructor._childConstructors );
			}
		} );
	},
	widgetHook = function() {
		if ( !$.enhance.initGenerator || !$.Widget ) {
			return;
		}

		// Enhance widgets with custom initSelectors
		widgetCrawler( this.addBack(), $.Widget._childConstructors );
	};

$.enhance.hooks.push( widgetHook );

return $.enhance;

} );
