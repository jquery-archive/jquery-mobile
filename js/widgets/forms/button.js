//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Custom-styled native input/buttons
//>>label: Buttons: Input or button-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.button", {

	initSelector: "input[type='button'], input[type='submit'], input[type='reset']",

	options: {
		theme: null,
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
		var options = this.options;

		return $("<div class='ui-btn ui-input-btn" +
			( options.wrapperClass ? " " + options.wrapperClass : "" ) +
			( options.theme ? " ui-btn-" + options.theme : "" ) +
			( options.corners ? " ui-corner-all" : "" ) +
			( options.shadow ? " ui-shadow" : "" ) +
			( options.inline ? " ui-btn-inline" : "" ) +
			( options.mini ? " ui-mini" : "" ) +
			( options.disabled ? " ui-state-disabled" : "" ) +
			( ( options.iconpos && options.icon ) ?
				" ui-btn-icon-" + options.iconpos :
				( options.icon ? " ui-btn-icon-left" : "" ) ) +
			( ( options.iconshadow && options.icon ) ?	/* TODO: Deprecated in 1.4, remove in 1.5. */
				" ui-shadow-icon" : "" ) +
			( options.icon ? " ui-icon-" + options.icon : "" ) +
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
		var outer = this.widget();

		if ( options.theme !== undefined ) {
			outer
				.removeClass( this.options.theme )
				.addClass( "ui-btn-" + options.theme );
		}
		if ( options.corners !== undefined ) {
			outer.toggleClass( "ui-corner-all", options.corners );
		}
		if ( options.shadow !== undefined ) {
			outer.toggleClass( "ui-shadow", options.shadow );
		}
		if ( options.inline !== undefined ) {
			outer.toggleClass( "ui-btn-inline", options.inline );
		}
		if ( options.mini !== undefined ) {
			outer.toggleClass( "ui-mini", options.mini );
		}
		if ( options.iconpos !== undefined ) {
			outer.removeClass( "ui-btn-icon-" + options.iconpos );
		}
		if ( options.iconshadow !== undefined ) {	/* TODO: Deprecated in 1.4, remove in 1.5. */
			outer.toggleClass( "ui-shadow-icon", options.iconshadow );
		}
		if ( options.icon !== undefined ) {
			if ( !this.options.iconpos && !options.iconpos ) {
				outer.toggleClass( "ui-btn-icon-left", options.icon );
			}
			outer
				.removeClass( "ui-icon-" + this.options.icon )
				.toggleClass( "ui-icon-" + options.icon, options.icon );
		}
		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", options.disabled );
			outer.toggleClass( "ui-state-disabled", options.disabled );
		}

		this._super( options );
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

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
