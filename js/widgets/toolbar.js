/*!
 * jQuery Mobile Toolbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Toolbars
//>>group: Widgets
//>>description: Headers and footers
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar/
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.structure: ../css/structure/jquery.mobile.toolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"../navigation",
			"./widget.theme",
			"../zoom" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "mobile.toolbar", {
	version: "@VERSION",

	options: {
		theme: "inherit",
		addBackBtn: false,
		backBtnTheme: null,
		backBtnText: "Back",
		type: "toolbar",
		ariaRole: null
	},

	_create: function() {
		var leftbutton, rightbutton,
			role =  this.options.type,
			page = this.element.closest( ".ui-page" ),
			toolbarAriaRole = this.options.ariaRole === null ?
				role === "header" ? "banner" :
				( role === "footer" ? "contentinfo" : "toolbar" ) :
				this.options.ariaRole;
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
		this.element.attr( "role", toolbarAriaRole );
		this._addClass( "ui-toolbar" + ( role !== "toolbar" ? "-" + role : "" ) );
		this.refresh();
		this._setOptions( this.options );
	},
	_setOptions: function( o ) {
		if ( o.addBackBtn ) {
			this._updateBackButton();
		}
		if ( o.backBtnText !== undefined ) {
			this.element
				.find( ".ui-toolbar-back-button .ui-button-text" ).text( o.backBtnText );
		}

		this._super( o );
	},
	refresh: function() {
		if ( !this.page ) {
			this._setRelative();
			if ( this.role === "footer" ) {
				this.element.appendTo( "body" );
			} else if ( this.role === "header" ) {
				this._updateBackButton();
			}
		}
		this._addHeadingClasses();
	},

	//We only want this to run on non fixed toolbars so make it easy to override
	_setRelative: function() {
		$( "[data-" + $.mobile.ns + "role='page']" ).css( { "position": "relative" } );
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
						"class='ui-button ui-corner-all ui-shadow ui-toolbar-header-button-left " +
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
		this.headerElements = this.element.children( "h1, h2, h3, h4, h5, h6" );
		this._addClass( this.headerElements, "ui-toolbar-title" );

		this.headerElements

			// Regardless of h element number in src, it becomes h1 for the enhanced page
			.attr( {
				"role": "heading",
				"aria-level": "1"
			} );
	},
	_destroy: function() {
		var currentTheme;

		this.headerElements.removeAttr( "role aria-level" );

		if ( this.role === "header" ) {
			if ( this.backButton ) {
				this.backButton.remove();
			}
		}

		currentTheme = this.options.theme ? this.options.theme : "inherit";
		this.element.removeAttr( "role" );
	},
	_themeElements: function() {
		var elements = [
			{
				element: this.element,
				prefix: "ui-bar-"
			}
		];
		if ( this.options.addBackBtn && this.backButton !== undefined ) {
			elements.push( {
				element: this.backButton,
				prefix: "ui-button-",
				option: "backBtnTheme"
			} );
		}
		return elements;
	}
} );

return $.widget( "mobile.toolbar", $.mobile.toolbar, $.mobile.widget.theme );

} );
