/*
 * Mobile popup unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "jquery.mobile.popup.js" );

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

function popupEnhancementTests( assert, sel, prefix ) {
	var container = sel.parent(),
		screen = sel.parent().prev();

	assert.ok( sel.popup( "instance" ), prefix + ", popup div is associated with a popup widget" );
	assert.hasClasses( sel, "ui-popup",
		prefix + ", popup payload has class 'ui-popup'" );
	assert.hasClasses( container, "ui-popup-container",
		prefix + ", popup div parent has class ui-popup-container" );
	assert.hasClasses( container.parent(), "ui-page",
		prefix + ", popup container parent is the page" );
	assert.hasClasses( screen, "ui-popup-screen",
		prefix + ", popup div is preceded by its screen" );
	assert.ok( container.attr( "id" ) === sel.attr( "id" ) + "-popup",
		prefix + ", popup container has the id of the payload + '-popup'" );
	assert.ok( screen.attr( "id" ) === sel.attr( "id" ) + "-screen",
		prefix + ", popup screen has the id of the payload + '-screen'" );
}

function tolTest( assert, el, popup, val, expected ) {
	el.popup( "option", "tolerance", val );
	assert.deepEqual( popup._tolerance, expected,
		"Popup tolerance: '" + val + "' results in expected tolerances" );
}

QUnit.test( "Popup placement works correctly", function( assert ) {
	var desired, result,
		testElem = $( "#tolerance-test" ),
		popup = testElem.popup( "instance" ),
		clampInfo = popup._clampPopupWidth(),
		wnd = $( window ),
		windowRect = {
			x: wnd.scrollLeft(),
			y: wnd.scrollTop(),
			cx: wnd.width(),
			cy: wnd.height()
		};

	assert.ok( rectInRect( clampInfo.rc, windowRect ), "placement window lies within viewport" );

	clampInfo.menuSize.cx = 120;
	clampInfo.menuSize.cy = 50;

	desired = { x: -12, y: -12 };
	result = popup._calculateFinalLocation( desired, clampInfo );
	assert.ok( rectInRect( {
		x: result.left,
		y: result.top,
		cx: clampInfo.menuSize.cx,
		cy: clampInfo.menuSize.cy
	}, clampInfo.rc ),
		"desired: (" + desired.x + "," + desired.y + ") -> " +
		"result: (" + result.left + "," + result.top + ") lies within the placement window." );

	desired = { x: 23990, y: 19223 };
	result = popup._calculateFinalLocation( desired, clampInfo );
	assert.ok( rectInRect( {
		x: result.left,
		y: result.top,
		cx: clampInfo.menuSize.cx,
		cy: clampInfo.menuSize.cy
	}, clampInfo.rc ),
		"desired: (" + desired.x + "," + desired.y + ") -> " +
		"result: (" + result.left + "," + result.top + ") lies within the placement window." );
} );

QUnit.test( "Popup tolerances are parsed correctly", function( assert ) {
	var tolTestElement = $( "#tolerance-test" ),
		tolTestPopup = tolTestElement.popup( "instance" ),
		defaultValues = tolTestPopup._tolerance;

	assert.ok( (
		$.type( defaultValues.t ) === "number" && !isNaN( defaultValues.t ) &&
		$.type( defaultValues.r ) === "number" && !isNaN( defaultValues.r ) &&
		$.type( defaultValues.b ) === "number" && !isNaN( defaultValues.b ) &&
		$.type( defaultValues.l ) === "number" && !isNaN( defaultValues.l ) ),
			"Default tolerances are numbers and not NaN" );

	tolTest( assert, tolTestElement, tolTestPopup, "", defaultValues );
	tolTest( assert, tolTestElement, tolTestPopup, "0", { t: 0, r: 0, b: 0, l: 0 } );
	tolTest( assert, tolTestElement, tolTestPopup, "14,12", { t: 14, r: 12, b: 14, l: 12 } );
	tolTest( assert, tolTestElement, tolTestPopup, "9,4,11,5", { t: 9, r: 4, b: 11, l: 5 } );
	tolTest( assert, tolTestElement, tolTestPopup, null, defaultValues );
} );

QUnit.test( "Popup is enhanced correctly", function( assert ) {
	popupEnhancementTests( assert, $( "#test-popup" ), "When autoenhanced" );
	assert.ok(
		$( "#page-content" ).children().first().html() === "<!-- placeholder for test-popup -->",
		"When autoenhanced, there is a placeholder in the popup div's original location" );
} );

QUnit.test( "Popup rearranges DOM elements correctly when it is destroyed and again when it is " +
	"re-created", function( assert ) {
		$( "#test-popup" ).popup( "destroy" );

		assert.ok( $( "#page-content" ).children().first().attr( "id" ) === "test-popup",
			"After destroying a popup, its payload is returned to its original location" );
		assert.ok( $( "#page-content" ).children().first().prev().html() !==
		"<!-- placeholder for test-popup -->",
			"No placeholder precedes the restored popup" );
		assert.ok( $( "#page-content" ).children().first().next().html() !==
		"<!-- placeholder for test-popup -->",
			"No placeholder succeedes the restored popup" );

		$( "#test-popup" ).popup();

		popupEnhancementTests( assert, $( "#test-popup" ), "When re-created" );
		assert.ok( $( "#page-content" ).children().first().html() ===
		"<!-- placeholder for test-popup -->",
			"When re-created, there is a placeholder in the popup div's original location" );
	} );

QUnit.test( "On-the-fly popup is enhanced and de-enhanced correctly", function( assert ) {
	var $container = $( "<div></div>" ).appendTo( $( "#page-content" ) ),
		$payload = $( "<p id='otf-popup'>This is an on-the-fly-popup</p>" )
			.appendTo( $container ),
		reference = $payload.clone();

	$payload.popup();

	popupEnhancementTests( assert, $payload, "When created on-the-fly" );
	assert.ok( $container.children().first().html() === "<!-- placeholder for otf-popup -->",
		"When created on-the-fly, there is a placeholder in the popup div's original location" );
	$payload.popup( "destroy" );
	assert.strictEqual( $.testHelper.domEqual( $payload, reference ), true,
		"After destroying on-the-fly popup, the payload is restored" );
	assert.ok( $container.children().is( $payload ),
		"After destroying on-the-fly popup, its payload is returned to its original location" );
} );

} );
