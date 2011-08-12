$(function() {
	var Runner = function( ) {
		var self = this;

		$.extend( self, {
			frame: window.frames[ "testFrame" ],

			testTimeout: 3 * 60 * 1000,

			$frameElem: $( "#testFrame" ),

			onTimeout: QUnit.start,

			onFrameLoad: function() {
				// establish a timeout for a given suite in case of async tests hanging
				self.testTimer = setTimeout( self.onTimeout, self.testTimeout );

				// when the QUnit object reports done in the iframe
				// run the onFrameDone method
				self.frame.QUnit.done = self.onFrameDone;
			},

			onFrameDone: function( failed, passed, total, runtime ){
				// record success
				self.recordResult( false , failed );
				self.recordResult( true ,  passed );

				// make sure we don't time out the tests
				clearTimeout( self.testTimer );

				// TODO decipher actual cause of multiple test results firing twice
				// clear the done call to prevent early completion of other test cases
				self.frame.QUnit.done = $.noop;

				// continue on to the next suite
				QUnit.start();
			},

			recordResult: function( result, count ) {
				for( var i = 0; i < count; i++ ) {
					ok( result );
				}
			},

			exec: function( data ) {
				var template = self.$frameElem.attr( "data-src" );

				$.each( data.directories, function(i, dir) {
					QUnit.asyncTest( dir, function() {
						self.dir = dir;
					  self.$frameElem.one( "load", self.onFrameLoad );
						self.$frameElem.attr( "src", template.replace("{{testdir}}", dir) );
					});
				});
			}
		});
	};

	// get the test directories
	$.get( "ls.php", (new Runner()).exec );
});
