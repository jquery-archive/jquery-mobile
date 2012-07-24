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
		popupbeforeposition: function( event ) {
			var inner = $( window ).height() - 62 + "px";
			$( ".popphoto" ).css( "max-height", inner );
		}
	});

	$("#mapiframe, #vidiframe")
		.prop( "width", 0 )
		.prop( "height", 0 );
		$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width" : 0, "height" : 0 } );
			
	function sizes(iframewidth, iframeheight, padding, border) {
		var sw = $( window ).width() - 30,
			sh = $( window ).height() - 30,
			ip = 2 * padding,
			ib = 2 * border,
			iw = iframewidth + ip + ib,
			ih = iframeheight + ip + ib,
			h, w, width, height;

		if ( iw < sw && ih < sh ) {
			w = iw;
			h = ih;
		} else if ( ( iw / sw ) > ( ih / sh ) ) {
			w = sw;
			h = ( sw / iw ) * ih;
		} else {
			h = sh;
			w = ( sh / ih ) * iw;
		}
		
		width = w - ( ip + ib );
		height = h - ( ip + ib );
		
		return {
			'width': width,
			'height': height
		};
	};
	
	$( "#popupMap" ).on({
		popupbeforeposition: function( event ) {
			var size = sizes(480, 320, 0, 1),
				w = size.width,
				h = size.height;

			$( "#mapiframe" )
				.prop( "width", w )
				.prop( "height", h );
			$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width": w, "height" : h } );
		},
		popupafterclose: function( event ) {
			$("#mapiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );
			$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width": 0, "height" : 0 } );
		}
	});
	$( "#popupVideo" ).on({
		popupbeforeposition: function( event ) {
			var size = sizes(497, 298, 15, 1),
				w = size.width,
				h = size.height;
				
			$( "#vidiframe" )
				.prop( "width", w )
				.prop( "height", h );
		},
		popupafterclose: function( event ) {
			$("#vidiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );	
		}
	});
});
