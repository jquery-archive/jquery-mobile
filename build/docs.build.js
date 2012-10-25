({
	appDir: "..",
	baseUrl: "js",
	dir: "../compiled/demos",

	optimize: "none",

	//Finds require() dependencies inside a require() or define call.
	findNestedDependencies: true,

	//If skipModuleInsertion is false, then files that do not use define()
	//to define modules will get a define() placeholder inserted for them.
	//Also, require.pause/resume calls will be inserted.
	//Set it to true to avoid this. This is useful if you are building code that
	//does not use require() in the built project or in the JS files, but you
	//still want to use the optimization tool from RequireJS to concatenate modules
	//together.
	skipModuleInsertion: true,

	modules: [
		{
			name: "jquery.mobile.docs",
			exclude: [
				"jquery",
				"../external/requirejs/depend",
				"../external/requirejs/order",
				"../external/requirejs/text",
				"../external/requirejs/text!../version.txt"
			]
		},
		{
			name: "jquery.mobile",
			exclude: [
				"jquery",
				"../external/requirejs/depend",
				"../external/requirejs/order",
				"../external/requirejs/text",
				"../external/requirejs/text!../version.txt"
			]
		}
	],

	pragmasOnSave: {
		jqmBuildExclude: true
	},

	//File paths are relative to the build file, or if running a commmand
	//line build, the current directory.
	wrap: {
		startFile: "wrap.start",
		endFile:   "wrap.end"
	},

	dirExclusionRegExp: /^\.|^build|^compiled|^tmp/
})