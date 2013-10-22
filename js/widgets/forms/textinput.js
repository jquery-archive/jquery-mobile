//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.degradeInputs", "../../jquery.mobile.zoom" ], function( jQuery ) {
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
		theme: null,
		corners: true,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		wrapperClass: "",
		enhanced: false
	},

	_create: function() {

		var options = this.options,
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
			classes: this._classesFromOptions(),
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

	},

	refresh: function() {
		this.setOptions({
			"disabled" : this.element.is( ":disabled" )
		});
	},

	_enhance: function() {
		var elementClasses = [];

		if ( this.isTextarea ) {
			elementClasses.push( "ui-input-text" );
		}

		if ( this.isTextarea || this.isRange ) {
			elementClasses.push( "ui-shadow-inset" );
		}

		//"search" and "text" input widgets
		if ( this.inputNeedsWrap ) {
			this.element.wrap( this._wrap() );
		} else {
			elementClasses = elementClasses.concat( this.classes );
		}

		this.element.addClass( elementClasses.join( " " ) );
	},

	widget: function() {
		return ( this.inputNeedsWrap ) ? this.element.parent() : this.element;
	},

	_classesFromOptions: function() {
		var options = this.options,
			classes = [];

		classes.push( "ui-body-" + ( ( options.theme === null ) ? "inherit" : options.theme ) );
		if ( options.corners ) {
			classes.push( "ui-corner-all" );
		}
		if ( options.mini ) {
			classes.push( "ui-mini" );
		}
		if ( options.disabled ) {
			classes.push( "ui-state-disabled" );
		}
		if ( options.wrapperClass ) {
			classes.push( options.wrapperClass );
		}

		return classes;
	},

	_wrap: function() {
		return $( "<div class='" +
			( this.isSearch ? "ui-input-search " : "ui-input-text " ) +
			this.classes.join( " " ) + " " +
			"ui-shadow-inset'></div>" );
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

		this._super( options );

		if ( !( options.disabled === undefined &&
			options.mini === undefined &&
			options.corners === undefined &&
			options.theme === undefined &&
			options.wrapperClass === undefined ) ) {

			outer.removeClass( this.classes.join( " " ) );
			this.classes = this._classesFromOptions();
			outer.addClass( this.classes.join( " " ) );
		}

		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
		}
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
		}
		if ( this.inputNeedsWrap ) {
			this.element.unwrap();
		}
		this.element.removeClass( "ui-input-text " + this.classes.join( " " ) );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
