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
			highlight: true
		},

		_create: function() {
			var sliders, secondLabel
			$el = this.element,
			inputFirst = $el.find( "input:first" ),
			inputLast = $el.find( "input:last" ),
			label = $el.find( "label:first" ),
			sliderFirst = $el.find( "div.ui-slider:first" ),
			sliderLast = $el.find( "div.ui-slider:last" );
			
			if($el.find( "label" ).length > 1 ) {
				secondLabel = $el.find( "label:last" ).hide();
			}

			inputFirst.addClass( "ui-rangeslider-first" );
			inputFirst.after( "<span class=\"ui-rangeslider-dash\">&nbsp;-&nbsp;</span>" );
			inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( "ui-rangeslider" ).append( "<div class=\"ui-rangeslider-sliders\" />" );
			sliders = $el.find( ".ui-rangeslider-sliders" );
			sliderFirst.appendTo( sliders );
			sliderLast.appendTo( sliders );
			label.prependTo($el);
			
			$.extend( this, {
				inputFirst: inputFirst,
				inputLast: inputLast,
				sliderFirst: sliderFirst,
				targetVal: null,
				sliderTarget:false,
				sliders: sliders,
				sliderLast: sliderLast,
				proxy:false
			});
			
			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": function( event ){
					var min = parseFloat( this.inputFirst.val(), 10 ),
						max = parseFloat( this.inputLast.val(), 10 ),
						first = ($(event.target).is(this.inputFirst))? true:false
						otherSlider = (first)? this.inputLast: this.inputFirst;
					if($(event.originalEvent.target).hasClass("ui-slider")){
						this.sliderTarget = true;
						this.targetVal = $(event.target).val();
					}
				},
				"slidestop": function(){
					this.proxy = false;
					this.element.find("input").trigger("vmouseup");
				},
				"slidedrag":function(event){
					var min = parseFloat( this.inputFirst.val(), 10 ),
						max = parseFloat( this.inputLast.val(), 10 ),
						first = ($(event.target).is(this.inputFirst))? true:false
						otherSlider = (first)? this.inputLast: this.inputFirst;
					if((this.proxy == "first" && first) || (this.proxy == "last" && !first)){
						otherSlider.data("mobileSlider").dragging = true;
						otherSlider.data("mobileSlider").refresh(event);
						return false;
					}
				},
				"change": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on( this.element.find( ".ui-slider-handle" ), {
				"vmousedown": function( event ){
					var first = $(event.target).closest( ".ui-slider" ).is( ":first-child" );
					this.sliderFirst.css( "z-index", first ? 1 : "" );
				}
			});
		},

		_setOption: function( options ){
			this.superApply( options );
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
			if( event.type == "keyup" ){
				this._updateHighlight();
				return false;
			}

			var min = parseFloat( this.inputFirst.val(), 10 ),
				max = parseFloat( this.inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first? this.inputFirst: this.inputLast,
				otherSlider = first? this.inputLast: this.inputFirst;
					if( min > max && !this.sliderTarget)  {
						thisSlider.val(first ? max: min).slider( "refresh" );
					} else if ( min > max) {
			            thisSlider.val(this.targetVal).slider("refresh");
			            setTimeout(function(){
			              otherSlider.val(first? min: max).slider("refresh");
			            },0);
			            this.proxy = (first)? "first":"last";
					}
					this._updateHighlight();
		},

		_updateHighlight: function() {
			var min = parseInt(this.sliderFirst.find( ".ui-slider-handle" )[0].style.left, 10),
				max = parseInt(this.sliderLast.find( ".ui-slider-handle" )[0].style.left, 10),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" ).find("label").show();
			this.element.find( ".ui-rangeslider-dash" ).remove();
			this.inputFirst.after(this.sliderFirst);
			this.inputLast.after(this.sliderLast);
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