// TODO add file dependency on benchmar
define( ["jquery"], function( $ ) {
	var fixtures = $( "#fixtures" ), fixturesMarkup = fixtures.html();

	// instantiate the suite with the basics including the reset on start
	// and the result display at the end
	var suite = new Benchmark.Suite({
		onStart: function() {
			fixtures.reset();
		},

		onComplete: function() {
			$.each(this, function(i, e) {
				$( "<div> name: " + e.name + ", hz: " + Math.round(e.hz) + "</div>" )
					.appendTo( "#results" );
			});
		}
	});

	// provide the fixtures to test suites that have this module as a dep
	suite.fixtures = fixtures;

	// provide a fixture reset for use within the test callback
	suite.fixtures.reset = function() {
		fixtures.empty();
		fixtures.append( fixturesMarkup );
	};

	// setup the DOM for displaying/running the results
	$(function() {
		$( "body" ).append( "<div id='results'></div>" );
		$( "body" ).append( "<button id='run'>Run!</button>" );

		$( "#run" ).click(function() {
			$(this).text( "Running!" );

			setTimeout(function() {
				suite.run();
			});
		});
	});

	// provide the suite to modules that have setup as a dep
	return suite;
});