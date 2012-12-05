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
	module( "Open/Close Panel", {
		setup: function(){
			var hash = "#open-close-panel-test";
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
		expect( 3 );
		var $uipanel = $('#open-close-panel-test .ui-panel'),
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
