/*
 * mobile collapsible unit tests
 */

// TODO split out into seperate test files
(function( $ ){
	function testExpandCollapseAndOptions( selector ) {
		var collapsible = $( selector );
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed");
		$( selector + " >:header a" ).first().click();
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), false, selector + " should be expanded after click");
		$( selector + " >:header a" ).first().click();
		deepEqual( collapsible.hasClass( "ui-collapsible-collapsed" ), true, selector + " should be collapsed");

		collapsible.collapsible( "option", "inset", false );
		deepEqual( collapsible.hasClass( "ui-corner-all" ), false, "After turning off the 'inset' option, the collapsible does not have the ui-corner-all class." );
		deepEqual( collapsible.hasClass( "ui-collapsible-inset" ), false, "After turning off the 'inset' option, the collapsible does not have the ui-collapsible-inset class." );

		collapsible.collapsible( "option", { inset: true, corners: false } );
		deepEqual( collapsible.hasClass( "ui-corner-all" ), false, "After turning on the 'inset' option and turning off the 'corners' option the collapsible does not have the ui-corner-all class." );
		deepEqual( collapsible.hasClass( "ui-collapsible-inset" ), true, "After turning on the 'inset' option and turning off the 'corners' option the collapsible has the ui-collapsible-inset class." );
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
		testExpandCollapseAndOptions( "#collapsed-collapsible" );
	});

	test( "Expand/Collapse pre-rendered", function(){
		testExpandCollapseAndOptions( "#pre-rendered-collapsible" );
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
})( jQuery );
