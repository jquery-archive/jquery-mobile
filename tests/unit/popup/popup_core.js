/*
 * mobile popup unit tests
 */
(function($){

	module( "jquery.mobile.popup.js");

	function pointInRect( pt, rc ) {
		return ( pt.x >= rc.x && pt.x <= rc.x + rc.cx && pt.y >= rc.y && pt.y <= rc.y + rc.cy );
	}

	function rectInRect( small, large ) {
		return (
			pointInRect( { x: small.x, y: small.y }, large ) &&
			pointInRect( { x: small.x + small.cx, y: small.cy }, large ) &&
			pointInRect( { x: small.x, y: small.y + small.cy }, large ) &&
			pointInRect( { x: small.x + small.cx, y: small.y + small.cy }, large ) );
	}

	function popupEnhancementTests( $sel, prefix ) {
		var $container = $sel.parent(), $screen = $sel.parent().prev();

		ok( $sel.data( "mobile-popup" ),  prefix + ", popup div is associated with a popup widget" );
		ok( $sel.hasClass( "ui-popup" ),  prefix + ", popup payload has class 'ui-popup'" );
		ok( $container.hasClass( "ui-popup-container" ), prefix + ", popup div parent has class ui-popup-container" );
		ok( $container.parent().hasClass( "ui-page" ), prefix + ", popup container parent is the page" );
		ok( $screen.hasClass( "ui-popup-screen" ), prefix + ", popup div is preceded by its screen" );
		ok( $container.attr( "id" ) === $sel.attr( "id" ) + "-popup", prefix + ", popup container has the id of the payload + '-popup'" );
		ok( $screen.attr( "id" ) === $sel.attr( "id" ) + "-screen", prefix + ", popup screen has the id of the payload + '-screen'" );
	}

	function tolTest( el, popup, val, expected ) {
		el.popup( "option", "tolerance", val );
		deepEqual( popup._tolerance, expected, "Popup tolerance: '" + val + "' results in expected tolerances" );
	}

	test( "Popup placement works correctly", function() {
		var desired, result,
			testElem = $( "#tolerance-test" ),
			popup = testElem.data( "mobile-popup" ),
			clampInfo = popup._clampPopupWidth(),
			wnd = $( window ),
			windowRect = {
				x: wnd.scrollLeft(),
				y: wnd.scrollTop(),
				cx: wnd.width(),
				cy: wnd.height()
			};

		ok( rectInRect( clampInfo.rc, windowRect ), "placement window lies within viewport" );

		clampInfo.menuSize.cx = 120;
		clampInfo.menuSize.cy = 50;

		desired = { x: -12, y: -12 };
		result = popup._calculateFinalLocation( desired, clampInfo );
		ok( rectInRect( {
				x: result.left,
				y: result.top,
				cx: clampInfo.menuSize.cx,
				cy: clampInfo.menuSize.cy
			}, clampInfo.rc ),
			"desired: (" + desired.x + "," + desired.y + ") -> " +
			"result: (" + result.left + "," + result.top + ") lies within the placement window." );

		desired = { x: 23990, y: 19223 };
		result = popup._calculateFinalLocation( desired, clampInfo );
		ok( rectInRect( {
				x: result.left,
				y: result.top,
				cx: clampInfo.menuSize.cx,
				cy: clampInfo.menuSize.cy
			}, clampInfo.rc ),
			"desired: (" + desired.x + "," + desired.y + ") -> " +
			"result: (" + result.left + "," + result.top + ") lies within the placement window." );
	});

	test( "Popup tolerances are parsed correctly", function() {
		var tolTestElement = $( "#tolerance-test" ),
			tolTestPopup = tolTestElement.data( "mobile-popup" ),
			defaultValues = tolTestPopup._tolerance;

		ok( (
			$.type( defaultValues.t ) === "number" && !isNaN( defaultValues.t ) &&
			$.type( defaultValues.r ) === "number" && !isNaN( defaultValues.r ) &&
			$.type( defaultValues.b ) === "number" && !isNaN( defaultValues.b ) &&
			$.type( defaultValues.l ) === "number" && !isNaN( defaultValues.l ) ), "Default tolerances are numbers and not NaN" );

		tolTest( tolTestElement, tolTestPopup, "", defaultValues );
		tolTest( tolTestElement, tolTestPopup, "0", { t: 0, r: 0, b: 0, l: 0 } );
		tolTest( tolTestElement, tolTestPopup, "14,12", { t: 14, r: 12, b: 14, l: 12 } );
		tolTest( tolTestElement, tolTestPopup, "9,4,11,5", { t: 9, r: 4, b: 11, l: 5 } );
		tolTest( tolTestElement, tolTestPopup, null, defaultValues );
	});

	test( "Popup is enhanced correctly", function() {
		popupEnhancementTests( $( "#test-popup" ), "When autoenhanced" );
		ok( $( "#page-content" ).children().first().html() === "<!-- placeholder for test-popup -->", "When autoenhanced, there is a placeholder in the popup div's original location" );
	});

	test( "Popup rearranges DOM elements correctly when it is destroyed and again when it is re-created", function() {
		$( "#test-popup" ).popup( "destroy" );

		ok( $( "#page-content" ).children().first().attr( "id" ) === "test-popup", "After destroying a popup, its payload is returned to its original location" );
		ok( $( "#page-content" ).children().first().prev().html() !== "<!-- placeholder for test-popup -->", "No placeholder precedes the restored popup" );
		ok( $( "#page-content" ).children().first().next().html() !== "<!-- placeholder for test-popup -->", "No placeholder succeedes the restored popup" );

		$( "#test-popup" ).popup();

		popupEnhancementTests( $( "#test-popup" ), "When re-created" );
		ok( $( "#page-content" ).children().first().html() === "<!-- placeholder for test-popup -->", "When re-created, there is a placeholder in the popup div's original location" );
	});

	test( "On-the-fly popup is enhanced and de-enhanced correctly", function() {
		var $container = $( "<div></div>" ).appendTo( $( "#page-content" ) ),
			$payload = $( "<p id='otf-popup'>This is an on-the-fly-popup</p>" ).appendTo( $container );

		$payload.popup();

		popupEnhancementTests( $payload, "When created on-the-fly" );
		ok( $container.children().first().html() === "<!-- placeholder for otf-popup -->", "When created on-the-fly, there is a placeholder in the popup div's original location" );
		$payload.popup( "destroy" );
		ok( !$payload.attr( "class" ), "After destroying on-the-fly popup, the payload has no 'class' attribute" );
		ok( $container.children().is( $payload ), "After destroying on-the-fly popup, its payload is returned to its original location" );
	});

})( jQuery );
