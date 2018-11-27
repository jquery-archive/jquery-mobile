/*!
 * jQuery Mobile Popup Arrow @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: popuparrow
//>>group: Widgets
//>>description: Arrow for popups
//>>docs: http://api.jquerymobile.com/popup/#option-arrow
//>>demos: http://demos.jquerymobile.com/@VERSION/popup/#Arrow
//>>css.structure: ../css/structure/jquery.mobile.popup.arrow.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./popup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.popup", $.mobile.popup, {
	options: {
		classes: {
			"ui-popup-arrow": "ui-overlay-shadow"
		},
		arrow: ""
	},

	_create: function() {
		var arrow,
			ret = this._superApply( arguments );

		if ( this.options.arrow ) {
			if ( this.options.enhanced ) {
				arrow = {
					gd: this.element.children( ".ui-popup-arrow-guide" ),
					ct: this.element.children( ".ui-popup-arrow-container" )
				};
				arrow.ar = arrow.ct.children( ".ui-popup-arrow" );
				arrow.arEls = arrow.ct.add( arrow.gd );
				this._addArrowClasses( arrow );
			} else {
				arrow = this._addArrow();
			}
			this._ui.arrow = arrow;
		}

		return ret;
	},

	_addArrowClasses: function( arrow ) {
		this._addClass( arrow.gd, "ui-popup-arrow-guide" );
		this._addClass( arrow.ct, "ui-popup-arrow-container",
			( $.mobile.browser.oldIE && $.mobile.browser.oldIE <= 8 ) ? "ie" : "" );
		this._addClass( arrow.ar, "ui-popup-arrow", "ui-body-inherit" );
	},

	_addArrow: function() {
		var containerDiv = this.document[ 0 ].createElement( "div" ),
			arrowDiv = this.document[ 0 ].createElement( "div" ),
			guideDiv = this.document[ 0 ].createElement( "div" ),
			arrow = {
				arEls: $( [ containerDiv, guideDiv ] ),
				gd: $( guideDiv ),
				ct: $( containerDiv ),
				ar: $( arrowDiv )
			};

		containerDiv.appendChild( arrowDiv );

		this._addArrowClasses( arrow );

		arrow.arEls.hide().appendTo( this.element );

		return arrow;
	},

	_unenhance: function() {
		var ar = this._ui.arrow;

		if ( ar ) {
			ar.arEls.remove();
		}

		return this._super();
	},

	// Pretend to show an arrow described by @p and @dir and calculate the
	// distance from the desired point. If a best-distance is passed in, return
	// the minimum of the one passed in and the one calculated.
	_tryAnArrow: function( p, dir, desired, s, best ) {
		var result, r, diff,
			desiredForArrow = {},
			tip = {};

		// If the arrow has no wiggle room along the edge of the popup, it cannot
		// be displayed along the requested edge without it sticking out.
		if ( s.arFull[ p.dimKey ] > s.guideDims[ p.dimKey ] ) {
			return best;
		}

		desiredForArrow[ p.fst ] = desired[ p.fst ] +
			( s.arHalf[ p.oDimKey ] + s.menuHalf[ p.oDimKey ] ) * p.offsetFactor -
			s.contentBox[ p.fst ] +
			( s.clampInfo.menuSize[ p.oDimKey ] - s.contentBox[ p.oDimKey ] ) *
			p.arrowOffsetFactor;
		desiredForArrow[ p.snd ] = desired[ p.snd ];

		result = s.result || this._calculateFinalLocation( desiredForArrow, s.clampInfo );
		r = { x: result.left, y: result.top };

		tip[ p.fst ] = r[ p.fst ] + s.contentBox[ p.fst ] + p.tipOffset;
		tip[ p.snd ] = Math.max( result[ p.prop ] + s.guideOffset[ p.prop ] + s.arHalf[ p.dimKey ],
			Math.min( result[ p.prop ] + s.guideOffset[ p.prop ] + s.guideDims[ p.dimKey ] -
				s.arHalf[ p.dimKey ], desired[ p.snd ] ) );

		diff = Math.abs( desired.x - tip.x ) + Math.abs( desired.y - tip.y );
		if ( !best || diff < best.diff ) {

			// Convert tip offset to coordinates inside the popup
			tip[ p.snd ] -= s.arHalf[ p.dimKey ] + result[ p.prop ] + s.contentBox[ p.snd ];
			best = { dir: dir, diff: diff, result: result, posProp: p.prop, posVal: tip[ p.snd ] };
		}

		return best;
	},

	_getPlacementState: function( clamp ) {
		var offset, gdOffset,
			ar = this._ui.arrow,
			state = {
				clampInfo: this._clampPopupWidth( !clamp ),
				arFull: { cx: ar.ct.width(), cy: ar.ct.height() },
				guideDims: { cx: ar.gd.width(), cy: ar.gd.height() },
				guideOffset: ar.gd.offset()
			};

		offset = this.element.offset();

		ar.gd.css( { left: 0, top: 0, right: 0, bottom: 0 } );
		gdOffset = ar.gd.offset();
		state.contentBox = {
			x: gdOffset.left - offset.left,
			y: gdOffset.top - offset.top,
			cx: ar.gd.width(),
			cy: ar.gd.height()
		};
		ar.gd.removeAttr( "style" );

		// The arrow box moves between guideOffset and guideOffset + guideDims - arFull
		state.guideOffset = {
			left: state.guideOffset.left - offset.left,
			top: state.guideOffset.top - offset.top
		};
		state.arHalf = {
			cx: state.arFull.cx / 2,
			cy: state.arFull.cy / 2
		};
		state.menuHalf = {
			cx: state.clampInfo.menuSize.cx / 2,
			cy: state.clampInfo.menuSize.cy / 2
		};

		return state;
	},

	_placementCoords: function( desired ) {
		var state, best, params,
			optionValue = this.options.arrow,
			ar = this._ui.arrow;

		if ( !ar ) {
			return this._super( desired );
		}

		ar.arEls.show();

		state = this._getPlacementState( true );
		params = {
			"l": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: 1,
				tipOffset: -state.arHalf.cx, arrowOffsetFactor: 0
			},
			"r": {
				fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: -1,
					tipOffset: state.arHalf.cx + state.contentBox.cx, arrowOffsetFactor: 1
			},
			"b": {
				fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: -1,
					tipOffset: state.arHalf.cy + state.contentBox.cy, arrowOffsetFactor: 1
			},
			"t": {
				fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: 1,
					tipOffset: -state.arHalf.cy, arrowOffsetFactor: 0
			}
		};

		// Try each side specified in the options to see on which one the arrow
		// should be placed such that the distance between the tip of the arrow and
		// the desired coordinates is the shortest.
		$.each( ( optionValue === true ? "l,t,r,b" : optionValue ).split( "," ),
			$.proxy( function( key, value ) {
				best = this._tryAnArrow( params[ value ], value, desired, state, best );
			}, this ) );

		// Could not place the arrow along any of the edges - behave as if showing
		// the arrow was turned off.
		if ( !best ) {
			ar.arEls.hide();
			return this._super( desired );
		}

		// Move the arrow into place
		this._removeClass( ar.ct,
			"ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b" )
			._addClass( ar.ct, "ui-popup-arrow-" + best.dir );
		ar.ct
			.removeAttr( "style" ).css( best.posProp, best.posVal )
			.show();

		return best.result;
	},

	_setOptions: function( opts ) {
		var ar = this._ui.arrow,
			ret = this._super( opts );

		if ( opts.arrow !== undefined ) {
			if ( !ar && opts.arrow ) {
				this._ui.arrow = this._addArrow();

				// Important to return here so we don't set the same options all over
				// again below.
				return;
			} else if ( ar && !opts.arrow ) {
				ar.arEls.remove();
				delete this._ui.arrow;
			}
		}

		return ret;
	},

	_destroy: function() {
		var ar = this._ui.arrow;

		if ( ar ) {
			ar.arEls.remove();
		}

		return this._super();
	}
} );

} );
