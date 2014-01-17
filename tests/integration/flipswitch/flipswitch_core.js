/*
 * mobile flipswitch unit tests
 */
(function($){

	var testFocusTransfer = function( el ) {
		expect( 1 );
		$.testHelper.detailedEventCascade([
			function() {
				el.focus();
			},
			{
				focus: { src: el.siblings( "a" ), event: "focus.TransfersFocus1" }
			},
			function( result ) {
				deepEqual( result.focus.timedOut, false, "'on' button received focus event" );
				start();
			}
		]);
	};

	asyncTest( "select based flipswitch transfers focus to 'on' button", function() {
		testFocusTransfer( $( "#flip-select" ) );
	});

	asyncTest( "checkbox based flipswitch transfers focus to 'on' button", function() {
		testFocusTransfer( $( "#flip-checkbox" ) );
	});

})( jQuery );
