//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Add the ability to have a clear button
//>>label: Text Input Clear Button
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"./textinput" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			classes: {
				"ui-textinput-clear": "ui-button ui-button-icon-only ui-corner-all",
				"ui-textinput-clear-icon": "ui-icon ui-icon-delete",
				"ui-textinput-clear-hidden": null,
				"ui-textinput-has-clear": null
			},
			clearBtn: false,
			clearBtnText: "Clear text"
		},

		_create: function() {
			this._super();

			if ( this.isSearch ) {
				this.options.clearBtn = true;
			}

			if ( !!this.options.clearBtn && this.inputNeedsWrap ) {
				this._addClearBtn();
			}
		},

		clearButton: function() {
			var icon = $( "<span>" ),
				button = $( "<a href='#' tabindex='-1' aria-hidden='true'></a>" )
					.attr( "title", this.options.clearBtnText )
					.text( this.options.clearBtnText )
					.append( icon );

			this._addClass( button, "ui-textinput-clear" );
			this._addClass( icon, "ui-textinput-clear-icon" );

			return button;
		},

		_clearBtnClick: function( event ) {
			this.element.val( "" )
					.focus()
					.trigger( "change" );

			this._addClass( this._clearBtn, "ui-textinput-clear-hidden" );
			event.preventDefault();
		},

		_addClearBtn: function() {

			if ( !this.options.enhanced ) {
				this._enhanceClear();
			}

			$.extend( this, {
				_clearBtn: this.widget().find( "a.ui-textinput-clear" )
			});

			this._bindClearEvents();

			this._toggleClear();

		},

		_enhanceClear: function() {

			this.clearButton().appendTo( this.widget() );
			this._addClass( this.widget(), "ui-textinput-has-clear" );

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
			this._off( this.element, "keyup change input focus blur cut paste" );
		},

		_setOptions: function( options ) {
			this._super( options );

			if ( options.clearBtn !== undefined &&
				!this.element.is( "textarea, :jqmData(type='range')" ) ) {
				if ( options.clearBtn ) {
					this._addClearBtn();
				} else {
					this._destroyClear();
				}
			}

			if ( options.clearBtnText !== undefined && this._clearBtn !== undefined ) {
				this._clearBtn.text( options.clearBtnText )
					.attr("title", options.clearBtnText);
			}
		},

		_toggleClear: function() {
			this._delay( "_toggleClearClass", 0 );
		},

		_toggleClearClass: function() {
			this._toggleClass( this._clearBtn, "ui-textinput-clear-hidden", undefined,
				!this.element.val() );
		},

		_destroyClear: function() {
			this._removeClass( this.widget(), "ui-textinput-has-clear" );
			this._unbindClear();
			this._clearBtn.remove();
		},

		_destroy: function() {
			this._super();
			if ( this.options.clearBtn ) {
				this._destroyClear();
			}
		}

	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
