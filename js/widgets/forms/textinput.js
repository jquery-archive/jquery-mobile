//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.degradeInputs", "../../jquery.mobile.zoom", "../../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.textinput", {
	options: {
		theme: null,
		corners: true,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		clearBtn: false,
		clearBtnText: "clear text",
		disabled: false
	},

	_create: function() {

		var self = this,
			input = this.element,
			o = this.options,
			themeclass  = " ui-body-" + ( o.theme ?  o.theme : "inherit" ),
			cornerclass = o.corners ? " ui-corner-all" : "",
			miniclass = o.mini ? " ui-mini" : "",
			isSearch = input.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = input[ 0 ].tagName === "TEXTAREA",
			focusedEl,
			classes,
			clearbtn,
			clearBtnText = o.clearBtnText,
			clearBtnBlacklist = input.is( "textarea, :jqmData(type='range')" ),
			inputNeedsClearBtn = !!o.clearBtn && !clearBtnBlacklist,
			inputNeedsWrap = input.is( "input" ) && !input.is( ":jqmData(type='range')" ),
			extraLineHeight = 15,
			keyupTimeoutBuffer = 100,
			keyupTimeout;

		function toggleClear() {
			setTimeout( function() {
				clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
			}, 0 );
		}

		focusedEl = isTextarea ? input.addClass( "ui-input-text" + themeclass ) : input;

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}

		//"search" and "text" input widgets
		if ( isSearch || inputNeedsWrap ) {
			classes = isSearch ? "ui-input-search" : "ui-input-text";

			focusedEl = input.wrap( "<div class='" + classes + themeclass + miniclass + cornerclass + " ui-shadow-inset'></div>" ).parent();
		}


		if( inputNeedsClearBtn || isSearch ) {
			clearbtn = $( "<a href='#' class='ui-input-clear' title='" + clearBtnText + "'>" + clearBtnText + "</a>" )
				.bind( "click", function( event ) {
					input
						.val( "" )
						.focus()
						.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.addClass(
					"ui-btn ui-icon-delete ui-btn-icon-notext" +
					" ui-corner-all ui-shadow " +
					( o.theme ? "ui-btn-" + o.theme : "" ) +
					( o.mini ? "ui-mini" : "" ) );

			if ( !isSearch ) {
				focusedEl.addClass( "ui-input-has-clear" );
			}

			toggleClear();

			input.bind( "paste cut keyup input focus change blur", toggleClear );
		} else if ( !inputNeedsWrap && !isSearch ) {
			input.addClass( "ui-shadow-inset" + themeclass + miniclass + cornerclass );
		}

		input.focus(function() {
				// In many situations, iOS will zoom into the input upon tap, this prevents that from happening
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
				}
				focusedEl.addClass( $.mobile.focusClass );
			})
			.blur(function() {
				focusedEl.removeClass( $.mobile.focusClass );
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.enable( true );
				}
			});

		// Autogrow
		if ( isTextarea ) {
			this._keyup = function() {
				var scrollHeight = input[ 0 ].scrollHeight,
					clientHeight = input[ 0 ].clientHeight,
					paddingTop, paddingBottom, paddingHeight;


				if ( clientHeight < scrollHeight ) {
					paddingTop = parseFloat( input.css( "padding-top" ) );
					paddingBottom = parseFloat( input.css( "padding-bottom" ) );
					paddingHeight = paddingTop + paddingBottom;

					input.height( scrollHeight - paddingHeight + extraLineHeight );
				}
			};

			input.on( "keyup change input paste", function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( self._keyup, keyupTimeoutBuffer );
			});

			// binding to pagechange here ensures that for pages loaded via
			// ajax the height is recalculated without user input
			this._on( true, $.mobile.document, { "pagechange": "_keyup" });

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( input.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				this._on( true, $.mobile.window, {"load": "_keyup"});
			}
		}
		if ( input.attr( "disabled" ) ) {
			this.disable();
		}
	},

	disable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsDisabled = this.element.attr( "disabled", true )	&& ( inputNeedsWrap || isSearch );

		if ( parentNeedsDisabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.addClass( "ui-disabled" );
		return this._setOption( "disabled", true );
	},

	enable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsEnabled = this.element.attr( "disabled", false )	&& ( inputNeedsWrap || isSearch );

		if ( parentNeedsEnabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.removeClass( "ui-disabled" );
		return this._setOption( "disabled", false );
	}
});

$.mobile.textinput.initSelector = "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.textinput" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
