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
		ok( $('#classes-test-b').closest( ".ui-page" ).hasClass( "ui-page-header-fixed" ), "Parent page of a fixed header has class ui-page-header-fixed" )
		ok( $('#classes-test-e').closest( ".ui-page" ).hasClass( "ui-page-footer-fixed" ), "Parent page of a fixed footer has class ui-page-header-fixed" )
		ok( $('#classes-test-c').closest( ".ui-page" ).hasClass( "ui-page-header-fullscreen" ), "Parent page of a fullscreen header has class ui-page-header-fullscreen" )
		ok( $('#classes-test-f').closest( ".ui-page" ).hasClass( "ui-page-footer-fullscreen" ), "Parent page of a fullscreen footer has class ui-page-header-fullscreen" )


	});

	asyncTest( "Fixed header and footer transition classes are applied correctly", function(){

		expect( 6 );

		$.testHelper.sequence([
			function(){
				scrollDown();
			},

			function(){
				//show first
				$( '#classes-test-b, #classes-test-g, #classes-test-e,#classes-test-h,#classes-test-i,#classes-test-j' ).fixedtoolbar( "show" );
			},

			function() {
				ok( $( '#classes-test-g' ).hasClass('slidedown'), 'The slidedown class should be applied by default');
				ok( $( '#classes-test-b' ).hasClass('in'), 'The "in" class should be applied by default');
				ok( !$( '#classes-test-h' ).hasClass('fade'), 'The fade class should not be applied when the header has a data-transition of "none"');

				ok( !$( '#classes-test-h' ).hasClass('in'), 'The "in" class should not be applied when the header has a data-transition of "none"');
				ok( $( '#classes-test-i' ).hasClass('slidedown'), 'The "slidedown" class should  be applied when the header has a data-transition of "slide"');
				ok( $( '#classes-test-j' ).hasClass('slideup'), 'The "slideup" class should  be applied when the footer has a data-transition of "slide"');

			},

			function(){
				scrollUp();
				start();
				}
		], 500);

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
		$.mobile.zoom.enable();
		var defaultZoom = $.mobile.fixedtoolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active" ).trigger( "pagebeforehide" );
		ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
		$( ".ui-page-active .ui-header-fixed" ).fixedtoolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable();
	});

	test( "User zooming is not disabled when the header is visible and disablePageZoom is false", function(){
		$.mobile.zoom.enable();
		var defaultZoom = $.mobile.fixedtoolbar.prototype.options.disablePageZoom;
		$( ":jqmData(position='fixed')" ).fixedtoolbar( "option", "disablePageZoom", false );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );

		ok( $.mobile.zoom.enabled, "Viewport scaling is not disabled before page show." );

		$( ":jqmData(position='fixed')" ).fixedtoolbar( "option", "disablePageZoom", defaultZoom );

		$.mobile.zoom.enable();
	});


	asyncTest( "The hide method is working properly", function() {

		expect( 2 );

		$.testHelper.sequence([
			function(){
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





})(jQuery);
