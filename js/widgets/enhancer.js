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
			"jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var widgetBaseClass,
	installed = false;

$.fn.extend( {
	enhance: function() {
		return $.enhance.enhance( this );
	},
	enhanceWithin: function() {
		this.children().enhance();
		return this;
	},
	enhanceOptions: function() {
		return $.enhance.getOptions( this );
	},
	enhanceRoles: function() {
		return $.enhance.getRoles( this );
	}
} );
$.enhance = $.enhance || {};
$.extend( $.enhance, {

	enhance: function( elem ) {
		var i,
			enhanceables = elem.find( "[" + $.enhance.defaultProp() + "]" ).addBack();

		if ( $.enhance._filter ) {
			enhanceables = $.enhance._filter( enhanceables );
		}

		// Loop over and execute any hooks that exist
		for ( i = 0; i < $.enhance.hooks.length; i++ ) {
			$.enhance.hooks[ i ].call( elem, enhanceables );
		}

		// Call the default enhancer function
		$.enhance.defaultFunction.call( elem, enhanceables );

		return elem;
	},

	// Check if the enhancer has already been defined if it has copy its hooks if not
	// define an empty array
	hooks: $.enhance.hooks || [],

	_filter: $.enhance._filter || false,

	defaultProp: $.enhance.defaultProp || function() { return "data-ui-role"; },

	defaultFunction: function( enhanceables ) {
		enhanceables.each( function() {
			var i,
				roles = $( this ).enhanceRoles();

			for ( i = 0; i < roles.length; i++ ) {
				if ( $.fn[ roles[ i ] ] ) {
					$( this )[ roles[ i ] ]();
				}
			}
		} );
	},

	cache: true,

	roleCache: {},

	getRoles: function( element ) {
		if ( !element.length ) {
			return [];
		}

		var role,

			// Look for cached roles
			roles = $.enhance.roleCache[ !!element[ 0 ].id ? element[ 0 ].id : undefined ];

		// We already have done this return the roles
		if ( roles ) {
			return roles;
		}

		// This is our first time get the attribute and parse it
		role = element.attr( $.enhance.defaultProp() );
		roles = role ? role.match( /\S+/g ) : [];

		// Caches the array of roles for next time
		$.enhance.roleCache[ element[ 0 ].id ] = roles;

		// Return the roles
		return roles;
	},

	optionCache: {},

	getOptions: function( element ) {
		var options = $.enhance.optionCache[ !!element[ 0 ].id ? element[ 0 ].id : undefined ],
			ns;

		// Been there done that return what we already found
		if ( !!options ) {
			return options;
		}

		// This is the first time lets compile the options object
		options = {};
		ns = ( $.mobile.ns || "ui-" ).replace( "-", "" );

		$.each( $( element ).data(), function( option, value ) {
			option = option.replace( ns, "" );

			option = option.charAt( 0 ).toLowerCase() + option.slice( 1 );
			options[ option ] = value;
		} );

		// Cache the options for next time
		$.enhance.optionCache[ element[ 0 ].id ] = options;

		// Return the options
		return options;
	},

	_installWidget: function() {
		if ( $.Widget && !installed ) {
			$.extend( $.Widget.prototype, {
				_getCreateOptions: function( options ) {
					var option, value,
						dataOptions = this.element.enhanceOptions();

					options = options || {};

					// Translate data-attributes to options
					for ( option in this.options ) {
						value = dataOptions[ option ];
						if ( value !== undefined ) {
							options[ option ] = value;
						}
					}
					return options;
				}
			} );
			installed = true;
		}
	}
} );

if ( !$.Widget ) {
	Object.defineProperty( $, "Widget", {
		configurable: true,
		enumerable: true,
		get: function() {
			return widgetBaseClass;
		},
		set: function( newValue ) {
			if ( newValue ) {
				widgetBaseClass = newValue;
				setTimeout( function() {
					$.enhance._installWidget();
				} );
			}
		}
	} );
} else {
	$.enhance._installWidget();
}

return $.enhance;
} );
