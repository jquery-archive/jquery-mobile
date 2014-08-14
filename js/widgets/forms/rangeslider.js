//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Range Slider form widget
//>>label: Range Slider
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.rangeslider.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../../jquery.mobile.core",
	"../../jquery.mobile.widget",
	"./textinput",
	"../../jquery.mobile.vmouse",
	"./reset",
	"./slider" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.extend( {

		options: {
			theme: null,
			trackTheme: null,
			corners: true,
			mini: false,
			highlight: true
		},

		_create: function() {
			var $el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			_inputFirst = $el.find( "input" ).first(),
			_inputLast = $el.find( "input" ).last(),
			_label = $el.find( "label" ).first(),
			_sliderWidgetFirst = $.data( _inputFirst.get( 0 ), "mobile-slider" ) ||
				$.data( _inputFirst.slider().get( 0 ), "mobile-slider" ),
			_sliderWidgetLast = $.data( _inputLast.get(0), "mobile-slider" ) ||
				$.data( _inputLast.slider().get( 0 ), "mobile-slider" ),
			_sliderFirst = _sliderWidgetFirst.slider,
			_sliderLast = _sliderWidgetLast.slider,
			firstHandle = _sliderWidgetFirst.handle,
			_sliders = $( "<div class='ui-rangeslider-sliders' />" ).appendTo( $el );

			_inputFirst.addClass( "ui-rangeslider-first" );
			_inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );

			_sliderFirst.appendTo( _sliders );
			_sliderLast.appendTo( _sliders );
			_label.insertBefore( $el );
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
			});

			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": "_slidebeforestart",
				"slidestop": "_slidestop",
				"slidedrag": "_slidedrag",
				"slidebeforechange": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on({
				"mousedown":"_change"
			});
			this._on( this.element.closest( "form" ), {
				"reset":"_handleReset"
			});
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},
		_handleReset: function() {
			var self = this;
			//we must wait for the stack to unwind before updateing other wise sliders will not have updated yet
			setTimeout( function() {
				self._updateHighlight();
			},0);
		},

		_dragFirstHandle: function( event ) {
			//if the first handle is dragged send the event to the first slider
			$.data( this._inputFirst.get(0), "mobile-slider" ).dragging = true;
			$.data( this._inputFirst.get(0), "mobile-slider" ).refresh( event );
			$.data( this._inputFirst.get(0), "mobile-slider" )._trigger( "start" );
			return false;
		},

		_slidedrag: function( event ) {
			var first = $( event.target ).is( this._inputFirst ),
				otherSlider = ( first ) ? this._inputLast : this._inputFirst;

			this._sliderTarget = false;
			//if the drag was initiated on an extreme and the other handle is focused send the events to
			//the closest handle
			if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
				$.data( otherSlider.get(0), "mobile-slider" ).dragging = true;
				$.data( otherSlider.get(0), "mobile-slider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = $( event.target ).is( this._inputFirst );

			this._proxy = false;
			//this stops dragging of the handle and brings the active track to the front
			//this makes clicks on the track go the the last handle used
			this.element.find( "input" ).trigger( "vmouseup" );
			this._sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this._sliderTarget = false;
			//if the track is the target remember this and the original value
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

			if ( options.mini !== undefined ) {
				this._setMini( options.mini );
			}

			if ( options.highlight !== undefined ) {
				this._setHighlight( options.highlight );
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

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				corners: o.corners,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
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

			if ( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" && !$(event.target).hasClass("ui-slider-handle")) ) {
				thisSlider.blur();
			} else if ( event.type === "mousedown" ) {
				return;
			}
			if ( min > max && !this._sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
				this._trigger( "normalize" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extreme go to the closest handle
				thisSlider.val( this._targetVal ).slider( "refresh" );

				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					$.data( otherSlider.get(0), "mobile-slider" ).handle.focus();
					self._sliderFirst.css( "z-index", first ? "" : 1 );
					self._trigger( "normalize" );
				}, 0 );
				this._proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both _sliders are at min they cannot be adjusted
			if ( min === max ) {
				$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", 1 );
				$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", 0 );
			} else {
				$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
				$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
			}

			this._updateHighlight();

			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( $.data( this._inputFirst.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
				max = parseInt( $.data( this._inputLast.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_setTheme: function( value ) {
			this._inputFirst.slider( "option", "theme", value );
			this._inputLast.slider( "option", "theme", value );
		},

		_setTrackTheme: function( value ) {
			this._inputFirst.slider( "option", "trackTheme", value );
			this._inputLast.slider( "option", "trackTheme", value );
		},

		_setMini: function( value ) {
			this._inputFirst.slider( "option", "mini", value );
			this._inputLast.slider( "option", "mini", value );
			this.element.toggleClass( "ui-mini", !!value );
		},

		_setHighlight: function( value ) {
			this._inputFirst.slider( "option", "highlight", value );
			this._inputLast.slider( "option", "highlight", value );
		},

		_setDisabled: function( value ) {
			this._inputFirst.prop( "disabled", value );
			this._inputLast.prop( "disabled", value );
		},

		_destroy: function() {
			this._label.prependTo( this.element );
			this.element.removeClass( "ui-rangeslider ui-mini" );
			this._inputFirst.after( this._sliderFirst );
			this._inputLast.after( this._sliderLast );
			this._sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	}, $.mobile.behaviors.formReset ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
