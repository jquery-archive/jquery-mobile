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
		var options = this.options,
			iconClasses = this._getIconClasses( this.options );

		return $("<div class='ui-btn ui-input-btn" +
			( options.wrapperClass ? " " + options.wrapperClass : "" ) +
			( options.theme ? " ui-btn-" + options.theme : "" ) +
			( options.corners ? " ui-corner-all" : "" ) +
			( options.shadow ? " ui-shadow" : "" ) +
			( options.inline ? " ui-btn-inline" : "" ) +
			( options.mini ? " ui-mini" : "" ) +
			( options.disabled ? " ui-state-disabled" : "" ) +
			( iconClasses ? ( " " + iconClasses ) : "" ) +
			"' >" + this.element.val() + "</div>" );
	},

	widget: function() {
		return this.wrapper;
	},

	_destroy: function() {
			this.element.insertBefore( this.wrapper );
			this.wrapper.remove();
	},

	_getIconClasses: function( options ) {
		return ( options.icon ? ( "ui-icon-" + options.icon +
			( options.iconshadow ? " ui-shadow-icon" : "" ) + /* TODO: Deprecated in 1.4, remove in 1.5. */
			" ui-btn-icon-" + options.iconpos ) : "" );
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
		if ( options.disabled !== undefined ) {
			this.element.prop( "disabled", options.disabled );
			outer.toggleClass( "ui-state-disabled", options.disabled );
		}

		if ( options.icon !== undefined ||
				options.iconshadow !== undefined || /* TODO: Deprecated in 1.4, remove in 1.5. */
				options.iconpos !== undefined ) {
			outer
				.removeClass( this._getIconClasses( this.options ) )
				.addClass( this._getIconClasses(
					$.extend( {}, this.options, options ) ) );
		}

		this._super( options );
	},

	refresh: function( create ) {
		var originalElement,
			isDisabled = this.element.prop( "disabled" );

		if ( this.options.icon && this.options.iconpos === "notext" && this.element.attr( "title" ) ) {
			this.element.attr( "title", this.element.val() );
		}
		if ( !create ) {
			originalElement = this.element.detach();
			$( this.wrapper ).text( this.element.val() ).append( originalElement );
		}
		if ( this.options.disabled !== isDisabled ) {
			this._setOptions({ disabled: isDisabled });
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
