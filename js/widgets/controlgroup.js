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
			grouplegend = $el.children( "legend" );

		// Apply the proto
		$el.wrapInner( inner ).addClass( "ui-controlgroup" );
		if ( grouplegend.length ) {
			$( "<div role='heading' class='ui-controlgroup-label'></div>" ).append( grouplegend ).insertBefore( $el.children( 0 ) );
		}

		$.extend( this, {
			_initialRefresh: true
		});

		this._setOptions( this.options );

	},

	_init: function() {
		this.refresh();
	},

	_setOptions: function( o ) {
		var $el = this.element;

		if ( o.type !== undefined ) {
			$el
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + o.type );
			this.refresh();
		}

		if ( o.corners !== undefined ) {
			$el.toggleClass( "ui-corner-all", o.corners );
		}

		if ( o.shadow !== undefined ) {
			$el.toggleClass( "ui-shadow", o.shadow );
		}

		if ( o.mini !== undefined ) {
			$el.toggleClass( "ui-mini", o.mini );
		}

		return this._super( o );
	},

	container: function() {
		return this.element.children( ".ui-controlgroup-controls" );
	},

	refresh: function() {
		var $el = this.element,
			els = $el.find( ".ui-btn" ).not( ".ui-slider-handle" ),
			create = this._initialRefresh;
		if ( $.mobile.checkboxradio ) {
			$el.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
		}
		this._addFirstLastClasses( els, this.options.excludeInvisible ? this._getVisibles( els, create ) : els, create );
		this._initialRefresh = false;
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

$.mobile.controlgroup.initSelector = ":jqmData(role='controlgroup')";

$.mobile._enhancer.add( "mobile.controlgroup", {
	dependencies: [ "mobile.selectmenu", "mobile.button", "mobile.buttonmarkup", "mobile.checkboxradio" ]
});

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
