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
			expandedCls = "ui-btn-up-" + (o.theme || "c"),
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.find( o.heading ).eq( 0 ),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).find( ".ui-collapsible-content" ),
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
					shadow: false,
					corners: false,
					iconPos: "left",
					icon: "plus",
					theme: o.theme
				})

		if ( !collapsibleParent.length ) {
			collapsibleHeading
				.find( "a:eq(0), .ui-btn-inner" )
					.addClass( "ui-corner-top ui-corner-bottom" );
		} else {
			if ( collapsible.jqmData( "collapsible-last" ) ) {
				collapsibleHeading
					.find( "a:eq(0), .ui-btn-inner" )
						.addClass( "ui-corner-bottom" );
			}
		}

		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {

					event.preventDefault();

					var isCollapse = ( event.type === "collapse" );

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse)
						.find( ".ui-collapsible-heading-status" )
							.text( o.expandCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-minus", !isCollapse )
							.toggleClass( "ui-icon-plus", isCollapse );

					collapsible.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );
					collapsibleContent.toggleClass( expandedCls, !isCollapse );

					if ( !collapsibleParent.length || collapsible.jqmData( "collapsible-last" ) ) {
						collapsibleHeading
							.find( "a:eq(0), .ui-btn-inner" )
							.toggleClass( "ui-corner-bottom", isCollapse );
						collapsibleContent.toggleClass( "ui-corner-bottom", !isCollapse );
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
						.closest( ".ui-collapsible" )
						.siblings( ".ui-collapsible" )
						.trigger( "collapse" );

				});

			var set = collapsibleParent.children( ":jqmData(role='collapsible')" );

			set.first()
				.find( "a:eq(0)" )
					.addClass( "ui-corner-top" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-top" );

			set.last()
				.jqmData( "collapsible-last", true )
				.find( "a:eq(0)" )
					.addClass( "ui-corner-bottom" )
						.find( ".ui-btn-inner" )
							.addClass( "ui-corner-bottom" );
		}

		collapsibleHeading
			.bind( "vclick", function( event ) {

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
