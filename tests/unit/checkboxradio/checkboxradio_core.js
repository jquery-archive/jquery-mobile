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
		ok( !input.attr( "disabled" ), "start input as enabled" );
		ok( !input.parent().hasClass( "ui-disabled" ), "no disabled styles" );
		ok( !input.attr( "checked" ), "not checked before click" );
		button.trigger( "click" );
		ok( input.attr( "checked" ), "checked after click" );
		ok( button.hasClass( "ui-checkbox-on" ), "active styles after click" );
		button.trigger( "click" );

		input.checkboxradio( "disable" );
		ok( input.attr( "disabled" ), "input disabled" );
		ok( input.parent().hasClass( "ui-disabled" ), "disabled styles" );
		ok( !input.attr( "checked" ), "not checked before click" );
		button.trigger( "click" );
		ok( !input.attr( "checked" ), "not checked after click" );
		ok( !button.hasClass( "ui-checkbox-on" ), "no active styles after click" );
	});

	test( "clicking a checkbox within a controlgroup does not affect checkboxes with the same name in the same controlgroup", function(){
		var input1 = $("#checkbox-31");
		var button1 = input1.parent().find(".ui-btn");
		var input2 = $("#checkbox-32");
		var button2 = input2.parent().find(".ui-btn");

		ok(!input1.attr("checked"), "input1 not checked before click");
		ok(!input2.attr("checked"), "input2 not checked before click");

		button1.trigger("click");
		ok(input1.attr("checked"), "input1 checked after click on input1");
		ok(!input2.attr("checked"), "input2 not checked after click on input1");

		button2.trigger("click");
		ok(input1.attr("checked"), "input1 not changed after click on input2");
		ok(input2.attr("checked"), "input2 checked after click on input2");
	});

	asyncTest( "change events fired on checkbox for both check and uncheck", function(){
		var $checkbox = $( "#checkbox-2" ),
			$checkboxLabel = $checkbox.parent().find( ".ui-btn" );

		$checkbox.unbind( "change" );

		expect( 2 );

		$checkbox.change(function(){
			ok( true, "change fired on click to check the box" );
		});

		$checkboxLabel.trigger( "click" );

		//test above will be triggered twice, and the start here once
		$checkbox.change( function(){
			start();
		});

		$checkboxLabel.trigger( "click" );
	});

	asyncTest( "radio button labels should update the active button class to last clicked and clear checked", function(){
		var $radioBtns = $( '#radio-active-btn-test input' ),
			singleActiveAndChecked = function(){
				same( $( "#radio-active-btn-test .ui-radio-on" ).length, 1, "there should be only one active button" );
				same( $( "#radio-active-btn-test :checked" ).length, 1, "there should be only one checked" );
			};

		$.testHelper.sequence([
			function(){
				$radioBtns.last().siblings( 'label' ).click();
			},

			function(){
				ok( $radioBtns.last().prop( 'checked' ) );
				ok( $radioBtns.last().siblings( 'label' ).hasClass( 'ui-radio-on' ),
					"last input label is an active button" );

				ok( !$radioBtns.first().prop( 'checked' ) );
				ok( !$radioBtns.first().siblings( 'label' ).hasClass( 'ui-radio-on' ),
					"first input label is not active" );

				singleActiveAndChecked();

				$radioBtns.first().siblings( 'label' ).click();
			},

			function(){
				ok( $radioBtns.first().prop( 'checked' ));
				ok( $radioBtns.first().siblings( 'label' ).hasClass( 'ui-radio-on' ),
					"first input label is an active button" );

				ok( !$radioBtns.last().prop( 'checked' ));
				ok( !$radioBtns.last().siblings( 'label' ).hasClass( 'ui-radio-on' ),
					"last input label is not active" );

				singleActiveAndChecked();

				start();
			}
		], 500);

	});

	test( "checkboxradio controls will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-checkbox").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-checkbox").length, "enhancements applied" );
	});


})(jQuery);
