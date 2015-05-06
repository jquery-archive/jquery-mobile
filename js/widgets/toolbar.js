/*!
 * jQuery Mobile Toolbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Toolbars: Fixed
//>>group: Widgets
//>>description: Headers and footers
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar/
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"../navigation",
			"../zoom" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.toolbar", {
	version: "@VERSION",

	initSelector: ":jqmData(role='footer'), :jqmData(role='header')",

	options: {
		theme: null,
		addBackBtn: false,
		backBtnTheme: null,
		backBtnText: "Back"
	},

	_create: function() {
		var leftbutton, rightbutton,
			role = this.element.is( ":jqmData(role='header')" ) ? "header" : "footer",
			page = this.element.closest( ".ui-page" );
		if ( page.length === 0 ) {
			page = false;
			this._on( this.document, {
				"pageshow": "refresh"
			} );
		}
		$.extend( this, {
			role: role,
			page: page,
			leftbutton: leftbutton,
			rightbutton: rightbutton
		} );
		this.element.attr( "role", role === "header" ? "banner" : "contentinfo" ).addClass( "ui-" + role );
		this.refresh();
		this._setOptions( this.options );
	},
	_setOptions: function( o ) {
		if ( o.addBackBtn !== undefined ) {
			this._updateBackButton();
		}
		if ( o.backBtnTheme != null ) {
			this.element
				.find( ".ui-toolbar-back-button" )
					.addClass( "ui-button ui-button-" + o.backBtnTheme );
		}
		if ( o.backBtnText !== undefined ) {
			this.element.find( ".ui-toolbar-back-button .ui-button-text" ).text( o.backBtnText );
		}
		if ( o.theme !== undefined ) {
			var currentTheme = this.options.theme ? this.options.theme : "inherit",
				newTheme = o.theme ? o.theme : "inherit";

			this.element.removeClass( "ui-bar-" + currentTheme ).addClass( "ui-bar-" + newTheme );
		}

		this._super( o );
	},
	refresh: function() {
		if ( this.role === "header" ) {
			this._addHeaderButtonClasses();
		}
		if ( !this.page ) {
			this._setRelative();
			if ( this.role === "footer" ) {
				this.element.appendTo( "body" );
			} else if ( this.role === "header" ) {
				this._updateBackButton();
			}
		}
		this._addHeadingClasses();
		this._buttonMarkup();
	},

	//we only want this to run on non fixed toolbars so make it easy to override
	_setRelative: function() {
		$( "[data-" + $.mobile.ns + "role='page']" ).css( { "position": "relative" } );
	},

	// Deprecated in 1.4. As from 1.5 button classes have to be present in the markup.
	_buttonMarkup: function() {
		this.element
			.children( "a" )
				.filter( ":not([data-" + $.mobile.ns + "role='none'])" )
					.attr( "data-" + $.mobile.ns + "role", "button" );
		this.element.enhanceWithin();
	},
	// Deprecated in 1.4. As from 1.5 ui-button-left/right classes have to be present in the markup.
	_addHeaderButtonClasses: function() {
		var headerAnchors = this.element.children( "a, button" );

		// Do not mistake a back button for a left toolbar button
		this.leftbutton = headerAnchors.hasClass( "ui-button-left" ) &&
			!headerAnchors.hasClass( "ui-toolbar-back-button" );

		this.rightbutton = headerAnchors.hasClass( "ui-button-right" );

		// Filter out right buttons and back buttons
		this.leftbutton = this.leftbutton ||
			headerAnchors.eq( 0 )
				.not( ".ui-button-right,.ui-toolbar-back-button" )
					.addClass( "ui-button-left" )
					.length;

		this.rightbutton = this.rightbutton || headerAnchors.eq( 1 ).addClass( "ui-button-right" ).length;
	},
	_updateBackButton: function() {
		var backButton,
			options = this.options,
			theme = options.backBtnTheme || options.theme;

		// Retrieve the back button or create a new, empty one
		backButton = this._backButton = ( this._backButton || {} );

		// We add a back button only if the option to do so is on
		if ( this.options.addBackBtn &&

				// This must also be a header toolbar
				this.role === "header" &&

				// There must be multiple pages in the DOM
				$( ".ui-page" ).length > 1 &&
				( this.page ?

					// If the toolbar is internal the page's URL must differ from the hash
					( this.page[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) !==
					$.mobile.path.stripHash( location.hash ) ) :

					// Otherwise, if the toolbar is external there must be at least one
					// history item to which one can go back
					( $.mobile.navigate && $.mobile.navigate.history &&
					$.mobile.navigate.history.activeIndex > 0 ) ) &&

				// The toolbar does not have a left button
				!this.leftbutton ) {

			// Skip back button creation if one is already present
			if ( !backButton.attached ) {
				this.backButton = backButton.element = ( backButton.element ||
				$( "<a role='button' href='#' " +
					"class='ui-button ui-corner-all ui-shadow ui-button-left " +
					( theme ? "ui-button-" + theme + " " : "" ) +
					"ui-toolbar-back-button ui-icon-carat-l ui-icon-beginning' " +
					"data-" + $.mobile.ns + "rel='back'>" + options.backBtnText +
					"</a>" ) )
					.prependTo( this.element );
				backButton.attached = true;
			}

		// If we are not adding a back button, then remove the one present, if any
		} else if ( backButton.element ) {
			backButton.element.detach();
			backButton.attached = false;
		}
	},
	_addHeadingClasses: function() {
		this.element.children( "h1, h2, h3, h4, h5, h6" )
			.addClass( "ui-title" )
			// Regardless of h element number in src, it becomes h1 for the enhanced page
			.attr( {
				"role": "heading",
				"aria-level": "1"
			} );
	},
	_destroy: function() {
		var currentTheme;

		this.element.children( "h1, h2, h3, h4, h5, h6" )
			.removeClass( "ui-title" )
			.removeAttr( "role" )
			.removeAttr( "aria-level" );

		if ( this.role === "header" ) {
			this.element.children( "a, button" )
				.removeClass( "ui-button-left ui-button-right ui-button ui-shadow ui-corner-all" );
			if ( this.backButton ) {
				this.backButton.remove();
			}
		}

		currentTheme = this.options.theme ? this.options.theme : "inherit";
		this.element.removeClass( "ui-bar-" + currentTheme );

		this.element.removeClass( "ui-" + this.role ).removeAttr( "role" );
	}
} );
} );
