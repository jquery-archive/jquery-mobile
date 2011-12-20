/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.mobile.fixedToolbar.js');
	
	var defaultMeta = "width=device-width, initial-scale=1";
	
	function injectMeta( content ){
		content = content || defaultMeta;
		$( "meta[name=viewport]" ).remove();
		$( "<meta name='viewport' content='"+ content +"'>" ).prependTo( "head" );
	}
	
	$( "html" ).height( screen.height * 3 );
	
	function scrollDown(){
		window.scrollTo(0,screen.height );
	}
	
	function scrollUp(){
		window.scrollTo(0,0);
	}
	

	// add meta viewport tag
	injectMeta();

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
		
				ok( $( '#classes-test-g' ).hasClass('fade'), 'The fade class should be applied by default');
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
	
	test( "User zooming is disabled when the header is visible", function(){
		injectMeta();
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) < 0, "The meta viewport tag's content does not contain , user-scalable=no by default" );
		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) > -1, "After pagebeforeshow, the meta viewport tag's content contains , user-scalable=no" );
		
	});
	
	test( "Meta viewport content is restored to previous state, and zooming renabled, after pagehide", function(){
		injectMeta();
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) < 0, "The meta viewport tag's content does not contain , user-scalable=no by default" );
		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) > -1, "After pagebeforeshow, the meta viewport tag's content contains , user-scalable=no" );
		$( ".ui-page-active" ).trigger( "pagehide" );
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) < 0, "After pagehide, the meta viewport tag's content does not contain , user-scalable=no by default" );
		ok( $( "meta[name=viewport]" ).attr( "content" ) == defaultMeta, "After pagehide, meta viewport content is restored to previous state" );
		$( ".ui-page-active" ).trigger( "pageshow" );
	});
	
	test( "disablePageZoom and restorePageZoom methods properly toggle user-scalable=no on the meta viewport tag", function(){
		injectMeta();
		$( '#classes-test-b' ).fixedtoolbar( "disablePageZoom" );
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ", user-scalable=no" ) > -1, "After pagebeforeshow, the meta viewport tag's content contains , user-scalable=no" );
		$( '#classes-test-b' ).fixedtoolbar( "restorePageZoom" );
		ok( $( "meta[name=viewport]" ).attr( "content" ) == defaultMeta, "After calling restorePageZoom, meta viewport content is restored to previous state" );
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
