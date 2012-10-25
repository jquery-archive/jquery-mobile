/*jshint node: true */
module.exports = function( grunt ) {

/*
To test these tasks locally, create a testswarm-local.json file like this, replacing the token and urls:

{
    "jquerymobile": {
        "authUsername": "jquerymobile",
        "authToken": "1489f0baccc7af70b15d4bee6b0498f66b1ef611",
        "swarmUrl": "http://swarm.local/",
        "testUrl": "http://localhost/",
        "runMax": 1
    }
}

Then call:

	grunt config:test:pages testswarm:jquery-mobile:testswarm-local.json

Adapt the second flag, the 'commit', to match files along with the testUrl property.
 */

function submit( commit, tests, configFile, done ) {
	var test,
		testswarm = require( "testswarm" ),
		config = grunt.file.readJSON( configFile ).jquerymobile,
		testBase = config.testUrl + commit + "/",
		testUrls = [];
	for ( test in tests ) {
		testUrls.push( testBase + tests[ test ] );
	}
	testswarm({
		url: config.swarmUrl,
		pollInterval: 10000,
		timeout: 1000 * 60 * 30,
		done: done
	}, {
		authUsername: config.authUsername,
		authToken: config.authToken,
		jobName: 'jQuery Mobile commit #<a href="https://github.com/jquery/jquery-mobile/commit/' + commit + '">' + commit.substr( 0, 10 ) + '</a>',
		runMax: config.runMax,
		"runNames[]": Object.keys(tests),
		"runUrls[]": testUrls,
		"browserSets[]": ["mobile"]
	});
}

grunt.registerTask( "testswarm", function( commit, configFile ) {
	// TODO currently using only the first five somewhat stable testsuites
	// need to expand this
	var tests = grunt.config.get('global').test_paths, finalSet = [];

	// exclude the base tests for now, they don't appear to play nicely with testswarm
	tests.forEach(function( testPath ) {
		if( ! /base\-tests/.test( testPath ) ){
			finalSet.push( testPath );
		}
	});

	tests = finalSet;

	var test,
		latestTests = {};
	for ( var i = 0; i < tests.length; i++ ) {
		latestTests[ tests[ i ].replace(/^tests\/unit\//, "") ] = tests[ i ];
	}
	submit( commit, latestTests, configFile, this.async() );
});

};
