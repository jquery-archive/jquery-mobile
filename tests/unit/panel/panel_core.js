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
	asyncTest( "Attributes on panel should be correctly created when open is called" , function(){
		expect( 2 );
		var $uipanel = $('#basic-panel-test .ui-panel'),
			$panel = $uipanel.data( "mobile-panel" ),
			position, display;
		$.testHelper.pageSequence([
			function() {
				$uipanel.on( "panelopen" , function(){
					position = $( this ).hasClass( "ui-panel-position-right" );
					display = $( this ).hasClass( "ui-panel-display-push" );
				});
			},
			function() {
				$panel.open({
					position: "right",
					dismissible: "false",
					display: "push"
				});
			},
			function() {
				setTimeout(function(){
					ok( position , "has the correct position class" );
					ok( display , "has the correct display class" );
				},800);
			},
			function() {
				start();
			}
		]);
	});
}( jQuery ));
