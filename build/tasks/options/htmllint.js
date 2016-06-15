var htmllintBad = [
	"!tests/integration/popup/weird-characters-in-id-tests.html",
	"!tests/integration/navigation/blank.html",
	"!tests/integration/listview/index.html",
	"!demos/map-list-toggle/showMore.html"
];

module.exports = {
	options: {
		ignore: [
			/The text content of element “script” was not in the required format: Expected space, tab, newline, or slash but found “.” instead/,
			/Empty heading/,
			/The “color” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill/
		]
	},
	all: {
		src: [ "demos/**/*.html", "tests/**/*.html" ].concat( htmllintBad )
	},
	demos: {
		src: [ "demos/**/*.html" ].concat( htmllintBad )
	},
	tests: {
		src: [ "tests/**/*.html" ].concat( htmllintBad )
	}
};
