/*!
 * jQuery Mobile animationComplete @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Animation Complete
//>>group: Core
//>>description: A handler for css transition & animation end events to ensure callback is executed

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var props = {
		"animation": {},
		"transition": {}
	},
	testElement = document.createElement( "a" ),
	vendorPrefixes = [ "", "webkit-", "moz-", "o-" ],
	callbackLookupTable = {};

$.each( [ "animation", "transition" ], function( i, test ) {

	// Get correct name for test
	var testName = ( i === 0 ) ? test + "-" + "name" : test;

	$.each( vendorPrefixes, function( j, prefix ) {
		if ( testElement.style[ $.camelCase( prefix + testName ) ] !== undefined ) {
			props[ test ][ "prefix" ] = prefix;
			return false;
		}
	} );

	// Set event and duration names for later use
	props[ test ][ "duration" ] =
		$.camelCase( props[ test ][ "prefix" ] + test + "-" + "duration" );
	props[ test ][ "event" ] =
		$.camelCase( props[ test ][ "prefix" ] + test + "-" + "end" );

	// All lower case if not a vendor prop
	if ( props[ test ][ "prefix" ] === "" ) {
		props[ test ][ "event" ] = props[ test ][ "event" ].toLowerCase();
	}
} );

// If a valid prefix was found then the it is supported by the browser
$.support.cssTransitions = ( props[ "transition" ][ "prefix" ] !== undefined );
$.support.cssAnimations = ( props[ "animation" ][ "prefix" ] !== undefined );

// Remove the testElement
$( testElement ).remove();

// Animation complete callback
$.fn.extend( {
	animationComplete: function( callback, type, fallbackTime ) {
		var timer, duration,
			that = this,
			eventBinding = function() {

				// Clear the timer so we don't call callback twice
				clearTimeout( timer );
				callback.apply( this, arguments );
			},
			animationType = ( !type || type === "animation" ) ? "animation" : "transition";

		if ( !this.length ) {
			return this;
		}

		// Make sure selected type is supported by browser
		if ( ( $.support.cssTransitions && animationType === "transition" ) ||
				( $.support.cssAnimations && animationType === "animation" ) ) {

			// If a fallback time was not passed set one
			if ( fallbackTime === undefined ) {

				// Make sure the was not bound to document before checking .css
				if ( this.context !== document ) {

					// Parse the durration since its in second multiple by 1000 for milliseconds
					// Multiply by 3 to make sure we give the animation plenty of time.
					duration = parseFloat(
							this.css( props[ animationType ].duration )
						) * 3000;
				}

				// If we could not read a duration use the default
				if ( duration === 0 || duration === undefined || isNaN( duration ) ) {
					duration = $.fn.animationComplete.defaultDuration;
				}
			}

			// Sets up the fallback if event never comes
			timer = setTimeout( function() {
				that
					.off( props[ animationType ].event, eventBinding )
					.each( function() {
						callback.apply( this );
					} );
			}, duration );

			// Update lookupTable
			callbackLookupTable[ callback ] = {
				event: props[ animationType ].event,
				binding: eventBinding
			};


			// Bind the event
			return this.one( props[ animationType ].event, eventBinding );
		} else {

			// CSS animation / transitions not supported
			// Defer execution for consistency between webkit/non webkit
			setTimeout( function() {
				that.each( function() {
					callback.apply( this );
				} );
			}, 0 );
			return this;
		}
	},

	removeAnimationComplete: function( callback ) {
		var callbackInfoObject = callbackLookupTable[ callback ];

		return callbackInfoObject ?
		this.off( callbackInfoObject.event, callbackInfoObject.binding ) : this;
	}
} );

// Allow default callback to be configured on mobileInit
$.fn.animationComplete.defaultDuration = 1000;

return $;
} );
