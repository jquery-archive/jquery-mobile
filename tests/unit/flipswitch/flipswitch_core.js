/*
 * Mobile flipswitch unit tests
 */
define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "checkbox based flipswitch", function( assert ) {
	assert.hasClasses( $( "#flip-checkbox" ).parent(), "ui-flipswitch", "is enhanced" );
	assert.hasClasses( $( "#flip-checkbox-disabled" ).parent(), "ui-state-disabled",
		"is disabled" );
	assert.hasClasses( $( "#flip-checkbox-active" ).parent(), "ui-flipswitch-active",
		"is active" );
	assert.hasClasses( $( "#flip-checkbox-active" ).parent(), "ui-bar-inherit",
		"has theme inherit" );
	assert.lacksClasses( $( "#flip-checkbox" ).parent(), "ui-flipswitch-active",
		"initial checkbox is inactive" );
	$( "#flip-checkbox" ).parent().click();
	assert.hasClasses( $( "#flip-checkbox" ).parent(), "ui-flipswitch-active",
		" is toggled to active on click" );
	$( "#flip-checkbox" ).trigger( "swipeleft" );
	assert.lacksClasses( $( "#flip-checkbox" ).parent(), "ui-flipswitch-active",
		"is not active after left swipe" );
	$( "#flip-checkbox" ).trigger( "swiperight" );
	assert.hasClasses( $( "#flip-checkbox" ).parent(), "ui-flipswitch-active",
		"is active after right swipe" );
	assert.deepEqual( parseInt( $( "#flip-checkbox" ).attr( "tabindex" ), 10 ), -1,
		"is untabbable - tabindex is set to -1" );
} );

QUnit.test( "select based flipswitch", function( assert ) {
	assert.hasClasses( $( "#flip-select" ).parent(), "ui-flipswitch", "is enhanced" );
	assert.hasClasses( $( "#flip-select-disabled" ).parent(), "ui-state-disabled",
		"is diabled" );
	assert.hasClasses( $( "#flip-select-second-option" ).parent(), "ui-flipswitch-active",
		"is active" );
	assert.hasClasses( $( "#flip-select-second-option" ).parent(), "ui-bar-inherit",
		"has theme inherit" );
	$( "#flip-select" ).click();
	assert.hasClasses( $( "#flip-select" ).parent(), "ui-flipswitch-active",
		"is toggled to active on click" );
	$( "#flip-select" ).trigger( "swipeleft" );
	assert.lacksClasses( $( "#flip-select" ).parent(), "ui-flipswitch-active",
		"is not active after left swipe" );
	$( "#flip-select" ).trigger( "swiperight" );
	assert.hasClasses( $( "#flip-select" ).parent(), "ui-flipswitch-active",
		"is active after right swipe" );
	assert.deepEqual( parseInt( $( "#flip-select" ).attr( "tabindex" ), 10 ), -1,
		"is untabbable - tabindex is set to -1" );
} );

QUnit.test( "checkbox based flipswitch is destroyed without error", function( assert ) {
	var emptyContainer = $( "destroy-test-container" ),
		flipCheckboxContainer = $( "destroy-test-container-checkbox" ),
		flipCheckbox = $( "#flip-checkbox-destroy" );

		flipCheckbox.flipswitch( "destroy"  );
	assert.ok( $.testHelper.domEqual( flipCheckboxContainer, emptyContainer ),
		"flipswitch destroyed/removed properly" );
} );

QUnit.test( "select based flipswitch is destroyed without error", function( assert ) {
	var emptyContainer = $( "destroy-test-container" ),
		flipSelectContainer = $( "destroy-test-container-select" ),
		flipSelect = $( "#flip-select-destroy" );

		flipSelect.flipswitch( "destroy" );
	assert.ok( $.testHelper.domEqual( flipSelectContainer, emptyContainer ),
		"flipswitch destroyed/removed properly" );
} );

} );
