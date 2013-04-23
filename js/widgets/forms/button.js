//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Custom-styled native input/buttons
//>>label: Buttons: Input or button-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.widget", "../../jquery.mobile.registry"  ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.button", $.mobile.widget, {
	options: {
		theme: null,
		icon: null,
		iconpos: null,
		iconshadow: true,
		corners: true,
		shadow: true,
		inline: null,
		mini: null,
		disabled: false
	},

	_create: function() {
		var $button,
			$el = this.element,
			isInput = $el[ 0 ].tagName === "INPUT",
			classes = "ui-btn";
			
		if ( isInput ) {
			// TODO: When we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
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
		if ( this.isInput ) {
			var $button = this.button;
			
			this.element.insertBefore( $button );
			
			$button.remove();
		} else {
			var removeClasses = this.buttonClasses + " " + this.styleClasses;
			
			this.button.removeClass( removeClasses );
		}
	},

	disable: function() {
		return this._setOption( "disabled", true );
	},
	
	enable: function() {
		return this._setOption( "disabled", false );
	},

	refresh: function( create ) {
		var o = this.options,
			$el = this.element,
			classes = "";

		if ( !o.theme ) {
			 o.theme = "a";
		}
		classes += "ui-btn-" + o.theme;

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
			
			if ( o.iconpos === "notext" && !$el.attr( "title" ) ) {
				var text = this.isInput ? $el.val() : $el.getEncodedText();
				
				$el.attr( "title", text );
			}
			
			if ( o.iconshadow ) {
				classes += " ui-shadow-icon";
			}
		}

		if ( !create ) {
			this.button.removeClass( this.styleClasses );
		}

		this.styleClasses = classes;
		
		this.button.addClass( classes );
		
		if ( this.isInput && !create ) {
			$( this.button )[ "text" ]( $el.val() ).append( $el );
		}
		
		this._setOption( "disabled", $el.prop( "disabled" ) );
	}
});

$.mobile.button.initSelector = "a:jqmData(role='button'), button, [type='button'], [type='submit'], [type='reset']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.button" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
