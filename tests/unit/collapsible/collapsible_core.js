define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Pre-rendered nested collapsibles are enhanced correctly", function( assert ) {

// This Test previously was actually testing auto page enhancment unintentionally, we now use
// enhance to not worry about each widget.
$( "body" ).enhance();

var outerWidget = $( "#outer" ).data( "mobile-collapsible" );

assert.deepEqual( outerWidget._ui.heading.length, 1, "Outer heading consists of one element" );
assert.deepEqual( outerWidget._ui.heading[ 0 ], $( "#outer-heading" )[ 0 ],
	"Outer heading consists of the right element" );

assert.deepEqual( outerWidget._ui.content.length, 1, "Outer content consists of one element" );
assert.deepEqual( outerWidget._ui.content[ 0 ], $( "#outer-content" )[ 0 ],
	"Outer content consists of the right element" );

assert.deepEqual( outerWidget._ui.anchor.length, 1, "Outer anchor consists of one element" );
assert.deepEqual( outerWidget._ui.anchor[ 0 ], $( "#outer-anchor" )[ 0 ],
	"Outer anchor consists of the right element" );

assert.deepEqual( outerWidget._ui.status.length, 1, "Outer anchor consists of one element" );
assert.deepEqual( outerWidget._ui.status[ 0 ], $( "#outer-status" )[ 0 ],
	"Outer status consists of the right element" );
} );

} );
