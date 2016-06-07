define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var origChange, callSequence;

QUnit.module( "Pagecontainer transition choice", {
	beforeEach: function() {
		callSequence = [];
		origChange = $.mobile.pagecontainer.prototype.change;
		$.mobile.pagecontainer.prototype.change = function( url, options ) {
			callSequence.push( {
				transition: options.transition,
				reverse: !!( options.reverse )
			} );
			return origChange.apply( this, arguments );
		};
	},
	afterEach: function() {
		$.mobile.pagecontainer.prototype.change = origChange;
	}
} );

QUnit.test( "Pagecontainer chooses correct transition", function( assert ) {
	var ready = assert.async();
	var pageContainer = $( ":mobile-pagecontainer" );

	$.testHelper.pageSequence( [
		function() {
			$( "#go-to-b" ).click();
		},
		function() {
			$( "#go-to-c" ).click();
		},
		function() {
			pageContainer.pagecontainer( "back" );
		},
		function() {
			pageContainer.pagecontainer( "back" );
		},
		function() {
			assert.deepEqual( callSequence,
				[
					{ transition: "flip", reverse: false },
					{ transition: "slide", reverse: false },
					{ transition: "slide", reverse: true },
					{ transition: "flip", reverse: true }
				],
				"call sequence has resulted in the correct transitions" );

			ready();
		}
	] );
} );

} );
