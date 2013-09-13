//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Helper functions and refrences
//>>label: Helpers
//>>group: Core
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.ns", "./jquery.ui.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

	var mobile = $.mobile,
		fn = $.fn;

	// define the window and the document objects
	mobile.window = $( window );
	mobile.document = $( document );

	// TODO: Remove and use $.ui.keyCode directly
	mobile.keyCode = $.ui.keyCode;

	// Place to store various widget extensions
	mobile.behaviors = {};

	// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
	mobile.silentScroll = function( ypos ) {
		if ( $.type( ypos ) !== "number" ) {
			ypos = $.mobile.defaultHomeScroll;
		}

		// prevent scrollstart and scrollstop events
		$.event.special.scrollstart.enabled = false;

		setTimeout(function() {
			window.scrollTo( 0, ypos );
			$.mobile.document.trigger( "silentscroll", { x: 0, y: ypos });
		}, 20 );

		setTimeout(function() {
			$.event.special.scrollstart.enabled = true;
		}, 150 );
	};

	// DEPRECATED in 1.4
	// Find the closest parent with a theme class on it. Note that
	// we are not using $.fn.closest() on purpose here because this
	// method gets called quite a bit and we need it to be as fast
	// as possible.
	mobile.getInheritedTheme = function( el, defaultTheme ) {
		var e = el[ 0 ],
			ltr = "",
			re = /ui-(bar|body|overlay)-([a-z])\b/,
			c, m;
		while ( e ) {
			c = e.className || "";
			if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
				// We found a parent with a theme class
				// on it so bail from this loop.
				break;
			}

			e = e.parentNode;
		}
		// Return the theme letter we found, if none, return the
		// specified default.
		return ltr || defaultTheme || "a";
	};

	mobile.enhanceable = function( elements ) {
		return this.haveParents( elements, "enhance" );
	};

	mobile.hijackable = function( elements ) {
		return this.haveParents( elements, "ajax" );
	};

	mobile.haveParents = function( elements, attr ) {
		if ( !$.mobile.ignoreContentEnabled ) {
			return elements;
		}

		var count = elements.length,
			$newSet = $(),
			e, $element, excluded,
			i, c;

		for ( i = 0; i < count; i++ ) {
			$element = elements.eq( i );
			excluded = false;
			e = elements[ i ];

			while ( e ) {
				c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

				if ( c === "false" ) {
					excluded = true;
					break;
				}

				e = e.parentNode;
			}

			if ( !excluded ) {
				$newSet = $newSet.add( $element );
			}
		}

		return $newSet;
	};

	mobile.getScreenHeight = function() {
		// Native innerHeight returns more accurate value for this across platforms,
		// jQuery version is here as a normalized fallback for platforms like Symbian
		return window.innerHeight || $.mobile.window.height();
	};

	//simply set the active page's minimum height to screen height, depending on orientation
	mobile.resetActivePageHeight = function( height ) {
		var page = $( "." + $.mobile.activePageClass ),
			pageHeight = page.height(),
			pageOuterHeight = page.outerHeight( true );

		height = ( typeof height === "number" ) ? height : $.mobile.getScreenHeight();

		page.css( "min-height", height - ( pageOuterHeight - pageHeight ) );
	};

	$.addDependents = function( elem, newDependents ) {
		var $elem = $( elem ),
			dependents = $elem.jqmData( "dependents" ) || $();

		$elem.jqmData( "dependents", $( dependents ).add( newDependents ) );
	};

	// plugins
	fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	// Enhance child elements
	fn.enhanceWithin = function() {
		var widgetElements,
			that = this;

		// Add no js class to elements
		if ( $.mobile.nojs ) {
			$.mobile.nojs( this );
		}

		// Bind links for ajax nav
		if ( $.mobile.links ) {
			$.mobile.links( this );
		}

		// Degrade inputs for styleing
		if ( $.mobile.degradeInputsWithin ) {
			$.mobile.degradeInputsWithin( this );
		}

		// Run buttonmarkup
		if ( $.fn.buttonMarkup ) {
			$( $.fn.buttonMarkup.initSelector ).buttonMarkup();
		}

		// Add classes for fieldContain
		if ( $.fn.fieldcontain ) {
			this.find( ":jqmData(role='fieldcontain')" ).jqmEnhanceable().fieldcontain();
		}

		// Enhance widgets
		$.each( $.mobile.widgets, function( name, constructor ) {

			// If initSelector not false find elements
			if ( constructor.initSelector ) {

				// Filter elements that should not be enhanced based on parents
				widgetElements = $.mobile.enhanceable( that.find( constructor.initSelector ) );

				// If any matching elements remain filter ones with keepNativeSelector
				if ( widgetElements.length ) {

					// $.mobile.page.prototype.keepNativeSelector is deprecated this is just for backcompt
					// Switch to $.mobile.keepNativeSelector in 1.5 which is just a value not a function
					widgetElements = widgetElements.not( $.mobile.page.prototype.keepNativeSelector() );
				}

				// Enhance whatever is left
				widgetElements[ constructor.prototype.widgetName ]();
			}
		});

		return this;
	};

	fn.addDependents = function( newDependents ) {
		$.addDependents( this, newDependents );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html element's text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	fn.getEncodedText = function() {
		return $( "<a>" ).text( this.text() ).html();
	};

	// fluent helper function for the mobile namespaced equivalent
	fn.jqmEnhanceable = function() {
		return $.mobile.enhanceable( this );
	};

	fn.jqmHijackable = function() {
		return $.mobile.hijackable( this );
	};

	$.removeWithDependents = function( nativeElement ) {
		var element = $( nativeElement );

		( element.jqmData( "dependents" ) || $() ).remove();
		element.remove();
	};
	$.addDependents = function( nativeElement, newDependents ) {
		var element = $( nativeElement ),
			dependents = element.jqmData( "dependents" ) || $();

		element.jqmData( "dependents", $( dependents ).add( newDependents ) );
	};

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
