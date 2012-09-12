//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./collapsible" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='collapsible-set')",
		// add grid and inset (otherwise undefined)
		grid: null,
		inset: true
	},
	_create: function() {
		var $el = this.element.addClass( "ui-collapsible-set" ),
			o = $.extend({  direction: $el.jqmData("type") || "" }, this.options )
			toggleCorners = o.direction == "horizontal" ? [ "ui-corner-tl ui-corner-bl","ui-corner-tr ui-corner-br" ] : ["ui-corner-top ", "ui-corner-bottom" ];
		// add horizontal class 
		if ( o.direction == "horizontal" ) {
			$el.addClass("ui-collapsible-set-horizontal").grid({ grid: this.options.grid });
		}	
		// Inherit the theme from collapsible-set
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( $el, "c" );
		}
		// Inherit the content-theme from collapsible-set
		if ( !o.contentTheme ) {
			o.contentTheme = $el.jqmData( "content-theme" );
		}
		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		// need a class, because can't assign margin-left/right: -15px to h2 elements if horizontal
		if ( !!o.inset && o.direction == "horizontal" ){
			$el.addClass( "ui-collapsible-no-inset" );
		}
		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
				.bind( "expand collapse", function( event ) {
					var isCollapse = ( event.type === "collapse" ),
						collapsible = $( event.target ).closest( ".ui-collapsible" ),
						widget = collapsible.data( "collapsible" ),
						// add index and toggle class
						index = $el.find('.ui-collapsible').index( collapsible ),
						togClass = "ui-corner-bottom",
						// global corner toggle, runs once (regular), twice (horizontal - toggle first/last)
						tog = function() {	
							if ( !!o.inset ){
								for ( var i = 0; i < collapsible.length; i++ ){
									index = i;
									togClass = o.direction == "horizontal" ? ( index == 0 ? "ui-corner-bl" : "ui-corner-br") : "ui-corner-bottom";
									collapsible.eq(i).find( widget.options.heading ).first()
										.find( "a" ).first()
										.toggleClass( togClass, isCollapse )
										.find( ".ui-btn-inner" )
										.toggleClass( togClass, isCollapse );
								}
							}
						};
						if ( !!o.inset ){
							collapsible.find( ".ui-collapsible-content" ).toggleClass( "ui-corner-bottom", !isCollapse );
						}
						// horizontal handle 
						if ( o.direction == "horizontal" ){
							// make this 2 collapsibles!
							collapsible = $el.find('.ui-collapsible').first().add( $el.find('.ui-collapsible').eq( $el.find('.ui-collapsible').length-1)  );
							if ( event.type == "expand" ){
								isCollapse = false;
								tog();
							// catch single collapsible
							} else if ( $el.find('.ui-collapsible').length == $el.find('.ui-collapsible-collapsed').length ) {
								isCollapse = true;
								tog();
							}
						// regular
						} else if (collapsible.jqmData( "collapsible-last" ) && !!o.inset ) {
							tog();
						}
				})
				.bind( "expand", function( event ) {
					var closestCollapsible = $( event.target )
						.closest( ".ui-collapsible" );
					if ( closestCollapsible.parent().is( ":jqmData(role='collapsible-set')" ) ) {
						closestCollapsible
							.siblings( ".ui-collapsible" )
							.trigger( "collapse" );
					}
				});
		}
	},

	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this.refresh();

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},
	refresh: function() {
		var $el = this.element,
			o = this.options,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );
		// clean up borders
		if ( !!o.inset ) {
			collapsiblesInSet.each(function() {
				$( this ).jqmRemoveData( "collapsible-last" )
					.find( ".ui-collapsible-heading" )
					.find( "a" ).first()
					.removeClass( "ui-corner-top ui-corner-bottom" )
					.find( ".ui-btn-inner" )
					.removeClass( "ui-corner-top ui-corner-bottom" );
			});

			collapsiblesInSet.first()
				.find( "a" )
					.first()
					.addClass( toggleCorners[0] )
					.find( ".ui-btn-inner" )
						.addClass(  toggleCorners[0] );
		
			collapsiblesInSet.last()
				.jqmData( "collapsible-last", true )
				.find( "a" )
					.first()
					.addClass( toggleCorners[1] )
					.find( ".ui-btn-inner" )
						.addClass( toggleCorners[1] );
		} 
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");