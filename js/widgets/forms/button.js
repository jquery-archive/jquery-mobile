//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Custom-styled native input/buttons
//>>label: Buttons: Input or button-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.widget", "../../jquery.mobile.buttonMarkup", "../../jquery.mobile.registry"  ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

function splitOptions( o ) {
	var key, ret = { btn: {}, widget: {} };

	for ( key in o ) {
		if ( o[ key ] !== null ) {
			if ( key === "disabled" ) {
				ret.widget.disabled = o[ key ];
				ret.haveWidget = true;
			} else if ( key !== "initSelector" ) {
				ret.btn[ key ] = o[ key ];
				ret.haveBtn = true;
			}
		}
	}

	return ret;
}

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		corners: true,
		shadow: true,
		iconshadow: true,
		inline: null,
		mini: null
	},

	_create: function() {
		var $button,
			o = this.options,
			$el = this.element,
			classes = "";

		// if this is a link, check if it's been enhanced and, if not, use the right function
		if ( $el[ 0 ].tagName === "A" ) {
			if ( !$el.hasClass( "ui-btn" ) ) {
				$el.buttonMarkup();
			}
			return;
		}

		// get the inherited theme
		// TODO centralize for all widgets
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( $el, "c" );
		}
		o.disabled = $el.prop( "disabled" );
		o = splitOptions( o );

		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~$el[ 0 ].className.indexOf( "ui-btn-left" ) ) {
			classes = "ui-btn-left";
		}

		if ( !!~$el[ 0 ].className.indexOf( "ui-btn-right" ) ) {
			classes = "ui-btn-right";
		}

		if ( $el.attr( "type" ) === "submit" || $el.attr( "type" ) === "reset" ) {
			if ( classes ) {
				classes += " ui-submit";
			} else {
				classes = "ui-submit";
			}
		}
		$( "label[for='" + $el.attr( "id" ) + "']" ).addClass( "ui-submit" );

		// Add ARIA role
		this.button = $( "<div></div>" )
			[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() )
			.insertBefore( $el )
			.buttonMarkup( o.btn )
			.addClass( classes )
			.append( $el.addClass( "ui-btn-hidden" ) );
		this._setOption( "disabled", o.widget.disabled );

		$button = this.button;

		this._on( $el, {
			focus: function() {
				$button.addClass( $.mobile.focusClass );
			},

			blur: function() {
				$button.removeClass( $.mobile.focusClass );
			}
		});
	},

	widget: function() {
		return this.button;
	},

	_destroy: function() {
		var b = this.button;
		this.element.insertBefore( b );
		b.remove();
	},

	_setOptions: function( o ) {
		o = splitOptions( o );

		// Resolve the buttonMarkup options
		if ( o.haveBtn ) {
			this.button.buttonMarkup( o.btn );
		}

		// ... and pass the rest up
		if ( o.haveWidget ) {
			this._super( o.widget );
		}
	},

	_setOption: function( key, value ) {
		var op = {};

		op[ key ] = value;
		if ( key === "disabled" ) {
			value = !!value;
			this.element.prop( "disabled", value );
			// FIXME: We should be using ui-state-disabled, so we can get rid of this line
			this.button.toggleClass( "ui-disabled", value );
		} else if ( key !== "initSelector" ) {
			this.button.buttonMarkup( op );
			// Record the option change in the options and in the DOM data-* attributes
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		}
		this._super( key, value );
	},

	refresh: function() {
		var $el = this.element;

		this._setOption( "disabled", $el.prop( "disabled" ) );

		// Grab the button's text element from its implementation-independent data item
		$( this.button.data( "buttonElements" ).text )[ $el.html() ? "html" : "text" ]( $el.html() || $el.val() );
	}
});

$.mobile.button.initSelector = "button, [type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
