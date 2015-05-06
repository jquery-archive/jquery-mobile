/*!
 * jQuery Mobile Enhancer @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Enhancer
//>>group: Widgets
//>>description: Enhables declarative initalization of widgets
//>>docs: http://api.jquerymobile.com/enhancer/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var plugin = {
		enhance: function() {

			// Loop over and execute any hooks that exist
			for ( var i = 0; i < $.fn.enhance.hooks.length; i++ ) {
				$.fn.enhance.hooks[ i ].apply( this, arguments );
			}

			// Call the default enhancer function
			$.fn.enhance.defaultFunction.apply( this, arguments );

			return this;
		}
	},
	getNamespace = function() {
		return $.fn.enhance.ns || $.mobile.ns || "";
	};

// Generate the init selector to be used by a widget
plugin.enhance.initGenerator = function( prototype, ns ) {
	return "[data-" + ns + "role='" + prototype.widgetName + "']";
};

// Check if the enhancer has already been defined if it has copy its hooks if not
// define an empty array
plugin.enhance.hooks = ( $.fn.enhance && $.fn.enhance.hooks ) ? $.fn.enhance.hooks : [];
plugin.enhance._filter = $.fn.enhance ? $.fn.enhance._filter || false : false;

// Default function
plugin.enhance.defaultFunction = function() {
	var that = this.addBack();

	// Enhance widgets
	function crawlChildren( _childConstructors ) {

		$.each( _childConstructors, function( index, constructor ) {
			var prototype = constructor.prototype,
				found = that.find(
					plugin.enhance.initGenerator( prototype, getNamespace() )
				);

			if ( plugin.enhance._filter ) {
				found = plugin.enhance._filter( found );
			}
			found[ prototype.widgetName ]();
			if ( constructor._childConstructors && constructor._childConstructors.length > 0 ) {
				crawlChildren( constructor._childConstructors );
			}
		} );
	}
	crawlChildren( $.Widget._childConstructors );
};

// This is for backcompat remove in 1.6
plugin.enhanceWithin = function() {
	return this.children().enhance();
};

$.extend( $.fn, plugin );

$.extend( $.Widget.prototype, {
	_getCreateOptions: function() {
		var option, value,

			// Get all data at once avoid multiple lookups http://jsperf.com/jqm-data-bulk
			data = this.element.data(),
			options = {},
			ns = getNamespace().replace( "-", "" );

		// Translate data-attributes to options
		for ( option in this.options ) {
			value = data[ ns + (
				!ns ?
				option :
				option.charAt( 0 ).toUpperCase() + option.slice( 1 )
			) ];
			if ( value !== undefined ) {
				options[ option ] = value;
			}
		}

		return options;
	}
} );

return plugin;
} );
