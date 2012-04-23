/*
 * mobile button unit tests
 */
(function($){

	test( "Popup div is associated with a popup widget", function() {
		ok( $("#test-popup" ).data( "popup" ) );
	});

	test( "Popup div parent has class ui-popup-container", function() {
		ok( $("#test-popup" ).parent().hasClass( "ui-popup-container" ) );
	});

	test( "Popup div grandparent is the page", function() {
		ok( $("#test-popup" ).parent().parent().hasClass( "ui-page" ) );
	});

	test( "Popup div is preceded by its screen", function() {
		ok(
			$( "#test-popup" ).parent().prev().hasClass( "ui-selectmenu-screen" ) &&
			$( "#test-popup" ).parent().prev().hasClass( "ui-popup-screen" ) );
	});

	asyncTest( "Popup opens and closes", function() {
		$.testHelper.pageSequence([

			function() {
				$( "#test-popup" ).popup( "open" );
				setTimeout(function() {
					ok( $( "#test-popup" ).parent().hasClass( "in" ), "Open popup container has class 'in'" );
					ok( !$( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Open popup screen is not hidden" );
					$( "#test-popup" ).popup( "close" );
					setTimeout(function() {
						ok( !$( "#test-popup" ).parent().hasClass( "in" ), "Closed popup container does not have class 'in'" );
						ok( $( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Closed popup screen is hidden" );
						start();
					}, 300);
				}, 300);
			}

		]);
	});
})( jQuery );
