//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Custom-styled native input/buttons
//>>label: Buttons: Input or button-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.widget", "../../jquery.mobile.registry"  ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.button", {
	options: {
		theme: null,
		icon: null,
		iconpos: "left",
		iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
		corners: true,
		shadow: true,
		inline: null,
		mini: null,
		wrapperClass: null
	},

	_create: function() {
		var isInput = $el[ 0 ].tagName === "INPUT";

		$.extend( this, {
			button: null
		});

		this.refresh( true );
		this._setOptions( this.options );
	},

	_enhance: function() {
		this.element.wrap( this._button () );
		this.button = this.element.parent();

		this._on( {
			focus: function() {
				this.widget().addClass( $.mobile.focusClass );
			},

			blur: function() {
				this.widget().removeClass( $.mobile.focusClass );
			}
		});
	},

	_button: function() {
		return $("<div class='ui-btn ui-input-btn" + this.options.wrapperClass + "' >" + this.element.val() + "<div>");
	},

	widget: function() {
		return this.button;
	},

	_destroy: function() {
			this.element.insertBefore( this.button );

			this.button.remove();
	},

	_setOptions: function( options ) {
		if ( options.theme !== undefined ) {
			this.widget().removeClass( this.options.theme ).addClass( "ui-btn-" + options.theme );
		}
		if ( options.corners !== undefined ) {
			this.widget().toggleClass( "ui-corner-all", options.corners );
		}
		if ( options.shadow !== undefined ) {
			this.widget().toggleClass( "ui-shadow", options.shadow );
		}
		if ( options.inline !== undefined ) {
			this.widget().toggleClass( "ui-btn-inline", options.inline );
		}
		if ( options.mini !== undefined ) {
			this.widget().toggleClass( "ui-mini", options.mini );
		}
		if( options.iconpos !== undefined ) {
			this.widget().removeClass( "ui-btn-icon-" + options.iconpos );
		}
		if( options.icon !== undefined ) {
			if( !this.options.iconpos && !options.iconpos ){
				this.widget.toggleClass( "ui-btn-icon-left", options.icon );
			}
			this.widget().removeClass( "ui-icon-" + this.options.icon ).toggleClass( "ui-icon-" + options.icon, options.icon );
		}
	},

	refresh: function( create ) {
		var options = this.options,
			$el = this.element;

		if ( options.icon && options.iconpos === "notext" && !$el.attr( "title" ) ) {
			$el.attr( "title", ( this.isInput ? $el.val() : $el.getEncodedText() ) );
		}

		if ( !create ) {
			this.button.removeClass( this.styleClasses );
		}

		/* If the button element doesn't contain text we use the value if provided */
		if ( !this.isInput && this.button.text() === "" && !!this.button.val() ) {
			this.button.text( this.button.val() );
		}

		if ( this.isInput && !create ) {
			$( this.button )[ "text" ]( $el.val() ).append( $el );
		}
	}
});

$.mobile.button.initSelector = "type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
