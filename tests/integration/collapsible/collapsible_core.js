/*
 * Mobile collapsible unit tests
 */

// TODO split out into separate test files
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
function testExpandCollapse( assert, selector ) {
	var collapsible = $( selector );
	assert.deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed" );
	assert.deepEqual( collapsible.find( "a .ui-collapsible-heading-status" ).text(),
		$.mobile.collapsible.defaults.expandCueText,
		"expand cue text should be set to default" );
	$( selector + " >:header a" ).first().click();
	assert.deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), false, selector + " should be expanded after click" );
	assert.deepEqual( collapsible.find( "a .ui-collapsible-heading-status" ).text(),
		$.mobile.collapsible.defaults.collapseCueText,
		"collapse cue text should be set to default" );

	collapsible.collapsible( "option", "expandedIcon", "arrow-up" );
	assert.deepEqual( $( selector + ">:header a .ui-icon" ).hasClass( "ui-icon-arrow-up" ), true, selector + " when expanded and after setting expanded icon to 'arrow-up' should have class ui-icon-arrow-up." );
	assert.deepEqual( $( selector + ">:header a .ui-icon" ).hasClass( "ui-icon-minus" ), false, selector + " when expanded and after setting expanded icon to 'arrow-up' should not have class ui-icon-minus." );

	$( selector + " >:header a" ).first().click();
	assert.deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed" );
}

function testCornersAndInset( assert, selector, widgetType ) {
	var widget = $( selector );

	widget[ widgetType ]( "option", "inset", false );
	if ( widgetType === "collapsibleset" ) {
		assert.deepEqual( widget.children( ".ui-collapsible" ).length, widget.children( ":not(.ui-collapsible-inset)" ).length, selector + ": Turning off inset causes the class ui-collapsible-inset to be removed from all children." );
	} else {
		assert.deepEqual( widget.hasClass( "ui-collapsible-inset" ), false, selector + ": Turning off inset causes the class ui-collapsible-inset to be removed." );
	}
	assert.deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": non-inset has no corners." );
	widget[ widgetType ]( "option", "corners", false );
	widget[ widgetType ]( "option", "inset", true );
	if ( widgetType === "collapsibleset" ) {
		assert.deepEqual( widget.children( ".ui-collapsible" ).length, widget.children( ".ui-collapsible-inset" ).length, selector + ": Turning on inset causes the class ui-collapsible-inset to be added to all children." );
	} else {
		assert.deepEqual( widget.hasClass( "ui-collapsible-inset" ), true, selector + ": Turning on inset causes the class ui-collapsible-inset to be added." );
	}
	assert.deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": turning off corners while non-inset does not cause ui-corner-all to be re-added after inset is turned back on." );
	widget[ widgetType ]( "option", "inset", false );
	assert.deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": non-inset has no corners." );
	widget[ widgetType ]( "option", "corners", true );
	assert.deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": turning on corners while non-inset does not cause ui-corner-all to be added." );
	widget[ widgetType ]( "option", "inset", true );
	assert.deepEqual( widget.hasClass( "ui-corner-all" ), true, selector + ": turning on inset while corners are on causes ui-corner-all to be added." );
}

QUnit.module( "Collapsible section", {} );

QUnit.test( "The page should be enhanced correctly", function( assert ) {
	assert.ok( $( "#collapsed-collapsible" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
	assert.ok( $( "#collapsed-collapsible >:header" ).hasClass( "ui-collapsible-heading" ), ".ui-collapsible-heading class added to collapsible heading" );
	assert.ok( $( "#collapsed-collapsible > div" ).hasClass( "ui-collapsible-content" ), ".ui-collapsible-content class added to collapsible content" );
	assert.ok( $( "#collapsed-collapsible" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed added to collapsed elements" );
	assert.ok( !$( "#expanded-collapsible" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed not added to expanded elements" );
} );

QUnit.test( "Expand/Collapse", function( assert ) {
	testExpandCollapse( assert, "#collapsed-collapsible" );
} );

QUnit.test( "Expand/Collapse for pre-rendered", function( assert ) {
	testExpandCollapse( assert, "#pre-rendered-collapsible" );
} );

QUnit.test( "Corners and inset", function( assert ) {
	testCornersAndInset( assert, "#collapsed-collapsible", "collapsible" );
} );

QUnit.test( "Corners and inset for pre-rendered", function( assert ) {
	testCornersAndInset( assert, "#pre-rendered-collapsible", "collapsible" );
} );

QUnit.module( "Collapsible set", {} );

QUnit.test( "The page should be enhanced correctly", function( assert ) {
	assert.ok( $( "#basic-collapsible-set" ).hasClass( "ui-collapsible-set" ), ".ui-collapsible-set class added to collapsible set" );
	assert.ok( $( "#basic-collapsible-set > div" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
	$( ".ui-collapsible-set" ).each( function() {
		var $this = $( this );

		if ( $this.children().length > 0 ) {
			assert.ok( $this.find( ".ui-collapsible" ).first().hasClass( "ui-first-child" ), $this.attr( "id" ) + ": First collapsible header button should have class ui-first-child" );
			assert.ok( $this.find( ".ui-collapsible" ).last().hasClass( "ui-last-child" ), $this.attr( "id" ) + ": Last collapsible header button should have class ui-last-child" );
		}
	} );
} );

QUnit.test( "Option setting works correctly", function( assert ) {
	var set = $( "#collapsible-options-test" ),
		secondChild = set.children( ":nth(1)" ),
		anchors = set.find( "a" ),
		nMatching;

	set.collapsibleset( "option", "mini", true );
	nMatching = 0;
	anchors.each( function() {
		if ( $( this ).hasClass( "ui-mini" ) ) {
			nMatching++;
		}
	} );
	assert.deepEqual( nMatching, 3, "After setting mini on the set, all three collapsibles are mini" );

	secondChild.collapsible( "option", "mini", false );
	nMatching = 0;
	anchors.each( function() {
		if ( $( this ).hasClass( "ui-mini" ) ) {
			nMatching++;
		}
	} );
	assert.deepEqual( nMatching, 2, "After turning off mini on the second child, only two collapsibles are mini" );

	set.collapsibleset( "option", "mini", false );
	nMatching = 0;
	anchors.each( function() {
		if ( $( this ).hasClass( "ui-mini" ) ) {
			nMatching++;
		}
	} );
	assert.deepEqual( nMatching, 0, "After unsetting mini on the set, no collapsibles are mini" );

	set.collapsibleset( "option", "mini", true );
	nMatching = 0;
	anchors.each( function() {
		if ( $( this ).hasClass( "ui-mini" ) ) {
			nMatching++;
		}
	} );
	assert.deepEqual( nMatching, 2, "After setting mini on the set again, only two collapsibles are mini" );
} );

QUnit.test( "Section expanded by default", function( assert ) {
	assert.equal( $( "#basic-collapsible-set .ui-collapsible-collapsed" ).length, 2, "There should be 2 section collapsed" );
	assert.ok( !$( "#basic-collapsible-set >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), "Section B should be expanded" );
} );

QUnit.test( "Expand/Collapse", function( assert ) {
	assert.ok( $( "#basic-collapsible-set .ui-collapsible" ).eq( 0 ).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed" );
	$( "#basic-collapsible-set .ui-collapsible-heading-toggle" ).eq( 0 ).click();
	assert.ok( !$( "#basic-collapsible-set .ui-collapsible" ).eq( 0 ).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click" );
	$( "#basic-collapsible-set .ui-collapsible-heading-toggle" ).eq( 0 ).click();
	assert.ok( $( "#basic-collapsible-set .ui-collapsible" ).hasClass( "ui-collapsible-collapsed" ), "All collapsible should be collapsed" );
} );

QUnit.test( "Corners and inset", function( assert ) {
	testCornersAndInset( assert, "#basic-collapsible-set", "collapsibleset" );
} );

QUnit.test( "Collapsible Set with dynamic content", function( assert ) {
	var set = $( "#dynamic-content" );

	for ( var i = 0; i < 3; i++ ) {
		$( "<div data-" + $.mobile.ns + "role='collapsible'><h3>Collapsible Item " + i + "</h3></div>" ).appendTo( set );
	}
	set.collapsibleset( "refresh" );
	assert.equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
	assert.ok( set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-first-child" ), "The 1st collapsible should have top corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-last-child" ), "The 1st collapsible should NOT have bottom corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-first-child" ), "The 2nd collapsible should NOT have top corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-last-child" ), "The 2nd collapsible should NOT have bottom corners" );
	assert.ok( set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-last-child" ), "The 3rd collapsible should have bottom corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-first-child" ), "The 3rd collapsible should NOT have top corners" );
} );

QUnit.test( "Collapsible Set with static and dynamic content", function( assert ) {
	var set = $( "#static-and-dynamic" );

	for ( var i = 0; i < 2; i++ ) {
		$( "<div data-" + $.mobile.ns + "role='collapsible'><h3>Collapsible Item " + i + "</h3></div>" ).appendTo( set );
	}
	set.collapsibleset( "refresh" );
	assert.equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
	assert.ok( set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-first-child" ), "The 1st collapsible should have top corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-last-child" ), "The 1st collapsible should NOT have bottom corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-first-child" ), "The 2nd collapsible should NOT have top corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-last-child" ), "The 2nd collapsible should NOT have bottom corners" );
	assert.ok( set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-last-child" ), "The 3rd collapsible should have bottom corners" );
	assert.ok( !set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-first-child" ), "The 3rd collapsible should NOT have top corners" );
} );

QUnit.test( "Collapsible set with last collapsible expanded", function( assert ) {
	assert.ok( $( "#last-collapsible-expanded .ui-collapsible" ).last().hasClass( "ui-last-child" ), "Content of last collapsible should have class ui-last-child" );
} );

QUnit.test( "Collapsible set with legend", function( assert ) {
	var collapsibles = $( "#legend-based" ).find( ".ui-collapsible-heading" );

	assert.ok( !collapsibles.eq( 0 ).is( ".ui-first-child" ), "First collapsible should NOT have class ui-last-child" );
	assert.ok( !collapsibles.eq( 1 ).is( ".ui-last-child,.ui-first-child" ), "Middle collapsible should NOT have class ui-first-child or ui-last-child" );
	assert.ok( !collapsibles.eq( 2 ).is( ".ui-first-child" ), "Last collapsible should NOT have class ui-first-child" );
} );

QUnit.module( "Icons", {} );

QUnit.test( "expandedIcon behavior when collapsedIcon set to false", function( assert ) {
	var collapsible = $( "#collapsible-collapsed-icon-false-expanded-icon" );
	collapsible.collapsible( "expand" );
	collapsible.collapsible( "option", "collapsedIcon", false );
	assert.deepEqual( collapsible.find( "a" ).hasClass( "ui-icon-minus" ),
		false, "Turning off collapsedIcon makes expanded icon disappear" );
	collapsible.collapsible( "option", "collapsedIcon", "plus" );
	assert.deepEqual( collapsible.find( "a .ui-icon" ).hasClass( "ui-icon-minus" ),
		true, "Turning on collapsedIcon makes expanded icon reappear" );
} );

QUnit.test( "Collapsible with custom icons", function( assert ) {
	var collapsibles = $( "#collapsible-with-custom-icons" ).find( ".ui-collapsible" );

	assert.ok( collapsibles.eq( 0 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus" );
	assert.ok( collapsibles.eq( 2 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r" );
	assert.ok( collapsibles.eq( 3 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-d" ), "Heading of fourth collapsible should have class ui-icon-arrow-d" );

	// Issue #4801: BEGIN
	assert.ok( collapsibles.eq( 4 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should have class ui-icon-info" );
	collapsibles.eq( 4 ).trigger( "expand" );
	assert.ok( collapsibles.eq( 4 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should STILL have class ui-icon-info after click" );

	// Issue #4801: END
} );

QUnit.test( "Collapsible sets with custom icons", function( assert ) {
	var collapsibles = $( "#collapsible-set-with-custom-icons" ).find( ".ui-collapsible" );

	assert.ok( collapsibles.eq( 0 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus" );
	assert.ok( collapsibles.eq( 2 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r" );
	assert.ok( collapsibles.eq( 3 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of fourth collapsible should have class ui-icon-arrow-r" );
	assert.ok( collapsibles.eq( 4 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-l" ), "Heading of fifth collapsible should have class ui-icon-arrow-l" );
	assert.ok( collapsibles.eq( 5 ).find( ".ui-button .ui-icon" ).hasClass( "ui-icon-arrow-u" ), "Heading of sixth collapsible should have class ui-icon-arrow-u" );
} );

QUnit.module( "Theming", {} );

QUnit.test( "Collapsible", 6, function( assert ) {
	var collapsibles = $( "#collapsible-with-theming" ).find( ".ui-collapsible" );

	assert.ok( collapsibles.eq( 0 ).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-button-a" ), "Heading of first collapsible should have class ui-button-a" );
	assert.ok( !collapsibles.eq( 0 ).find( ".ui-collapsible-content" ).hasClass( "ui-button-a" ), "Content of first collapsible should NOT have class ui-button-a" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-button-b" ), "Heading of second collapsible should have class ui-button-b" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-body-b" );
	assert.ok( collapsibles.eq( 2 ).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-button-c" ), "Heading of third collapsible should have class ui-button-c" );
	assert.ok( collapsibles.eq( 2 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-c" ), "Content of third collapsible should have class ui-body-c" );
} );

QUnit.test( "Collapsible Set", function( assert ) {
	var collapsibles = $( "#collapsible-set-with-theming" ).find( ".ui-collapsible" );

	assert.ok( collapsibles.eq( 0 ).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-button-a" ), "Heading of first collapsible should have class ui-button-a" );
	assert.ok( !collapsibles.eq( 0 ).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of first collapsible should NOT have class ui-body-[a,b,c]" );
	assert.ok( collapsibles.eq( 0 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of first collapsible should NOT have class ui-body-d" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-button-b" ), "Heading of second collapsible should have class ui-button-b" );
	assert.ok( !collapsibles.eq( 1 ).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-c,.ui-body-d" ), "Content of second collapsible should NOT have class ui-body-[a,c,d]" );
	assert.ok( collapsibles.eq( 1 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-body-b" );
	assert.deepEqual( collapsibles.eq( 2 ).find( ".ui-collapsible-heading-toggle" ).css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-button-b in the default theme */
	assert.ok( !collapsibles.eq( 2 ).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of third collapsible should NOT have class ui-body-[a,b,c]" );
	assert.ok( collapsibles.eq( 2 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of third collapsible should have class ui-body-d" );
	assert.ok( !collapsibles.eq( 2 ).find( ".ui-collapsible-content" ).hasClass( "ui-collapsible-content-collapsed" ), "Content of third collapsible should NOT have class ui-collapsible-content-collapsed" );
	assert.deepEqual( collapsibles.eq( 3 ).find( ".ui-collapsible-heading-toggle" ).css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-button-b in the default theme */
	assert.ok( !collapsibles.eq( 3 ).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of fourth collapsible should NOT have class ui-body-[a,b,c]" );
	assert.ok( collapsibles.eq( 3 ).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of fourth collapsible should have class ui-body-d" );
} );

QUnit.module( "Instantiation/destruction" );

QUnit.test( "Collapsible and collapsible set _destroy() works", function( assert ) {
	var $inplace = $( "#destroy-test" ).children().attr( "data-" + $.mobile.ns + "role", "collapsible" ).end(),
		$orig = $inplace.clone();

	$inplace.collapsibleset().collapsibleset( "destroy" );
	assert.ok( $.testHelper.domEqual( $inplace, $orig ), "Collapsible set after instantiation and destruction is identical to a clone of the original." );
} );

QUnit.module( "Collapsible inherits options from parent collapsibleset" );
QUnit.test( "theme", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "theme", "b" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "theme" ), null,
		"Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "theme" ), "a",
		"Option not set on explicitly assigned child collapsible" );
	assert.deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-button-b" ), true,
		"Inheriting collapsible has theme 'b'" );
	assert.deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-button-a" ), true,
		"Explicitly assigned collapsible has theme 'a'" );
} );
QUnit.test( "contentTheme", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "contentTheme", "b" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "contentTheme" ),
		null, "Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "contentTheme" ),
		"a", "Option not set on explicitly assigned child collapsible" );
	assert.deepEqual( $( "#inherits" ).children().last().hasClass( "ui-body-b" ),
		true, "Inheriting collapsible has content theme 'b'" );
	assert.deepEqual( $( "#explicit" ).children().last().hasClass( "ui-body-a" ),
		true, "Explicitly assigned collapsible has content theme 'a'" );
} );
QUnit.test( "collapsedIcon", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "collapsedIcon",
		"forward" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "collapsedIcon" ),
		null, "Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "collapsedIcon" ),
		"plus", "Option not set on explicitly assigned child collapsible" );
	assert.deepEqual( $( "#inherits" ).find( "a .ui-icon" ).hasClass( "ui-icon-forward" ),
		true, "Inheriting collapsible has collapsedIcon 'forward'" );
	assert.deepEqual( $( "#explicit" ).find( "a .ui-icon" ).hasClass( "ui-icon-plus" ),
		true, "Explicitly assigned collapsible has collapsedIcon 'plus'" );
} );
QUnit.test( "expandedIcon", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "expandedIcon", "back" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "expandedIcon" ),
		null, "Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "expandedIcon" ),
		"minus",
		"Option not set on explicitly assigned child collapsible" );
	$( "#inherits" ).collapsible( "expand" );
	assert.deepEqual( $( "#inherits" ).find( "a .ui-icon" ).hasClass( "ui-icon-back" ),
		true, "Inheriting collapsible has expandedIcon 'back'" );
	$( "#explicit" ).collapsible( "expand" );
	assert.deepEqual( $( "#explicit" ).find( "a .ui-icon" ).hasClass( "ui-icon-minus" ),
		true, "Explicitly assigned collapsible has expandedIcon 'minus'" );
} );
QUnit.test( "iconpos", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "iconpos", "end" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "iconpos" ),
		null, "Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "iconpos" ),
		"beginning",
		"Option not set on explicitly assigned child collapsible" );
} );
QUnit.test( "mini", function( assert ) {
	$( "#inherit-test" ).collapsibleset( "option", "mini", "true" );

	assert.deepEqual( $( "#inherits" ).collapsible( "option", "mini" ),
		null, "Option not set on inheriting child collapsible" );
	assert.deepEqual( $( "#explicit" ).collapsible( "option", "mini" ), false,
		"Option not set on explicitly assigned child collapsible" );
	assert.deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-mini" ),
		true, "Inheriting collapsible is mini" );
	assert.deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-mini" ),
		false, "Explicitly assigned collapsible is not mini" );
} );
} );
