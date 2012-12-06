/*
 * mobile panel unit tests
 */

(function($){

	module( "Basic Panel", {
		setup: function(){
			var hash = "#basic-panel-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "The panel should be enhanced correctly" , function(){
		setTimeout(function() {
			var $panel = $('#basic-panel-test .ui-panel');
			ok( $panel.length, ".ui-panel class added to panel div" );
			start();
		}, 800);
	});
	module( "Open Panel", {
		setup: function(){
			var hash = "#open-panel-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "Attributes on panel should be correctly created when open is called" , function(){
		expect( 4 );
		var $uipanel = $('#open-panel-test .ui-panel'),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "open" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				});
			},
			function() {
				setTimeout(function(){
					ok( $uipanel.hasClass( "ui-panel-position-right" ) , "has the correct position class" );
					ok( $uipanel.hasClass( "ui-panel-display-reveal" ) , "has the correct display class" );
					ok( $uipanel.hasClass( "ui-panel-dismissible-true" ) , "has the correct dismissible class" );
					ok( $page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});

	module( "Close Panel", {
		setup: function(){
			var hash = "#close-panel-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "Attributes on panel should be correctly created when close is called" , function(){
		expect( 4 );
		var $uipanel = $('#close-panel-test .ui-panel'),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "open" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				}).then( function(){
					$uipanel.panel( "close" );
				});
			},
			function() {
				setTimeout(function(){
					ok( !$uipanel.hasClass( "ui-panel-position-left" ) && !$uipanel.hasClass( "ui-panel-position-right" ), "has no position class" );
					ok( !$uipanel.hasClass( "ui-panel-display-reveal" ) && !$uipanel.hasClass( "ui-panel-display-push" ) && !$uipanel.hasClass( "ui-panel-display-overlay" ), "has no display class" );
					ok( !$uipanel.hasClass( "ui-panel-dismissible-true" ) && !$uipanel.hasClass( "ui-panel-dismissible-false" ), "has no dismissible class" );
					ok( !$page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});
	module( "Toggle Panel", {
		setup: function(){
			var hash = "#toggle-panel-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "A single toggle should open a panel" , function(){
		expect( 4 );
		var $uipanel = $('#toggle-panel-test .ui-panel'),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "toggle" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				});
			},
			function() {
				setTimeout(function(){
					ok( $uipanel.hasClass( "ui-panel-position-right" ) , "has the correct position class" );
					ok( $uipanel.hasClass( "ui-panel-display-reveal" ) , "has the correct display class" );
					ok( $uipanel.hasClass( "ui-panel-dismissible-true" ) , "has the correct dismissible class" );
					ok( $page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});
	module( "Toggle Panel", {
		setup: function(){
			var hash = "#toggle-panel-test-2";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "Two toggles on the exact same panel should close the panel" , function(){
		expect( 4 );
		var $uipanel = $('#toggle-panel-test-2 .ui-panel'),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "toggle" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				}).then( function(){
					$uipanel.panel( "toggle" , {
						position: "right",
						dismissible: "true",
						display: "reveal"
					});
				});
			},
			function() {
				setTimeout(function(){
					ok( !$uipanel.hasClass( "ui-panel-position-right" ) , "has the correct position class" );
					ok( !$uipanel.hasClass( "ui-panel-display-reveal" ) , "has the correct display class" );
					ok( !$uipanel.hasClass( "ui-panel-dismissible-true" ) , "has the correct dismissible class" );
					ok( !$page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});
	module( "Toggle Panel", {
		setup: function(){
			var hash = "#toggle-panel-test-3";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "A toggle on the same panel with different attributes should show the panel with only the new attributes" , function(){
		expect( 4 );
		var $uipanel = $('#toggle-panel-test-3 .ui-panel'),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "toggle" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				}).then( function(){
					$uipanel.panel( "toggle" , {
						position: "left",
						dismissible: "false",
						display: "push"
					});
				});
			},
			function() {
				setTimeout(function(){
					ok( $uipanel.hasClass( "ui-panel-position-left" ) && !$uipanel.hasClass( "ui-panel-position-right" ), "has the correct position class" );
					ok( $uipanel.hasClass( "ui-panel-display-push" )  && !$uipanel.hasClass( "ui-panel-position-reveal" ), "has the correct display class" );
					ok( $uipanel.hasClass( "ui-panel-dismissible-false" )  && !$uipanel.hasClass( "ui-panel-dismissible-true" ), "has the correct dismissible class" );
					ok( $page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});
	module( "Toggle Panel", {
		setup: function(){
			var hash = "#toggle-panel-test-4";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "A toggle on a different panel than what is open should show the new panel with only the new attributes" , function(){
		expect( 7 );
		var $uipanels = $('#toggle-panel-test-4 .ui-panel'),
			$uipanel = $( $uipanels[0] ),
			$uipanel2 = $( $uipanels[1] ),
			$page = $uipanel.siblings( ".ui-panel-content-wrap" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.panel( "toggle" , {
					position: "right",
					dismissible: "true",
					display: "reveal"
				}).then( function(){
					$uipanel2.panel( "toggle" , {
						position: "left",
						dismissible: "false",
						display: "push"
					});
				});
			},
			function() {
				setTimeout(function(){
					ok( !$uipanel.hasClass( "ui-panel-position-left" ), "has the correct position class" );
					ok( !$uipanel.hasClass( "ui-panel-display-push" ), "has the correct display class" );
					ok( !$uipanel.hasClass( "ui-panel-dismissible-false" ), "has the correct dismissible class" );
					ok( $uipanel2.hasClass( "ui-panel-position-left" ), "has the correct position class" );
					ok( $uipanel2.hasClass( "ui-panel-display-push" ), "has the correct display class" );
					ok( $uipanel2.hasClass( "ui-panel-dismissible-false" ), "has the correct dismissible class" );
					ok( $page.hasClass( "ui-responsive-test" ) , "has the correct custom responsive class" );
				},800);
			},
			function(){
				start();
			}
		]);
	});
	module( "Link Panel Tests", {
		setup: function(){
			var hash = "#link-panel-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "The link should bring forward the proper panel" , function(){
		expect( 3 );
		$.testHelper.pageSequence([
			function() {
				$( "[href=\"#panel-id\"]" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "right" , "Position upon clicking link is 'right'" );
						equal( $panel.element.jqmData( "dismissible" ) , true , "Dimissible upon clicking link is true" );
						equal( $panel.element.jqmData( "display" ) , "overlay" , "Display upon clicking link is overlay" );
				} , 800 );
			},
			function() {
				start();
			}
		]);
	});
	module( "Link Panel Advanced Tests", {
		setup: function(){
			var hash = "#link-panel-advanced-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "A link should bring forward the proper panel with the proper attributes set" , function(){
		expect( 3 );
		$.testHelper.pageSequence([
			function() {
				$( "#link-1" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "left" , "Link-1: Position upon clicking link is 'left'" );
						equal( $panel.element.jqmData( "dismissible" ) , true , "Link-1: Dimissible upon clicking link is true" );
						equal( $panel.element.jqmData( "display" ) , "reveal" , "Link-1: Display upon clicking link is reveal" );
				} , 800 );
			},
			function() {
				start();
			}
		]);
	});
}( jQuery ));
