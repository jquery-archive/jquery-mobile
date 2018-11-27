/*
 * Mobile page unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var libName = "jquery.mobile.page.sections";

QUnit.module( libName );

QUnit.test( "nested header anchors aren't altered", function( assert ) {
	assert.ok( !$( ".ui-header > div > a" ).hasClass( "ui-button" ) );
} );

QUnit.test( "nested footer anchors aren't altered", function( assert ) {
	assert.ok( !$( ".ui-footer > div > a" ).hasClass( "ui-button" ) );
} );

QUnit.test( "nested bar anchors aren't styled", function( assert ) {
	assert.ok( !$( ".ui-bar > div > a" ).hasClass( "ui-button" ) );
} );

QUnit.test( "no auto-generated back button exists on first page", function( assert ) {
	assert.ok( !$( ".ui-header > :jqmData(rel='back')" ).length );
} );

QUnit.test( "sections inside an ignored container do not enhance", function( assert ) {
	var $ignored = $( "#ignored-header" ),
		$enhanced = $( "#enhanced-header" );

	$.mobile.ignoreContentEnabled = true;

	$ignored
		.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page();

	assert.ok( !$ignored.hasClass( "ui-toolbar-header" ), "ignored header has no class" );

	$enhanced
		.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page();

	assert.ok( $enhanced.hasClass( "ui-toolbar-header" ), "enhanced header has classes" );

	$.mobile.ignoreContentEnabled = false;
} );

} );
