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
			"ui-textinput-text": null,
			"ui-textinput-search": null
		},

		// The following four options are deprecated as of 1.5.0 and will be removed in 1.6.0
		// Their default value is set to null for 1.5.0, because the classes option now stores
		// the default value
		theme: null,
		corners: null,
		mini: null,
		wrapperClass: null,

		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		enhanced: false
	},

	_create: function() {

		var optionsToSet,
			options = this.options,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = this.element[ 0 ].tagName === "TEXTAREA",
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
		}

		this._on( {
			"focus": "_handleFocus",
			"blur": "_handleBlur"
		});

		// DEPRECATED as of 1.5.0 to be removed in 1.6.0: Check if any style options have deviated
		// from the defaults, and call _setOptions() on those that have
		$.each([ "theme", "corners", "mini", "wrapperClass" ], function() {
			if ( options[ this ] !== null ) {
				optionsToSet = optionsToSet || {};
				optionsToSet[ this ] = options[ this ];
			}
		});
		if ( optionsToSet ) {
			this._setOptions( optionsToSet );
		}
	},

	refresh: function() {
		this._setOptions({
			"disabled" : this.element.is( ":disabled" )
		});
	},

	_enhance: function() {

		//"search" and "text" input widgets
		if ( this.inputNeedsWrap ) {
			this._wrap().insertBefore( this.element ).append( this.element );
		} else {

			// Same classes are added to the element itself as are added in _wrap() to the wrapper
			this._addClass( this.element, "ui-textinput ui-textinput-" +
				( this.isSearch ? "search" : "text" ) );
		}
	},

	widget: function() {
		return ( this.inputNeedsWrap ) ? this.element.parent() : this.element;
	},

	_wrap: function() {
		var wrapper = $( "<div>" );

		this._addClass( wrapper, "ui-textinput ui-textinput-" +
			( this.isSearch ? "search" : "text" ) );

		return wrapper;
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
		this.widget().removeClass( $.mobile.focusClass );
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
		this.widget().addClass( $.mobile.focusClass );
	},

	_setOptions: function ( options ) {
		var outer = this.widget();

		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
			this._toggleClass( outer, "ui-textinput", "ui-state-disabled", options.disabled );
		}

		if ( options.mini !== undefined ) {
			this._toggleClass( outer, "ui-textinput", "ui-mini", options.mini );
		}

		if ( options.corners !== undefined ) {
			this._toggleClass( outer, "ui-textinput", "ui-corner-all", options.corners );
		}

		if ( options.theme !== undefined ) {
			this._removeClass( outer, "ui-textinput",
				( "ui-theme-" + ( this.options.theme ? this.options.theme : "inherit" ) ) );
			this._addClass( outer, "ui-textinput",
				( "ui-theme-" + ( options.theme ? options.theme : "inherit" ) ) );
		}

		if ( options.wrapperClass !== undefined ) {
			this._removeClass( outer, "ui-textinput", this.options.wrapperClass );
			this._addClass( outer, "ui-textinput", options.wrapperClass );
		}

		return this._superApply( arguments );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
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
