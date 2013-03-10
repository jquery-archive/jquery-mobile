//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>label: Controlgroups
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../jquery.mobile.buttonMarkup",
	"./addFirstLastClasses",
	"../jquery.mobile.registry",
	"../jquery.mobile.widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.controlgroup", $.mobile.widget, $.extend( {
		options: {
			shadow: false,
			corners: true,
			excludeInvisible: true,
			type: "vertical",
			mini: false,
			initSelector: ":jqmData(role='controlgroup')"
		},

		_create: function() {
			var $el = this.element,
				inner = $( "<div class='ui-controlgroup-controls'></div>" ),
				grouplegend = $el.children( "legend" ),
				o = this.options;

			// Apply the proto
			$el.wrapInner( inner );
			if ( grouplegend.length ) {
				$( "<div role='heading' class='ui-controlgroup-label'></div>" ).append( grouplegend ).insertBefore( $el.children( 0 ) );
			}
			$el.addClass( "ui-controlgroup" );

			$.extend( this, {
				_initialRefresh: true
			});

			// This duplicates the code from the various option setters below for
			// better performance. It must be kept in sync with those setters.
			$el
				.addClass( "ui-controlgroup-" + o.type )
				.toggleClass( "ui-corner-all", o.corners )
				.toggleClass( "ui-shadow", o.shadow )
				.toggleClass( "ui-mini", o.mini );
		},

		_init: function() {
			this.refresh();
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			this._super( key, value );
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
		},

		_setType: function( value ) {
			this.element
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + value );
			this.refresh();
		},

		_setCorners: function( value ) {
			this.element.toggleClass( "ui-corner-all", value );
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-shadow", value );
		},

		_setMini: function( value ) {
			this.element.toggleClass( "ui-mini", value );
		},

		container: function() {
			return this.element.children( ".ui-controlgroup-controls" );
		},

		refresh: function() {
			var els = this.element.find( ".ui-btn" ).not( ".ui-slider-handle" ),
				create = this._initialRefresh;
			if ( $.mobile.checkboxradio ) {
				this.element.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
			}
			this._addFirstLastClasses( els, this.options.excludeInvisible ? this._getVisibles( els, create ) : els, create );
			this._initialRefresh = false;
		}
	}, $.mobile.behaviors.addFirstLastClasses ) );

	$.mobile.addEnhancementHook( "mobile-controlgroup", {
		mobile: [ "selectmenu", "button", "buttonMarkup", "checkboxradio" ]
	}, function( e ) {
		$.mobile.controlgroup.prototype.enhanceWithin( e.target, true );
	});
})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
