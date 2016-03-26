/*
 * Mobile zoom
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "User zooming will not enable when calling enable() method if zooming was disabled in page source", function( assert ) {
	$.mobile.zoom.enable();
	assert.ok( !$.mobile.zoom.enabled );
} );

} );
