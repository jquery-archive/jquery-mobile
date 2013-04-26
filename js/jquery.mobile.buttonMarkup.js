//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies button styling to links
//>>label: Buttons: Link-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.core", "./jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {

// General policy: Do not access data-* attributes except during enhancement.
// Otherwise determine the state of the button exclusively from its className.
// That's why addButtonMarkup expects a full complement of options, and the
// jQuery plugin completes the set of options from the default values.

// The variable $el below is used in $.fn.buttonMarkup. The single element
// inside is replaced with the one passed into the function, to avoid repeated
// calls to the jQuery constructor.
var $el = $( "<a></a>" ),
	// Map classes to buttonMarkup boolean options
	reverseBoolOptionMap = {
		"ui-shadow" : "shadow",
		"ui-corner-all" : "corners",
		"ui-btn-inline" : "inline",
		"ui-shadow-icon" : "iconshadow",
		"ui-mini" : "mini"
	};

// addButtonMarkup:
// @el: The element to manipulate
// @options: A complete set of options for this element.
//
// Use $.fn.buttonMarkup.defaults to get a complete set and use $.extend to
// override your choice of options from that set.
function addButtonMarkup( el, options, existingClasses ) {
	var classes = existingClasses ? existingClasses : [];

	// Add classes to the array - first ui-btn and the theme
	classes = classes.concat( [ "ui-btn", "ui-btn-" + options.theme ] );

	// If there's an icon, add the icon-related classes
	if ( options.icon ) {
		classes = classes.concat( [ "ui-icon",
			"ui-icon-" + options.icon,
			"ui-btn-icon-" + options.iconpos
		]);
		if ( options.iconshadow ) {
			classes.push( "ui-shadow-icon" );
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

	// Create a string from the array, removing duplicate spaces, and assign it
	// back to the element's className
	el.className = classes.join( " " );
}

// enhanceWithButtonMarkup:
// @el: Element to enhance
//
// Harvest an element's buttonMarkup-related data attributes and use their value
// to override defaults. Pass the element to addButtonMarkup with the calculated
// options.
//
// This function is only defined so that it can be called from the enhancer
// without having to write it inline and may be moved into the enhancer in the
// future.
function enhanceWithButtonMarkup() {
	var idx,
		el = this,
		getAttrFixed = $.mobile.getAttribute;

	addButtonMarkup( el, $.extend( {},
		$.fn.buttonMarkup.defaults, {
			icon      : getAttrFixed( el, "icon",       true ),
			iconpos   : getAttrFixed( el, "iconpos",    true ),
			theme     : getAttrFixed( el, "theme",      true ),
			inline    : getAttrFixed( el, "inline",     true ),
			shadow    : getAttrFixed( el, "shadow",     true ),
			corners   : getAttrFixed( el, "corners",    true ),
			iconshadow: getAttrFixed( el, "iconshadow", true ),
			mini      : getAttrFixed( el, "mini",       true )
		}), el.className.split( " " ) );
}

// classesToOptions:
// @el: The element whose classes are to be analyzed
//
// Loops over the element's classes and records those that are recognized as
// buttonMarkup-related both in an string and as an option.
//
// Returns: An object containing the following items:
//
// "options": buttonMarkup options found to be present because of the
// presence/absence corresponding classes
//
// "classes": a string containing all the buttonMarkup-related classes found
//
// "alreadyEnhanced": A boolean indicating whether the ui-btn class was among
// those found to be present
function classesToOptions( el ) {
	var idx, map, classRecognized,
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
		classes = el.className.split( " " ),
		classesFound = [];

	for ( idx = 0 ; idx < classes.length ; idx++ ) {
		addClass = false;
		map = reverseBoolOptionMap[ classes[ idx ] ];

		// Recognize boolean options from the presence of classes
		if ( map !== undefined ) {
			classRecognized = true;
			o[ map ] = true;

		// Recognize the presence of an icon
		} else if ( classes[ idx ] === "ui-icon" ) {
			classRecognized = true;
			noIcon = false;

		// Establish the icon position
		} else if (classes[ idx ].indexOf( "ui-btn-icon-" ) === 0 ) {
			classRecognized = true;
			o.iconpos = classes[ idx ].substring( 12 );

		// Establish which icon is present
		} else if ( classes[ idx ].indexOf( "ui-icon-" ) === 0 ) {
			classRecognized = true;
			o.icon = classes[ idx ].substring( 8 );

		// Establish the theme - this recognizes one-letter theme swatch names
		} else if ( classes[ idx ].indexOf( "ui-btn-" ) === 0 && classes[ idx ].length === 8 ) {
			classRecognized = true;
			o.theme = classes[ idx ].substring( 7 );

		// Recognize that this element has already been buttonMarkup-enhanced
		} else if ( classes[ idx ] === "ui-btn" ) {
			classRecognized = true;
			alreadyEnhanced = true;
		}

		// If this class has been recognized, add it to the list
		if ( classRecognized ) {
			classesFound.push( classes[ idx ] );
		}
	}

	// If the class ui-icon is absent there cannot be an icon
	if ( noIcon ) {
		o.icon = "";
	}

	return {
		options: o,
		classes: classesFound.join( " " ),
		alreadyEnhanced: alreadyEnhanced
	};
}

// jQuery plugin for adding buttonMarkup
$.fn.buttonMarkup = function( options, firstCall ) {
	var idx, data;

	for ( idx = 0 ; idx < this.length ; idx++ ) {
		if ( !firstCall ) {
			// Analyze existing classes to establish existing options
			data = classesToOptions( this[ idx ] );

			// Assign this element to the jQuery object we're reusing
			$el[ 0 ] = this[ idx ];

			// Remove the buttonMarkup-related classes found to be present
			$el.removeClass( data.classes );
		} else {
			data = { alreadyEnhanced: false };
		}

		// Merge all the options and apply them as classes
		addButtonMarkup( this[ idx ], $.extend( {},
			// The defaults form the basis
			$.fn.buttonMarkup.defaults,

			// If the element already has the class ui-btn, then we assume that
			// it has passed through buttonMarkup before - otherwise, the options
			// returned by classesToOptions do not reflect the state of the element
			( data.alreadyEnhanced ? data.options : {} ),

			// Finally, apply the options passed int
			options ), this[ idx ].className.split( " " ) );
	}

	return this;
};

// buttonMarkup defaults. This must be a complete set, i.e., a value must be
// given here for all recognized options
$.fn.buttonMarkup.defaults = {
	icon: "",
	iconpos: "right",
	theme: "a",
	inline: false,
	shadow: true,
	corners: true,
	iconshadow: true,
	mini: false
};

//links in bars, or those with data-role become buttons
//auto self-init widgets
$.mobile._enhancer.add( "mobile.buttonmarkup", undefined, function( target ) {
	$( "a:jqmData(role='button'), .ui-bar > a, .ui-bar > :jqmData(role='controlgroup') > a", target ).each( enhanceWithButtonMarkup );
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
