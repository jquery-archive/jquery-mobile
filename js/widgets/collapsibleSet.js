//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../jquery.mobile.widget",
	"./collapsible",
	"./addFirstLastClasses",
	"../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var childCollapsiblesSelector = ":mobile-collapsible, " + $.mobile.collapsible.initSelector;

$.widget( "mobile.collapsibleset", $.extend( {
	options: $.extend( {
		enhanced: false,
	}, $.mobile.collapsible.defaults ),

	_handleCollapsibleExpand: function( event ) {
		var closestCollapsible = $( event.target ).closest( ".ui-collapsible" );

		if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsible-set')" ) ) {
			closestCollapsible
				.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
				.collapsible( "collapse" );
		}
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		$.extend( this, {
			_classes: ""
		});

		if ( !opts.enhanced ) {
			elem.addClass( "ui-collapsible-set" );
		}

		this
			._updateClasses( opts, opts.enhanced )
			._on( elem, { collapsibleexpand: "_handleCollapsibleExpand" } );
	},

	_init: function() {
		this._refresh( true );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		this.element
			.children( childCollapsiblesSelector )
			.filter( ":jqmData(collapsed='false')" )
			.collapsible( "expand" );
	},

	_updateClasses: function( options, internal ) {
		var opts = {
				theme: options.theme || this.options.theme,
				corners: options.corners || this.options.corners,
				inset: options.inset || this.options.inset
			},
			classes = "";

		if ( opts.theme && opts.theme !== "none" ) {
			classes += " ui-group-theme-" + opts.theme;
		}

		if ( opts.corners && opts.inset ) {
			classes += " ui-corner-all";
		}

		if ( internal ) {
			this._classes = classes;
		} else {
			this._toggleClasses( this.element, "_classes", classes );
		}

		return this;
	},

	_setOptions: function( options ) {
		var ret = this._super( options );

		this._updateClasses( options );
		this.element.children( ":mobile-collapsible" ).collapsible( "refresh" );
		return ret;
	},

	_destroy: function() {
		var el = this.element;

		this._removeFirstLastClasses( el.children( childCollapsiblesSelector ) );
		el
			.removeClass( "ui-collapsible-set " + this._classes )
			.children( ":mobile-collapsible" )
			.collapsible( "destroy" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( childCollapsiblesSelector );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

$.mobile.collapsibleset.initSelector = ":jqmData(role='collapsible-set')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.collapsibleset" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
