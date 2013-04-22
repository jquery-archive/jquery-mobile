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
		iconshadow: true,
		corners: true,
		shadow: true,
		inline: null,
		mini: null
	},

	_create: function() {
		var $button,
			o = this.options,
			$el = this.element,
			classes = "ui-btn";

		o.disabled = $el.prop( "disabled" );
		o = splitOptions( o );
		
		if ( !o.theme ) {
			 o.theme = "a";
		}
		
		classes += " ui-btn-" + o.theme;
		if ( o.corners ) {
			classes += " ui-btn-corner-all";
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
			if ( o.iconshadow ) {
				classes += " ui-shadow-icon";
			}
		}
		
		if ( $el[ 0 ].tagName.toLowerCase() === "input" ) {
			var input = true;
		}
		
		if ( input ) {
			// TODO: Wwe have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
			/* if ( $el[0].className.length ) {
				classes = $el[0].className;
			} */
			if ( !!~$el[ 0 ].className.indexOf( "ui-btn-left" ) ) {
				classes += " ui-btn-left";
			}
	
			if ( !!~$el[ 0 ].className.indexOf( "ui-btn-right" ) ) {
				classes += " ui-btn-right";
			}
	
			if ( $el.attr( "type" ) === "submit" || $el.attr( "type" ) === "reset" ) {
				classes += " ui-submit";
			}
			$( "label[for='" + $el.attr( "id" ) + "']" ).addClass( "ui-submit" );

			this.button = $( "<div></div>" )
				[ "text" ]( $el.val() )
				.insertBefore( $el )
				.addClass( classes )
				.append( $el.addClass( "ui-btn-hidden" ) );
				
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
			
		this._setOption( "disabled", o.widget.disabled );

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

$.mobile.button.initSelector = "a:jqmData(role='button'), button, [type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
