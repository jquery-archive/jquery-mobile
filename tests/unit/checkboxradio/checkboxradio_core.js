/*
 * mobile checkboxradio unit tests
 */
(function($){
	module( 'jquery.mobile.forms.checkboxradio.js' );
	test( "Programmatic click on radio input correctly updates group", function() {
		var first = $( "#programmatic-click-test input" ).eq( 0 ),
			last = $( "#programmatic-click-test input" ).eq( 2 );

		last.click().checkboxradio( "refresh" );
		deepEqual( first.prop( "checked" ), false, "First checkboxradio prop is false" );
		deepEqual( first.prev( "label" ).hasClass( "ui-radio-off" ), true,
			"First label has class 'ui-radio-off'" );
		deepEqual( first.prev( "label" ).hasClass( "ui-radio-on" ), false,
			"First label does not have class 'ui-radio-on'" );
		deepEqual( last.prop( "checked" ), true, "Last checkboxradio prop is true" );
		deepEqual( last.prev( "label" ).hasClass( "ui-radio-off" ), false,
			"Last label does not have class 'ui-radio-off'" );
		deepEqual( last.prev( "label" ).hasClass( "ui-radio-on" ), true,
			"First label has class 'ui-radio-on'" );
	});

	test( "widget with weird label is created successfully", function() {
		var elem = $( "#chk\\[\\'3\\'\\]-1" );
		ok( elem.parent().is( "div.ui-checkbox" ), "element has been wrapped in a div.ui-checkbox" );
		ok( elem.siblings( "label[for='chk\\[\\'3\\'\\]-1']" ).length === 1, "element has exactly one sibling of the form label[for='chk[\'3\']-1']" );
	});

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
		ok( input.prop( "disabled" ), "input disabled" );
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

		deepEqual( $inherited.siblings("label").css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
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

	test( "Converting from horizontal to vertical controlgroup causes icons to appear", function() {
		var controlgroup = $( "#set-vertical-group" ),
			checkbox = $( "#set-vertical-group-1" );

		controlgroup.controlgroup( "option", "type", "vertical" );

		deepEqual( checkbox.prev().hasClass( "ui-btn-icon-left" ), true,
			"After converting from a horizontal controlgroup to a vertical controlgroup the checkbox inside has an icon position class" );
	});

	test( "Runtime generation of a horizontal controlgroup does not cause checkboxes inside to have space set aside for icons", function() {
		var controlgroup = $( "<div>" +
			"<label for='dynamic-horizontal-checkbox1'>Checkbox 1</label>" +
			"<input type='checkbox' id='dynamic-horizontal-checkbox1'></input>" +
			"</div>" ).appendTo( "#the-content" ).controlgroup({ type: "horizontal" });

		deepEqual( controlgroup.find( ":mobile-checkboxradio" ).prev().hasClass( "ui-btn-icon-left" ), false,
			"Dynamically created horizontal controlgroup checkboxes do not have icon position classes" );

		controlgroup.remove();
	});

	test( "Manual value update", function() {
		var h = $( "#manual-set-horizontal-1" ),
			v = $( "#manual-set-vertical-1" );

		h[ 0 ].checked = true;
		h.checkboxradio( "refresh" );
		deepEqual( h.prev().hasClass( $.mobile.activeBtnClass ), true, "Horizontal: After checking and refreshing, the active class is present." );
		deepEqual( h.prev().hasClass( "ui-btn-icon-left" ), false, "Horizontal: After checking and refreshing, the icon position class is not present." );
		deepEqual( h.prev().hasClass( "ui-checkbox-on" ), true, "Horizontal: After checking and refreshing, the label has the ui-checkbox-on class" );
		deepEqual( h.prev().hasClass( "ui-checkbox-off" ), false, "Horizontal: After checking and refreshing, the label does not have the ui-checkbox-off class" );

		h[ 0 ].checked = false;
		h.checkboxradio( "refresh" );
		deepEqual( h.prev().hasClass( $.mobile.activeBtnClass ), false, "Horizontal: After unchecking and refreshing, the active class is not present." );
		deepEqual( h.prev().hasClass( "ui-btn-icon-left" ), false, "Horizontal: After unchecking and refreshing, the icon position class is not present." );
		deepEqual( h.prev().hasClass( "ui-checkbox-on" ), false, "Horizontal: After unchecking and refreshing, the label does not have the ui-checkbox-on class" );
		deepEqual( h.prev().hasClass( "ui-checkbox-off" ), true, "Horizontal: After unchecking and refreshing, the label has the ui-checkbox-off class" );

		v[ 0 ].checked = true;
		v.checkboxradio( "refresh" );
		deepEqual( v.prev().hasClass( $.mobile.activeBtnClass ), false, "Vertical: After checking and refreshing, the active class is not present." );
		deepEqual( v.prev().hasClass( "ui-btn-icon-left" ), true, "Vertical: After checking and refreshing, the icon position class is not present." );
		deepEqual( v.prev().hasClass( "ui-checkbox-on" ), true, "Vertical: After checking and refreshing, the label has the ui-checkbox-on class" );
		deepEqual( v.prev().hasClass( "ui-checkbox-off" ), false, "Vertical: After checking and refreshing, the label does not have the ui-checkbox-off class" );

		v[ 0 ].checked = false;
		v.checkboxradio( "refresh" );
		deepEqual( v.prev().hasClass( $.mobile.activeBtnClass ), false, "Vertical: After unchecking and refreshing, the active class is not present." );
		deepEqual( v.prev().hasClass( "ui-btn-icon-left" ), true, "Vertical: After unchecking and refreshing, the icon position class is not present." );
		deepEqual( v.prev().hasClass( "ui-checkbox-on" ), false, "Vertical: After unchecking and refreshing, the label does not have the ui-checkbox-on class" );
		deepEqual( v.prev().hasClass( "ui-checkbox-off" ), true, "Vertical: After unchecking and refreshing, the label has the ui-checkbox-off class" );
	});
})(jQuery);
