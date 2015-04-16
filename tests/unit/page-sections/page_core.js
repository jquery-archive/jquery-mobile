/*
 * mobile page unit tests
 */
( function( $ ) {
var libName = 'jquery.mobile.page.sections';

module( libName );

test( "nested header anchors aren't altered", function() {
	ok( !$( '.ui-header > div > a' ).hasClass( 'ui-button' ) );
} );

test( "nested footer anchors aren't altered", function() {
	ok( !$( '.ui-footer > div > a' ).hasClass( 'ui-button' ) );
} );

test( "nested bar anchors aren't styled", function() {
	ok( !$( '.ui-bar > div > a' ).hasClass( 'ui-button' ) );
} );

test( "no auto-generated back button exists on first page", function() {
	ok( !$( ".ui-header > :jqmData(rel='back')" ).length );
} );

test( "sections inside an ignored container do not enhance", function() {
	var $ignored = $( "#ignored-header" ),
		$enhanced = $( "#enhanced-header" );

	$.mobile.ignoreContentEnabled = true;

	$ignored
		.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page()
			.trigger( "pagecreate" );
	ok( !$ignored.hasClass( "ui-header" ), "ignored header has no class" );

	$enhanced
		.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page()
			.trigger( "pagecreate" );
	ok( $enhanced.hasClass( "ui-header" ), "enhanced header has classes" );

	$.mobile.ignoreContentEnabled = false;
} );
} )( jQuery );
