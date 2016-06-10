define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Collapsible set widget works correctly", function( assert ) {
var collapsibleset = $( "#collapsibleset" ).collapsibleset();

assert.deepEqual( collapsibleset.hasClass( "ui-collapsible-set" ), true, "Collapsible set has class ui-collapsible-set" );
assert.deepEqual( collapsibleset.children( ".ui-collapsible" ).length, 2, "Collapsible set correctly enhances its children" );
} );

} );
