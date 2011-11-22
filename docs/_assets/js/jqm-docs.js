//set up the theme switcher on the homepage
$('div').live('pagecreate',function(event){
	if( !$(this).is('.ui-dialog')){ 
		var appendEl = $(this).find('.ui-footer:last');
		
		if( !appendEl.length ){
			appendEl = $(this).find('.ui-content');
		}
		
		if( appendEl.is("[data-position]") ){
			return;
		}
		
		$('<a href="#themeswitcher" data-'+ $.mobile.ns +'rel="dialog" data-'+ $.mobile.ns +'transition="pop">Switch theme</a>')
			.buttonMarkup({
				'icon':'gear',
				'inline': true,
				'shadow': false,
				'theme': 'd'
			})
			.appendTo( appendEl )
			.wrap('<div class="jqm-themeswitcher">')
			.bind( "vclick", function(){
				$.themeswitcher();
			});
	}	

});

//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		$(this).trigger("collapse");
	});
});

function setDefaultTransition(){
	var winwidth = $( window ).width(),
		trans ="slide";
		
	if( winwidth >= 1000 ){
		trans = "none";
	}
	else if( winwidth >= 650 ){
		trans = "fade";
	}

	$.mobile.defaultPageTransition = trans;
}


$(function(){
	setDefaultTransition();
	$( window ).bind( "throttledresize", setDefaultTransition );
});


// Turn off AJAX for local file browsing
if ( location.protocol.substr(0,4)  === 'file' ||
     location.protocol.substr(0,11) === '*-extension' ||
     location.protocol.substr(0,6)  === 'widget' ) {
  $( function() {
    // Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
    // Start with links with only the trailing slash, and then move on to the ones that start with ..
    $( "a" )
      .filter( "[href='/']" ).attr( "href", "/index.html" ).end()
      .filter( "[href^='..']" ).each(function() {
        var href = $( this ).attr( "href" ),
            append = "";

        if ( href.substr(-2, 2) === '..' ) {
          append = "/index.html";
        }
        else if ( href.substr(-1, 1) === '/' ) {
          append = "index.html";
        }
        else if ( href.substr(-4, 4) !== 'html' ) {
          append = "/index.html";
        }
        else if ( href.substr(-2, 2) === '..' ) {
          append = "/index.html";
        }

        this.href = href + append;
      });
  });

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
            "class": "ui-footer ui-bar-e",
            "style": "overflow: auto"
          });

      message
        .append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
        .append( "<p>The AJAX-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers such as Chrome. If you see an error message when you click a link, try a different browser or <a href='https://github.com/jquery/jquery-mobile/wiki/Downloadable-Docs-Help'>view help</a>.</p>" );

      $( document ).bind( "pagecreate", function() {
        $( "div.ui-page" ).append( message );
      });
    });
  });
}

