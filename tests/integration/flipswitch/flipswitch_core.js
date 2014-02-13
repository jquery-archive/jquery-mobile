/*
 * mobile flipswitch unit tests
 */
(function($){

	var testFocusTransfer = function( element ) {
		expect( 1 );
		$.testHelper.detailedEventCascade([
			function() {
				element.focus();
			},
			{
				focus: {
					src: element.siblings( "a" ),
					event: "focus.TransfersFocus1"
				}
			},
			function( result ) {
				deepEqual( result.focus.timedOut, false,
					"'on' button received focus event" );
				start();
			}
		]);
	};

	asyncTest( "select based flipswitch transfers focus to 'on' button",
		function() {
			testFocusTransfer( $( "#flip-select" ) );
		});

	asyncTest( "checkbox based flipswitch transfers focus to 'on' button",
		function() {
			testFocusTransfer( $( "#flip-checkbox" ) );
		});

})( jQuery );
