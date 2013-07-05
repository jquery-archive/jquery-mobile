//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./collapsible", "./addFirstLastClasses", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.extend( {
	_create: function() {
		var $el = this.element,
			o = this.options,
			classes = "ui-collapsible-set";

		if ( !o.theme ) {
			o.theme = $el.jqmData( "theme" );
		}
		if ( o.theme ) {
			classes += " ui-group-theme-" + o.theme;
		}

		if ( !o.contentTheme ) {
			o.contentTheme = $el.jqmData( "content-theme" );
		}

		if ( !o.corners ) {
			o.corners = $el.jqmData( "corners" );
		}

		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		o.inset = o.inset !== undefined ? o.inset : true;
		o.corners = o.corners !== undefined ? o.corners : true;

		if ( !!o.corners && !!o.inset ) {
			classes += " ui-corner-all";
		}

		$el.addClass( classes );

		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
				.bind( "expand", function( event ) {
					var closestCollapsible = $( event.target )
						.closest( ".ui-collapsible" );
					if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsible-set')" ) ) {
						closestCollapsible
							.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
							.trigger( "collapse" );
					}
				});
		}
	},

	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":mobile-collapsible, :jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this._refresh( "true" );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( ":mobile-collapsible, :jqmData(role='collapsible')" );

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
