//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>label: Controlgroups
//>>group: Forms
//>>css.structure: ../../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../jquery.mobile.buttonMarkup",
	"forms/button",
	"../jquery.mobile.widget" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	function flipClasses( els, flCorners  ) {
		els.removeClass( "ui-controlgroup-last" )
			.buttonMarkup( { corners: false, shadow: false } )
			.eq( 0 ).buttonMarkup( { corners: flCorners[ 0 ] } )
			.end()
			.last().buttonMarkup( { corners: flCorners[ 1 ] } ).addClass( "ui-controlgroup-last" );
	}

	$.widget( "mobile.controlgroup", $.mobile.widget, {
		options: {
			shadow: false,
			excludeInvisible: false,
			type: "vertical",
			mini: false,
			initSelector: ":jqmData(role='controlgroup')"
		},

		_create: function() {
			var $el = this.element,
				ui = {
					inner: $( "<div class='ui-controlgroup-controls'></div>" ),
					legend: $( "<div role='heading' class='ui-controlgroup-label'></div>" )
				},
				grouplegend = $el.children( "legend" ),
				groupcontrols = $el.children( ".ui-controlgroup-controls" ),
				self = this;

			// Apply the proto
			$el.wrapInner( ui.inner );
			if ( grouplegend.length ) {
				ui.legend.append( grouplegend ).insertBefore( $el.children( 0 ) );
			}
			$el.addClass( "ui-btn-corner-all ui-controlgroup" );

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});

			this.refresh();
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			this._super( "_setOption", key, value );
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		},

		_setType: function( value ) {
			this.element
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + value );
			this.options.type = value;
			this.refresh();
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-shadow", value );
		},

		_setMini: function( value ) {
			this.element.toggleClass( "ui-mini", value );
		},

		refresh: function() {
			var els = this.element
				.find( ".ui-btn" + ( this.options.excludeInvisible ? ":visible" : "" ) )
				.not( '.ui-slider-handle' ),
				corners = [ true, true ];

			if ( els.length > 1 ) {
				corners = ( this.options.type === "horizontal" ? [ "left", "right" ] : [ "top", "bottom" ] );
			}

			flipClasses( els, corners );
		}
	});

	$( document ).bind( "pagecreate create", function( e )  {
		$.mobile.controlgroup.prototype.enhanceWithin( e.target, true );
	});
})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
