/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.mobile.fixedToolbar.js');

	$( "html" ).height( screen.height * 3 );

	function scrollDown(){
		window.scrollTo(0,screen.height );
	}

	function scrollUp(){
		window.scrollTo(0,0);
	}

	module("jquery.mobile.fixedToolbar.js", {setup: function() {
		var startTimeout;

		// swallow the inital page change
		stop();
		$(document).one("pagechange", function() {
			clearTimeout(startTimeout);
		});

		startTimeout = setTimeout(start, 1000);
	}});


	test( "Fixed Header Structural Classes are applied correctly", function(){

		//footer
		ok( !$('#classes-test-a').hasClass('ui-header-fixed'), 'An ordinary header should not have fixed classes');
		ok( $('#classes-test-b').hasClass('ui-header-fixed'), 'An header with data-position=fixed should have ui-header-fixed class');
		ok( $('#classes-test-c').hasClass('ui-header-fullscreen'), 'An header with data-position=fixed and data-fullscreen should have ui-header-fullscreen class');

		//footer
		ok( !$('#classes-test-d').hasClass('ui-footer-fixed'), 'An ordinary footer should not have fixed classes');
		ok( $('#classes-test-e').hasClass('ui-footer-fixed'), 'A footer with data-position=fixed should have ui-footer-fixed class"');
		ok( $('#classes-test-f').hasClass('ui-footer-fullscreen'), 'A footer with data-position=fixed and data-fullscreen should have ui-footer-fullscreen class');

		//parent
		ok( $('#classes-test-b').closest( ".ui-page" ).hasClass( "ui-page-header-fixed" ), "Parent page of a fixed header has class ui-page-header-fixed" );
		ok( $('#classes-test-e').closest( ".ui-page" ).hasClass( "ui-page-footer-fixed" ), "Parent page of a fixed footer has class ui-page-header-fixed" );
		ok( $('#classes-test-c').closest( ".ui-page" ).hasClass( "ui-page-header-fullscreen" ), "Parent page of a fullscreen header has class ui-page-header-fullscreen" );
		ok( $('#classes-test-f').closest( ".ui-page" ).hasClass( "ui-page-footer-fullscreen" ), "Parent page of a fullscreen footer has class ui-page-header-fullscreen" );


	});

	asyncTest( "Fixed header and footer transition classes are applied correctly", function(){

		expect( 6 );

		$.testHelper.sequence([
			function(){
				$( '#classes-test-b, #classes-test-g, #classes-test-e,#classes-test-h,#classes-test-i,#classes-test-j, #classes-test-k' ).fixedtoolbar( "hide" );
				scrollDown();
			},

			function(){
				//show first
				$( '#classes-test-b, #classes-test-g, #classes-test-e,#classes-test-h,#classes-test-i,#classes-test-j, #classes-test-k' ).fixedtoolbar( "show" );
			},

			function() {

				ok( $( '#classes-test-g' ).hasClass('slidedown'), 'The slidedown class should be applied by default');
				ok( $( '#classes-test-k' ).hasClass('in'), 'The "in" class should be applied for fade transitions');
				ok( !$( '#classes-test-h' ).hasClass('slidedown'), 'The slidedown class should not be applied when the header has a data-transition of "none"');

				ok( !$( '#classes-test-h' ).hasClass('in'), 'The "in" class should not be applied when the header has a data-transition of "none"');
				ok( $( '#classes-test-i' ).hasClass('slidedown'), 'The "slidedown" class should  be applied when the header has a data-transition of "slide"');
				ok( $( '#classes-test-j' ).hasClass('slideup'), 'The "slideup" class should  be applied when the footer has a data-transition of "slide"');

			},

			function(){
				scrollUp();
				start();
				}
		], 1000);

	});

	test( "User zooming is disabled when the header is visible and disablePageZoom is true", function(){
		$.mobile.zoom.enable();
		var defaultZoom = $.mobile.fixedtoolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable();
	});

	test( "Meta viewport content is restored to previous state, and zooming renabled, after pagebeforehide", function(){
		$.mobile.zoom.enable( true );
		var defaultZoom = $.mobile.fixedtoolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active" ).trigger( "pagebeforehide" );
		ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable( true );
	});

	test( "User zooming is not disabled when the header is visible and disablePageZoom is false", function(){
		$.mobile.zoom.enable( true );
		var defaultZoom = $.mobile.fixedtoolbar.prototype.options.disablePageZoom;
		$( ".ui-page :jqmData(position='fixed')" ).fixedtoolbar( "option", "disablePageZoom", false );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );

		ok( $.mobile.zoom.enabled, "Viewport scaling is not disabled before page show." );

		$( ".ui-page :jqmData(position='fixed')" ).fixedtoolbar( "option", "disablePageZoom", defaultZoom );

		$.mobile.zoom.enable( true );
	});


	asyncTest( "The hide method is working properly", function() {

		expect( 2 );

		$.testHelper.sequence([
			function(){
				$( '#classes-test-g' ).fixedtoolbar( "show" );
				scrollDown();
			},

			function() {
				$( '#classes-test-g' ).fixedtoolbar( "hide" );

				ok( $( '#classes-test-g' ).hasClass('out'), 'The out class should be applied when hide is called');
			},

			function() {
				ok( $( '#classes-test-g' ).hasClass('ui-fixed-hidden'), 'The toolbar has the ui-fixed-hidden class applied after hide');
				$( '#classes-test-g' ).fixedtoolbar( "show" );

			},

			function(){
				scrollUp();
				start();
			}

		], 500);
	});



	asyncTest( "The show method is working properly", function() {

		expect( 2 );

		$.testHelper.sequence([
			function(){
				scrollDown();
			},

			function() {
				$( '#classes-test-g' ).fixedtoolbar( "hide" );
			},

			function() {
				$( '#classes-test-g' ).fixedtoolbar( "show" );

				ok( $( '#classes-test-g' ).hasClass('in'), 'The in class should be applied when show is called');
			},

			function() {
				ok( !$( '#classes-test-g' ).hasClass('ui-fixed-hidden'), 'The toolbar does not have the ui-fixed-hidden class applied after show');

			},

			function(){
				scrollUp();
				start();
			}
		], 500);
	});


	asyncTest( "The toggle method is working properly", function() {

		expect( 3 );

		$.testHelper.sequence([
			function(){
				scrollDown();
			},

			function(){
				$( '#classes-test-g' ).fixedtoolbar( "show" );
			},

			function() {
				ok( !$( '#classes-test-g' ).hasClass('ui-fixed-hidden'), 'The toolbar does not have the ui-fixed-hidden class');
				$( '#classes-test-g' ).fixedtoolbar( "toggle" );
			},

			function() {
				ok( $( '#classes-test-g' ).hasClass('ui-fixed-hidden'), 'The toolbar does have the ui-fixed-hidden class');
				$( '#classes-test-g' ).fixedtoolbar( "toggle" );
			},

			function() {
				ok( !$( '#classes-test-g' ).hasClass('ui-fixed-hidden'), 'The toolbar does not have the ui-fixed-hidden class');

			},

			function(){
				scrollUp();
				start();
			}

		], 500);
	});


	asyncTest( "The persistent headers and footers are working properly", function() {

		expect( 3 );

		$( "#persist-test-b, #persist-test-a" ).page();

		var nextpageheader =  $( "#persist-test-b .ui-header-fixed" ),
			nextpagefooter =  $( "#persist-test-b .ui-footer-fixed" );


		$.testHelper.pageSequence([
			function(){
				ok( nextpageheader.length && nextpagefooter.length, "next page has fixed header and fixed footer" );
				$.mobile.changePage( "#persist-test-a" );
			},

			function(){
				$( "#persist-test-b" )
					.one( "pagebeforeshow", function(){
						ok( nextpageheader.parent( ".ui-mobile-viewport" ).length, "fixed header and footer are now a child of page container" );
					});

				$.mobile.changePage( "#persist-test-b" );
			},

			function() {
				ok( nextpageheader.parent( ".ui-page" ).length, "fixed header and footer are now a child of page again" );
				$.mobile.changePage( "#default" );
			},

			start
		]);
	});

	asyncTest( "The persistent headers should work without a footer", function() {

		expect( 3 );

		$( "#persist-test-c, #persist-test-d" ).page();

		var nextpageheader =  $( "#persist-test-d .ui-header-fixed" );

		$.testHelper.pageSequence([
			function(){
				ok( nextpageheader.length, "next page has fixed header and fixed footer" );
				$.mobile.changePage( "#persist-test-c" );
			},

			function(){
				$( "#persist-test-d" )
					.one( "pagebeforeshow", function(){
						same( nextpageheader.parent()[0], $.mobile.pageContainer[0], "fixed header is now a child of page container" );
					});

				$.mobile.changePage( "#persist-test-d" );
			},

			function() {
				same( nextpageheader.parent()[0], $.mobile.activePage[0], "fixed header is now a child of page again" );
				$.mobile.changePage( "#default" );
			},

			start
		]);
	});

	asyncTest( "The persistent footers should work without a header", function() {

		expect( 3 );

		$( "#persist-test-e, #persist-test-f" ).page();

		var nextpagefooter =  $( "#persist-test-f .ui-footer-fixed" );

		$.testHelper.pageSequence([
			function(){
				ok( nextpagefooter.length, "next page has fixed footer and fixed footer" );
				$.mobile.changePage( "#persist-test-e" );
			},

			function(){
				$( "#persist-test-f" )
					.one( "pagebeforeshow", function(){
						same( nextpagefooter.parent()[0], $.mobile.pageContainer[0], "fixed footer is now a child of page container" );
					});

				$.mobile.changePage( "#persist-test-f" );
			},

			function() {
				same( nextpagefooter.parent()[0], $.mobile.activePage[0], "fixed footer is now a child of page again" );
				$.mobile.changePage( "#default" );
			},

			start
		]);
	});


	var asyncTestFooterAndHeader = function( pageSelector, areHidden ) {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( pageSelector );
			},

			function() {
				var $footer = $.mobile.activePage.find( ".ui-footer" ),
					$header = $.mobile.activePage.find( ".ui-header" ),
					hidden = areHidden ? "hidden" : "visible";

				equal( $footer.length, 1, "there should be one footer" );
				equal( $header.length, 1, "there should be one header" );

				equal( $footer.hasClass( "ui-fixed-hidden" ), areHidden, "the footer should be " + hiddenStr );
				equal( $header.hasClass( "ui-fixed-hidden" ), areHidden, "the header should be " + hiddenStr );

				$.mobile.changePage( "#default" );
			},

			start
		]);
	};

	asyncTest( "data-visible-on-page-show hides toolbars when false", function() {
		asyncTestFooterAndHeader( "#page-show-visible-false", false );
	});

	asyncTest( "data-visible-on-page-show shows toolbars when explicitly true", function() {
		asyncTestFooterAndHeader( "#page-show-visible-true", true );
	});

	asyncTest( "data-visible-on-page-show shows toolbars when undefined", function() {
		asyncTestFooterAndHeader( "#page-show-visible-undefined", true );
	});
})(jQuery);
