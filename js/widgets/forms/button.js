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
		iconpos: null,
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

	refresh: function( create ) {
		var o = this.options,
			$el = this.element,
			classes = "";

		if ( o.theme ) {
			 classes += "ui-btn-" + o.theme;
		}

		if ( o.corners ) {
			classes += " ui-corner-all";
		}
		if ( o.shadow ) {
			classes += " ui-shadow";
		}
		if ( o.inline ) {
			classes += " ui-btn-inline";
		}
		if ( o.mini ) {
			classes += " ui-mini";
		}

		if ( o.icon ) {
			if ( !o.iconpos ) {
				o.iconpos = "left";
			}

			classes += " ui-icon-" + o.icon + " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos === "notext" && !$el.attr( "title" ) ) {
				$el.attr( "title", ( this.isInput ? $el.val() : $el.getEncodedText() ) );
			}

			/* TODO: Remove in 1.5. */
			if ( o.iconshadow ) {
				classes += " ui-shadow-icon";
			}
		}

		if ( !create ) {
			this.button.removeClass( this.styleClasses );
		}

		this.styleClasses = classes;

		this.button.addClass( classes );

		/* If the button element doesn't contain text we use the value if provided */
		if ( !this.isInput && this.button.text() === "" && !!this.button.val() ) {
			this.button.text( this.button.val() );
		}

		if ( this.isInput && !create ) {
			$( this.button )[ "text" ]( $el.val() ).append( $el );
		}

		this._setOption( "disabled", $el.prop( "disabled" ) );
	}
});

$.mobile.button.initSelector = "button, [type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
