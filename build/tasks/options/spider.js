module.exports = {
	"src": {
		options: {
			url: "http://localhost:" + "<%= phpPort %>",
			ignore: "notapage|intel|api\\.jquerymobile\\.com/[0-9]\\.[0-9]|packt|twitter\\.com/jquery"
		}
	},
	"dist": {
		options: {
			url: "http://localhost:" + "<%= phpPort %>" + "/dist/",
			ignore: "notapage|intel|api\\.jquerymobile\\.com/[0-9]\\.[0-9]|packt|twitter\\.com/jquery"
		}
	}
};