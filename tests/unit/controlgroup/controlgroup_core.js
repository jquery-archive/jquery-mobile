/*
 * mobile checkboxradio unit tests
 */
(function($){
	module( 'vertical controlgroup', {
		setup: function() {
			this.vcontrolgroup = $( "#vertical-controlgroup" );
			this.vcontrolgroup.find( ".ui-btn" ).show();
			this.vcontrolgroup.controlgroup("refresh");
		}
	});

	test( "vertical controlgroup classes", function() {
		var buttons = this.vcontrolgroup.find( ".ui-btn" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-top" ), "first button should have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
		ok( buttons.last().hasClass( "ui-corner-bottom"), "last button should have class 'ui-corner-bottom'" );
	});

//	test( "vertical controlgroup after first button was hidden", function() {
//		//https://github.com/jquery/jquery-mobile/issues/1929
//
//		//We hide the first button and refresh
//		this.vcontrolgroup.find( ".ui-btn" ).first().hide();
//		this.vcontrolgroup.controlgroup("refresh");
//
//		var buttons = this.vcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
//			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
//			length = buttons.length;
//
//		ok( buttons.first().hasClass( "ui-corner-top" ), "first visible button should have class 'ui-corner-top'" );
//		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
//		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
//		ok( buttons.last().hasClass( "ui-corner-bottom"), "last visible button should have class 'ui-corner-bottom'" );
//	});

//	test( "vertical controlgroup after last button was hidden", function() {
//		//https://github.com/jquery/jquery-mobile/issues/1929
//
//		//We hide the last button and refresh
//		this.vcontrolgroup.find( ".ui-btn" ).last().hide();
//		this.vcontrolgroup.controlgroup("refresh");
//
//		var buttons = this.vcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
//			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
//			length = buttons.length;
//
//		ok( buttons.first().hasClass( "ui-corner-top" ), "first visible button should have class 'ui-corner-top'" );
//		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
//		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
//		ok( buttons.last().hasClass( "ui-corner-bottom"), "last visible button should have class 'ui-corner-bottom'" );
//	});

	module( 'horizontal controlgroup', {
		setup: function() {
			this.hcontrolgroup = $( "#horizontal-controlgroup" );
			this.hcontrolgroup.find( ".ui-btn" ).show();
			this.hcontrolgroup.controlgroup("refresh");
		}
	});

	test( "horizontal controlgroup classes", function() {
		var buttons = this.hcontrolgroup.find( ".ui-btn" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-left" ), "first button should have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
		ok( buttons.last().hasClass( "ui-corner-right"), "last button should have class 'ui-corner-right'" );
	});

//	test( "horizontal controlgroup after first button was hidden", function() {
//		//We hide the first button and refresh
//		this.hcontrolgroup.find( ".ui-btn" ).first().hide();
//		this.hcontrolgroup.controlgroup("refresh");
//
//		var buttons = this.hcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
//			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
//			length = buttons.length;
//
//		ok( buttons.first().hasClass( "ui-corner-left" ), "first visible button should have class 'ui-corner-left'" );
//		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
//		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
//		ok( buttons.last().hasClass( "ui-corner-right"), "last visible button should have class 'ui-corner-right'" );
//	});

//	test( "horizontal controlgroup after last button was hidden", function() {
//		//We hide the last button and refresh
//		this.hcontrolgroup.find( ".ui-btn" ).last().hide();
//		this.hcontrolgroup.controlgroup("refresh");
//
//		var buttons = this.hcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
//			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
//			length = buttons.length;
//
//		ok( buttons.first().hasClass( "ui-corner-left" ), "first visible button should have class 'ui-corner-left'" );
//		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
//		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
//		ok( buttons.last().hasClass( "ui-corner-right"), "last visible button should have class 'ui-corner-right'" );
//	});


})(jQuery);
