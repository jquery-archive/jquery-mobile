//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Range Slider form widget
//>>label: Range Slider
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.rangeslider.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "./textinput", "../../jquery.mobile.buttonMarkup", "./reset", "./slider" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.mobile.widget, {

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='rangeslider')",
			mini: false,
			highlight: true
		},

		_create: function() {
			var secondLabel,
			$el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			inputFirst = $el.find( "input:first" ),
			inputLast = $el.find( "input:last" ),
			label = $el.find( "label:first" ),
			sliderFirst = inputFirst.data( "mobileSlider" ).slider,
			sliderLast = inputLast.data( "mobileSlider" ).slider,
			firstHandle = inputFirst.data( "mobileSlider" ).handle,
			sliders = $( "<div class=\"ui-rangeslider-sliders\" />" ).appendTo( $el );
			
			if ( $el.find( "label" ).length > 1 ) {
				secondLabel = $el.find( "label:last" ).hide();
			}

			inputFirst.addClass( "ui-rangeslider-first" );
			inputFirst.after( "<span class=\"ui-rangeslider-dash\">&nbsp;-&nbsp;</span>" );
			inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );
			
			sliderFirst.appendTo( sliders );
			sliderLast.appendTo( sliders );
			label.prependTo( $el );
			firstHandle.appendTo(sliderLast);

			$.extend( this, {
				inputFirst: inputFirst,
				inputLast: inputLast,
				sliderFirst: sliderFirst,
				sliderLast: sliderLast,
				targetVal: null,
				sliderTarget: false,
				sliders: sliders,
				proxy: false
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
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},

		_dragFirstHandle: function() {
			//if the first handle is dragged send the event to the first slider
			this.inputFirst.data("mobileSlider").dragging = true;
			this.inputFirst.data("mobileSlider").refresh( event );
			return false;
		},

		_slidedrag: function( event ) {
			var first = ( $( event.target ).is( this.inputFirst ) ) ? true : false,
				otherSlider = ( first ) ? this.inputLast : this.inputFirst;

			this.sliderTarget = false;
			//if the drag was initaed on an extream and the other handle is focused send the events to
			//the closest handle
			if ( ( this.proxy === "first" && first ) || ( this.proxy === "last" && !first ) ) {
				otherSlider.data( "mobileSlider" ).dragging = true;
				otherSlider.data( "mobileSlider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = ( $( event.target ).is( this.inputFirst ) ) ? true : false;
			this.proxy = false;
			this.element.find( "input" ).trigger( "vmouseup" );
			this.sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this.sliderTarget = false;
			//if the track is the target remember this and the original value
			if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
				this.sliderTarget = true;
				this.targetVal = $( event.target ).val();
			}
		},

		_setOption: function( options ) {
			this._superApply( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			this._updateHighlight();
		},

		_change: function( event ) {
			if ( event.type == "keyup" ) {
				this._updateHighlight();
				return false;
			}

			var min = parseFloat( this.inputFirst.val(), 10 ),
				max = parseFloat( this.inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first ? this.inputFirst : this.inputLast,
				otherSlider = first ? this.inputLast : this.inputFirst;
			if ( min > max && !this.sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extream go to the closest handle
				thisSlider.val( this.targetVal ).slider( "refresh" );
				var self = this;
				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					otherSlider.data( "mobileSlider" ).handle.focus();
					self.sliderFirst.css( "z-index", first ? "" : 1 );
				}, 0 );
				this.proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both sliders are at min they cannot be adjusted
			if( min === max ) {
				thisSlider.data( "mobileSlider" ).handle.css( "z-index", 1 );
				otherSlider.data( "mobileSlider" ).handle.css( "z-index", 0 );

			} else {
				otherSlider.data( "mobileSlider" ).handle.css( "z-index", "" );
				thisSlider.data( "mobileSlider" ).handle.css( "z-index", "" );
			}
			this._updateHighlight();
			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( this.inputFirst.data( "mobileSlider" ).handle[0].style.left, 10 ),
				max = parseInt( this.inputLast.data( "mobileSlider" ).handle[0].style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" ).find( "label" ).show();
			this.element.find( ".ui-rangeslider-dash" ).remove();
			this.inputFirst.after( this.sliderFirst );
			this.inputLast.after( this.sliderLast );
			this.sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	});

$.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.behaviors.formReset );

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.rangeslider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");