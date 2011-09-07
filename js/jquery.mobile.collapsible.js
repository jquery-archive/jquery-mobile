/*
* jQuery Mobile Framework : "collapsible" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: ">:header,>legend",
		theme: null,
		iconTheme: "d",
		initSelector: ":jqmData(role='collapsible')"
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsibleContain = $el.addClass( "ui-collapsible-contain" ),
			collapsibleHeading = $el.find( o.heading ).eq( 0 ),
			collapsibleContent = collapsibleContain.wrapInner( "<div class='ui-collapsible-content'></div>" ).find( ".ui-collapsible-content" ),
			collapsibleParent = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" );

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a:eq(0)" )
				.buttonMarkup({
					shadow: !collapsibleParent.length,
					corners: false,
					iconPos: "left",
					icon: "plus",
					theme: o.theme
				})
				.find( ".ui-icon" )
					.removeAttr( "class" )
					.buttonMarkup({
						shadow: true,
						corners: true,
						iconPos: "notext",
						icon: "plus",
						theme: o.iconTheme
					});

			if ( !collapsibleParent.length ) {
				collapsibleHeading
					.find( "a:eq(0)" )
						.addClass( "ui-corner-all" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-all" );
			} else {
				if ( collapsibleContain.jqmData( "collapsible-last" ) ) {
					collapsibleHeading
						.find( "a:eq(0), .ui-btn-inner" )
							.addClass( "ui-corner-bottom" );
				}
			}

		//events
		collapsibleContain
			.bind( "collapse", function( event ) {
				if ( ! event.isDefaultPrevented() &&
							$( event.target ).closest( ".ui-collapsible-contain" ).is( collapsibleContain ) ) {

					event.preventDefault();

					collapsibleHeading
						.addClass( "ui-collapsible-heading-collapsed" )
						.find( ".ui-collapsible-heading-status" )
							.text( o.expandCueText )
						.end()
						.find( ".ui-icon" )
							.removeClass( "ui-icon-minus" )
							.addClass( "ui-icon-plus" );

					collapsibleContent.addClass( "ui-collapsible-content-collapsed" ).attr( "aria-hidden", true );

					if ( collapsibleContain.jqmData( "collapsible-last" ) ) {
						collapsibleHeading
							.find( "a:eq(0), .ui-btn-inner" )
							.addClass( "ui-corner-bottom" );
					}
				}
			})
			.bind( "expand", function( event ) {
				if ( !event.isDefaultPrevented() ) {

					event.preventDefault();

					collapsibleHeading
						.removeClass( "ui-collapsible-heading-collapsed" )
						.find( ".ui-collapsible-heading-status" ).text( o.collapseCueText );

					collapsibleHeading.find( ".ui-icon" ).removeClass( "ui-icon-plus" ).addClass( "ui-icon-minus" );

					collapsibleContent.removeClass( "ui-collapsible-content-collapsed" ).attr( "aria-hidden", false );

					if ( collapsibleContain.jqmData( "collapsible-last" ) ) {

						collapsibleHeading
							.find( "a:eq(0), .ui-btn-inner" )
							.removeClass( "ui-corner-bottom" );
					}
				}
			})
			.trigger( o.collapsed ? "collapse" : "expand" );

		// Close others in a set
		if ( collapsibleParent.length && !collapsibleParent.jqmData( "collapsiblebound" ) ) {

			collapsibleParent
				.jqmData( "collapsiblebound", true )
				.bind( "expand", function( event ) {

					$( event.target )
						.closest( ".ui-collapsible-contain" )
						.siblings( ".ui-collapsible-contain" )
						.trigger( "collapse" );

				});

			var set = collapsibleParent.children( ":jqmData(role='collapsible')" );

			set.first()
				.find( "a:eq(0)" )
					.addClass( "ui-corner-top" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-top" );

			set.last().jqmData( "collapsible-last", true );
		}

		collapsibleHeading
			.bind( "vclick", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ?
										"expand" : "collapse";

				collapsibleContain.trigger( type );

				event.preventDefault();
			});
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.collapsible.prototype.options.initSelector, e.target ).collapsible();
});

})( jQuery );
