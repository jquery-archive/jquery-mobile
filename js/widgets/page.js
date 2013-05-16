//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Basic page definition and formatting.
//>>label: Page Creation
//>>group: Core

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.core", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
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

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
		this.element.find("["+attrPrefix+"role='content']").each( function(){
			var $this = $( this ),
				theme = this.getAttribute( attrPrefix + "theme" ) || undefined;
				self.options.contentTheme = theme || self.options.contentTheme || ( self.element.jqmData("role") === "dialog" &&  self.options.theme );
				$this.addClass("ui-content");
				if ( self.options.contentTheme ) {
					$this.addClass( "ui-body-" + ( self.options.contentTheme ) );
				}
				// Add ARIA role
				$this.attr( "role", "main" ).addClass("ui-content");
		});

		// enhance the page
		$.mobile._enhancer.enhance( this.element[ 0 ] );
	},

	_handlePageBeforeShow: function(/* e */) {
		this.setContainerBackground();
	},

	removeContainerBackground: function() {
		var parent = this.element.parent(),
			theme = $.mobile.getAttribute( parent[ 0 ], "theme", true );
		$.mobile.pageContainer.removeClass( "ui-overlay-" + theme );
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
