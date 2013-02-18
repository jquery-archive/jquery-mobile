// Turn off AJAX for local file browsing
if ( location.protocol.substr(0,4)  === 'file' ||
     location.protocol.substr(0,11) === '*-extension' ||
     location.protocol.substr(0,6)  === 'widget' ) {

	// Start with links with only the trailing slash and that aren't external links
	var fixLinks = function() {
		$( "a[href$='/'], a[href='.'], a[href='..']" ).not( "[rel='external']" ).each( function() {
			this.href = $( this ).attr( "href" ).replace( /\/$/, "" ) + "/index.html";
		});
	};

	// Fix the links for the initial page
	$( fixLinks );

	// Fix the links for subsequent ajax page loads
	$( document ).on( 'pagecreate', fixLinks );

	// Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
	$.ajax({
		url: '.',
		async: false,
		isLocal: true
	}).error(function() {
		// Ajax doesn't work so turn it off
		$( document ).on( "mobileinit", function() {
			$.mobile.ajaxEnabled = false;
			
			var message = $( '<div>' , {
				'class': "ui-footer ui-bar-e",
				style: "overflow: auto; padding:10px 15px;",
				'data-ajax-warning': true
			});
			
			message
			.append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
			.append( "<p>The AJAX-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, try a different browser or <a href='https://github.com/jquery/jquery-mobile/wiki/Downloadable-Docs-Help'>view help</a>.</p>" );
			
			$( document ).on( "pagecreate", function( event ) {
				$( event.target ).append( message );
			});
		});
	});
}


// display the version of jQM
$( document ).on( "pageinit", function() {
	var version = $.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = (words[1] || "Final"),
		html = "Version " + ver;

	if( str.indexOf( "rc" ) == -1 ){
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace(".", "");
	}

	if ( $.mobile.version && str ) {
		html += " " + str;
	}

	$( ".jqm-version" ).html( html );
});


// global search
$( document ).on( "pageinit", ".jqm-demos", function() {
	$( this ).find( ".jqm-search ul" ).listview({
		globalNav: "docs",
		inset: true,
		theme: "d",
		dividerTheme: "d",
		icon: false,
		filter: true,
		filterReveal: true,
		filterPlaceholder: "Search...",
		autodividers: true,
		autodividersSelector: function ( li ) {
    		return "";
  		}
	});
	
	$( this ).find( ".jqm-header .jqm-search-link" ).on( "click", function() {
		$( this ).parent( ".jqm-header" ).toggleClass( "jqm-search-toggle" );
		
		var type = $( this ).parent( ".jqm-header" ).hasClass( "jqm-search-toggle" ) ? "searchshow" : "searchhide";
		
		$( this ).parent( ".jqm-header" ).find( ".jqm-search" ).trigger( type );
	});
	
	$( this ).find( ".jqm-header .jqm-search" )
		.on( "searchshow searchhide", function( event ) {
			if ( event.type === "searchshow" ) {
				$( this ).find( ".ui-input-text" ).focus();
			} else {
				$( this )
					.find( ".ui-input-clear" ).trigger( "click" )
					.end()
					.find( ".ui-input-text" ).blur();
			}
		});
		
	$( this ).on( "pagehide", function() {
		$( this ).find( ".ui-input-clear" ).trigger( "click" );
	});

	$( document ).one( "pageshow", ".jqm-demos", function() {
		$( ".ui-page-active .jqm-search form" )
			.attr( "method", "get" )
			.attr( "action", "search-results.php" )
			.append("<button type='submit' data-icon='arrow-r' data-inline='true' class='ui-hidden-accessible' data-iconpos='notext'>Submit</button>")
				.parent()
				.trigger("create");
			
		$( ".ui-page-active .jqm-search form" ).children( ".ui-btn" ).addClass( "ui-hidden-accessible" );
		$( ".ui-page-active .jqm-search form" ).on( "submit", function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			if ( $( ".ui-page-active .jqm-search li.ui-btn-active" ).length !== 0 ) {
				var href = $( ".ui-page-active .jqm-search li.ui-btn-active a" ).attr('href');
				$.mobile.changePage(href);
				return false;
			}
			var url, base = $( "base" ).attr( "href" ).split('docs')[0];
				base = base.split('index.html')[0] + "docs" + "/";
				url = base +$( this ).attr( "action" ) + "?search=" + $( this ).find( "input" ).val();
			
			$.mobile.changePage( url ); 
		});
	});
});

$( document ).on( "change", ".ui-page-active .jqm-search input", function( e ) {
	if ( typeof e.which !== "undefined" ) {
		$( ".ui-page-active .jqm-search li.ui-btn-active" ).removeClass( "ui-btn-active" );
	}
});

$( document ).on( "keyup", ".ui-page-active .jqm-search input", function( e ) {
			if ( e.which === $.mobile.keyCode.DOWN ) {
				if ( $( ".ui-page-active .jqm-search li.ui-btn-active" ).length == 0 ) {
					$( ".ui-page-active .jqm-search li:first" ).toggleClass( "ui-btn-active" );
				} else {
					$( ".ui-page-active .jqm-search li.ui-btn-active" ).toggleClass( "ui-btn-active" ).next().toggleClass("ui-btn-active" );
				}
				
				highlight();
				
				function highlight() {
					if ( $( ".ui-page-active .jqm-search li.ui-btn-active" ).hasClass( "ui-screen-hidden" ) ) {
						$( ".ui-page-active .jqm-search li.ui-btn-active" ).toggleClass( "ui-btn-active" ).next().toggleClass( "ui-btn-active" );
						
						highlight();
					}
					return;
				}
			}
			
			if( e.which === $.mobile.keyCode.UP ) {
				if( $( ".ui-page-active .jqm-search li.ui-btn-active" ).length !== 0 ) {
					$( ".ui-page-active .jqm-search li.ui-btn-active" ).toggleClass( "ui-btn-active" ).prev().toggleClass("ui-btn-active" );
					
					highlightup();
				} else {
					$( ".ui-page-active .jqm-search li:last" ).toggleClass( "ui-btn-up-d" ).toggleClass( "ui-btn-active" );
				}
				
				function highlightup() {
					if( $( ".ui-page-active .jqm-search li.ui-btn-active" ).hasClass( "ui-screen-hidden" ) ) {
						$( ".ui-page-active .jqm-search li.ui-btn-active" ).toggleClass( "ui-btn-active" ).prev().toggleClass("ui-btn-active" );
						
						highlightup();
					}
					return;
				}
			}
		});
		
$( document ).on( "pageinit", ".jqm-demos-search-results", function() {
	$( this ).find( ".jqm-content ul" ).listview({
		globalNav: "docs",
		inset: true,
		theme: "d",
		dividerTheme: "d",
		icon: false,
		filter: true,
		filterReveal: true,
		filterPlaceholder: "Search...",
		autodividers: true,
		autodividersSelector: function ( li ) {
    		return "";
  		}
	});
});

$( document ).on( "pageshow", ".jqm-demos-search-results", function(){
	$( this ).find( ".jqm-content input").val( $.mobile.path.parseUrl( window.location.href ).search.split( "=" )[1] ).trigger( "change" );
});