/*
 * mobile checkboxradio unit tests
 */
(function($){
	module( 'jquery.mobile.forms.checkboxradio.js' );

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
})(jQuery);
