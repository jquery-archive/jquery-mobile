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

				// We also have the following keys which are empty by default:
				// "ui-textinput-clear-button-hidden"
				// "ui-textinput-has-clear-button"
				"ui-textinput-clear-button": "ui-button ui-icon-delete ui-button-icon-only ui-corner-all ui-alt-icon"
			},
			clearBtn: false,
			clearBtnText: "Clear text"
		},

		_create: function() {
			this._super();

			if ( !this.inputNeedsWrap ) {
				return;
			}

			if ( this.isSearch ) {
				this.options.clearBtn = true;
			}

			if ( this.options.clearBtn ) {
				if ( this.options.enhanced ) {
					this._clearButton = this._outer.children( "a.ui-textinput-clear-button" );
					this._bindClearEvents();
				} else {
					this._addClearButton();
				}
			}
		},

		clearButton: function() {
			var button = $( "<a href='#' tabindex='-1' aria-hidden='true'></a>" )
				.attr( "title", this.options.clearBtnText )
				.text( this.options.clearBtnText );

			this._addClass( button, "ui-textinput-clear-button" );

			return button;
		},

		_addClearButton: function() {
			this._addClass( this._outer, "ui-textinput-has-clear-button" );
			this._clearButton = this.clearButton().appendTo( this._outer );
			this._bindClearEvents();
			this._toggleClear();

		},

		_removeClearButton: function() {
			this._removeClass( this._outer, "ui-textinput-has-clear-button" );
			this._unbindClearEvents();
			this._clearButton.remove();
			this._clearButton = null;
		},

		_bindClearEvents: function() {
			this._on( this._clearButton, {
				"click": "_clearButtonClick"
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

		_unbindClearEvents: function() {
			this._off( this._clearButton, "click" );
			this._off( this.element, "keyup change input focus blur cut paste" );
		},

		_clearButtonClick: function( event ) {
			this.element.val( "" )
					.focus()
					.trigger( "change" );

			this._addClass( this._clearButton, "ui-textinput-clear-button-hidden" );
			event.preventDefault();
		},

		_toggleClear: function() {
			this._delay( "_toggleClearClass", 0 );
		},

		_toggleClearClass: function() {
			this._toggleClass( this._clearButton, "ui-textinput-clear-button-hidden",
				undefined, !this.element.val() );
		},

		_setOptions: function( options ) {
			this._super( options );

			if ( options.clearBtn !== undefined && this.inputNeedsWrap ) {
				if ( options.clearBtn ) {
					this._addClearButton();
				} else {
					this._removeClearButton();
				}
			}

			if ( options.clearBtnText !== undefined && this._clearButton !== undefined ) {
				this._clearButton.text( options.clearBtnText )
					.attr("title", options.clearBtnText);
			}
		},

		_destroy: function() {
			this._super();
			if ( !this.options.enhanced && this._clearButton ) {
				this._removeClearButton();
			}
		}

	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
