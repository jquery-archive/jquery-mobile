({
	appDir: "..",
	baseUrl: "js/",
	dir: "../dist",

	//optimize: "none",

	modules: [
		{
		 name: "jquery.mobile",
		 //include: [ "almond" ],
		 exclude: [ "jquery", "order" ]
		}
	],

	wrap: {
	    start: "(function() {",
	    end: '\nif ( typeof define === "function" && define.amd ) {\ndefine( "jquery.mobile", [], function () { return jQuery.mobile; } );\n}\n}());'
	},

	dirExclusionRegExp: /^build|^compiled|^external|^tests/
})
