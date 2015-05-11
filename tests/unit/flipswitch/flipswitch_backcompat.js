/*
 * mobile flipswitch unit tests
 */
( function( $ ) {

test( "checkbox based flipswitch is mini", function( assert ) {
	assert.hasClasses( $( "#flip-checkbox-mini" ).parent(), "ui-mini" );
} );
test( "select based flipswitch is mini", function( assert ) {
	assert.hasClasses( $( "#flip-select-mini" ).parent(), "ui-mini" );
} );

} )( jQuery );
