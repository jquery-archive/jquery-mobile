/*
* jQuery Mobile Framework : This plugin handles theming and layout of headers, footers, and content areas
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.mobile.page.prototype.options.backBtnText		= "Back";
$.mobile.page.prototype.options.addBackBtn		= false;
$.mobile.page.prototype.options.backBtnTheme	= null;
$.mobile.page.prototype.options.headerTheme		= "a";
$.mobile.page.prototype.options.footerTheme		= "a";
$.mobile.page.prototype.options.contentTheme	= null;

$( ":jqmData(role='page'), :jqmData(role='dialog')" ).live( "pagecreate", function( e ) {
	
	var $page		= $( this ),
		o			= $page.data( "page" ).options,
		pageTheme	= o.theme;
	
	$( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", this ).each(function() {
		var $this	= $( this ),
			role	= $this.jqmData( "role" ),
			theme	= $this.jqmData( "theme" ),
			$headeranchors,
			leftbtn,
			rightbtn,
			backBtn;
			
		$this.addClass( "ui-" + role );	

		//apply theming and markup modifications to page,header,content,footer
		if ( role === "header" || role === "footer" ) {
			
			var thisTheme = theme || ( role === "header" ? o.headerTheme : o.footerTheme ) || pageTheme;

			//add theme class
			$this.addClass( "ui-bar-" + thisTheme );

			// Add ARIA role
			$this.attr( "role", role === "header" ? "banner" : "contentinfo" );

			// Right,left buttons
			$headeranchors	= $this.children( "a" );
			leftbtn			= $headeranchors.hasClass( "ui-btn-left" );
			rightbtn		= $headeranchors.hasClass( "ui-btn-right" );

			if ( !leftbtn ) {
				leftbtn = $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
			}

			if ( !rightbtn ) {
				rightbtn = $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
			}

			// Auto-add back btn on pages beyond first view
			if ( o.addBackBtn && role === "header" &&
					$( ".ui-page" ).length > 1 &&
					$this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
					!leftbtn ) {

				backBtn = $( "<a href='#' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" ).prependTo( $this );

				// If theme is provided, override default inheritance
				backBtn.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme );
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

			if (theme || o.contentTheme) {
			    $this.addClass( "ui-body-" + ( theme || o.contentTheme ) );
			}

			// Add ARIA role
			$this.attr( "role", "main" );

		}
	});
});

})( jQuery );