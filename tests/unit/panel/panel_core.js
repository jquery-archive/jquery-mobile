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
					display = $this.hasClass( "ui-panel-display-push" );
					dismissible = $this.hasClass( "ui-panel-dismissible-true" );
				});
				$uipanel.on( "panelclose" , function(){
					var $this = $( this );
					position = $this.hasClass( "ui-panel-position-right" );
					display = $this.hasClass( "ui-panel-display-push" );
					dismissible = $this.hasClass( "ui-panel-dismissible-true" );
				});
			},
			function() {
				$panel.open({
					position: "right",
					dismissible: "true",
					display: "push"
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
}( jQuery ));
