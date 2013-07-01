/*
 * mobile checkboxradio unit tests
 */
(function($){
	module( 'jquery.mobile.forms.checkboxradio.js' );

	test( "widget can be disabled and enabled", function(){
		var input = $( "#checkbox-1" ),
			button = input.parent().find( ".ui-btn" );

		input.checkboxradio( "disable" );
		input.checkboxradio( "enable" );
		ok( !input.prop("disabled"), "start input as enabled" );
		ok( !input.parent().hasClass( "ui-state-disabled" ), "no disabled styles" );
		ok( !input.prop("checked"), "not checked before click" );
		button.trigger( "click" );
		ok( input.prop("checked"), "checked after click" );
		ok( button.hasClass( "ui-checkbox-on" ), "active styles after click" );
		button.trigger( "click" );

		input.checkboxradio( "disable" );
		ok( input.attr( "disabled" ), "input disabled" );
		ok( input.parent().hasClass( "ui-state-disabled" ), "disabled styles" );
		ok( !input.prop( "checked" ), "not checked before click" );
		button.trigger( "click" );
		ok( !input.prop( "checked" ), "not checked after click" );
		ok( !button.hasClass( "ui-checkbox-on" ), "no active styles after click" );
	});

	test( "clicking a checkbox within a controlgroup does not affect checkboxes with the same name in the same controlgroup", function(){
		var input1 = $("#checkbox-31");
		var button1 = input1.parent().find(".ui-btn");
		var input2 = $("#checkbox-32");
		var button2 = input2.parent().find(".ui-btn");

		ok(!input1.prop("checked"), "input1 not checked before click");
		ok(!input2.prop("checked"), "input2 not checked before click");

		button1.trigger("click");
		ok(input1.prop("checked"), "input1 checked after click on input1");
		ok(!input2.prop("checked"), "input2 not checked after click on input1");

		button2.trigger("click");
		ok(input1.prop("checked"), "input1 not changed after click on input2");
		ok(input2.prop("checked"), "input2 checked after click on input2");
	});

	asyncTest( "change events fired on checkbox for both check and uncheck", function(){
		var $checkbox = $( "#checkbox-2" ),
			$checkboxLabel = $checkbox.parent().find( ".ui-btn" );

		$checkbox.unbind( "change" );

		expect( 1 );

		$checkbox.one('change', function(){
			ok( true, "change fired on click to check the box" );
		});

		$checkboxLabel.trigger( "click" );

		//test above will be triggered twice, and the start here once
		$checkbox.one('change', function(){
			start();
		});

		$checkboxLabel.trigger( "click" );
	});

	test( "checkboxradio controls will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-checkbox").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-checkbox").length, "enhancements applied" );
	});

	$.mobile.page.prototype.options.keepNative = "input.should-be-native";

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "checkboxradio elements in the keepNative set shouldn't be enhanced", function() {
		ok( !$("input.should-be-native").parent().is("div.ui-checkbox") );
	});

	test( "Elements with \u201cdata-mini='true'\u201d should have \u201cui-mini\u201d class attached to enhanced element.", function(){
		var full = document.getElementById("radio-full"),
			$fulllbl = $('[for="radio-full"]'),
			mini = document.getElementById("radio-mini"),
			$minilbl = $('[for="radio-mini"]'),
			minictrl = $("#mini-control");

		ok( !full.getAttribute('data-nstest-mini') && !$fulllbl.hasClass('ui-mini'), "Original element does not have data attribute, enhanced version does not recieve .ui-mini.");
		ok( mini.getAttribute('data-nstest-mini'), "Original element has data attribute, enhanced version recieves .ui-mini." );
	});

	test( "theme should be inherited", function() {
		var $inherited = $( "#checkbox-inherit-theme" ),
			$explicit = $( "#checkbox-explicit-theme" );

		deepEqual( $inherited.siblings("label").css( "background-color" ), "rgb(221, 221, 221)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( $explicit.siblings("label").hasClass( "ui-btn-b" ), "should not inherit" );
	});

	test( "nested label checkbox still renders", function () {
		var $checkbox = $( "#checkbox-nested-label" );

		try {
			$checkbox.checkboxradio();
		} catch ( e ) {
			ok( false, "checkboxradio exception raised: " + e.toString() );
		}

		ok( $checkbox.parent().hasClass( "ui-checkbox" ), "enhancement has occured" );
	});

	test( "nested label (no [for]) checkbox still renders", function () {
		var $checkbox = $( "#checkbox-nested-label-no-for" );

		try {
			$checkbox.checkboxradio();
		} catch ( e ) {
			ok( false, "checkboxradio exception raised: " + e.toString() );
		}

		ok( $checkbox.parent().hasClass( "ui-checkbox" ), "enhancement has occured" );
	});

	test( "Icon positioning", function() {
		var bottomicon = $("[for='bottomicon']"),
			topicon = $("[for='topicon']");

		ok( bottomicon.hasClass("ui-btn-icon-bottom"), "Icon position set on label adds the appropriate class." );
		ok( topicon.hasClass("ui-btn-icon-top"), "Icon position set on input adds the appropriate class to the label." );
	});
})(jQuery);
