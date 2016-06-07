define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
QUnit.module( "page" );

QUnit.asyncTest( "Entity in page title", function( assert ) {
	$.testHelper.pageSequence( [
		function() {
			$( "#openTestPage" ).click();
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "title-test",
				"Title test page is active" );
			assert.strictEqual( document.title.length > 0, true, "Document title is not empty" );
			assert.strictEqual(
				!!document.title.match( /&([a-zA-Z]+|#([0-9]+|[xX][0-9a-fA-F]+));/ ),
				false, "Document title contains no character references" );
			$.mobile.back();
		},

		QUnit.start
	] );
} );
} );
