// TODO add file dependency on benchmark.js
define( ["jquery"], function( $ ) {
	var fixtures = $( "#fixtures" ), fixturesMarkup = fixtures.html();

	console.log( fixturesMarkup );

	// instantiate the suite with the basics including the reset on start
	// and the result display at the end
	var suite = new Benchmark.Suite({
		onStart: function() {
			fixtures.reset();
			$( "#run" ).text( "Run" );
		},

		onComplete: function() {
			$.each(this, function(i, e) {
				var $li = $( "<tr>" ).appendTo( "#results" )
					.append( "<td class='name'>" )
					.append( "<td class='hz'>" );

				$li.find( ".name" ).text( e.name );
				$li.find( ".hz" ).text( Math.round(e.hz) );
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
		// default the suite title if it's not provided
		suite.name = suite.name || $( "title" ).text();

		// add the run, title, and results table
		$( "<h1>", {id: "suite-name"} ).text( suite.name ).appendTo( "body" );
		$( "<button>", {id: "run"} ).text( "Run" ).appendTo( "#suite-name" );
		$( "<table>", {id: "results"} ).appendTo( "body" );
		$( "<th>", {'class': "name"} ).text( "name" ).appendTo( "#results" );
		$( "<th>", {'class': "hz"} ).text( "ops/sec" ).appendTo( "#results" );

		$( "#run" ).click(function() {
			$( this ).text( "Running" );

			// let the dom ready callback unwind before starting the test suite
			setTimeout(function() {
				suite.run();
			}, 500);
		});
	});

	// provide the suite to modules that have setup as a dep
	return suite;
});