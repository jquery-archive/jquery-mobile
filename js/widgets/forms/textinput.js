/*!
 * jQuery Mobile Textinput @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Text Inputs & Textareas
//>>group: Forms
//>>description: Enhances and consistently styles text inputs.
//>>docs: http://api.jquerymobile.com/textinput/
//>>demos: http://demos.jquerymobile.com/@VERSION/textinput/
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"../../degradeInputs",
			"../widget.theme",
			"../../zoom" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "mobile.textinput", {
	version: "@VERSION",

	options: {
		classes: {
			"ui-textinput": "ui-corner-all ui-shadow-inset",
			"ui-textinput-search-icon": "ui-icon ui-alt-icon ui-icon-search"
		},

		theme: "inherit",

		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		enhanced: false
	},

	_create: function() {

		var options = this.options,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = this.element[ 0 ].nodeName.toLowerCase() === "textarea";

		if ( this.element.prop( "disabled" ) ) {
			options.disabled = true;
		}

		$.extend( this, {
			isSearch: isSearch,
			isTextarea: isTextarea
		} );

		this._autoCorrect();

		if ( !options.enhanced ) {
			this._enhance();
		} else {
			this._outer = ( isTextarea ? this.element : this.element.parent() );
			if ( isSearch ) {
				this._searchIcon = this._outer.children( ".ui-textinput-search-icon" );
			}
		}

		this._addClass( this._outer,
			"ui-textinput ui-textinput-" + ( this.isSearch ? "search" : "text" ) );

		if ( this._searchIcon ) {
			this._addClass( this._searchIcon, "ui-textinput-search-icon" );
		}

		this._on( {
			"focus": "_handleFocus",
			"blur": "_handleBlur"
		} );

		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
			this._toggleClass( this._outer, null, "ui-state-disabled", !!options.disabled );
		}

	},

	refresh: function() {
		this._setOptions( {
			"disabled": this.element.is( ":disabled" )
		} );
	},

	_themeElements: function() {
		return [
			{
				element: this._outer,
				prefix: "ui-body-"
			}
		];
	},

	_enhance: function() {
		var outer;

		if ( !this.isTextarea ) {
			outer = $( "<div>" );
			if ( this.isSearch ) {
				this._searchIcon = $( "<span>" ).prependTo( outer );
			}
		} else {
			outer = this.element;
		}

		this._outer = outer;

		// Now that we're done building up the wrapper, wrap the input in it
		if ( !this.isTextarea ) {
			outer.insertBefore( this.element ).append( this.element );
		}
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
		if ( typeof this.element[ 0 ].autocorrect !== "undefined" &&
				!$.support.touchOverflow ) {

			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			this.element[ 0 ].setAttribute( "autocorrect", "off" );
			this.element[ 0 ].setAttribute( "autocomplete", "off" );
		}
	},

	_handleBlur: function() {
		this._removeClass( this._outer, null, "ui-focus" );
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
		this._addClass( this._outer, null, "ui-focus" );
	},

	_setOptions: function( options ) {
		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
			this._toggleClass( this._outer, null, "ui-state-disabled", !!options.disabled );
		}
		return this._superApply( arguments );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			this.classesElementLookup = {};
			return;
		}
		if ( this._searchIcon ) {
			this._searchIcon.remove();
		}
		if ( !this.isTextarea ) {
			this.element.unwrap();
		}
	}
} );

return $.widget( "mobile.textinput", $.mobile.textinput, $.mobile.widget.theme );

} );
