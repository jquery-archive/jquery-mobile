/*
* This plugin handles theming and layout of headers, footers, and content areas
*/

(function( $, undefined ) {

$.widget( "mobile.sections", $.mobile.widget, {
	options: {
		initSelector : ":jqmData(role='page'), :jqmData(role='dialog')",
		sectionSelector : ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",
		backBtnText : "top",
		addBackBtn : null,
		backBtnTheme : ":jqmData(role='navbar')",
		headerTheme : "a",
		footerTheme : "a",
		contentTheme : null
	},
	
	_create: function() {
		var self = this;

		$( self.options.initSelector ).each(function() {
			var $page = $( this ),
				o = self.options,
				pageRole = $page.jqmData( "role" ),
				pageTheme = o.theme;
				
			$( o.sectionSelector, this ).each(function() {
				var $this = $( this ),
					role = $this.jqmData( "role" ),
					theme = $this.jqmData( "theme" ),
					contentTheme = theme || o.contentTheme || ( pageRole === "dialog" && pageTheme ),
					$headeranchors,
					leftbtn,
					rightbtn,
					backBtn;
				
				$this.addClass( "ui-" + role );	

				//apply theming and markup modifications to page,header,content,footer
				if ( role === "header" || role === "footer" ) {
					var thisTheme = theme || ( role === "header" ? o.headerTheme : o.footerTheme ) || pageTheme;

					$this
						//add theme class
						.addClass( "ui-bar-" + thisTheme )
						// Add ARIA role
						.attr( "role", role === "header" ? "banner" : "contentinfo" );

					// Right,left buttons
					$headeranchors	= $this.children( "a" );
					leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
					rightbtn = $headeranchors.hasClass( "ui-btn-right" );

					leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;

					rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;

					// Auto-add back btn on pages beyond first view
					if ( o.addBackBtn && 
						role === "header" &&
						$( ".ui-page" ).length > 1 &&
						$this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
						!leftbtn ) {

						backBtn = $( "<a href='#' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
							// If theme is provided, override default inheritance
							.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
							.prependTo( $this );				
					}

					// Page title
					$this.children( "h1, h2, h3, h4, h5, h6" )
						.addClass( "ui-title" )
						// Regardless of h element number in src, it becomes h1 for the enhanced page
						.attr({
							"tabindex": "0",
							"role": "heading",
							"aria-level": "1"
						});

				} else if ( role === "content" ) {
					if ( contentTheme ) {
					    $this.addClass( "ui-body-" + ( contentTheme ) );
					}

					// Add ARIA role
					$this.attr( "role", "main" );
				}
				
			});

		});
	}
});

$( document ).bind( "pagecreate create", function( e ) {
	$( e.target ).sections();
});

})( jQuery );