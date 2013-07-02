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
		mini: null
	},

	_create: function() {
		var $button,
			$el = this.element,
			isInput = $el[ 0 ].tagName === "INPUT",
			classes = "ui-btn";

		if ( isInput ) {
			classes += " ui-input-btn";

			// TODO: data-class and data-id options. See https://github.com/jquery/jquery-mobile/issues/3577
			if ( !!~$el[ 0 ].className.indexOf( "ui-btn-left" ) ) {
				classes += " ui-btn-left";
			}
			if ( !!~$el[ 0 ].className.indexOf( "ui-btn-right" ) ) {
				classes += " ui-btn-right";
			}

			this.button = $( "<div></div>" )
				[ "text" ]( $el.val() )
				.insertBefore( $el )
				.addClass( classes )
				.append( $el );

			$button = this.button;

			this._on( $el, {
				focus: function() {
					$button.addClass( $.mobile.focusClass );
				},

				blur: function() {
					$button.removeClass( $.mobile.focusClass );
				}
			});
		} else {
			this.button = $el.addClass( classes );
		}

		$.extend( this, {
			isInput: isInput,
			buttonClasses: classes,
			styleClasses: ""
		});

		this.refresh( true );
		this._setOptions( this.options );
	},

	widget: function() {
		return this.button;
	},

	_destroy: function() {
		var $button, removeClasses;
		if ( this.isInput ) {
			$button = this.button;

			this.element.insertBefore( $button );

			$button.remove();
		} else {
			removeClasses = this.buttonClasses + " " + this.styleClasses;

			this.button.removeClass( removeClasses );
		}
	},

	_setOptions: function( o ) {
		if ( o.theme !== undefined ) {
			this.widget().removeClass( this.options.theme ).addClass( "ui-btn-" + o.theme );
		}
		if ( o.corners !== undefined ) {
			this.widget().toggleClass( "ui-corner-all", o.corners );
		}
		if ( o.shadow !== undefined ) {
			this.widget().toggleClass( "ui-shadow", o.shadow );
		}
		if ( o.inline !== undefined ) {
			this.widget().toggleClass( "ui-btn-inline", o.inline );
		}
		if ( o.mini !== undefined ) {
			this.widget().toggleClass( "ui-mini", o.mini );
		}
		if( o.iconpos !== undefined ) {
			this.widget().removeClass( "ui-btn-icon-" + o.iconpos );
		}
		if( o.icon !== undefined ) {
			if( !this.options.iconpos && !o.iconpos ){
				this.widget.toggleClass( "ui-btn-icon-left", o.icon );
			}
			this.widget().removeClass( "ui-icon-" + this.options.icon ).toggleClass( "ui-icon-" + o.icon, o.icon );
		}
	},

	refresh: function( create ) {
		var o = this.options,
			$el = this.element;

		if ( o.icon && o.iconpos === "notext" && !$el.attr( "title" ) ) {
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

$.mobile.button.initSelector = "button, [type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
