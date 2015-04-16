( function() {

var origChange, callSequence;

module( "Pagecontainer transition choice", {
	setup: function() {
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
	teardown: function() {
		$.mobile.pagecontainer.prototype.change = origChange;
	}
} );

asyncTest( "Pagecontainer chooses correct transition", function() {
	debugger;

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
			deepEqual( callSequence,
				[
					{ transition: "flip", reverse: false },
					{ transition: "slide", reverse: false },
					{ transition: "slide", reverse: true },
					{ transition: "flip", reverse: true }
				],
				"call sequence has resulted in the correct transitions" );

			start();
		}
	] );
} );

} )();
