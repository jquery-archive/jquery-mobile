//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		$(this).trigger("collapse");
	});
});

// display the version of jQM
$(document).on( 'pageinit', function() {
	var version = $.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = (words[1] || "Final"),
		html = ver,
		foothtml = "Version " + ver;

	if( str.indexOf( "rc" ) == -1 ){
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace(".", "");
	}

	if ( $.mobile.version && str ) {
		html += " <b>" + str + "</b>";
		foothtml += " " + str;
	}

	$( ".type-home .ui-content p.jqm-version" ).html( html );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
});

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

  // fix the links for the initial page
  $(fixLinks);

  // fix the links for subsequent ajax page loads
  $(document).on( 'pagecreate', fixLinks );

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

// Measure the time from pageload until pageshow for page lists-performance.html
// NB: lists-performance.html should load without a transition to avoid having
// the transition's duration included in the measurement
$( document ).on( "pageload", function( e, data ) {
	var ar = data.dataUrl.split( "/" ), then;

	// If we're loading "lists-performance.html ..."
	if ( ar.length && ar[ ar.length - 1 ] === "lists-performance.html" ) {
		// ... save the event's timestamp, and connect to the page's pagebeforeshow
		then = new Date();
		data.page.one( "pageshow", function( e, pbsData ) {
			// ... then compare the time at pagebeforeshow to the one at pageload
			var now = new Date(),
				header = data.page.find( ".ui-header h1:first" );
			// ... and add/replace a span in the header with the result
			header
				.remove( "span:jqmData(role='perfData')" )
				.append( "<span style='font-size: 8px;' data-" + $.mobile.ns + "role='perfData'> (" + ( now.getTime() - then.getTime() ) + " ms)</span>" );
		});
	}
});
