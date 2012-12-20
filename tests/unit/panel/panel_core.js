/*
 * mobile panel unit tests
 */

(function($){


	$(document).on( "pageinit", function(){

		var panel1 = $( "#panel-test-1" ),
			panel2 = $( "#panel-test-2" ),
			panel3 = $( "#panel-test-3" ),
			panel4 = $( "#panel-test-4" ),
			panel5 = $( "#panel-test-5" ),
			panel6 = $( "#panel-test-6" ),
			panel7 = $( "#panel-test-7" ),
			panel8 = $( "#panel-test-8" ),
			panel9 = $( "#panel-test-9" ),
			defaults = $.mobile.panel.prototype.options;

		/* test class additions */
		test( "classes are added as expected on create", function(){

			ok( panel1.is( ".ui-panel" ), "default class is present" );
			equal( panel1.is( ".ui-panel-animate" ), $.support.cssTransform3d, "animate class is present by default when supported" );
			ok( panel1.is( ".ui-panel-display-" + defaults.display ), "display class is added per the default" );
			ok( panel1.is( ".ui-panel-position-" + defaults.position ), "position class is added per the default" );

		});

	});
	


}( jQuery ));
