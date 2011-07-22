/*
 * mobile checkboxradio unit tests
 */
(function($){
	module( 'vertical controlgroup, no refresh' , {
		setup: function() {
			this.vcontrolgroup = $( "#vertical-controlgroup" );
		}
	});

	test( "vertical controlgroup classes", function() {
		var buttons = this.vcontrolgroup.find( ".ui-btn" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( !buttons.hasClass( "ui-btn-corner-all" ), "no button should have class 'ui-btn-corner-all'");
		ok( buttons.first().hasClass( "ui-corner-top" ), "first button should have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
		ok( buttons.last().hasClass( "ui-corner-bottom"), "last button should have class 'ui-corner-bottom'" );
	});

	module( 'vertical controlgroup, refresh', {
		setup: function() {
			this.vcontrolgroup = $( "#vertical-controlgroup" );
			this.vcontrolgroup.find( ".ui-btn" ).show();
			this.vcontrolgroup.controlgroup();
		}
	});

	test( "vertical controlgroup after first button was hidden", function() {
		//https://github.com/jquery/jquery-mobile/issues/1929

		//We hide the first button and refresh
		this.vcontrolgroup.find( ".ui-btn" ).first().hide();
		this.vcontrolgroup.controlgroup();

		var buttons = this.vcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-top" ), "first visible button should have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
		ok( buttons.last().hasClass( "ui-corner-bottom"), "last visible button should have class 'ui-corner-bottom'" );
	});

	test( "vertical controlgroup after last button was hidden", function() {
		//https://github.com/jquery/jquery-mobile/issues/1929

		//We hide the last button and refresh
		this.vcontrolgroup.find( ".ui-btn" ).last().hide();
		this.vcontrolgroup.controlgroup();

		var buttons = this.vcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-top" ), "first visible button should have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-top" ), "middle buttons should not have class 'ui-corner-top'" );
		ok( !middlebuttons.hasClass( "ui-corner-bottom" ), "middle buttons should not have class 'ui-corner-bottom'" );
		ok( buttons.last().hasClass( "ui-corner-bottom"), "last visible button should have class 'ui-corner-bottom'" );
	});

	module( 'horizontal controlgroup, no refresh', {
		setup: function() {
			this.hcontrolgroup = $( "#horizontal-controlgroup" );
		}
	});

	test( "horizontal controlgroup classes", function() {
		var buttons = this.hcontrolgroup.find( ".ui-btn" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( !buttons.hasClass( "ui-btn-corner-all" ), "no button should have class 'ui-btn-corner-all'");
		ok( buttons.first().hasClass( "ui-corner-left" ), "first button should have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
		ok( buttons.last().hasClass( "ui-corner-right"), "last button should have class 'ui-corner-right'" );
	});

	module( 'horizontal controlgroup, refresh', {
		setup: function() {
			this.hcontrolgroup = $( "#horizontal-controlgroup" );
			this.hcontrolgroup.find( ".ui-btn" ).show();
			this.hcontrolgroup.controlgroup();
		}
	});

	test( "horizontal controlgroup after first button was hidden", function() {
		//We hide the first button and refresh
		this.hcontrolgroup.find( ".ui-btn" ).first().hide();
		this.hcontrolgroup.controlgroup();

		var buttons = this.hcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-left" ), "first visible button should have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
		ok( buttons.last().hasClass( "ui-corner-right"), "last visible button should have class 'ui-corner-right'" );
	});

	test( "horizontal controlgroup after last button was hidden", function() {
		//We hide the last button and refresh
		this.hcontrolgroup.find( ".ui-btn" ).last().hide();
		this.hcontrolgroup.controlgroup();

		var buttons = this.hcontrolgroup.find( ".ui-btn" ).filter( ":visible" ),
			middlebuttons = buttons.filter(function(index) { return index > 0 && index < (length-1)}),
			length = buttons.length;

		ok( buttons.first().hasClass( "ui-corner-left" ), "first visible button should have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-left" ), "middle buttons should not have class 'ui-corner-left'" );
		ok( !middlebuttons.hasClass( "ui-corner-right" ), "middle buttons should not have class 'ui-corner-right'" );
		ok( buttons.last().hasClass( "ui-corner-right"), "last visible button should have class 'ui-corner-right'" );
	});


	test( "controlgroups will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-controlgroup").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-controlgroup").length, "enhancements applied" );
	});



})(jQuery);
