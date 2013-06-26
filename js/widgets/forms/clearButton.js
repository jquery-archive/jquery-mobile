//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Add the ability to have a clear button
//>>label: Text Input Clear Button
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.degradeInputs", "../../jquery.mobile.zoom", "../../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			clearBtn: false,
			clearBtnText: "clear text"
		},

		_create: function(){
			this._super();

			if( !!this.options.clearBtn || this.isSearch ){
				this._addClearBtn();
			}
		},

		clearButton: function(){

			var o = this.options;

			return $( "<a href='#' class='ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext" +
					" ui-corner-all ui-shadow " +
					( o.theme ? "ui-btn-" + o.theme : "" ) +
					( o.mini ? "ui-mini" : "" ) + "' title='" + o.clearBtnText + "'>" + o.clearBtnText + "</a>" );

		},

		_clearBtnClick: function( event ){
			this.element.val( "" )
					.focus()
					.trigger( "change" );

			this._clearbtn.addClass( "ui-input-clear-hidden" );
			event.preventDefault();
		},

		_addClearBtn: function(){

			if( !this.options.enhanced ) {
				this._enhanceClear();
			}

			$.extend( this, {
				_clearBtn: this.widget().find("a.ui-input-clear")
			});

			this._bindClearEvents();

			this._toggleClear();

		},

		_enhanceClear: function() {

			this.clearButton().appendTo( this.widget() );

			if ( !this.isSearch ) {
				this.widget().addClass( "ui-input-has-clear" );
			}

		},

		_bindClearEvents: function() {

			this._on( this._clearBtn, {
				"click": "_clearBtnClick"
			});

			this._on({
				"keyup": "_toggleClear",
				"change": "_toggleClear",
				"input": "_toggleClear",
				"focus": "_toggleClear",
				"blur": "_toggleClear",
				"cut": "_toggleClear",
				"paste": "_toggleClear"

			});

		},

		_unbindClear: function() {
			this._off( this._clearBtn, "click");
			this._off( this.element, "keyup, change, input, focus, blur, cut, paste" );
		},

		_setOptions:function( o ) {
			this._super( o );

			if( o.clearbtn !== undefined && !this.element.is( "textarea, :jqmData(type='range')" ) ) {
				if( !!o.clearBtn ){
					this._addClearBtn();
				} else {
					this._destroyClear();
				}
			}

			if( o.clearBtnText !== undefined && this._clearBtn !== undefined ) {
				this._clearBtn.text( o.clearBtnText );
			}
		},

		_toggleClear: function() {
			var self = this;
			setTimeout( function() {
				self._clearBtn.toggleClass( "ui-input-clear-hidden", !self.element.val() );
			}, 0);
		},

		_destroyClear: function() {
			this.element.removeClass( "ui-input-has-clear" );
			this._unbindClear()._clearBtn.remove();
		},

		_destroy: function() {
			this._super();
			this._destroyClear();
		}

	});


})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");