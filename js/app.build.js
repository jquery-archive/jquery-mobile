({
	appDir: "..",
	baseUrl: "js/",
	dir: "../build",

	optimize: "uglify",

	modules: [
	     {
	         name: "jquery.mobile",
		     include: [ "../almond/almond.js", "jquery.mobile" ],
		     exclude: [ "jquery" ]
	     },
	]
})