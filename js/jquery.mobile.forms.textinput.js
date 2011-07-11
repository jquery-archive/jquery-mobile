/*
* jQuery Mobile Framework : "textinput" plugin for text inputs, textareas
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null
	},

	_create: function() {

		var input = this.element,
			o = this.options,
			theme = o.theme,
			themedParent, themeclass, themeLetter, focusedEl, clearbtn;

		if ( !theme ) {
			themedParent = this.element.closest( "[class*='ui-bar-'],[class*='ui-body-']" );
			themeLetter = themedParent.length && /ui-(bar|body)-([a-z])/.exec( themedParent.attr( "class" ) );
			theme = themeLetter && themeLetter[2] || "c";
		}

		themeclass = " ui-body-" + theme;

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		input.addClass("ui-input-text ui-body-"+ o.theme );

		focusedEl = input;

		//"search" input widget
		if ( input.is( "[type='search'],:jqmData(type='search')" ) ) {

			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + "'></div>" ).parent();
			clearbtn = $( "<a href='#' class='ui-input-clear' title='clear text'>clear text</a>" )
				.tap(function( event ) {
					input.val( "" ).focus();
					input.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true
				});

			function toggleClear() {
				if ( !input.val() ) {
					clearbtn.addClass( "ui-input-clear-hidden" );
				} else {
					clearbtn.removeClass( "ui-input-clear-hidden" );
				}
			}

			toggleClear();

			input.keyup( toggleClear )
				.focus( toggleClear );

		} else {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass );
		}

		input.focus(function() {
				focusedEl.addClass( "ui-focus" );
			})
			.blur(function(){
				focusedEl.removeClass( "ui-focus" );
			});

		// Autogrow
		if ( input.is( "textarea" ) ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyup = function() {
					var scrollHeight = input[ 0 ].scrollHeight,
						clientHeight = input[ 0 ].clientHeight;

					if ( clientHeight < scrollHeight ) {
						input.css({
							height: (scrollHeight + extraLineHeight)
						});
					}
				},
				keyupTimeout;

			input.keyup(function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( keyup, keyupTimeoutBuffer );
			});
		}
	},

	disable: function(){
		( this.element.attr( "disabled", true ).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).addClass( "ui-disabled" );
	},

	enable: function(){
		( this.element.attr( "disabled", false).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).removeClass( "ui-disabled" );
	}
});
})( jQuery );
