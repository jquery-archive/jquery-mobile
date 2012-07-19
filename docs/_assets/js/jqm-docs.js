//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		$(this).trigger("collapse");
	});
});

// display the version of jQM
$(document).bind( 'pageinit', function() {
	var version = $.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = (words[1] || "Final"),
		html = ver;

	if( str.indexOf( "rc" ) == -1 ){
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace(".", "");
	}

	if ( $.mobile.version && str ) {
		html += " <b>" + str + "</b>";
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

  // fix the links for the initial page
  $(fixLinks);

  // fix the links for subsequent ajax page loads
  $(document).bind( 'pagecreate', fixLinks );

  // Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
  $.ajax({
    url: '.',
    async: false,
    isLocal: true
  }).error(function() {
    // Ajax doesn't work so turn it off
    $( document ).bind( "mobileinit", function() {
      $.mobile.ajaxEnabled = false;

      var message = $( '<div>' , {
        'class': "ui-footer ui-bar-e",
        style: "overflow: auto; padding:10px 15px;",
        'data-ajax-warning': true
      });

      message
        .append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
        .append( "<p>The AJAX-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, try a different browser or <a href='https://github.com/jquery/jquery-mobile/wiki/Downloadable-Docs-Help'>view help</a>.</p>" );

      $( document ).bind( "pagecreate", function( event ) {
        $( event.target ).append( message );
      });
    });
  });
}

// popup examples
$( document ).on( "pageinit", function() {
	$( "#popupPhotoPortrait, #popupPhotoLandscape" ).on({
		popupbeforeopen: function( event ) {
			var inner = $( window ).height() - 62 + "px";
			$( ".popphoto" ).css( "max-height", inner );
		}
	});
	$("#mapiframe, #vidiframe")
		.prop( "width", 0 )
		.prop( "height", 0 );	
	$( "#popupMap" ).on({
		popupbeforeopen: function( event ) {
			var swidth = $( window ).width() - 32,
				sheight = $( window ).height() - 62,
				iwidth = 480, iheight = 320;
			if ( iwidth > swidth ) {
				width = swidth;
				height = swidth / iwidth * iheight;
			} else {
				width = iwidth;
				height = iheight;
			}
			$( "#mapiframe" )
				.prop( "width", width )
				.prop( "height", height );
		}
	});
	$( "#popupMap" ).on({
		popupafterclose: function( event ) {
			$("#mapiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );	
		}
	});
	$( "#popupVideo" ).on({
		popupbeforeopen: function( event ) {
			var swidth = $( window ).width() - 62,
				sheight = $( window ).height() - 62,
				iwidth = 497, iheight = 298;
			if ( iwidth > swidth ) {
				width = swidth;
				height = swidth / iwidth * iheight;
			} else {
				width = iwidth;
				height = iheight;
			}
			$( "#vidiframe" )
				.prop( "width", width )
				.prop( "height", height );
		}
	});
	$( "#popupVideo" ).on({
		popupafterclose: function( event ) {
			$("#vidiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );	
		}
	});
});
