//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget",
	"../../degradeInputs",
	"../optionsToClasses",
	"../../zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var styleOptions = {
	corners: true,
	mini: false
};

$.widget( "mobile.textinput", $.extend( {
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

	options: $.extend({
		classes: {
			"ui-textinput": "ui-corner-all ui-shadow-inset",
			"ui-textinput-text": null,
			"ui-textinput-search": null
		},
		theme: null,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		wrapperClass: "",
		enhanced: false
	}, styleOptions ),

	_create: function() {

		var options = this.options,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = this.element[ 0 ].tagName === "TEXTAREA",
			isRange = this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='range']" ),
			inputNeedsWrap = ( (this.element.is( "input" ) ||
				this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='search']" ) ) &&
					!isRange );

		// Deprecated as of 1.5.0 - remove in 1.6.0
		// Sync classes option to modified style option values
		this._updateClassesOption( styleOptions, this.options );

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

	},

	refresh: function() {
		this.setOptions({
			"disabled" : this.element.is( ":disabled" )
		});
	},

	_enhance: function() {

		//"search" and "text" input widgets
		if ( this.inputNeedsWrap ) {
			this.element.wrap( this._wrap() );
		} else {
			this.element.addClass( this._getClasses() );
		}
	},

	_getClasses: function() {
		return ( this._classes( "ui-textinput " +
			( this.isSearch ? "ui-textinput-search" : "ui-textinput-text" ) ) + " " +
			"ui-body-" + ( ( this.options.theme === null ) ? "inherit" : this.options.theme ) );
	},

	widget: function() {
		return ( this.inputNeedsWrap ) ? this.element.parent() : this.element;
	},

	_wrap: function() {
		return $( "<div class='" + this._getClasses() + "'>" );
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

	// DEPRECATED as of 1.5.0. Update the class keys of the classes option to reflect the new value
	// of the various options
	_optionsToClasses: function( oldOptions, newOptions ) {
		var updateClasses,
			classesToAdd = {},
			classesToRemove = {};

		if ( newOptions.wrapperClass !== undefined ) {
			updateClasses = true;
			classesToRemove = this._convertClassesToHash( oldOptions.wrapperClass );
			classesToAdd = this._convertClassesToHash( newOptions.wrapperClass );
		}

		if ( updateClasses ||
			this._booleanOptionToClass( newOptions.corners, "ui-corner-all",
				classesToRemove, classesToAdd ) ||
			this._booleanOptionToClass( newOptions.mini, "ui-mini",
				classesToRemove, classesToAdd ) ) {

			this.options.classes[ "ui-textinput" ] =
				this._calculateClassKeyValue( this.options.classes[ "ui-textinput" ],
					classesToRemove, classesToAdd );
		}
	},

	_setOptions: function ( options ) {
		var oldClasses = this._getClasses(),
			outer = this.widget();

		// Calling this._optionsToClasses() is deprecated as of 1.5.0 and will be removed in 1.6.0
		// along with the style options.
		this._optionsToClasses( this.options, options );

		this._super( options );

		outer.removeClass( oldClasses ).addClass( this._getClasses() );

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
		} else {
			this.element.removeClass( this._classes( "ui-textinput ui-textinput-text" ) );
		}
	}
}, $.mobile.behaviors._optionsToClasses ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
