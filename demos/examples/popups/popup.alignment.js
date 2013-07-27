( function( $, undefined ) {

// Eventually, the real handleLink function should pass the coordinates and
// size of the rectangle representing the origin into popup's "open" method, or
// maybe the origin itself, instead of merely the midpoint of it. Here, the
// origin (link) is saved in lastLink, and appended to the options in the
// overridden version of open. Thankfully, JS is not multithreaded. Hooray!
var lastLink,
	origHandleLink = $.mobile.popup.handleLink,
	handleLink = function( link ) {
		lastLink = link;
		return origHandleLink.apply( this, arguments );
	};

$.mobile.popup.handleLink = handleLink;

$.widget( "mobile.popup", $.mobile.popup, {
	options: {
		align: "0.5,0.5"
	},

	open: function( options ) {
		this._ui.link = lastLink;
		return this._super( options );
	},

	_closePrereqsDone: function() {
		this._ui.link = null;
		this._superApply( arguments );
	},

	_alignmentToCoeffs: function( alignment ) {
		return {
			originCoeff:
				alignment < 0 ? 0 :
				alignment <= 1 ? alignment :
				1,
			popupCoeff:
				alignment < 0 ? alignment :
				alignment <= 1 ? -alignment :
				alignment - 2
		};
	},

	_getAlignment: function() {
		var ar, align;

		if ( this.options.align ) {
			ar = this.options.align.split( "," );
		}

		if ( ar && ar.length > 0 ) {
			align = {
				x: parseFloat( ar[ 0 ] ),
				y: ar.length > 1 ? parseFloat( ar[ 1 ] ) : align.x
			};
		}

		if ( align && !( isNaN( align.x ) || isNaN( align.y ) ) ) {
			return {
				x: this._alignmentToCoeffs( align.x ),
				y: this._alignmentToCoeffs( align.y )
			};
		}
	},

	_setOptions: function( options ) {
		var linkOffset, linkSize;

		this._super( options );

		if ( this._isOpen &&
			options.align !== undefined &&
			this._ui.link !== null &&
			( this._ui.link.jqmData( "position-to" ) === "origin" ||
				this.options.positionTo === "origin" ) ) {
			linkOffset = this._ui.link.offset();
			linkSize = {
				cx: this._ui.link.outerWidth(),
				cy: this._ui.link.outerHeight()
			};

			this._reposition({
				x: linkOffset.left + linkSize.cx / 2,
				y: linkOffset.top + linkSize.cy / 2,
				positionTo: "origin"
			});
		}
	},

	_alignedCoord: function( start, coeffs, originSize, popupSize ) {
		return (

			// Start at the origin
			start +

			// Apply lignment
			coeffs.originCoeff * originSize + coeffs.popupCoeff * popupSize +

			// Resulting coordinate needs to be that of the middle of the popup, so
			// add half a popup width
			popupSize / 2 );
	},

	_desiredCoords: function( options ) {
		var linkBox, offset, clampInfo,
			alignment = this._getAlignment();

		if ( alignment && options.positionTo === "origin" && this._ui.link ) {

			// Grab the size of the popup and the offset and size of the link
			clampInfo = this._clampPopupWidth( true );
			clampInfo.menuSize.cx = Math.min( clampInfo.menuSize.cx, clampInfo.rc.cx );
			offset = this._ui.link.offset();
			linkBox = {
				x: offset.left,
				y: offset.top,
				cx: this._ui.link.outerWidth(),
				cy: this._ui.link.outerHeight()
			};

			// Determine the desired coordinates of the middle of the popup
			options.x = this._alignedCoord( linkBox.x, alignment.x, linkBox.cx, clampInfo.menuSize.cx );
			options.y = this._alignedCoord( linkBox.y, alignment.y, linkBox.cy, clampInfo.menuSize.cy );
		}

		return this._super( options );
	}

});

})( jQuery );
