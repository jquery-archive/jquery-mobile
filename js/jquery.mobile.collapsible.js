//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Creates collapsible content areas.
//>>label: Collapsibles
define( [ "jquery", "jquery.mobile.widget", "jquery.mobile.buttonMarkup" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		theme: null,
		contentTheme: null,
		iconTheme: "d",
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).find( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" );

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		// If we are in a collapsible set
		if ( collapsibleSet.length ) {
			// Inherit the theme from collapsible-set
			if ( !o.theme ) {
				o.theme = collapsibleSet.jqmData( "theme" );
			}
			// Inherit the content-theme from collapsible-set
			if ( !o.contentTheme ) {
				o.contentTheme = collapsibleSet.jqmData( "content-theme" );
			}
		}

		collapsibleContent.addClass( ( o.contentTheme ) ? ( "ui-body-" + o.contentTheme ) : "");

		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.buttonMarkup({
					shadow: false,
					corners: false,
					iconPos: "left",
					icon: "plus",
					theme: o.theme
				})
			.add( ".ui-btn-inner" )
				.addClass( "ui-corner-top ui-corner-bottom" );

		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {

					event.preventDefault();

					var $this = $( this ),
						isCollapse = ( event.type === "collapse" ),
					    contentTheme = o.contentTheme;

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse)
						.find( ".ui-collapsible-heading-status" )
							.text( isCollapse ? o.expandCueText : o.collapseCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-minus", !isCollapse )
							.toggleClass( "ui-icon-plus", isCollapse );

					$this.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );

					if ( contentTheme && ( !collapsibleSet.length || collapsible.jqmData( "collapsible-last" ) ) ) {
						collapsibleHeading
							.find( "a" ).first().add( collapsibleHeading.find( ".ui-btn-inner" ) )
							.toggleClass( "ui-corner-bottom", isCollapse );
						collapsibleContent.toggleClass( "ui-corner-bottom", !isCollapse );
					}
					collapsibleContent.trigger( "updatelayout" );
				}
			})
			.trigger( o.collapsed ? "collapse" : "expand" );

		collapsibleHeading
			.bind( "click", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ?
										"expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
			});
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.collapsible.prototype.options.initSelector, e.target ).collapsible();
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
