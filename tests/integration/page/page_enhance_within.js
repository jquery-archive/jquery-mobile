define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.asyncTest( "Option enhanceWithin", function( assert ) {
	$.testHelper.pageSequence( [
		function() {
			$( "#open-enhance" ).click();
		},
		function() {
			assert.strictEqual( !!$( "#enhance-header" ).toolbar( "instance" ), true,
				"Page with option enhance contains a toolbar widget" );
			$.mobile.back();
		},
		function() {
			$( "#open-no-enhance" ).click();
		},
		function() {
			assert.strictEqual( !!$( "#no-enhance-header" ).toolbar( "instance" ), false,
				"Page with option enhance turned off contains no toolbar widget" );
			$.mobile.back();
		},
		QUnit.start
	] );
} );

} );
