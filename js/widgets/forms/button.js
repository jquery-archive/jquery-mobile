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
		theme: "inherit",
		icon: null,
		iconpos: "left",
		iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
		corners: true,
		shadow: true,
		inline: null,
		mini: null,
		wrapperClass: null,
		enhanced: false
	},

	_create: function() {

		if ( this.element.is( ":disabled" ) ) {
			this.options.disabled = true;
		}

		if ( !this.options.enhanced ) {
			this._enhance();
		}

		$.extend( this, {
			wrapper: this.element.parent()
		});

		this._on( {
			focus: function() {
				this.widget().addClass( $.mobile.focusClass );
			},

			blur: function() {
				this.widget().removeClass( $.mobile.focusClass );
			}
		});
		
		this.refresh( true );
	},

	_enhance: function() {
		this.element.wrap( this._button() );
	},

	_button: function() {
		return $("<div class='ui-btn ui-input-btn " +
			this.options.wrapperClass +
			" ui-btn-" + this.options.theme +
			( this.options.corners ? " ui-corner-all" : "" ) +
			( this.options.shadow ? " ui-shadow" : "" ) +
			( this.options.inline ? " ui-btn-inline" : "" ) +
			( this.options.mini ? " ui-mini" : "" ) +
			( this.options.disabled ? " ui-disabled" : "" ) +
			( this.options.iconpos ? " ui-btn-icon-" + this.options.iconpos : ( this.options.icon ? " ui-btn-icon-left" : "" ) ) +
			( this.options.icon ? "ui-icon-" + this.options.icon : "" ) +
			"' >" + this.element.val() + "</div>");
	},

	widget: function() {
		return this.wrapper;
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
		if ( options.iconpos !== undefined ) {
			this.widget().removeClass( "ui-btn-icon-" + options.iconpos );
		}
		if ( options.icon !== undefined ) {
			if ( !this.options.iconpos && !options.iconpos ) {
				this.widget.toggleClass( "ui-btn-icon-left", options.icon );
			}
			this.widget().removeClass( "ui-icon-" + this.options.icon ).toggleClass( "ui-icon-" + options.icon, options.icon );
		}
	},

	refresh: function( create ) {
		if ( this.options.icon && this.options.iconpos === "notext" && this.element.attr( "title" ) ) {
			this.element.attr( "title", this.element.val() );
		}
		if ( !create ) {
			var originalElement = this.element.detach();
			$( this.wrapper ).text( this.element.val() ).append( originalElement );
		}
	}
});

$.mobile.button.initSelector = "[type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
