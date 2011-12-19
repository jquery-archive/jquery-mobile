/*
* "collapsible" plugin
*/

(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		theme: null,
		contentTheme: null,
		// tabview - add navbar-grid functionality
		grid: null,
		iconTheme: "d",
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			// tabview - re-order, extend and add corners
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" ),
			o = $.extend({
				direction: collapsibleSet.length ? collapsibleSet.jqmData("type") : ""
				}, this.options ),
			flCorners = o.direction == "horizontal" ? [ "ui-corner-left", "ui-corner-right" ] : [ "ui-corner-top", "ui-corner-bottom" ],
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).find( ".ui-collapsible-content" ),			
			collapsiblesInSet = collapsibleSet.children( ":jqmData(role='collapsible')" );

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
			// tabview - add class and grid
			if ( o.direction == "horizontal" ) {
				$el.closest( ":jqmData(role='collapsible-set')" ).addClass("ui-collapsible-set-horizontal")
					.grid({ grid: this.options.grid });
			}
		}

		collapsibleContent.addClass( ( o.contentTheme ) ? ( "ui-body-" + o.contentTheme ) : "");
			// tabview - add bottom corners to content
			.addClass ( ( o.direction ) ? "ui-corner-bottom" : "" );

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
				});

		if ( !collapsibleSet.length ) {
			collapsibleHeading
				.find( "a" ).first().add( collapsibleHeading.find( ".ui-btn-inner" ) )
					.addClass( "ui-corner-top ui-corner-bottom" );
		} else {
			// If we are in a collapsible set

			// Initialize the collapsible set if it's not already initialized
			if ( !collapsibleSet.jqmData( "collapsiblebound" ) ) {

				collapsibleSet
					.jqmData( "collapsiblebound", true )
					.bind( "expand", function( event ) {

						$( event.target )
							.closest( ".ui-collapsible" )
							.siblings( ".ui-collapsible" )
							.trigger( "collapse" );

					});
			}

			collapsiblesInSet.first()
				.find( "a" )
					.first()
					// tabview - add flex corners					
					.addClass( flCorners[0] )
						.find( ".ui-btn-inner" )
							.addClass( flCorners[0] );

			collapsiblesInSet.last()
				.jqmData( "collapsible-last", true )
				.find( "a" )
					.first()
					// tabview - add flex corners
					.addClass( flCorners[1] )
						.find( ".ui-btn-inner" )
							.addClass( flCorners[1] );


			if ( collapsible.jqmData( "collapsible-last" ) ) {
				collapsibleHeading
					.find( "a" ).first().add ( collapsibleHeading.find( ".ui-btn-inner" ) )
						// tabview - add flex corners
						.addClass( flCorners[1] );
			}
		}

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
					
					// tabview - exclude horizontal
					if ( contentTheme && ( !collapsibleSet.length || collapsible.jqmData( "collapsible-last" ) && o.direction != "horizontal" ) ) {
						collapsibleHeading
							.find( "a" ).first().add( collapsibleHeading.find( ".ui-btn-inner" ) )
							.toggleClass( "ui-corner-bottom", isCollapse );
						collapsibleContent.toggleClass( "ui-corner-bottom", !isCollapse );
					}
					
					// tabview - switch bottom corners - too long
					if ( collapsibleSet.length && o.direction == "horizontal"  ) {
						
						var set = $el.closest('.ui-collapsible-set')
								.find( ".ui-collapsible .ui-collapsible-heading a")
								.find( ".ui-btn-inner" ).andSelf();
							
						if (!isCollapse) {
							// tabview - straighten corners on open
							set.each(function() {		
								if ( $(this).is( ".ui-corner-left") ) {
									$(this).addClass("ui-corner-tl").removeClass("ui-corner-left")
									} else if ( $(this).is( ".ui-corner-right") ) {
										$(this).addClass("ui-corner-tr").removeClass("ui-corner-right")
										}

								})
							
						} else if ( $el.closest('.ui-collapsible-set').find( ".ui-collapsible" ).length == $el.closest('.ui-collapsible-set').find( ".ui-collapsible-collapsed" ).length ) {
							// tabview - curve corners if all closed
							set.each(function() {																					
								if ( $(this).hasClass("ui-corner-tl") ) {
									$(this).removeClass("ui-corner-tl").addClass("ui-corner-left")
									} else if ( $(this).hasClass("ui-corner-tr") ) {
										$(this).removeClass("ui-corner-tr").addClass("ui-corner-right")									
										} 
			
								});														
							}						
						}
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
