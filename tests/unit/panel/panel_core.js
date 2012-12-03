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
	asyncTest( "Attributes on panel should be correctly created when open and close is called" , function(){
		expect( 6 );
		var $uipanel = $('#basic-panel-test .ui-panel'),
			$panel = $uipanel.data( "mobile-panel" ),
			position, display, dismissible;
		$.testHelper.pageSequence([
			function() {
				$uipanel.on( "panelopen" , function(){
					var $this = $( this );
					position = $this.hasClass( "ui-panel-position-right" );
					display = $this.hasClass( "ui-panel-display-pan" );
					dismissible = $this.hasClass( "ui-panel-dismissible-true" );
				});
				$uipanel.on( "panelclose" , function(){
					var $this = $( this );
					position = $this.hasClass( "ui-panel-position-right" );
					display = $this.hasClass( "ui-panel-display-pan" );
					dismissible = $this.hasClass( "ui-panel-dismissible-true" );
				});
			},
			function() {
				$panel.open({
					position: "right",
					dismissible: "true",
					display: "pan"
				});
			},
			function() {
				setTimeout(function(){
					ok( position , "has the correct position class" );
					ok( display , "has the correct display class" );
					ok( dismissible , "has the correct dismissible class" );
					$panel.close();
				},800);
			},
			function() {
				setTimeout(function(){
					ok( !position , "has the correct position class" );
					ok( !display , "has the correct display class" );
					ok( !dismissible , "has the correct dismissible class" );
				},800);
			},
			function() {
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
	asyncTest( "Each link should bring forward the proper panel with the proper attributes set" , function(){
		expect( 24 );
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
						equal( $panel.element.jqmData( "display" ) , "pan" , "Link-1: Display upon clicking link is pan" );
				} , 800 );
			},
			function() {
				$( "#link-2" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "left" , "Link-2: Position upon clicking link is 'left'" );
						equal( $panel.element.jqmData( "dismissible" ) , true , "Link-2: Dimissible upon clicking link is true" );
						equal( $panel.element.jqmData( "display" ) , "overlay" , "Link-2: Display upon clicking link is overlay" );
				} , 800 );
			},
			function() {
				$( "#link-3" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "left" , "Link-3: Position upon clicking link is 'left'" );
						equal( $panel.element.jqmData( "dismissible" ) , false , "Link-3: Dimissible upon clicking link is false" );
						equal( $panel.element.jqmData( "display" ) , "pan" , "Link-3: Display upon clicking link is pan" );
				} , 800 );
			},
			function() {
				$( "#link-4" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "left" , "Position upon clicking link is 'left'" );
						equal( $panel.element.jqmData( "dismissible" ) , false , "Dimissible upon clicking link is false" );
						equal( $panel.element.jqmData( "display" ) , "overlay" , "Display upon clicking link is overlay" );
				} , 800 );
			},
			function() {
				$( "#link-5" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "right" , "Position upon clicking link is 'right'" );
						equal( $panel.element.jqmData( "dismissible" ) , true , "Dimissible upon clicking link is true" );
						equal( $panel.element.jqmData( "display" ) , "pan" , "Display upon clicking link is pan" );
				} , 800 );
			},
			function() {
				$( "#link-6" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "right" , "Position upon clicking link is 'right'" );
						equal( $panel.element.jqmData( "dismissible" ) , true , "Dimissible upon clicking link is true" );
						equal( $panel.element.jqmData( "display" ) , "overlay" , "Display upon clicking link is overlay" );
				} , 800 );
			},
			function() {
				$( "#link-7" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "right" , "Position upon clicking link is 'right'" );
						equal( $panel.element.jqmData( "dismissible" ) , false , "Dimissible upon clicking link is false" );
						equal( $panel.element.jqmData( "display" ) , "pan" , "Display upon clicking link is pan" );
				} , 800 );
			},
			function() {
				$( "#link-8" ).click();
			},
			function() {
				setTimeout( function(){
					var $uipanel = $('#link-panel-advanced-test .ui-panel'),
						$panel = $uipanel.data( "mobile-panel" );
						equal( $panel.element.jqmData( "position" ) , "right" , "Position upon clicking link is 'right'" );
						equal( $panel.element.jqmData( "dismissible" ) , false , "Dimissible upon clicking link is false" );
						equal( $panel.element.jqmData( "display" ) , "overlay" , "Display upon clicking link is overlay" );
				} , 800 );
			},
			function() {
				start();
			}
		]);
	});
}( jQuery ));
