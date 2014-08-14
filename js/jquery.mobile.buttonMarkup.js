//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies button styling to links
//>>label: Buttons: Link-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

// buttonMarkup is deprecated as of 1.4.0 and will be removed in 1.5.0.

(function( $, undefined ) {

// General policy: Do not access data-* attributes except during enhancement.
// In all other cases we determine the state of the button exclusively from its
// className. That's why optionsToClasses expects a full complement of options,
// and the jQuery plugin completes the set of options from the default values.

// Map classes to buttonMarkup boolean options - used in classNameToOptions()
var reverseBoolOptionMap = {
		"ui-shadow" : "shadow",
		"ui-corner-all" : "corners",
		"ui-btn-inline" : "inline",
		"ui-shadow-icon" : "iconshadow", /* TODO: Remove in 1.5 */
		"ui-mini" : "mini"
	},
	getAttrFixed = function() {
		var ret = $.mobile.getAttribute.apply( this, arguments );

		return ( ret == null ? undefined : ret );
	},
	capitalLettersRE = /[A-Z]/g;

// optionsToClasses:
// @options: A complete set of options to convert to class names.
// @existingClasses: extra classes to add to the result
//
// Converts @options to buttonMarkup classes and returns the result as an array
// that can be converted to an element's className with .join( " " ). All
// possible options must be set inside @options. Use $.fn.buttonMarkup.defaults
// to get a complete set and use $.extend to override your choice of options
// from that set.
function optionsToClasses( options, existingClasses ) {
	var classes = existingClasses ? existingClasses : [];

	// Add classes to the array - first ui-btn
	classes.push( "ui-btn" );

	// If there is a theme
	if ( options.theme ) {
		classes.push( "ui-btn-" + options.theme );
	}

	// If there's an icon, add the icon-related classes
	if ( options.icon ) {
		classes = classes.concat([
			"ui-icon-" + options.icon,
			"ui-btn-icon-" + options.iconpos
		]);
		if ( options.iconshadow ) {
			classes.push( "ui-shadow-icon" ); /* TODO: Remove in 1.5 */
		}
	}

	// Add the appropriate class for each boolean option
	if ( options.inline ) {
		classes.push( "ui-btn-inline" );
	}
	if ( options.shadow ) {
		classes.push( "ui-shadow" );
	}
	if ( options.corners ) {
		classes.push( "ui-corner-all" );
	}
	if ( options.mini ) {
		classes.push( "ui-mini" );
	}

	// Create a string from the array and return it
	return classes;
}

// classNameToOptions:
// @classes: A string containing a .className-style space-separated class list
//
// Loops over @classes and calculates an options object based on the
// buttonMarkup-related classes it finds. It records unrecognized classes in an
// array.
//
// Returns: An object containing the following items:
//
// "options": buttonMarkup options found to be present because of the
// presence/absence of corresponding classes
//
// "unknownClasses": a string containing all the non-buttonMarkup-related
// classes found in @classes
//
// "alreadyEnhanced": A boolean indicating whether the ui-btn class was among
// those found to be present
function classNameToOptions( classes ) {
	var idx, map, unknownClass,
		alreadyEnhanced = false,
		noIcon = true,
		o = {
			icon: "",
			inline: false,
			shadow: false,
			corners: false,
			iconshadow: false,
			mini: false
		},
		unknownClasses = [];

	classes = classes.split( " " );

	// Loop over the classes
	for ( idx = 0 ; idx < classes.length ; idx++ ) {

		// Assume it's an unrecognized class
		unknownClass = true;

		// Recognize boolean options from the presence of classes
		map = reverseBoolOptionMap[ classes[ idx ] ];
		if ( map !== undefined ) {
			unknownClass = false;
			o[ map ] = true;

		// Recognize the presence of an icon and establish the icon position
		} else if ( classes[ idx ].indexOf( "ui-btn-icon-" ) === 0 ) {
			unknownClass = false;
			noIcon = false;
			o.iconpos = classes[ idx ].substring( 12 );

		// Establish which icon is present
		} else if ( classes[ idx ].indexOf( "ui-icon-" ) === 0 ) {
			unknownClass = false;
			o.icon = classes[ idx ].substring( 8 );

		// Establish the theme - this recognizes one-letter theme swatch names
		} else if ( classes[ idx ].indexOf( "ui-btn-" ) === 0 && classes[ idx ].length === 8 ) {
			unknownClass = false;
			o.theme = classes[ idx ].substring( 7 );

		// Recognize that this element has already been buttonMarkup-enhanced
		} else if ( classes[ idx ] === "ui-btn" ) {
			unknownClass = false;
			alreadyEnhanced = true;
		}

		// If this class has not been recognized, add it to the list
		if ( unknownClass ) {
			unknownClasses.push( classes[ idx ] );
		}
	}

	// If a "ui-btn-icon-*" icon position class is absent there cannot be an icon
	if ( noIcon ) {
		o.icon = "";
	}

	return {
		options: o,
		unknownClasses: unknownClasses,
		alreadyEnhanced: alreadyEnhanced
	};
}

function camelCase2Hyphenated( c ) {
	return "-" + c.toLowerCase();
}

// $.fn.buttonMarkup:
// DOM: gets/sets .className
//
// @options: options to apply to the elements in the jQuery object
// @overwriteClasses: boolean indicating whether to honour existing classes
//
// Calculates the classes to apply to the elements in the jQuery object based on
// the options passed in. If @overwriteClasses is true, it sets the className
// property of each element in the jQuery object to the buttonMarkup classes
// it calculates based on the options passed in.
//
// If you wish to preserve any classes that are already present on the elements
// inside the jQuery object, including buttonMarkup-related classes that were
// added by a previous call to $.fn.buttonMarkup() or during page enhancement
// then you should omit @overwriteClasses or set it to false.
$.fn.buttonMarkup = function( options, overwriteClasses ) {
	var idx, data, el, retrievedOptions, optionKey,
		defaults = $.fn.buttonMarkup.defaults;

	for ( idx = 0 ; idx < this.length ; idx++ ) {
		el = this[ idx ];
		data = overwriteClasses ?

			// Assume this element is not enhanced and ignore its classes
			{ alreadyEnhanced: false, unknownClasses: [] } :

			// Otherwise analyze existing classes to establish existing options and
			// classes
			classNameToOptions( el.className );

		retrievedOptions = $.extend( {},

			// If the element already has the class ui-btn, then we assume that
			// it has passed through buttonMarkup before - otherwise, the options
			// returned by classNameToOptions do not correctly reflect the state of
			// the element
			( data.alreadyEnhanced ? data.options : {} ),

			// Finally, apply the options passed in
			options );

		// If this is the first call on this element, retrieve remaining options
		// from the data-attributes
		if ( !data.alreadyEnhanced ) {
			for ( optionKey in defaults ) {
				if ( retrievedOptions[ optionKey ] === undefined ) {
					retrievedOptions[ optionKey ] = getAttrFixed( el,
						optionKey.replace( capitalLettersRE, camelCase2Hyphenated )
					);
				}
			}
		}

		el.className = optionsToClasses(

			// Merge all the options and apply them as classes
			$.extend( {},

				// The defaults form the basis
				defaults,

				// Add the computed options
				retrievedOptions
			),

			// ... and re-apply any unrecognized classes that were found
			data.unknownClasses ).join( " " );
		if ( el.tagName.toLowerCase() !== "button" ) {
			el.setAttribute( "role", "button" );
		}
	}

	return this;
};

// buttonMarkup defaults. This must be a complete set, i.e., a value must be
// given here for all recognized options
$.fn.buttonMarkup.defaults = {
	icon: "",
	iconpos: "left",
	theme: null,
	inline: false,
	shadow: true,
	corners: true,
	iconshadow: false, /* TODO: Remove in 1.5. Option deprecated in 1.4. */
	mini: false
};

$.extend( $.fn.buttonMarkup, {
	initSelector: "a:jqmData(role='button'), .ui-bar > a, .ui-bar > :jqmData(role='controlgroup') > a, button:not(:jqmData(role='navbar') button)"
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
