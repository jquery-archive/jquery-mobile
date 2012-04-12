/*
 * mobile listview unit tests
 */

// TODO split out into seperate test files
(function( $ ){
	module( "Collapsible section", {});

	asyncTest( "The page should enhanced correctly", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-test" );
			},

			function() {
				var $page = $( "#basic-collapsible-test" );
				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				ok($page.find( ".ui-content >:eq(0) >:header" ).hasClass( "ui-collapsible-heading" ), ".ui-collapsible-heading class added to collapsible heading" );
				ok($page.find( ".ui-content >:eq(0) > div" ).hasClass( "ui-collapsible-content" ), ".ui-collapsible-content class added to collapsible content" );
				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed added to collapsed elements" );
				ok(!$page.find( ".ui-content >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed not added to expanded elements" );
				ok($page.find( ".ui-collapsible.ui-collapsible-collapsed" ).find( ".ui-collapsible-heading-toggle > .ui-btn-inner" ).hasClass( "ui-corner-top ui-corner-bottom" ), "Collapsible header button should have class ui-corner-all" );
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-test" );
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

	asyncTest( "The page should enhanced correctly", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-set-test" );
			},

			function() {
				var $page = $( "#basic-collapsible-set-test" );

				ok($page.find( ".ui-content >:eq(0)" ).hasClass( "ui-collapsible-set" ), ".ui-collapsible-set class added to collapsible set" );
				ok($page.find( ".ui-content >:eq(0) > div" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					ok($this.find( ".ui-collapsible" ).first().find( ".ui-collapsible-heading-toggle > .ui-btn-inner" ).hasClass( "ui-corner-top" ), "First collapsible header button should have class ui-corner-top" );
					ok($this.find( ".ui-collapsible" ).last().find( ".ui-collapsible-heading-toggle > .ui-btn-inner" ).hasClass( "ui-corner-bottom" ), "Last collapsible header button should have class ui-corner-bottom" );
				});

				start();
			}
		]);
	});

	asyncTest( "Collapsible set with only one collapsible", function() {
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-lonely-collapsible-test" );
			},

			function() {
				var $page = $( "#collapsible-set-with-lonely-collapsible-test" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					ok($this.find( ".ui-collapsible" ).first().find( ".ui-collapsible-heading-toggle > .ui-btn-inner" ).hasClass( "ui-corner-top" ), "First collapsible header button should have class ui-corner-top" );
					ok($this.find( ".ui-collapsible" ).last().find( ".ui-collapsible-heading-toggle > .ui-btn-inner" ).hasClass( "ui-corner-bottom" ), "Last collapsible header button should have class ui-corner-bottom" );
				});

				start();
			}
		]);
	});

	asyncTest( "Section expanded by default", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-set-test" );
			},

			function() {
				equals($( "#basic-collapsible-set-test .ui-content >:eq(0) .ui-collapsible-collapsed" ).length, 2, "There should be 2 section collapsed" );
				ok(!$( "#basic-collapsible-set-test .ui-content >:eq(0) >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), "Section B should be expanded" );
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-set-test" );
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
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-dynamic-content" );
			},

			function() {
				var set = $( ".ui-page-active" ).find( ".ui-collapsible-set" );
				for ( var i = 0; i < 3; i++ ) {
					$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
				}
				set.collapsibleset( "refresh" );
				equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
				ok( set.find( ".ui-collapsible" ).eq( 0 ).find( "a" ).hasClass( "ui-corner-top" ), "The 1st collapsible should have top corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 0 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 1st collapsible should NOT have bottom corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( "a" ).hasClass( "ui-corner-top" ), "The 2nd collapsible should NOT have top corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 2nd collapsible should NOT have bottom corners" );
				ok( set.find( ".ui-collapsible" ).eq( 2 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 3rd collapsible should have bottom corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 2 ).find( "a" ).hasClass( "ui-corner-top" ), "The 3rd collapsible should NOT have top corners" );
				start();
			}
		]);
	});

  asyncTest( "Collapsible Set with static and dynamic content", function(){
  		$.testHelper.pageSequence([
  			function(){
  				$.testHelper.openPage( "#collapsible-set-with-static-and-dynamic-content" );
  			},

  			function() {
  				var set = $( ".ui-page-active" ).find( ".ui-collapsible-set" );
  				for ( var i = 0; i < 2; i++ ) {
  					$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
  				}
  				set.collapsibleset( "refresh" );
  				equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
  				ok( set.find( ".ui-collapsible" ).eq( 0 ).find( "a" ).hasClass( "ui-corner-top" ), "The 1st collapsible should have top corners" );
  				ok( !set.find( ".ui-collapsible" ).eq( 0 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 1st collapsible should NOT have bottom corners" );
  				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( "a" ).hasClass( "ui-corner-top" ), "The 2nd collapsible should NOT have top corners" );
  				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 2nd collapsible should NOT have bottom corners" );
  				ok( set.find( ".ui-collapsible" ).eq( 2 ).find( "a" ).hasClass( "ui-corner-bottom" ), "The 3rd collapsible should have bottom corners" );
  				ok( !set.find( ".ui-collapsible" ).eq( 2 ).find( "a" ).hasClass( "ui-corner-top" ), "The 3rd collapsible should NOT have top corners" );
  				start();
  			}
  		]);
  	});

	module( "Theming", {});

	asyncTest( "Collapsible", 6, function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-with-theming" );
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
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-theming" );
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
