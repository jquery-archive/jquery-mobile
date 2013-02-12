//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Arrow for popups
//>>label: popuparrow
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.arrow.css

define( [ "jquery", "./popup" ],

function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

( function( $, undefined ) {

var uiTemplate = $(
		'<div class="arrow-guide"></div>' +
		'<div class="arrow-container">' +
			'<div class="arrow">' +
				'<div class="arrow-background"></div>' +
			'</div>' +
		'</div>'
	),
	// Needed for transforming coordinates from screen to arrow background
	txFactor = Math.sqrt( 2 ) / 2;

$( document ).on( "mobileinit", function() {
	if ( $.mobile.browser.oldIE ) {
		// Add class "ie" to the container
		uiTemplate.eq( 1 ).addClass( "ie" );
	}
});

function getArrow() {
	var clone = uiTemplate.clone(),
		gd = clone.eq( 0 ),
		ct = clone.eq( 1 ),
		ar = ct.children(),
		bg = ar.children();

	return { arEls: ct.add( gd ), gd: gd, ct: ct, ar: ar, bg: bg };
}

$.widget( "mobile.popup", $.mobile.popup, {
	options: {
		arrow: false,
		arrowSides: "t,b,l,r"
	},

	_unenhance: function() {
		var ar = this._ui.arrow;

		if ( ar ) {
			ar.arEls.remove();
		}

		return this._super();
	},

	_updateArrow: function( direction ) {
		var ar = this._ui.arrow,
			oldTheme = ar.ct.jqmData( "oldTheme" ),
			theme = "ui-body-" + ( this.options.theme || $.mobile.getInheritedTheme( this.element, "c" ) );

		// Remove old direction and theme
		ar.ct.removeClass( "l t r b" );
		if ( oldTheme ) {
			ar.ar.removeClass( oldTheme );
			ar.bg.removeClass( oldTheme );
		}

		ar.ar.toggleClass( "ui-overlay-shadow", this.options.shadow );

		// Set new direction and theme
		ar.ct.jqmData( "oldTheme", theme );
		ar.ct.addClass( direction );
		ar.ar.addClass( theme );
		ar.bg.addClass( theme );
	},

	// Pretend to show an arrow described by @p and @dir and calculate the
	// distance from the desired point. If a best-distance is passed in, return
	// the minimum of the one passed in and the one calculated.
	_tryAnArrow: function( p, dir, desired, s, best ) {
		var result, r, diff, desiredForArrow = {}, tip = {};

		desiredForArrow[ p.fst ] = desired[ p.fst ] + ( s.arHalf[ p.oDimKey ] + s.menuHalf[ p.oDimKey ] ) * p.offsetFactor;
		desiredForArrow[ p.snd ] = desired[ p.snd ];

		result = s.result || this._calculateFinalLocation( desiredForArrow, s.clampInfo );
		r = { x: result.left, y: result.top };

		tip[ p.fst ] = r[ p.fst ] + p.tipOffset;
		tip[ p.snd ] = Math.max( result[ p.prop ] + s.guideOffset[ p.prop ] + s.arHalf[ p.dimKey ],
			Math.min( result[ p.prop ] + s.guideOffset[ p.prop ] + s.guideDims[ p.dimKey ] - s.arHalf[ p.dimKey ],
				desired[ p.snd ] ) );

		diff = Math.abs( desired.x - tip.x ) + Math.abs( desired.y - tip.y );
		if ( !best || diff < best.diff ) {
			best = { dir: dir, diff: diff, result: result, posProp: p.prop, posVal: tip[ p.snd ] - s.arHalf[ p.dimKey ] - result[ p.prop ] };
		}

		return best;
	},

	_getPlacementState: function( clamp ) {
		var offset,
			ar = this._ui.arrow,
			state = {
				clampInfo: this._clampPopupWidth( !clamp ),
				arFull: { cx: ar.ct.width(), cy: ar.ct.height() },
				guideDims: { cx: ar.gd.width(), cy: ar.gd.height() },
				guideOffset: ar.gd.offset()
			};

		offset = this.element.offset();
		// The arrow box moves between guideOffset and guideOffset + guideDims - arFull
		state.guideOffset = { left: state.guideOffset.left - offset.left, top: state.guideOffset.top - offset.top };
		state.arHalf = { cx: state.arFull.cx / 2, cy: state.arFull.cy / 2 };
		state.menuHalf = { cx: state.clampInfo.menuSize.cx / 2, cy: state.clampInfo.menuSize.cy / 2 };

		return state;
	},

	_placementCoords: function( desired ) {
		var state, menuFull, best, params, bgOffset, diff,
			bgRef = {},
			ar = this._ui.arrow ;

		if ( !this.options.arrow ) {
			return this._super( desired );
		}

		ar.arEls.show();

		state = this._getPlacementState( true );
		menuFull = state.clampInfo.menuSize;

		params = {
			"l": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: 1, tipOffset: -( state.arHalf.cx ) },
			"r": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: -1, tipOffset: menuFull.cx + state.arHalf.cx },
			"b": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: -1, tipOffset: menuFull.cy + state.arHalf.cy },
			"t": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: 1, tipOffset: -( state.arHalf.cx ) }
		};

		// Try each side specified in the options to see on which one the arrow
		// should be placed such that the distance between the tip of the arrow and
		// the desired coordinates is the shortest.
		$.each( this.options.arrowSides.split( "," ),
			$.proxy( function( key, value ) {
				best = this._tryAnArrow( params[ value ], value, desired, state, best );
			}, this ) );

		// Move the arrow into place
		ar.ct.removeAttr( "style" ).show().css( best.posProp, best.posVal );
		this._updateArrow( best.dir );

		// Do not move/size the background div on IE, because we use the arrow div for background as well.
		if ( !$.mobile.browser.oldIE ) {
			bgRef[ params[ best.dir ].fst ] = ar.ct.offset();
			bgRef[ params[ best.dir ].snd ] = this.element.offset();
			bgOffset = ar.bg
				.removeAttr( "style" )
				.css( ( "cx" === params[ best.dir ].dimKey ? "width" : "height" ), menuFull[ params[ best.dir ].dimKey ] )
				.offset();
			diff = { dx: bgRef.x.left - bgOffset.left, dy: bgRef.y.top - bgOffset.top };
			ar.bg.css( { left: txFactor * diff.dy + txFactor * diff.dx, top: txFactor * diff.dy - txFactor * diff.dx } );
		}

		return best.result;
	},

	_setArrow: function( value ) {
		var ar = this._ui.arrow;

		if ( value ) {
			if ( !ar ) {
				ar = this._ui.arrow = getArrow();
			}
			ar.arEls.appendTo( this.element ).hide();
		} else if ( ar ) {
			ar.arEls.remove();
		}
	}
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
