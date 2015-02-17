//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../core", "../../widget", "../../degradeInputs", "../../zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.textinput", {
	initSelector: "input[type='text']," +
		"input[type='search']," +
		":jqmData(type='search')," +
		"input[type='number']," +
		":jqmData(type='number')," +
		"input[type='password']," +
		"input[type='email']," +
		"input[type='url']," +
		"input[type='tel']," +
		"textarea," +
		"input[type='time']," +
		"input[type='date']," +
		"input[type='month']," +
		"input[type='week']," +
		"input[type='datetime']," +
		"input[type='datetime-local']," +
		"input[type='color']," +
		"input:not([type])," +
		"input[type='file']",

	options: {
		classes: {
			"ui-textinput": "ui-corner-all ui-body-inherit ui-shadow-inset",
			"ui-textinput-search-icon": "ui-icon ui-alt-icon ui-icon-search"
		},

		theme: null,

		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		enhanced: false
	},

	_create: function() {

		var options = this.options,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = this.element[ 0 ].nodeName.toLowerCase() === "textarea",
			isRange = this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='range']" ),
			inputNeedsWrap = ( (this.element.is( "input" ) ||
				this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='search']" ) ) &&
					!isRange );

		if ( this.element.prop( "disabled" ) ) {
			options.disabled = true;
		}

		$.extend( this, {
			isSearch: isSearch,
			isTextarea: isTextarea,
			isRange: isRange,
			inputNeedsWrap: inputNeedsWrap
		});

		this._autoCorrect();

		if ( !options.enhanced ) {
			this._enhance();
		} else {
			this._outer = ( inputNeedsWrap ? this.element.parent() : this.element );
			if ( isSearch ) {
				this._searchIcon = this._outer.children( ".ui-textinput-search-icon" );
			}
		}

		this._on( {
			"focus": "_handleFocus",
			"blur": "_handleBlur"
		});

	},

	refresh: function() {
		this.setOptions({
			"disabled" : this.element.is( ":disabled" )
		});
	},

	_enhance: function() {
		var outer;

		if ( this.inputNeedsWrap ) {
			outer = $( "<div>" );
			if ( this.isSearch ) {
				this._searchIcon = $( "<span>" ).appendTo( outer );
				this._addClass( this._searchIcon, "ui-textinput-search-icon" );
			}
		} else {
			outer = this.element;
		}

		this._addClass( outer, "ui-textinput ui-textinput-" +
			( this.isSearch ? "search" : "text" ) );

		if ( this.inputNeedsWrap ) {
			outer.insertBefore( this.element ).append( this.element );
		}

		this._outer = outer;
	},

	widget: function() {
		return this._outer;
	},

	_autoCorrect: function() {
		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty.
		//      - jblas
		if ( typeof this.element[0].autocorrect !== "undefined" &&
			!$.support.touchOverflow ) {

			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			this.element[0].setAttribute( "autocorrect", "off" );
			this.element[0].setAttribute( "autocomplete", "off" );
		}
	},

	_handleBlur: function() {
		this._outer.removeClass( $.mobile.focusClass );
		if ( this.options.preventFocusZoom ) {
			$.mobile.zoom.enable( true );
		}
	},

	_handleFocus: function() {
		// In many situations, iOS will zoom into the input upon tap, this
		// prevents that from happening
		if ( this.options.preventFocusZoom ) {
			$.mobile.zoom.disable( true );
		}
		this._outer.addClass( $.mobile.focusClass );
	},

	_setOptions: function ( options ) {
		if ( options.theme !== undefined ) {
			this._outer
				.removeClass(
					"ui-body-" + ( this.options.theme === null ? "inherit" : this.options.theme ) )
				.addClass(
					"ui-body-" + ( options.theme === null ? "inherit" : options.theme ) );
		}

		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
			this._outer.toggleClass( "ui-state-disabled", !!options.disabled );
		}
		return this._superApply( arguments );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
		}
		if ( this._searchIcon ) {
			this._searchIcon.remove();
		}
		if ( this.inputNeedsWrap ) {
			this.element.unwrap();
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
