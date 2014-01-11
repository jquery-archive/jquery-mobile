//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior for "fixed" headers and footers - be sure to also include the item 'Browser specific workarounds for "fixed" headers and footers' when supporting Android 2.x or iOS 5
//>>label: Toolbars: Fixed
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../jquery.mobile.widget",
	"../jquery.mobile.core",
	"../jquery.mobile.navigation",
	"../jquery.mobile.zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.toolbar", {
		initSelector: ":jqmData(role='footer'), :jqmData(role='header')",

		options: {
			theme: null,
			addBackBtn: false,
			backBtnTheme: null,
			backBtnText: "Back"
		},

		_create: function() {
			var leftbtn, rightbtn,
				role =  this.element.is( ":jqmData(role='header')" ) ? "header" : "footer",
				page = this.element.closest( ".ui-page" );
			if ( page.length === 0 ) {
				page = false;
				this._on( this.document, {
					"pageshow": "refresh"
				});
			}
			$.extend( this, {
				role: role,
				page: page,
				leftbtn: leftbtn,
				rightbtn: rightbtn,
				backBtn: null
			});
			this.element.attr( "role", role === "header" ? "banner" : "contentinfo" ).addClass( "ui-" + role );
			this.refresh();
			this._setOptions( this.options );
		},
		_setOptions: function( o ) {
			if ( o.addBackBtn !== undefined ) {
				if ( this.options.addBackBtn &&
					this.role === "header" &&
					$( ".ui-page" ).length > 1 &&
					this.page[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) !== $.mobile.path.stripHash( location.hash ) &&
					!this.leftbtn ) {
						this._addBackButton();
				} else {
					this.element.find( ".ui-toolbar-back-btn" ).remove();
				}
			}
			if ( o.backBtnTheme != null ) {
				this.element
					.find( ".ui-toolbar-back-btn" )
					.addClass( "ui-btn ui-btn-" + o.backBtnTheme );
			}
			if ( o.backBtnText !== undefined ) {
				this.element.find( ".ui-toolbar-back-btn .ui-btn-text" ).text( o.backBtnText );
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
				}
			}
			this._addHeadingClasses();
			this._btnMarkup();
		},

		//we only want this to run on non fixed toolbars so make it easy to override
		_setRelative: function() {
			$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
		},

		// Deprecated in 1.4. As from 1.5 button classes have to be present in the markup.
		_btnMarkup: function() {
			this.element
				.children( "a" )
				.filter( ":not([data-" + $.mobile.ns + "role='none'])" )
				.attr( "data-" + $.mobile.ns + "role", "button" );
			this.element.trigger( "create" );
		},
		// Deprecated in 1.4. As from 1.5 ui-btn-left/right classes have to be present in the markup.
		_addHeaderButtonClasses: function() {
			var $headeranchors = this.element.children( "a, button" );
			this.leftbtn = $headeranchors.hasClass( "ui-btn-left" );
			this.rightbtn = $headeranchors.hasClass( "ui-btn-right" );

			this.leftbtn = this.leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;

			this.rightbtn = this.rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;

		},
		_addBackButton: function() {
			var theme,
				options = this.options;

			if ( !this.backBtn ) {
				theme = options.backBtnTheme || options.theme;
				this.backBtn = $( "<a role='button' href='javascript:void(0);' " +
					"class='ui-btn ui-corner-all ui-shadow ui-btn-left " +
						( theme ? "ui-btn-" + theme + " " : "" ) +
						"ui-toolbar-back-btn ui-icon-carat-l ui-btn-icon-left' " +
					"data-" + $.mobile.ns + "rel='back'>" + options.backBtnText + "</a>" )
						.prependTo( this.element );
			}
		},
		_addHeadingClasses: function() {
			this.element.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"role": "heading",
					"aria-level": "1"
				});
		}
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
