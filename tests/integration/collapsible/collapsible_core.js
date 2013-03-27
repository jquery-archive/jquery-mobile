/*
 * mobile collapsible unit tests
 */

// TODO split out into seperate test files
(function( $ ){
	module( "Collapsible section", {});

	asyncTest( "The page should be enhanced correctly", function(){
		expect( 5 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#basic-collapsible-test" ) );
			},

			function() {
				var $page = $( "#basic-collapsible-test" );
				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				ok($page.find( ".ui-content >:eq(0) >:header" ).hasClass( "ui-collapsible-heading" ), ".ui-collapsible-heading class added to collapsible heading" );
				ok($page.find( ".ui-content >:eq(0) > div" ).hasClass( "ui-collapsible-content" ), ".ui-collapsible-content class added to collapsible content" );
				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed added to collapsed elements" );
				ok(!$page.find( ".ui-content >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed not added to expanded elements" );
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		expect( 3 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#basic-collapsible-test" ) );
			},

			function() {
				ok($( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				$( "#basic-collapsible-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok(!$( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click");
				$( "#basic-collapsible-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok($( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				start();
			}
		]);
	});

	module( "Collapsible set", {});

	asyncTest( "The page should be enhanced correctly", function(){
		var nTests = 2;
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#basic-collapsible-set-test" ) );
			},

			function() {
				var $page = $( "#basic-collapsible-set-test" );

				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible-set" ), ".ui-collapsible-set class added to collapsible set" );
				ok($page.find( ".ui-content >:eq(0) > div" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					nTests += 2;
					ok($this.find( ".ui-collapsible" ).first().hasClass( "ui-first-child" ), "First collapsible header button should have class ui-first-child" );
					ok($this.find( ".ui-collapsible" ).last().hasClass( "ui-last-child" ), "Last collapsible header button should have class ui-last-child" );
				});

				expect( nTests );
				start();
			}
		]);
	});

	asyncTest( "Collapsible set with only one collapsible", function() {
		var nTests = 0;
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-lonely-collapsible-test" ) );
			},

			function() {
				var $page = $( "#collapsible-set-with-lonely-collapsible-test" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					nTests += 2;
					ok($this.find( ".ui-collapsible" ).first().hasClass( "ui-first-child" ), "First collapsible header button should have class ui-first-child" );
					ok($this.find( ".ui-collapsible" ).last().hasClass( "ui-last-child" ), "Last collapsible header button should have class ui-last-child" );
				});

				expect( nTests );
				start();
			}
		]);
	});

	asyncTest( "Section expanded by default", function(){
		expect( 2 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#basic-collapsible-set-test" ) );
			},

			function() {
				equal($( "#basic-collapsible-set-test .ui-content >:eq(0) .ui-collapsible-collapsed" ).length, 2, "There should be 2 section collapsed" );
				ok(!$( "#basic-collapsible-set-test .ui-content >:eq(0) >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), "Section B should be expanded" );
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		expect( 3 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#basic-collapsible-set-test" ) );
			},

			function() {
				ok($( "#basic-collapsible-set-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				$( "#basic-collapsible-set-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok(!$( "#basic-collapsible-set-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click");
				$( "#basic-collapsible-set-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok($( "#basic-collapsible-set-test .ui-collapsible" ).hasClass( "ui-collapsible-collapsed" ), "All collapsible should be collapsed");
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set with dynamic content", function(){
		expect( 7 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-dynamic-content" ) );
			},

			function() {
				var set = $( ".ui-page-active" ).find( ".ui-collapsible-set" );
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
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set with static and dynamic content", function(){
		expect( 7 );
		$.testHelper.pageSequence([
			function(){
  				$.mobile.changePage( $( "#collapsible-set-with-static-and-dynamic-content" ) );
  			},

  			function() {
  				var set = $( ".ui-page-active" ).find( ".ui-collapsible-set" );
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
  				start();
  			}
  		]);
  	});

	asyncTest( "Collapsible set with last collapsible expanded", function(){
		expect( 1 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-last-collapsible-expanded" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible" );
				ok( collapsibles.last().hasClass( "ui-last-child" ), "Content of last collapsible should have class ui-last-child");
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set", function(){
		expect( 3 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-legends" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible-heading" );
				ok( !collapsibles.eq(0).is( ".ui-first-child" ), "First collapsible should NOT have class ui-last-child");
				ok( !collapsibles.eq(1).is( ".ui-last-child,.ui-first-child" ), "Middle collapsible should NOT have class ui-first-child or ui-last-child");
				ok( !collapsibles.eq(2).is( ".ui-first-child" ), "Last collapsible should NOT have class ui-first-child");
				start();
			}
		]);
	});
	
	module( "Icons", {});

	asyncTest( "Collapsible with custom icons", function(){
		expect( 6 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-with-custom-icons" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible" );
				ok( collapsibles.eq(0).find( ".ui-icon" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus");
				ok( collapsibles.eq(1).find( ".ui-icon" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus");
				ok( collapsibles.eq(2).find( ".ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
				ok( collapsibles.eq(3).find( ".ui-icon" ).hasClass( "ui-icon-arrow-d" ), "Heading of fourth collapsible should have class ui-icon-arrow-d");

				// issue #4801: BEGIN
				ok( collapsibles.eq(4).find( ".ui-icon" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should have class ui-icon-info");
				collapsibles.eq( 4 ).trigger( "expand" );
				ok( collapsibles.eq(4).find( ".ui-icon" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should STILL have class ui-icon-info after click");
				// issue #4801: END
				start();
			}
		]);
	});

	asyncTest( "Collapsible sets with custom icons", function(){
		expect( 6 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-custom-icons" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible" );
				ok( collapsibles.eq(0).find( ".ui-icon" ).hasClass( "ui-icon-plus" ), "Heading of first collapsible should have class ui-icon-plus");
				ok( collapsibles.eq(1).find( ".ui-icon" ).hasClass( "ui-icon-minus" ), "Heading of second collapsible should have class ui-icon-minus");
				ok( collapsibles.eq(2).find( ".ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
				ok( collapsibles.eq(3).find( ".ui-icon" ).hasClass( "ui-icon-arrow-r" ), "Heading of fourth collapsible should have class ui-icon-arrow-r");
				ok( collapsibles.eq(4).find( ".ui-icon" ).hasClass( "ui-icon-arrow-l" ), "Heading of fifth collapsible should have class ui-icon-arrow-l");
				ok( collapsibles.eq(5).find( ".ui-icon" ).hasClass( "ui-icon-arrow-u" ), "Heading of sixth collapsible should have class ui-icon-arrow-u");
				start();
			}
		]);
	});

	module( "Theming", {});

	asyncTest( "Collapsible", 6, function(){
		expect( 6 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-with-theming" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible" );
				ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-a" ), "Heading of first collapsible should have class ui-btn-up-a");
				ok( !collapsibles.eq(0).find( ".ui-collapsible-content" ).hasClass( "ui-btn-up-a" ), "Content of first collapsible should NOT have class ui-btn-up-a");
				ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-b" ), "Heading of second collapsible should have class ui-btn-up-b");
				ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-btn-up-b");
				ok( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-c" ), "Heading of third collapsible should have class ui-btn-up-c");
				ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-c" ), "Content of third collapsible should have class ui-btn-up-c");
				start();
			}
		]);
	});


	asyncTest( "Collapsible Set", function(){
		expect( 13 );
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage( $( "#collapsible-set-with-theming" ) );
			},

			function() {
				var collapsibles = $.mobile.activePage.find( ".ui-collapsible" );
				ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-a" ), "Heading of first collapsible should have class ui-btn-up-a");
				ok( !collapsibles.eq(0).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of first collapsible should NOT have class ui-btn-up-[a,b,c]");
				ok( collapsibles.eq(0).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of first collapsible should NOT have class ui-btn-up-d");
				ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-b" ), "Heading of second collapsible should have class ui-btn-up-b");
				ok( !collapsibles.eq(1).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-c,.ui-body-d" ), "Content of second collapsible should NOT have class ui-btn-up-[a,c,d]");
				ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-btn-up-b");
				ok( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-d" ), "Heading of third collapsible should have class ui-btn-up-d");
				ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of third collapsible should NOT have class ui-btn-up-[a,b,c]");
				ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of third collapsible should have class ui-btn-up-d");
				ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-collapsible-content-collapsed" ), "Content of third collapsible should NOT have class ui-collapsible-content-collapsed");
				ok( collapsibles.eq(3).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-btn-up-d" ), "Heading of fourth collapsible should have class ui-btn-up-d");
				ok( !collapsibles.eq(3).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of fourth collapsible should NOT have class ui-btn-up-[a,b,c]");
				ok( collapsibles.eq(3).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of fourth collapsible should have class ui-btn-up-d");
				start();
			}
		]);
	});
	
})( jQuery );
