$(function() {
	var Runner = function( ) {
		var self = this;

		$.extend( self, {
			frame: window.frames[ "testFrame" ],

			testTimeout: 3 * 60 * 1000,

			$frameElem: $( "#testFrame" ),

			assertionResultPrefix: "assertion result for test:",

			onTimeout: QUnit.start,

			onFrameLoad: function() {
				// establish a timeout for a given suite in case of async tests hanging
				self.testTimer = setTimeout( self.onTimeout, self.testTimeout );

				// it might be a redirect with query params for push state
				// tests skip this call and expect another
				if( !self.frame.QUnit ) {
					self.$frameElem.one( "load", self.onFrameLoad );
					return;
				}

				// when the QUnit object reports done in the iframe
				// run the onFrameDone method
				self.frame.QUnit.done = self.onFrameDone;
				self.frame.QUnit.testDone = self.onTestDone;
			},

			onTestDone: function( result ) {
				QUnit.ok( !(result.failed > 0), result.name );
				self.recordAssertions( result.total - result.failed, result.name );
			},

			onFrameDone: function( failed, passed, total, runtime ){
				// make sure we don't time out the tests
				clearTimeout( self.testTimer );

				// TODO decipher actual cause of multiple test results firing twice
				// clear the done call to prevent early completion of other test cases
				self.frame.QUnit.done = $.noop;
				self.frame.QUnit.testDone = $.noop;

				// hide the extra assertions made to propogate the count
				// to the suite level test
				self.hideAssertionResults();

				// continue on to the next suite
				QUnit.start();
			},

			recordAssertions: function( count, parentTest ) {
				for( var i = 0; i < count; i++ ) {
					ok( true, self.assertionResultPrefix + parentTest );
				}
			},

			hideAssertionResults: function() {
				$( "li:not([id]):contains('" + self.assertionResultPrefix + "')" ).hide();
			},

			exec: function( data ) {
				var template = self.$frameElem.attr( "data-src" );

				$.each( data.testPages, function(i, dir) {
					QUnit.asyncTest( dir, function() {
						self.dir = dir;
						self.$frameElem.one( "load", self.onFrameLoad );
						self.$frameElem.attr( "src", template.replace("{{testdir}}", dir) );
					});
				});

				// having defined all suite level tests let QUnit run
				QUnit.start();
			}
		});
	};

	// prevent qunit from starting the test suite until all tests are defined
	QUnit.begin = function(  ) {
		this.config.autostart = false;
	};

	// get the test directories
	$.get( "ls.php", (new Runner()).exec );
});
