/*!
 * jQuery Mobile Page @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Page Creation
//>>group: Core
//>>description: Basic page definition and formatting.
//>>docs: http://api.jquerymobile.com/page/
//>>demos: http://demos.jquerymobile.com/@VERSION/pages/
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"widgets/enhancer",
			"widgets/enhancer.backcompat",
			"widgets/enhancer.widgetCrawler" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "mobile.page", {
	version: "@VERSION",

	options: {
		classes: {},
		theme: "a",
		domCache: false,

		enhanceWithin: true,
		enhanced: false
	},

	_create: function() {

		// If false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		if ( !this.options.enhanced ) {
			this._enhance();
		}

		this._on( this.element, {
			pagebeforehide: "_handlePageBeforeHide",
			pagebeforeshow: "_handlePageBeforeShow"
		} );

		if ( this.options.enhanceWithin ) {
			this.element.enhanceWithin();
		}
	},

	_enhance: function() {
		if ( this.options.role ) {
			this.element.attr( "data-" + $.mobile.ns + "role", this.options.role );
		}

		this.element.attr( "tabindex", "0" );
		this._addClass( "ui-page", "ui-page-theme-" + this.options.theme );
	},

	bindRemove: function( callback ) {
		var page = this.element;

		// When dom caching is not enabled or the page is embedded bind to remove the page on hide
		if ( !page.data( "mobile-page" ).options.domCache &&
				page.is( ":jqmData(external-page='true')" ) ) {

			// TODO use _on - that is, sort out why it doesn't work in this case
			page.bind( "pagehide.remove", callback || function( e, data ) {

					// Check if this is a same page transition and if so don't remove the page
					if ( !data.samePage ) {
						var $this = $( this ),
							prEvent = new $.Event( "pageremove" );

						$this.trigger( prEvent );

						if ( !prEvent.isDefaultPrevented() ) {
							$this.removeWithDependents();
						}
					}
				} );
		}
	},

	_setOption: function( optionKey, optionValue ) {
		if ( optionKey === "theme" ) {
			this._removeClass( null, "ui-page-theme-" + this.options.theme )
				._addClass( null, "ui-page-theme-" + optionValue );
		}
		return this._superApply( arguments );
	},

	_handlePageBeforeShow: function( /* e */ ) {
		this._setContainerSwatch( this.options.theme );
	},

	_handlePageBeforeHide: function() {
		this._setContainerSwatch( "none" );
	},

	_setContainerSwatch: function( swatch ) {
		var pagecontainer = this.element.parent().pagecontainer( "instance" );

		if ( pagecontainer ) {
			pagecontainer.option( "theme", swatch );
		}
	}
} );

return $.mobile.page;

} );
