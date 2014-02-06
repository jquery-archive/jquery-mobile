/*
 * mobile collapsible unit tests
 */

// TODO split out into seperate test files
(function( $ ){
	function testExpandCollapse( selector ) {
		var collapsible = $( selector );
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed");
		deepEqual( collapsible.find( "a span" ).text(),
			$.mobile.collapsible.defaults.expandCueText,
			"expand cue text should be set to default" );
		$( selector + " >:header a" ).first().click();
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), false, selector + " should be expanded after click");
		deepEqual( collapsible.find( "a span" ).text(),
			$.mobile.collapsible.defaults.collapseCueText,
			"collapse cue text should be set to default" );

		collapsible.collapsible( "option", "expandedIcon", "arrow-up" );
		deepEqual( $( selector + ">:header a" ).hasClass( "ui-icon-arrow-up" ), true, selector + " when expanded and after setting expanded icon to 'arrow-up' should have class ui-icon-arrow-up." );
		deepEqual( $( selector + ">:header a" ).hasClass( "ui-icon-minus" ), false, selector + " when expanded and after setting expanded icon to 'arrow-up' should not have class ui-icon-minus." );

		$( selector + " >:header a" ).first().click();
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed");
	}

	function testCornersAndInset( selector, widgetType ) {
		var widget = $( selector );

		widget[ widgetType ]( "option", "inset", false );
		if ( widgetType === "collapsibleset" ) {
			deepEqual( widget.children( ".ui-collapsible" ).length, widget.children( ":not(.ui-collapsible-inset)" ).length, selector + ": Turning off inset causes the class ui-collapsible-inset to be removed from all children." );
		} else {
			deepEqual( widget.hasClass( "ui-collapsible-inset" ), false, selector + ": Turning off inset causes the class ui-collapsible-inset to be removed." );
		}
		deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": non-inset has no corners." );
		widget[ widgetType ]( "option", "corners", false );
		widget[ widgetType ]( "option", "inset", true );
		if ( widgetType === "collapsibleset" ) {
			deepEqual( widget.children( ".ui-collapsible" ).length, widget.children( ".ui-collapsible-inset" ).length, selector + ": Turning on inset causes the class ui-collapsible-inset to be added to all children." );
		} else {
			deepEqual( widget.hasClass( "ui-collapsible-inset" ), true, selector + ": Turning on inset causes the class ui-collapsible-inset to be added." );
		}
		deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": turning off corners while non-inset does not cause ui-corner-all to be re-added after inset is turned back on." );
		widget[ widgetType ]( "option", "inset", false );
		deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": non-inset has no corners." );
		widget[ widgetType ]( "option", "corners", true );
		deepEqual( widget.hasClass( "ui-corner-all" ), false, selector + ": turning on corners while non-inset does not cause ui-corner-all to be added." );
		widget[ widgetType ]( "option", "inset", true );
		deepEqual( widget.hasClass( "ui-corner-all" ), true, selector + ": turning on inset while corners are on causes ui-corner-all to be added." );
	}

	module( "Collapsible section", {});

	test( "The page should be enhanced correctly", function(){
		ok($( "#collapsed-collapsible" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
		ok($( "#collapsed-collapsible >:header" ).hasClass( "ui-collapsible-heading" ), ".ui-collapsible-heading class added to collapsible heading" );
		ok($( "#collapsed-collapsible > div" ).hasClass( "ui-collapsible-content" ), ".ui-collapsible-content class added to collapsible content" );
		ok($( "#collapsed-collapsible" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed added to collapsed elements" );
		ok(!$( "#expanded-collapsible" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed not added to expanded elements" );
	});

	test( "Expand/Collapse", function(){
		testExpandCollapse( "#collapsed-collapsible" );
	});

	test( "Expand/Collapse for pre-rendered", function(){
		testExpandCollapse( "#pre-rendered-collapsible" );
	});

	test( "Corners and inset", function() {
		testCornersAndInset( "#collapsed-collapsible", "collapsible" );
	});

	test( "Corners and inset for pre-rendered", function() {
		testCornersAndInset( "#pre-rendered-collapsible", "collapsible" );
	});

	test( "iconpos option accepts arbitrary values", function() {
		var collapsible = $( "#collapsible-iconpos-test" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-xyzzy" ),
			true, "Initially anchor has class ui-btn-icon-xyzzy" );
		collapsible.collapsible( "option", "iconpos", "gnurbles" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-xyzzy" ),
			false, "After setting iconpos option anchor no longer has class " +
				"ui-btn-icon-xyzzy" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-gnurbles" ),
			true, "After setting iconpos option anchor has class " +
				"ui-btn-icon-gnurbles" );
	});

	module( "Collapsible set", {});

	test( "The page should be enhanced correctly", function(){
		ok($( "#basic-collapsible-set" ).hasClass( "ui-collapsible-set" ), ".ui-collapsible-set class added to collapsible set" );
		ok($( "#basic-collapsible-set > div" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
		$( ".ui-collapsible-set" ).each(function() {
			var $this = $( this );

			if ( $this.children().length > 0 ) {
				ok($this.find( ".ui-collapsible" ).first().hasClass( "ui-first-child" ), $this.attr( "id" ) + ": First collapsible header button should have class ui-first-child" );
				ok($this.find( ".ui-collapsible" ).last().hasClass( "ui-last-child" ), $this.attr( "id" ) + ": Last collapsible header button should have class ui-last-child" );
			}
		});
	});

	test( "Option setting works correctly", function() {
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
		});
		deepEqual( nMatching, 3, "After setting mini on the set, all three collapsibles are mini" );

		secondChild.collapsible( "option", "mini", false );
		nMatching = 0;
		anchors.each( function() {
			if ( $( this ).hasClass( "ui-mini" ) ) {
				nMatching++;
			}
		});
		deepEqual( nMatching, 2, "After turning off mini on the second child, only two collapsibles are mini" );

		set.collapsibleset( "option", "mini", false );
		nMatching = 0;
		anchors.each( function() {
			if ( $( this ).hasClass( "ui-mini" ) ) {
				nMatching++;
			}
		});
		deepEqual( nMatching, 0, "After unsetting mini on the set, no collapsibles are mini" );

		set.collapsibleset( "option", "mini", true );
		nMatching = 0;
		anchors.each( function() {
			if ( $( this ).hasClass( "ui-mini" ) ) {
				nMatching++;
			}
		});
		deepEqual( nMatching, 2, "After setting mini on the set again, only two collapsibles are mini" );
	});

	test( "Section expanded by default", function(){
		equal($( "#basic-collapsible-set .ui-collapsible-collapsed" ).length, 2, "There should be 2 section collapsed" );
		ok(!$( "#basic-collapsible-set >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), "Section B should be expanded" );
	});

	test( "Expand/Collapse", function(){
		ok($( "#basic-collapsible-set .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
		$( "#basic-collapsible-set .ui-collapsible-heading-toggle" ).eq(0).click();
		ok(!$( "#basic-collapsible-set .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click");
		$( "#basic-collapsible-set .ui-collapsible-heading-toggle" ).eq(0).click();
		ok($( "#basic-collapsible-set .ui-collapsible" ).hasClass( "ui-collapsible-collapsed" ), "All collapsible should be collapsed");
	});

	test( "Corners and inset", function() {
		testCornersAndInset( "#basic-collapsible-set", "collapsibleset" );
	});

	test( "Collapsible Set with dynamic content", function(){
		var set = $( "#dynamic-content" );

		for ( var i = 0; i < 3; i++ ) {
			$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
		}
		set.collapsibleset( "refresh" );
		equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
		ok( set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-first-child" ), "The 1st collapsible should have top corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-last-child" ), "The 1st collapsible should NOT have bottom corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-first-child" ), "The 2nd collapsible should NOT have top corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-last-child" ), "The 2nd collapsible should NOT have bottom corners" );
		ok( set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-last-child" ), "The 3rd collapsible should have bottom corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-first-child" ), "The 3rd collapsible should NOT have top corners" );
	});

	test( "Collapsible Set with static and dynamic content", function(){
		var set = $( "#static-and-dynamic" );

		for ( var i = 0; i < 2; i++ ) {
			$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
		}
		set.collapsibleset( "refresh" );
		equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
		ok( set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-first-child" ), "The 1st collapsible should have top corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 0 ).hasClass( "ui-last-child" ), "The 1st collapsible should NOT have bottom corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-first-child" ), "The 2nd collapsible should NOT have top corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 1 ).hasClass( "ui-last-child" ), "The 2nd collapsible should NOT have bottom corners" );
		ok( set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-last-child" ), "The 3rd collapsible should have bottom corners" );
		ok( !set.find( ".ui-collapsible" ).eq( 2 ).hasClass( "ui-first-child" ), "The 3rd collapsible should NOT have top corners" );
	});

	test( "Collapsible set with last collapsible expanded", function(){
		ok( $( "#last-collapsible-expanded .ui-collapsible" ).last().hasClass( "ui-last-child" ), "Content of last collapsible should have class ui-last-child");
	});

	test( "Collapsible set with legend", function(){
		var collapsibles = $( "#legend-based" ).find( ".ui-collapsible-heading" );

		ok( !collapsibles.eq(0).is( ".ui-first-child" ), "First collapsible should NOT have class ui-last-child");
		ok( !collapsibles.eq(1).is( ".ui-last-child,.ui-first-child" ), "Middle collapsible should NOT have class ui-first-child or ui-last-child");
		ok( !collapsibles.eq(2).is( ".ui-first-child" ), "Last collapsible should NOT have class ui-first-child");
	});
	
	module( "Icons", {});

	test( "expandedIcon behavior when collapsedIcon set to false", function() {
		var collapsible = $( "#collapsible-collapsed-icon-false-expanded-icon" );
		collapsible.collapsible( "expand" );
		collapsible.collapsible( "option", "collapsedIcon", false );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-icon-minus" ),
			false, "Turning off collapsedIcon makes expanded icon disappear" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-left" ),
			false, "Turning off collapsedIcon makes iconpos class disappear" );
		collapsible.collapsible( "option", "collapsedIcon", "plus" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-icon-minus" ),
			true, "Turning on collapsedIcon makes expanded icon reappear" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-left" ),
			true, "Turning on collapsedIcon makes iconpos class reappear" );
	});

	test( "iconpos behavior when collapsedIcon set to false", function() {
		var collapsible = $( "#collapsible-collapsed-icon-false-iconpos" );
		collapsible.collapsible( "option", "collapsedIcon", false );
		collapsible.collapsible( "option", "iconpos", "top" );
		deepEqual( collapsible.find( "a" ).hasClass( "ui-btn-icon-top" ),
			false, "Setting iconpos while collapsedIcon is off has no effect" );
	});

	test( "Collapsible with custom icons", function(){
		var collapsibles = $( "#collapsible-with-custom-icons" ).find( ".ui-collapsible" );

		ok( collapsibles.eq(0).find( ".ui-btn" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus");
		ok( collapsibles.eq(1).find( ".ui-btn" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus");
		ok( collapsibles.eq(2).find( ".ui-btn" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
		ok( collapsibles.eq(3).find( ".ui-btn" ).hasClass( "ui-icon-arrow-d" ), "Heading of fourth collapsible should have class ui-icon-arrow-d");

		// issue #4801: BEGIN
		ok( collapsibles.eq(4).find( ".ui-btn" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should have class ui-icon-info");
		collapsibles.eq( 4 ).trigger( "expand" );
		ok( collapsibles.eq(4).find( ".ui-btn" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should STILL have class ui-icon-info after click");
		// issue #4801: END
	});

	test( "Collapsible sets with custom icons", function(){
		var collapsibles = $( "#collapsible-set-with-custom-icons" ).find( ".ui-collapsible" );

		ok( collapsibles.eq(0).find( ".ui-btn" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus");
		ok( collapsibles.eq(1).find( ".ui-btn" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus");
		ok( collapsibles.eq(2).find( ".ui-btn" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
		ok( collapsibles.eq(3).find( ".ui-btn" ).hasClass( "ui-icon-arrow-r" ), "Heading of fourth collapsible should have class ui-icon-arrow-r");
		ok( collapsibles.eq(4).find( ".ui-btn" ).hasClass( "ui-icon-arrow-l" ), "Heading of fifth collapsible should have class ui-icon-arrow-l");
		ok( collapsibles.eq(5).find( ".ui-btn" ).hasClass( "ui-icon-arrow-u" ), "Heading of sixth collapsible should have class ui-icon-arrow-u");
	});

	module( "Theming", {});

	test( "Collapsible", 6, function(){
		var collapsibles = $( "#collapsible-with-theming" ).find( ".ui-collapsible" );

		ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-a" ), "Heading of first collapsible should have class ui-btn-a");
		ok( !collapsibles.eq(0).find( ".ui-collapsible-content" ).hasClass( "ui-btn-a" ), "Content of first collapsible should NOT have class ui-btn-a");
		ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-b" ), "Heading of second collapsible should have class ui-btn-b");
		ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-body-b");
		ok( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-c" ), "Heading of third collapsible should have class ui-btn-c");
		ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-c" ), "Content of third collapsible should have class ui-body-c");
	});

	test( "Collapsible Set", function(){
		var collapsibles = $( "#collapsible-set-with-theming" ).find( ".ui-collapsible" );

		ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-a" ), "Heading of first collapsible should have class ui-btn-a" );
		ok( !collapsibles.eq(0).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of first collapsible should NOT have class ui-body-[a,b,c]" );
		ok( collapsibles.eq(0).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of first collapsible should NOT have class ui-body-d" );
		ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-b" ), "Heading of second collapsible should have class ui-btn-b" );
		ok( !collapsibles.eq(1).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-c,.ui-body-d" ), "Content of second collapsible should NOT have class ui-body-[a,c,d]" );
		ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-body-b" );
		deepEqual( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of third collapsible should NOT have class ui-body-[a,b,c]" );
		ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of third collapsible should have class ui-body-d" );
		ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-collapsible-content-collapsed" ), "Content of third collapsible should NOT have class ui-collapsible-content-collapsed" );
		deepEqual( collapsibles.eq(3).find( ".ui-collapsible-heading-toggle" ).css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( !collapsibles.eq(3).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of fourth collapsible should NOT have class ui-body-[a,b,c]" );
		ok( collapsibles.eq(3).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of fourth collapsible should have class ui-body-d" );
	});

	module( "Instantiation/destruction" );

	test( "Collapsible and collapsible set _destroy() works", function() {
		var $inplace = $( "#destroy-test" ).children().attr( "data-" + $.mobile.ns + "role", "collapsible" ).end(),
			$orig = $inplace.clone();

		$inplace.collapsibleset().collapsibleset( "destroy" );
		ok( $.testHelper.domEqual( $inplace, $orig ), "Collapsible set after instantiation and destruction is identical to a clone of the original." );
	});

	module( "Collapsible inherits options from parent collapsibleset" );
	test( "theme", function() {
		$( "#inherit-test" ).collapsibleset( "option", "theme", "b" );

		deepEqual( $( "#inherits" ).collapsible( "option", "theme" ), null,
			"Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "theme" ), "a",
			"Option not set on explicitly assigned child collapsible" );
		deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-btn-b" ), true,
			"Inheriting collapsible has theme 'b'" );
		deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-btn-a" ), true,
			"Explicitly assigned collapsible has theme 'a'" );
	});
	test( "contentTheme", function() {
		$( "#inherit-test" ).collapsibleset( "option", "contentTheme", "b" );

		deepEqual( $( "#inherits" ).collapsible( "option", "contentTheme" ),
			null, "Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "contentTheme" ),
			"a", "Option not set on explicitly assigned child collapsible" );
		deepEqual( $( "#inherits" ).children().last().hasClass( "ui-body-b" ),
			true, "Inheriting collapsible has content theme 'b'" );
		deepEqual( $( "#explicit" ).children().last().hasClass( "ui-body-a" ),
			true, "Explicitly assigned collapsible has content theme 'a'" );
	});
	test( "collapsedIcon", function() {
		$( "#inherit-test" ).collapsibleset( "option", "collapsedIcon",
			"forward" );

		deepEqual( $( "#inherits" ).collapsible( "option", "collapsedIcon" ),
			null, "Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "collapsedIcon" ),
			"plus", "Option not set on explicitly assigned child collapsible" );
		deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-icon-forward" ),
			true, "Inheriting collapsible has collapsedIcon 'forward'" );
		deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-icon-plus" ),
			true, "Explicitly assigned collapsible has collapsedIcon 'plus'" );
	});
	test( "expandedIcon", function() {
		$( "#inherit-test" ).collapsibleset( "option", "expandedIcon", "back" );

		deepEqual( $( "#inherits" ).collapsible( "option", "expandedIcon" ),
			null, "Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "expandedIcon" ),
			"minus",
			"Option not set on explicitly assigned child collapsible" );
		$( "#inherits" ).collapsible( "expand" );
		deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-icon-back" ),
			true, "Inheriting collapsible has expandedIcon 'back'" );
		$( "#explicit" ).collapsible( "expand" );
		deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-icon-minus" ),
			true, "Explicitly assigned collapsible has expandedIcon 'minus'" );
	});
	test( "iconpos", function() {
		$( "#inherit-test" ).collapsibleset( "option", "iconpos", "right" );

		deepEqual( $( "#inherits" ).collapsible( "option", "iconpos" ),
			null, "Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "iconpos" ),
			"left",
			"Option not set on explicitly assigned child collapsible" );
		deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-btn-icon-right" ),
			true, "Inheriting collapsible has iconpos 'right'" );
		deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-btn-icon-left" ),
			true, "Explicitly assigned collapsible has iconpos 'left'" );
	});
	test( "mini", function() {
		$( "#inherit-test" ).collapsibleset( "option", "mini", "true" );

		deepEqual( $( "#inherits" ).collapsible( "option", "mini" ),
			null, "Option not set on inheriting child collapsible" );
		deepEqual( $( "#explicit" ).collapsible( "option", "mini" ), false,
			"Option not set on explicitly assigned child collapsible" );
		deepEqual( $( "#inherits" ).find( "a" ).hasClass( "ui-mini" ),
			true, "Inheriting collapsible is mini" );
		deepEqual( $( "#explicit" ).find( "a" ).hasClass( "ui-mini" ),
			false, "Explicitly assigned collapsible is not mini" );
	});
})( jQuery );
