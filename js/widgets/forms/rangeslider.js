/*!
 * jQuery Mobile Range Slider @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Range Slider
//>>group: Forms
//>>description: Range Slider form widget
//>>docs: http://api.jquerymobile.com/rangeslider/
//>>demos: http://demos.jquerymobile.com/@VERSION/rangeslider/
//>>css.structure: ../css/structure/jquery.mobile.forms.rangeslider.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"./textinput",
			"../../vmouse",
			"./reset",
			"../widget.theme",
			"./slider" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "mobile.rangeslider", $.extend( {
	version: "@VERSION",

	options: {
		theme: "inherit",
		trackTheme: "inherit"
	},

	_create: function() {
		var _inputFirst = this.element.find( "input" ).first(),
		_inputLast = this.element.find( "input" ).last(),
		_label = this.element.find( "label" ).first(),
		_sliderWidgetFirst = $.data( _inputFirst.get( 0 ), "mobile-slider" ) ||
			$.data( _inputFirst.slider().get( 0 ), "mobile-slider" ),
		_sliderWidgetLast = $.data( _inputLast.get( 0 ), "mobile-slider" ) ||
			$.data( _inputLast.slider().get( 0 ), "mobile-slider" ),
		_sliderFirst = _sliderWidgetFirst.slider,
		_sliderLast = _sliderWidgetLast.slider,
		firstHandle = _sliderWidgetFirst.handle,
		_sliders = $( "<div>" );
		this._addClass( _sliders, "ui-rangeslider-sliders" );
		_sliders.appendTo( this.element );

		this._addClass( _inputFirst, "ui-rangeslider-first" );
		this._addClass( _inputLast, "ui-rangeslider-last" );
		this._addClass( "ui-rangeslider" );

		_sliderFirst.appendTo( _sliders );
		_sliderLast.appendTo( _sliders );
		_label.insertBefore( this.element );
		firstHandle.prependTo( _sliderLast );

		$.extend( this, {
			_inputFirst: _inputFirst,
			_inputLast: _inputLast,
			_sliderFirst: _sliderFirst,
			_sliderLast: _sliderLast,
			_label: _label,
			_targetVal: null,
			_sliderTarget: false,
			_sliders: _sliders,
			_proxy: false
		} );

		this.refresh();
		this._on( this.element.find( "input.ui-slider-input" ), {
			"slidebeforestart": "_slidebeforestart",
			"slidestop": "_slidestop",
			"slidedrag": "_slidedrag",
			"slidebeforechange": "_change",
			"blur": "_change",
			"keyup": "_change"
		} );
		this._on( {
			"mousedown":"_change"
		} );
		this._on( this.element.closest( "form" ), {
			"reset":"_handleReset"
		} );
		this._on( firstHandle, {
			"vmousedown": "_dragFirstHandle"
		} );
	},
	_handleReset: function() {
		var self = this;

		// We must wait for the stack to unwind before updating
		// otherwise sliders will not have updated yet
		setTimeout( function() {
			self._updateHighlight();
		}, 0 );
	},

	_dragFirstHandle: function( event ) {

		// If the first handle is dragged send the event to the first slider
		$.data( this._inputFirst.get( 0 ), "mobile-slider" ).dragging = true;
		$.data( this._inputFirst.get( 0 ), "mobile-slider" ).refresh( event );
		$.data( this._inputFirst.get( 0 ), "mobile-slider" )._trigger( "start" );
		return false;
	},

	_slidedrag: function( event ) {
		var first = $( event.target ).is( this._inputFirst ),
			otherSlider = ( first ) ? this._inputLast : this._inputFirst;

		this._sliderTarget = false;

		// If the drag was initiated on an extreme and the other handle is
		// focused send the events to the closest handle
		if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
			$.data( otherSlider.get( 0 ), "mobile-slider" ).dragging = true;
			$.data( otherSlider.get( 0 ), "mobile-slider" ).refresh( event );
			return false;
		}
	},

	_slidestop: function( event ) {
		var first = $( event.target ).is( this._inputFirst );

		this._proxy = false;

		// This stops dragging of the handle and brings the active track to the front
		// this makes clicks on the track go the the last handle used
		this.element.find( "input" ).trigger( "vmouseup" );
		this._sliderFirst.css( "z-index", first ? 1 : "" );
	},

	_slidebeforestart: function( event ) {
		this._sliderTarget = false;

		// If the track is the target remember this and the original value
		if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
			this._sliderTarget = true;
			this._targetVal = $( event.target ).val();
		}
	},

	_setOptions: function( options ) {
		if ( options.theme !== undefined ) {
			this._setTheme( options.theme );
		}

		if ( options.trackTheme !== undefined ) {
			this._setTrackTheme( options.trackTheme );
		}

		if ( options.disabled !== undefined ) {
			this._setDisabled( options.disabled );
		}

		this._super( options );
		this.refresh();
	},

	refresh: function() {
		var $el = this.element,
			o = this.options;

		if ( this._inputFirst.is( ":disabled" ) || this._inputLast.is( ":disabled" ) ) {
			this.options.disabled = true;
		}

		$el.find( "input" ).slider( {
			theme: o.theme,
			trackTheme: o.trackTheme,
			disabled: o.disabled
		} ).slider( "refresh" );
		this._updateHighlight();
	},

	_change: function( event ) {
		if ( event.type === "keyup" ) {
			this._updateHighlight();
			return false;
		}

		var self = this,
			min = parseFloat( this._inputFirst.val(), 10 ),
			max = parseFloat( this._inputLast.val(), 10 ),
			first = $( event.target ).hasClass( "ui-rangeslider-first" ),
			thisSlider = first ? this._inputFirst : this._inputLast,
			otherSlider = first ? this._inputLast : this._inputFirst;

		if ( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" &&
			!$( event.target ).hasClass( "ui-slider-handle" ) ) ) {
			thisSlider.blur();
		} else if ( event.type === "mousedown" ) {
			return;
		}
		if ( min > max && !this._sliderTarget ) {

			// This prevents min from being greater than max
			thisSlider.val( first ? max : min ).slider( "refresh" );
			this._trigger( "normalize" );
		} else if ( min > max ) {

			// This makes it so clicks on the target on either extreme go to the closest handle
			thisSlider.val( this._targetVal ).slider( "refresh" );

			// You must wait for the stack to unwind so
			// first slider is updated before updating second
			setTimeout( function() {
				otherSlider.val( first ? min : max ).slider( "refresh" );
				$.data( otherSlider.get( 0 ), "mobile-slider" ).handle.focus();
				self._sliderFirst.css( "z-index", first ? "" : 1 );
				self._trigger( "normalize" );
			}, 0 );
			this._proxy = ( first ) ? "first" : "last";
		}

		// Fixes issue where when both _sliders are at min they cannot be adjusted
		if ( min === max ) {
			$.data( thisSlider.get( 0 ), "mobile-slider" ).handle.css( "z-index", 1 );
			$.data( otherSlider.get( 0 ), "mobile-slider" ).handle.css( "z-index", 0 );
		} else {
			$.data( otherSlider.get( 0 ), "mobile-slider" ).handle.css( "z-index", "" );
			$.data( thisSlider.get( 0 ), "mobile-slider" ).handle.css( "z-index", "" );
		}

		this._updateHighlight();

		if ( min > max ) {
			return false;
		}
	},

	_themeElements: function() {
		return [
			{
				element: this.element.find( ".ui-slider-track" ),
				prefix: "ui-bar-"
			}
		];
	},

	_updateHighlight: function() {
		var min = parseInt( $.data( this._inputFirst.get( 0 ), "mobile-slider" )
								.handle.get( 0 ).style.left, 10 ),
			max = parseInt( $.data( this._inputLast.get( 0 ), "mobile-slider" )
								.handle.get( 0 ).style.left, 10 ),
			width = ( max - min );

		this.element.find( ".ui-slider-bg" ).css( {
			"margin-left": min + "%",
			"width": width + "%"
		} );
	},

	_setTheme: function( value ) {
		this._inputFirst.slider( "option", "theme", value );
		this._inputLast.slider( "option", "theme", value );
	},

	_setTrackTheme: function( value ) {
		this._inputFirst.slider( "option", "trackTheme", value );
		this._inputLast.slider( "option", "trackTheme", value );
	},

	_setDisabled: function( value ) {
		this._inputFirst.prop( "disabled", value );
		this._inputLast.prop( "disabled", value );
	},

	_destroy: function() {
		this._label.prependTo( this.element );
		this._inputFirst.after( this._sliderFirst );
		this._inputLast.after( this._sliderLast );
		this._sliders.remove();
		this.element.find( "input" ).slider( "destroy" );
	}

}, $.mobile.behaviors.formReset ) );

return $.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.widget.theme );

} );
