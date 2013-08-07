requirejs.config({
	"paths": {
		// requireJS plugins
		"text": "../external/requirejs/plugins/text",
		"json": "../external/requirejs/plugins/json"
	},
	"shim": {
		"jquery.hashchange": {
			deps: [ "jquery" ]
		},
		"jquery.ui.widget": {
			deps: [ "jquery" ],
			exports: "$.widget"
		},
		"widgets/jquery.ui.tabs": {
			deps: [ "jquery.ui.widget" ]
		},
		"widgets/jquery.ui.core": {
			deps: [ "jquery" ],
			exports: [ "$.ui" ]
		}
	}
});
