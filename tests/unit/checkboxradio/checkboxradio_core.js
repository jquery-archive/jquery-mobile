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

	asyncTest( "radio button labels should update the active button class to last clicked and clear checked", function(){
		var $radioBtns = $( '#radio-active-btn-test input' ),
			singleActiveAndChecked = function(){
				deepEqual( $( "#radio-active-btn-test .ui-radio-on" ).length, 1, "there should be only one active button" );
				// Use the .checked property, not the checked attribute which is not dynamic
				var numChecked = 0;
				$( "#radio-active-btn-test input" ).each(function(i, e) {
					if( e.checked ) {
						numChecked++;
					}
				});
				deepEqual( numChecked, 1, "there should be only one checked" );
			};

		$.testHelper.sequence([
			function(){
				$radioBtns.last().siblings( 'label' ).click();
			},

			function(){
				ok( $radioBtns.last().prop( 'checked' ), "last input is checked" );
				ok( $radioBtns.last().siblings( 'label' ).hasClass( 'ui-radio-on' ),
					"last input label is an active button" );

				ok( !$radioBtns.first().prop( 'checked' ), "first input label is not active" );
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

	asyncTest( "clicking the label triggers a click on the element", function() {
		var clicked = false;

		expect( 1 );

		$( "#checkbox-click-triggered" ).one('click', function() {
			clicked = true;
		});

		$.testHelper.sequence([
			function() {
				$( "[for='checkbox-click-triggered']" ).click();
			},

			function() {
				ok(clicked, "click was fired on input");
				start();
			}
		], 2000);
	});

	asyncTest( "clicking the label triggers a change on the element", function() {
		var changed = false;

		expect( 1 );

		$( "#checkbox-change-triggered" ).one('change', function() {
			changed = true;
		});

		$.testHelper.sequence([
			function() {
				$( "[for='checkbox-change-triggered']" ).click();
			},

			function() {
				ok(changed, "change was fired on input");
				start();
			}
		], 2000);
	});


	test( "theme should be inherited", function() {
		var $inherited = $( "#checkbox-inherit-theme" ),
			$explicit = $( "#checkbox-explicit-theme" );

		ok( $inherited.siblings("label").hasClass( "ui-btn-up-a" ), "should inherit from page" );
		ok( $explicit.siblings("label").hasClass( "ui-btn-up-b" ), "should not inherit" );
	});

	asyncTest( "form submission should include radio button values", function() {
		var $form = $( "#radio-form" ), $input = $form.find("input").first();

		$.testHelper.pageSequence([
			function() {
				$input.click();
				$form.submit();
			},

			function( timeout ){
				var check = location.hash || location.search;

				ok( check.indexOf("radio1=1") >= 0, "the radio was checked" );

				// if the changepage in the previous function failed don't go back
				if( !timeout ){
					window.history.back();
				}
			},

			function(){
				start();
			}
		]);
	});

	asyncTest( "form submission should include checkbox button values", function() {
		var $form = $( "#check-form" ), $inputs = $form.find("input");

		$.testHelper.pageSequence([
			function() {
				$inputs.click();
				$form.submit();
			},

			function( timeout ){
				var check = location.hash || location.search;

				ok( check.indexOf("checkbox-form=on") >= 0, "the first checkbox was checked" );
				ok( check.indexOf("checkbox-form-2=on") >= 0, "the second checkbox was checked" );
				// if the changepage in the previous function failed don't go back
				if( !timeout ){
					window.history.back();
				}
			},

			function(){
				start();
			}
		]);
	});

  test( "nested label checkbox still renders", function() {
    var $checkbox = $( "#checkbox-nested-label" );

    try {
      $checkbox.checkboxradio();
    } catch (e) {
      ok( false, "checkboxradio exception raised: " + e.toString());
    }

    ok( $checkbox.parent().hasClass("ui-checkbox"), "enhancement has occured");
  });

  test( "nested label (no [for]) checkbox still renders", function() {
    var $checkbox = $( "#checkbox-nested-label-no-for" );

    try {
      $checkbox.checkboxradio();
    } catch (e) {
      ok( false, "checkboxradio exception raised: " + e.toString());
    }

    ok( $checkbox.parent().hasClass("ui-checkbox"), "enhancement has occured");
  });

	test( "Icon positioning", function() {
		var bottomicon = $("[for='bottomicon']"),
			topicon = $("[for='topicon']");

		ok( bottomicon.hasClass("ui-btn-icon-bottom"), "Icon position set on label adds the appropriate class." );
		ok( topicon.hasClass("ui-btn-icon-top"), "Icon position set on input adds the appropriate class to the label." );
	});
})(jQuery);
