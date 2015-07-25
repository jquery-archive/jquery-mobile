/*
 * Mobile flipswitch unit tests
 */

define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "checkbox based flipswitch backcompat tests", function( assert ) {
	assert.hasClasses( $( "#flip-checkbox-mini" ).parent(), "ui-mini", "is mini" );
	assert.lacksClasses( $( "#flip-checkbox-corners" ).parent(), "ui-corner-all",
		"does not get ui-corner-all when set to false" );
	assert.hasClasses( $( "#flip-checkbox-wrapperclass" ).parent(), "checkbox-custom-class",
		"has wrapper class" );
} );

QUnit.test( "select based flipswitch backcompat tests", function( assert ) {
	assert.hasClasses( $( "#flip-select-mini" ).parent(), "ui-mini", "is mini" );
	assert.lacksClasses( $( "#flip-select-corners" ).parent(), "ui-corner-all",
		"does not get ui-corner-all when set to false" );
	assert.hasClasses( $( "#flip-select-wrapperclass" ).parent(), "select-custom-class",
		"has wrapper class" );
} );

} );
