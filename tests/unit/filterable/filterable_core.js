/*
 * mobile filter unit tests - listview
 */

( function( $ ){

module( "Backwards compatibility tests" );

test( "Listview with filter has hideDividers option set to true", function() {
	deepEqual( $( "#hidedividers-option-test" ).listview( "option", "hideDividers" ), true );
});

})( jQuery );
