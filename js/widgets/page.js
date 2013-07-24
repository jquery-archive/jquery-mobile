//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Basic page definition and formatting.
//>>label: Page Creation
//>>group: Core

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.core", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.page", {
	options: {
		theme: "a",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')",
		contentTheme: null
	},

	// DEPRECATED for > 1.4
	// TODO remove at 1.5
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( "init" );
	},

	_create: function() {
		var attrPrefix = "data-" + $.mobile.ns,
			self = this;
		// if false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		if ( this.options.role ) {
			this.element.attr( "data-" + $.mobile.ns + "role", this.options.role );
		}

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-page-theme-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
		this.element.find( "[" + attrPrefix + "role='content']" ).each( function() {
			var $this = $( this ),
				theme = this.getAttribute( attrPrefix + "theme" ) || undefined;
				self.options.contentTheme = theme || self.options.contentTheme || ( self.element.jqmData("role") === "dialog" &&  self.options.theme );
				$this.addClass( "ui-content" );
				if ( self.options.contentTheme ) {
					$this.addClass( "ui-body-" + ( self.options.contentTheme ) );
				}
				// Add ARIA role
				$this.attr( "role", "main" ).addClass( "ui-content" );
		});

		// enhance the page
		$.mobile._enhancer.enhance( this.element[ 0 ] );
	},

	bindRemove: function( callback ) {
		var page = this.element;

		// when dom caching is not enabled or the page is embedded bind to remove the page on hide
		if ( !page.data( "mobile-page" ).options.domCache &&
			page.is( ":jqmData(external-page='true')" ) ) {

			// TODO use _on - that is, sort out why it doesn't work in this case
			page.bind( "pagehide.remove", callback || function(/* e */) {
				var $this = $( this ),
					prEvent = new $.Event( "pageremove" );

				$this.trigger( prEvent );

				if ( !prEvent.isDefaultPrevented() ) {
					$this.removeWithDependents();
				}
			});
		}
	},

	_setOptions: function( o ) {
		if ( o.theme !== undefined ) {
			this.element.removeClass( "ui-body-" + this.options.theme ).addClass( "ui-body-" + o.theme );
		}

		if ( o.contentTheme !== undefined ) {
			this.element.find( "[data-" + $.mobile.ns + "='content']" ).removeClass( "ui-body-" + this.options.contentTheme )
				.addClass( "ui-body-" + o.contentTheme );
		}
	},

	_handlePageBeforeShow: function(/* e */) {
		this.setContainerBackground();
	},

	removeContainerBackground: function() {
		var classes = ( $.mobile.pageContainer.attr( "class" ) || "" ).split( " " ),
			overlayTheme = null,
			matches;

		while ( classes.length > 0 ) {
			overlayTheme = classes.pop();
			matches = ( new RegExp( "^ui-overlay-([a-z])$" ) ).exec( overlayTheme );
			if ( matches && matches.length > 1 ) {
				overlayTheme = matches[ 1 ];
				break;
			} else {
				overlayTheme = null;
			}
		}

		$.mobile.pageContainer.removeClass( "ui-overlay-" + overlayTheme );
	},

	// set the page container background to the page theme
	setContainerBackground: function( theme ) {
		if ( this.options.theme ) {
			$.mobile.pageContainer.addClass( "ui-overlay-" + ( theme || this.options.theme ) );
		}
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim( options.keepNative );

		if ( keepNativeDefined && options.keepNative !== options.keepNativeDefault ) {
			return [options.keepNative, options.keepNativeDefault].join( ", " );
		}

		return options.keepNativeDefault;
	}
});
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
