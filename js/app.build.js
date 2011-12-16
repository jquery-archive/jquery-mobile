({
	appDir: "..",
	baseUrl: "js",
	dir: "../compiled",

	//optimize: "none",

	wrap: {
	    start: "(function( \$, undefined ) {",
	    end: '}( jQuery ));'
	},

	pragmas: {
		jqmExclude: true
	},

	dirExclusionRegExp: /^build|^compiled|^external|^tests/
})
