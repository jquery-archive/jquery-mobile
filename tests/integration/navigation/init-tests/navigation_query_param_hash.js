
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

$.testHelper.delayStart();

QUnit.module( "initial page loading tests" );

QUnit.test( "loading a url that refs an embedded page with a query param works", function( assert ) {
	assert.ok( location.href.indexOf( "?test-query-param-hash=true" ) >= -1, "query param present in url" );
	assert.ok( location.hash.indexOf( "loaded" ) >= -1, "the hash is targeted at the page to be loaded" );
	assert.ok( $.mobile.activePage.attr( "id" ), "loaded", "the correct page is loaded" );
} );
} );
