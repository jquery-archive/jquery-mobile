({
	appDir: "..",
	baseUrl: "js",
	dir: "../compiled/demos",

	optimize: "none",

	//Finds require() dependencies inside a require() or define call.
	findNestedDependencies: true,

	modules: [
		{
			name: "jquery.mobile.docs"
		}
	],

	dirExclusionRegExp: /^\.|^build|^compiled/
})