//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Helper functions and refrences
//>>label: Helpers
//>>group: Core
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.ui.core", "json!../package.json" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

	// jQuery.ui configurable options
	$.extend($.ui, {
		// define the window and the document objects
		window: $( window ),
		document: $( document ),

		// Place to store various widget extensions
		behaviors: {},
		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.ui.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout( function() {
				window.scrollTo( 0, ypos );
				$.ui.document.trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// DEPRECATED in 1.4
		// Find the closest parent with a theme class on it. Note that
		// we are not using $.fn.closest() on purpose here because this
		// method gets called quite a bit and we need it to be as fast
		// as possible.
		getInheritedTheme: function( el, defaultTheme ) {
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
		},

		// TODO the following $ and $.fn extensions can/probably should be moved into jquery.ui.core.helpers
		//

		enhanceable: function( $set ) {
			return this.haveParents( $set, "enhance" );
		},

		hijackable: function( $set ) {
			return this.haveParents( $set, "ajax" );
		},

		haveParents: function( $set, attr ) {
			if ( !$.ui.ignoreContentEnabled ) {
				return $set;
			}

			var count = $set.length,
				$newSet = $(),
				e, $element, excluded,
				i, c;

			for ( i = 0; i < count; i++ ) {
				$element = $set.eq( i );
				excluded = false;
				e = $set[ i ];

				while ( e ) {
					c = e.getAttribute ? e.getAttribute( "data-" + $.ui.ns + attr ) : "";

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
		},

		getScreenHeight: function() {
			// Native innerHeight returns more accurate value for this across platforms,
			// jQuery version is here as a normalized fallback for platforms like Symbian
			return window.innerHeight || $.ui.window.height();
		},

		//simply set the active page's minimum height to screen height, depending on orientation
		resetActivePageHeight: function( height ) {
			var aPage = $( "." + $.ui.activePageClass ),
				aPageHeight = aPage.height(),
				aPageOuterHeight = aPage.outerHeight( true );

			height = ( typeof height === "number" ) ? height : $.ui.getScreenHeight();

			aPage.css( "min-height", height - ( aPageOuterHeight - aPageHeight ) );
		}
	});

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData( "dependents" ) || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( this , newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var $elem = $( elem ),
			dependents = $elem.jqmData( "dependents" ) || $();

		$elem.jqmData( "dependents", $( dependents ).add( newDependents ) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html element's text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<a>" ).text( $( this ).text() ).html();
	};

	// fluent helper function for the ui namespaced equivalent
	$.fn.jqmEnhanceable = function() {
		return $.ui.enhanceable( this );
	};

	$.fn.jqmHijackable = function() {
		return $.ui.hijackable( this );
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