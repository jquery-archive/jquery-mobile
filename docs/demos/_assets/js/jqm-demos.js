
$(function(){
  //this is to allow deeplinks to id's from external pages and from same page links
  //this will not currently work for multi-page documents if this is needed in the 
  //future it can be added at that time.

  //This binding handles deeplinks another page
  $( document ).bind( "pageshow", function(){
      var match, pos,
        urlParams = {},
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace( pl, " " )); },
          query  = window.location.search.substring(1);
          
      while (match = search.exec(query)){
          urlParams[decode(match[1])] = decode(match[2]);
        }

        if( typeof urlParams.scrollto !== "undefined" ){

          pos = $("#"+urlParams.scrollto).offset().top;
          setTimeout( function() {
            $.mobile.silentScroll( pos );
          }, 0);
        }
  });
});
// display the version of jQM
$(document).on( "pageinit", function() {
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

	$( "p.jqm-version" ).html( html );
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

  // Fix the links for the initial page
  $(fixLinks);

  // Fix the links for subsequent ajax page loads
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
