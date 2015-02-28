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
				"ui-textinput-clear-button": "ui-corner-all"
			},
			clearBtn: false,
			clearBtnText: "Clear text"
		},

		_create: function() {
			this._super();

			if ( this.isSearch ) {
				this.options.clearBtn = true;
			}

			// We do nothing on startup if the options is off or if this is not a wrapped input
			if ( !this.options.clearBtn || !this.inputNeedsWrap ) {
				return;
			}

			if ( this.options.enhanced ) {
				this._clearButton = this._outer.children( "a.ui-textinput-clear-button" );
				this._clearButtonIcon = this._clearButton
					.children( "span.ui-textinput-clear-button-icon" );
				this._toggleClasses( "add" );
				this._bindClearEvents();
			} else {
				this._addClearButton();
			}
		},

		_toggleClasses: function( operation ) {
			this[ "_" + operation + "Class" ]( this._outer, "ui-textinput-has-clear-button" );
			this[ "_" + operation + "Class" ]( this._clearButton, "ui-textinput-clear-button",
				"ui-button ui-button-icon-only ui-button-right" );
			this[ "_" + operation + "Class" ]( this._clearButtonIcon,
				"ui-textinput-clear-button-icon",
				"ui-icon-delete, ui-icon" );
		},

		clearButton: function() {
			var icon = $( "<span>" ),
				button = $( "<a href='#' tabindex='-1' aria-hidden='true'></a>" )
					.attr( "title", this.options.clearBtnText )
					.text( this.options.clearBtnText )
					.append( icon );

			return {
				_clearButton: button,
				_clearButtonIcon: icon
			};
		},

		_addClearButton: function() {
			this._addClass( this._outer, "ui-textinput-has-clear-button" );
			$.extend( this, this.clearButton() );
			this._toggleClasses( "add" );
			this._clearButton.appendTo( this._outer );
			this._bindClearEvents();
			this._toggleClear();
		},

		_removeClearButton: function( removeClass ) {
			if ( removeClass ) {
				this._toggleClasses( "remove" );
			}
			this._unbindClearEvents();
			this._clearButton.remove();
			delete this._clearButton;
			delete this._clearButtonIcon;
			clearTimeout( this._toggleClearDelay );
			this._toggleClearDelay = 0;
		},

		_bindClearEvents: function() {
			this._on( this._clearButton, {
				"click": "_clearButtonClick"
			} );

			this._on( {
				"keyup": "_toggleClear",
				"change": "_toggleClear",
				"input": "_toggleClear",
				"focus": "_toggleClear",
				"blur": "_toggleClear",
				"cut": "_toggleClear",
				"paste": "_toggleClear"

			} );
		},

		_unbindClearEvents: function() {
			this._off( this._clearButton, "click" );
			this._off( this.element, "keyup change input focus blur cut paste" );
		},

		_clearButtonClick: function( event ) {
			this.element.val( "" )
					.focus()
					.trigger( "change" );
			event.preventDefault();
		},

		_toggleClear: function() {
			this._toggleClearDelay = this._delay( "_toggleClearClass", 0 );
		},

		_toggleClearClass: function() {
			this._toggleClass( this._clearButton, "ui-textinput-clear-button-hidden",
				undefined, !this.element.val() );
			this._clearButton.attr( "aria-hidden", !this.element.val() );
			this._toggleClearDelay = 0;
		},

		_setOptions: function( options ) {
			this._super( options );

			if ( options.clearBtn !== undefined && this.inputNeedsWrap ) {
				if ( options.clearBtn ) {
					this._addClearButton();
				} else {
					this._removeClearButton( true );
				}
			}

			if ( options.clearBtnText !== undefined && this._clearButton !== undefined ) {
				this._clearButton.text( options.clearBtnText )
					.attr( "title", options.clearBtnText );
			}
		},

		_destroy: function() {
			this._super();
			if ( !this.options.enhanced && this._clearButton ) {
				this._removeClearButton( false );
			}
		}

	} );

} )( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
} );
//>>excludeEnd("jqmBuildExclude");
