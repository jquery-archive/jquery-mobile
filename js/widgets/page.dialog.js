//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Styles a page as a modal dialog with inset appearance and overlay background
//>>label: Dialog styling
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.dialog.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../jquery.mobile.widget",
	"./page",
	"../jquery.mobile.navigation" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.widget( "mobile.page", $.mobile.page, {
	options: {

		// Accepts left, right and none
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true,
		dialog: false
	},

	_create: function() {
		this._super();
		if ( this.options.dialog ) {

			$.extend( this, {
				_inner: this.element.children(),
				_headerCloseButton: null
			});

			if ( !this.options.enhanced ) {
				this._setCloseBtn( this.options.closeBtn );
			}
		}
	},

	_enhance: function() {
		this._super();

		// Class the markup for dialog styling and wrap interior
		if ( this.options.dialog ) {
			this.element.addClass( "ui-dialog" )
				.wrapInner( $( "<div/>", {

					// ARIA role
					"role" : "dialog",
					"class" : "ui-dialog-contain ui-overlay-shadow" +
						( this.options.corners ? " ui-corner-all" : "" )
				}));
		}
	},

	_setOptions: function( options ) {
		var closeButtonLocation, closeButtonText,
			currentOpts = this.options;

		if ( options.corners !== undefined ) {
			this._inner.toggleClass( "ui-corner-all", !!options.corners );
		}

		if ( options.overlayTheme !== undefined ) {
			if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {
				currentOpts.overlayTheme = options.overlayTheme;
				this._handlePageBeforeShow();
			}
		}

		if ( options.closeBtnText !== undefined ) {
			closeButtonLocation = currentOpts.closeBtn;
			closeButtonText = options.closeBtnText;
		}

		if ( options.closeBtn !== undefined ) {
			closeButtonLocation = options.closeBtn;
		}

		if ( closeButtonLocation ) {
			this._setCloseBtn( closeButtonLocation, closeButtonText );
		}

		this._super( options );
	},

	_handlePageBeforeShow: function () {
		if ( this.options.overlayTheme && this.options.dialog ) {
			this.removeContainerBackground();
			this.setContainerBackground( this.options.overlayTheme );
		} else {
			this._super();
		}
	},

	_setCloseBtn: function( location, text ) {
		var dst,
			btn = this._headerCloseButton;

		// Sanitize value
		location = "left" === location ? "left" : "right" === location ? "right" : "none";

		if ( "none" === location ) {
			if ( btn ) {
				btn.remove();
				btn = null;
			}
		} else if ( btn ) {
			btn.removeClass( "ui-btn-left ui-btn-right" ).addClass( "ui-btn-" + location );
			if ( text ) {
				btn.text( text );
			}
		} else {
			dst = this._inner.find( ":jqmData(role='header')" ).first();
			btn = $( "<a></a>", {
					"href": "#",
					"class": "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-" + location
				})
				.attr( "data-" + $.mobile.ns + "rel", "back" )
				.text( text || this.options.closeBtnText || "" )
				.prependTo( dst );
		}

		this._headerCloseButton = btn;
	}
});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
