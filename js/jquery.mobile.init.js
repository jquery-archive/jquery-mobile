//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies classes for grid styling.
//>>label: CSS Grid Tool

define( [ "jquery", "./jquery.mobile.core", "./jquery.mobile.navigation", "./jquery.mobile.navigation.pushstate" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, window, undefined ) {
	var	$html = $( "html" ),
			$head = $( "head" ),
			$window = $( window );

 	// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.mobile.ajaxBlacklist ) {
		$.mobile.ajaxEnabled = false;
	}

	// add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// loading div which appears during Ajax requests
	// will not appear if $.mobile.loadingMessage is false
	var $loader = $( "<div class='ui-loader '><span class='ui-icon ui-icon-loading'></span><h1></h1></div>" );
	
	// For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
	function fakeFixLoader(){
		$loader
			.css({
				top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 ||
				activeBtn.length && activeBtn.offset().top || 100
			});		
	}
	
	// check position of loader to see if it appears to be "fixed" to center
	// if not, use abs positioning
	function checkLoaderPosition(){
		if( $loader.offset().top < $window.scrollTop() ){
			$loader.addClass( "ui-loader-fakefix" );
			fakeFixLoader();
			$window
				.unbind( "scroll", checkLoaderPosition )
				.bind( "scroll", fakeFixLoader );
		}
	}
	

	$.extend($.mobile, {
		// turn on/off page loading message.
		showPageLoadingMsg: function() {
			$html.addClass( "ui-loading" );
			if ( $.mobile.loadingMessage ) {
				var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

				$loader
					.find( "h1" )
						.text( $.mobile.loadingMessage )
						.end()
					.appendTo( $.mobile.pageContainer );
					
				checkLoaderPosition();
				$window.bind( "scroll", checkLoaderPosition );
			}
		},

		hidePageLoadingMsg: function() {
			$html.removeClass( "ui-loading" );
			
			if( $.mobile.loadingMessage ){
				$loader.removeClass( "ui-loader-fakefix" );
			}	
			
			$( window ).unbind( "scroll", fakeFixLoader );
		},

		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var $dialogs, $pages = $( ":jqmData(role='page')" );

			// if no pages are found, check for dialogs or create one with body's inner html
			if ( !$pages.length ) {
				$dialogs = $( ":jqmData(role='dialog')" );

				// if there are no pages but a dialog is present, load it as a page
				if( $dialogs.length ) {
					// alter the attribute so it will be treated as a page unpon enhancement
					// TODO allow for the loading of a dialog as the first page (many considerations)
					$dialogs.first().attr( "data-" + $.mobile.ns + "role", "page" );

					// remove the first dialog from the set of dialogs since it's now a page
					// add it to the empty set of pages to be loaded by the initial changepage
					$pages = $pages.add( $dialogs.get().shift() );
				} else {
					$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
				}
			}


			// add dialogs, set data-url attrs
			$pages.add( ":jqmData(role='dialog')" ).each(function() {
				var $this = $(this);

				// unless the data url is already set set it to the pathname
				if ( !$this.jqmData("url") ) {
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) || location.pathname + location.search );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			// define page container
			$.mobile.pageContainer = $pages.first().parent().addClass( "ui-mobile-viewport" );

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.mobile.showPageLoadingMsg();

			// if hashchange listening is disabled or there's no hash deeplink, change to the first page in the DOM
			if ( !$.mobile.hashListeningEnabled || !$.mobile.path.stripHash( location.hash ) ) {
				$.mobile.changePage( $.mobile.firstPage, { transition: "none", reverse: true, changeHash: false, fromHashChange: true } );
			}
			// otherwise, trigger a hashchange to load a deeplink
			else {
				$window.trigger( "hashchange", [ true ] );
			}
		}
	});

	// initialize events now, after mobileinit has occurred
	$.mobile._registerInternalEvents();

	// check which scrollTop value should be used by scrolling to 1 immediately at domready
	// then check what the scroll top is. Android will report 0... others 1
	// note that this initial scroll won't hide the address bar. It's just for the check.
	$(function() {
		window.scrollTo( 0, 1 );

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $(window).scrollTop() === 1 ) ? 0 : 1;


		// TODO: Implement a proper registration mechanism with dependency handling in order to not have exceptions like the one below
		//auto self-init widgets for those widgets that have a soft dependency on others
		if ( $.fn.controlgroup ) {
			$( document ).bind( "pagecreate create", function( e ){
				$( ":jqmData(role='controlgroup')", e.target ).controlgroup({ excludeInvisible: false });
			});
		}

		//dom-ready inits
		if( $.mobile.autoInitializePage ){
			$.mobile.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load
		$window.load( $.mobile.silentScroll );
	});
}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
