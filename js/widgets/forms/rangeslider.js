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
		widgetEventPrefix: "rangeslider",

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='rangeslider')",
			mini: false,
			highlight: false
		},

		_create: function() {
			var inputFirst, sliders, inputLast, sliderFirst, sliderLast, sliderLastWidth, sliderFirstWidth, label,
			$el = this.element;

			inputFirst = $el.find( "input:first" );
			inputLast = $el.find( "input:last" );
			inputFirst.addClass( "ui-rangeslider-first" );
			inputLast.addClass( "ui-rangeslider-last" );
			label = $el.find( "label" );
			sliderFirst = $el.find( ".ui-slider:first" ).addClass( "ui-slider-first" );
			sliderLast = $el.find( ".ui-slider:last" ).addClass( "ui-slider-last" );
			
			$el.append( "<div class=\"ui-rangeslider-sliders\" />" );
			$el.addClass( "ui-rangeslider" );
			
			sliders = $el.find( ".ui-rangeslider-sliders" );
			sliderFirst.appendTo( sliders );
			inputFirst.after( "<span class=\"ui-rangeslider-dash\">&nbsp;-&nbsp;</span>" );
			sliderLast.appendTo( sliders );
			label.addClass( "ui-slider" );

			$.extend( this, {
				inputFirst: inputFirst,
				inputLast: inputLast,
				sliderFirst: sliderFirst,
				label: label,
				sliders: sliders,
				sliderLast: sliderLast,
				sliderFirstWidth: sliderFirstWidth,
				sliderLastWidth: sliderLastWidth,
				wasVisible: true
			});

			this.refresh();
			this._bindResize();
			this._bindChangeEvents();
			this._bindToggle();
		},

		_setOption: function( options ){
			this.superApply( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			if( o.mini ){
				this.label.addClass( "ui-mini" );
				this.inputFirst.addClass( "ui-mini" );
				this.inputLast.addClass( "ui-mini" );
				this.element.addClass( "ui-mini" );
			} else {
				this.label.removeClass( "ui-mini" );
				this.inputFirst.removeClass( "ui-mini" );
				this.inputLast.removeClass( "ui-mini" );
				this.element.removeClass( "ui-mini" );
			}
			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
		},

		_bindChangeEvents: function() {
			this._on( this.element.find( "input" ), {
				"change": function( event ){
					var min = parseFloat( this.inputFirst.val(), 10 ),
						max = parseFloat( this.inputLast.val(), 10 ),
						first = $( event.target ).hasClass( "ui-rangeslider-first" ),
						slider = ( first )? this.sliderFirst.find( ".ui-slider-bg" ): this.sliderLast.find( ".ui-slider-bg" );

					if( min > max )  {
						$( event.target ).val(first ? max: min).slider( "refresh" );
					}

					this.element.find( ".ui-slider-bg" ).css( "visibility", "visible" );

					if( !this.wasVisible && min <= max && !first ){
						this.inputFirst.slider( "refresh" );
					}

					if( first ) {
						this.sliderFirstWidth = slider.width();
					} else {
						this.sliderLastWidth = slider.width();
					}

					this._updateHighlight( (min > max)? true:false );
						
				}
			});
		},

		_bindResize: function() {
			this._on( this.element.closest( ".ui-page" ) , {
				"pageshow": function(){
					this.sliderFirstWidth = this.sliderFirst.find( ".ui-slider-bg" ).width();
					this.sliderLastWidth = this.sliderLast.find( ".ui-slider-bg" ).width();
				}
			});
			this._on( window , {
				"throttledresize": function( event ){
					this.sliderLastWidth = this.sliderLast.find( ".ui-slider-bg" ).width();
				}
			});
		},

		_bindToggle: function() {
			this._on( this.element.find( ".ui-slider-handle" ), {
				"vclick": function( event ){
					var first = $(event.target).closest( ".ui-slider" ).is( ":first-child" );
					this.sliderFirst.css( "z-index", first ? 1 : "" );
				}
			});
		},

		_updateHighlight: function( hide ) {
			var newWidth = this.sliderLastWidth - this.sliderFirstWidth,
				tWidth = this.sliderLast.width();
				this.wasVisible = ( hide )? false:true;
				this.element.find( ".ui-slider-bg" ).css({
					"margin-left": this.sliderFirstWidth / tWidth * 100 + "%",
					"width": ( newWidth ) / tWidth * 100 + "%",
					"visibility": ( hide )? "hidden":"visible"
				});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" );
			this.sliders.removeClass( "ui-rangeslider-sliders" );
			this.label.removeClass( "ui-slider ui-mini" );
			this.element.find( ".ui-rangeslider-dash" ).remove();
			this.element.find('.ui-slider-input').removeClass( "ui-rangeslider-first ui-rangeslider-last" );
			this.inputFirst.after(this.sliderFirst);
			this.inputLast.after(this.sliderLast);
			this.sliders.remove();
			this.element.find( "input" ).slider( "destroy" );
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