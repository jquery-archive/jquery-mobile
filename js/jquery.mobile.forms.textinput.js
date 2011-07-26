/*
* jQuery Mobile Framework : "textinput" plugin for text inputs, textareas
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

//auto self-init widgets
var initSelector = "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea";

$( document ).bind( "pagecreate create", function( e ){
	$( initSelector, e.target )
		.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
		.textinput();
});

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		initSelector: initSelector
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
		
		// XXX: Temporary workaround for issue 785. Turn off autocorrect and
		//      autocomplete since the popup they use can't be dismissed by
		//      the user. Note that we test for the presence of the feature
		//      by looking for the autocorrect property on the input element.
		if ( typeof input[0].autocorrect !== "undefined" ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}
		

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
