define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "Collapsible widget works correctly", function( assert ) {
var collapsible = $( "#collapsible" ).collapsible();

assert.deepEqual( collapsible.hasClass( "ui-collapsible" ), true, "Collapsible has class ui-collapsible" );
assert.deepEqual( collapsible.children( "h1" ).hasClass( "ui-collapsible-heading" ), true, "Collapsible heading has class ui-collapsible-heading" );
assert.deepEqual( collapsible.children( "h1" ).next().hasClass( "ui-collapsible-content" ), true, "Collapsible content has class ui-collapsible-content" );
assert.deepEqual( collapsible.children().length, 2, "Collapsible contains exactly two children" );
} );

} );
