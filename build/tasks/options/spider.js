module.exports = {
	"src": {
		options: {
			url: "http://localhost:" + "<%= phpPort %>",
			ignore:
			"api\\.jquerymobile\\.com/accordion|notapage|intel|" +
			"api\\.jquerymobile\\.com/[0-9]\\.[0-9]|packt|twitter\\.com/jquery|" +
			"demos/backbone\-requirejs/backbone\-require\.html"
		}
	},
	"dist": {
		options: {
			url: "http://localhost:" + "<%= phpPort %>" + "/dist/",
			ignore:
			"api\\.jquerymobile\\.com/accordion|notapage|intel|" +
			"api\\.jquerymobile\\.com/[0-9]\\.[0-9]|packt|twitter\\.com/jquery|" +
			"demos/backbone\-requirejs/backbone\-require\.html"
		}
	}
};
