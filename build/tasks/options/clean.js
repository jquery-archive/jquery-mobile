var path = require( "path" );

module.exports = {
	dist: [ "<%= dist %>" ],
	git: [ path.join( "<%= dist %>", "git" ) ],
	tmp: [ "<%= dirs.tmp %>" ],
	testsOutput: [ "_tests" ],
	"googleCDN": [ "<%= dirs.cdn.google %>" ],
	"jqueryCDN": [ "<%= dirs.cdn.jquery %>" ]
};
