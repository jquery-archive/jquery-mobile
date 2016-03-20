/*!
 * jQuery Mobile Slider @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slider
//>>group: Forms
//>>description: Slider form widget
//>>docs: http://api.jquerymobile.com/button/
//>>demos: http://demos.jquerymobile.com/@VERSION/button/
//>>css.structure: ../css/structure/jquery.mobile.forms.slider.css
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
			"../widget.theme",
			"./reset" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "mobile.slider", $.extend( {
	version: "@VERSION",

	initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",

	widgetEventPrefix: "slide",

	options: {
		theme: "inherit",
		trackTheme: "inherit",
		classes: {
			"ui-slider-track": "ui-shadow-inset ui-corner-all",
			"ui-slider-input": "ui-shadow-inset ui-corner-all"
		}
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var control = this.element,
			cType = control[ 0 ].nodeName.toLowerCase(),
			isRangeslider = control.parent().is( ":jqmData(role='rangeslider')" ),
			controlID = control.attr( "id" ),
			$label = $( "[for='" + controlID + "']" ),
			labelID = $label.attr( "id" ) || controlID + "-label",
			min = parseFloat( control.attr( "min" ) ),
			max = parseFloat( control.attr( "max" ) ),
			step = window.parseFloat( control.attr( "step" ) || 1 ),
			domHandle = document.createElement( "a" ),
			handle = $( domHandle ),
			domSlider = document.createElement( "div" ),
			slider = $( domSlider ),
			wrapper;

		$label.attr( "id", labelID );

		domHandle.setAttribute( "href", "#" );
		domSlider.setAttribute( "role", "application" );
		this._addClass( slider, "ui-slider-track" );
		this._addClass( handle, "ui-slider-handle" );
		domSlider.appendChild( domHandle );

		handle.attr( {
			"role": "slider",
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": this._value(),
			"aria-valuetext": this._value(),
			"title": this._value(),
			"aria-labelledby": labelID
		} );

		$.extend( this, {
			slider: slider,
			handle: handle,
			control: control,
			type: cType,
			step: step,
			max: max,
			min: min,
			isRangeslider: isRangeslider,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		} );

		// Monitor the input for updated values
		this._addClass( "ui-slider-input" );

		this._on( control, {
			"change": "_controlChange",
			"keyup": "_controlKeyup",
			"blur": "_controlBlur",
			"vmouseup": "_controlVMouseUp"
		} );

		slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
			.bind( "vclick", false );

		// We have to instantiate a new function object for the unbind to work properly
		// since the method itself is defined in the prototype (causing it to unbind everything)
		this._on( document, { "vmousemove": "_preventDocumentDrag" } );
		this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" } );

		slider.insertAfter( control );

		// Wrap in a div for styling purposes
		if ( !isRangeslider ) {
			wrapper = "<div class='ui-slider'></div>";

			control.add( slider ).wrapAll( wrapper );
		}

		// Bind the handle event callbacks and set the context to the widget instance
		this._on( this.handle, {
			"vmousedown": "_handleVMouseDown",
			"keydown": "_handleKeydown",
			"keyup": "_handleKeyup"
		} );

		this.handle.bind( "vclick", false );

		this._handleFormReset();

		this.refresh( undefined, undefined, true );
	},

	_setOptions: function( options ) {
		if ( options.disabled !== undefined ) {
			this._setDisabled( options.disabled );
		}
		this._super( options );
	},

	_controlChange: function( event ) {

		// If the user dragged the handle, the "change" event was triggered from
		// inside refresh(); don't call refresh() again
		if ( this._trigger( "controlchange", event ) === false ) {
			return false;
		}
		if ( !this.mouseMoved ) {
			this.refresh( this._value(), true );
		}
	},

	_controlKeyup: function( /* event */ ) {

		// Necessary?
		this.refresh( this._value(), true, true );
	},

	_controlBlur: function( /* event */ ) {
		this.refresh( this._value(), true );
	},

	// It appears the clicking the up and down buttons in chrome on
	// range/number inputs doesn't trigger a change until the field is
	// blurred. Here we check thif the value has changed and refresh
	_controlVMouseUp: function( /* event */ ) {
		this._checkedRefresh();
	},

	// NOTE force focus on handle
	_handleVMouseDown: function( /* event */ ) {
		this.handle.focus();
	},

	_handleKeydown: function( event ) {
		var index = this._value();
		if ( this.options.disabled ) {
			return;
		}

		// In all cases prevent the default and mark the handle as active
		switch ( event.keyCode ) {
		case $.mobile.keyCode.HOME:
		case $.mobile.keyCode.END:
		case $.mobile.keyCode.PAGE_UP:
		case $.mobile.keyCode.PAGE_DOWN:
		case $.mobile.keyCode.UP:
		case $.mobile.keyCode.RIGHT:
		case $.mobile.keyCode.DOWN:
		case $.mobile.keyCode.LEFT:
			event.preventDefault();

			if ( !this._keySliding ) {
				this._keySliding = true;

				// TODO: We don't use this class for styling. Do we need it?
				this._addClass( this.handle, null, "ui-state-active" );
			}

			break;
		}

		// Move the slider according to the keypress
		switch ( event.keyCode ) {
		case $.mobile.keyCode.HOME:
			this.refresh( this.min );
			break;
		case $.mobile.keyCode.END:
			this.refresh( this.max );
			break;
		case $.mobile.keyCode.PAGE_UP:
		case $.mobile.keyCode.UP:
		case $.mobile.keyCode.RIGHT:
			this.refresh( index + this.step );
			break;
		case $.mobile.keyCode.PAGE_DOWN:
		case $.mobile.keyCode.DOWN:
		case $.mobile.keyCode.LEFT:
			this.refresh( index - this.step );
			break;
		}
	},

	_handleKeyup: function( /* event */ ) {
		if ( this._keySliding ) {
			this._keySliding = false;
			this._removeClass( this.handle, null, "ui-state-active" ); /* See comment above. */
		}
	},

	_sliderVMouseDown: function( event ) {

		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this.options.disabled || !( event.which === 1 ||
			event.which === 0 || event.which === undefined ) ) {
			return false;
		}
		if ( this._trigger( "beforestart", event ) === false ) {
			return false;
		}
		this.dragging = true;
		this.userModified = false;
		this.mouseMoved = false;

		this.refresh( event );
		this._trigger( "start" );
		return false;
	},

	_sliderVMouseUp: function() {
		if ( this.dragging ) {
			this.dragging = false;
			this.mouseMoved = false;
			this._trigger( "stop" );
			return false;
		}
	},

	_preventDocumentDrag: function( event ) {

		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this._trigger( "drag", event ) === false ) {
			return false;
		}
		if ( this.dragging && !this.options.disabled ) {

			// This.mouseMoved must be updated before refresh() because it will be
			// used in the control "change" event
			this.mouseMoved = true;

			this.refresh( event );

			// Only after refresh() you can calculate this.userModified
			this.userModified = this.beforeStart !== this.element[ 0 ].selectedIndex;
			return false;
		}
	},

	_checkedRefresh: function() {
		if ( this.value !== this._value() ) {
			this.refresh( this._value() );
		}
	},

	_value: function() {
		return parseFloat( this.element.val() );
	},

	_reset: function() {
		this.refresh( undefined, false, true );
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {

		// NOTE: we don't return here because we want to support programmatic
		//       alteration of the input value, which should still update the slider

		var self = this,
			left, width, data, tol,
			pxStep, percent,
			control, min, max, step,
			newval, valModStep, alignValue, percentPerStep,
			handlePercent, aPercent, bPercent,
			valueChanged;

		this._addClass( self.slider, "ui-slider-track" );
		if ( this.options.disabled || this.element.prop( "disabled" ) ) {
			this.disable();
		}

		// Set the stored value for comparison later
		this.value = this._value();
		this._addClass( this.handle, null, "ui-button ui-shadow" );

		control = this.element;
		min = parseFloat( control.attr( "min" ) );
		max = parseFloat( control.attr( "max" ) );
		step = ( parseFloat( control.attr( "step" ) ) > 0 ) ?
				parseFloat( control.attr( "step" ) ) : 1;

		if ( typeof val === "object" ) {
			data = val;

			// A slight tolerance helped get to the ends of the slider
			tol = 8;

			left = this.slider.offset().left;
			width = this.slider.width();
			pxStep = width / ( ( max - min ) / step );
			if ( !this.dragging ||
					data.pageX < left - tol ||
					data.pageX > left + width + tol ) {
				return;
			}
			if ( pxStep > 1 ) {
				percent = ( ( data.pageX - left ) / width ) * 100;
			} else {
				percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
			}
		} else {
			if ( val == null ) {
				val = parseFloat( control.val() || 0 ) ;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		newval = ( percent / 100 ) * ( max - min ) + min;

		//From jQuery UI slider, the following source will round to the nearest step
		valModStep = ( newval - min ) % step;
		alignValue = newval - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		percentPerStep = 100 / ( ( max - min ) / step );

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see jQueryUI: #4124)
		newval = parseFloat( alignValue.toFixed( 5 ) );

		if ( typeof pxStep === "undefined" ) {
			pxStep = width / ( ( max - min ) / step );
		}
		if ( pxStep > 1 ) {
			percent = ( newval - min ) * percentPerStep * ( 1 / step );
		}
		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		this.handle.css( "left", percent + "%" );

		this.handle[ 0 ].setAttribute( "aria-valuenow",  newval );

		this.handle[ 0 ].setAttribute( "aria-valuetext", newval );

		this.handle[ 0 ].setAttribute( "title", newval );

		if ( this.valuebg ) {
			this.valuebg.css( "width", percent + "%" );
		}

		// Drag the label widths
		if ( this._labels ) {
			handlePercent = this.handle.width() / this.slider.width() * 100;
			aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100;
			bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

			this._labels.each( function() {
				var ab = $( this ).hasClass( "ui-slider-label-a" );
				$( this ).width( ( ab ? aPercent : bPercent ) + "%" );
			} );
		}

		if ( !preventInputUpdate ) {
			valueChanged = false;

			// Update control"s value
			valueChanged = parseFloat( control.val() ) !== newval;
			control.val( newval );

			if ( this._trigger( "beforechange", val ) === false ) {
				return false;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	_themeElements: function() {
		return [
			{
				element: this.handle,
				prefix: "ui-button-"
			},
			{
				element: this.control,
				prefix: "ui-body-"
			},
			{
				element: this.slider,
				prefix: "ui-body-",
				option: "trackTheme"
			},
			{
				element: this.element,
				prefix: "ui-body-"
			}
		];
	},

	_setDisabled: function( value ) {
		value = !!value;
		this.element.prop( "disabled", value );

		this._toggleClass( this.slider, null, "ui-state-disabled", value );
		this.slider.attr( "aria-disabled", value );

		this._toggleClass( null, "ui-state-disabled", value );
	}

}, $.mobile.behaviors.formReset ) );

return $.widget( "mobile.slider", $.mobile.slider, $.mobile.widget.theme );

} );
