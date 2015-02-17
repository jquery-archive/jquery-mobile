/*!
 * jQuery Mobile Clear Button @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Text Input Clear Button
//>>group: Forms
//>>description: Add the ability to have a clear button
//>>docs: http://api.jquerymobile.com/textinput/#option-clearBtn
//>>demos: http://demos.jquerymobile.com/@VERSION/textinput/
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./textinput" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.textinput", $.mobile.textinput, {
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
		if ( !this.options.clearBtn || this.isTextarea ) {
			return;
		}

		if ( this.options.enhanced ) {
			this._clearButton = this._outer.children( ".ui-textinput-clear-button" );
			this._clearButtonIcon = this._clearButton
				.children( ".ui-textinput-clear-button-icon" );
			this._toggleClasses( true );
			this._bindClearEvents();
		} else {
			this._addClearButton();
		}
	},

	_clearButtonClick: function( event ) {
		this.element.val( "" )
			.focus()
			.trigger( "change" );
		event.preventDefault();
	},

	_toggleClasses: function( add ) {
		this._toggleClass( this._outer, "ui-textinput-has-clear-button", null, add );
		this._toggleClass( this._clearButton, "ui-textinput-clear-button",
			"ui-button ui-button-icon-only ui-button-right", add );
		this._toggleClass( this._clearButtonIcon, "ui-textinput-clear-button-icon",
			"ui-icon-delete ui-icon", add );
		this._toggleClass( "ui-textinput-hide-clear", null, add );
	},

	_addClearButton: function() {
		this._clearButtonIcon = $( "<span>" );
		this._clearButton = $( "<a href='#' tabindex='-1' aria-hidden='true'></a>" )
			.attr( "title", this.options.clearBtnText )
			.text( this.options.clearBtnText )
			.append( this._clearButtonIcon );
		this._toggleClasses( true );
		this._clearButton.appendTo( this._outer );
		this._bindClearEvents();
		this._toggleClear();
	},

	_removeClearButton: function() {
		this._toggleClasses( false );
		this._unbindClearEvents();
		this._clearButton.remove();
		clearTimeout( this._toggleClearDelay );
		delete this._toggleClearDelay;
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

	_setOptions: function( options ) {
		this._super( options );

		if ( options.clearBtn !== undefined && !this.isTextarea ) {
			if ( options.clearBtn ) {
				this._addClearButton();
			} else {
				this._removeClearButton();
			}
		}

		if ( options.clearBtnText !== undefined && this._clearButton !== undefined ) {
			this._clearButton.text( options.clearBtnText )
				.attr( "title", options.clearBtnText );
		}
	},

	_toggleClear: function() {
		this._toggleClearDelay = this._delay( "_toggleClearClass", 0 );
	},

	_toggleClearClass: function() {
		this._toggleClass( this._clearButton, "ui-textinput-clear-button-hidden",
			undefined, !this.element.val() );
		this._clearButton.attr( "aria-hidden", !this.element.val() );
		delete this._toggleClearDelay;
	},

	_destroy: function() {
		this._super();
		if ( !this.options.enhanced && this._clearButton ) {
			this._removeClearButton();
		}
	}

} );

} );
