({
	appDir: "..",
	baseUrl: "js/",
	dir: "../dist",

	optimize: "none",

	modules: [
	     {
	         name: "jquery.mobile",
		     include: [ "almond" ],
		     exclude: [ "jquery", "order" ]
	     },
	]
})