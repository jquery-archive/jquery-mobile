requirejs.config({
	"paths": {
		// requireJS plugins
		"text": "../external/requirejs/plugins/text",
		"json": "../external/requirejs/plugins/json"
	},
	"shim": {
		"jquery.hashchange": [ "jquery" ],
		"jquery.ui.widget": [ "jquery" ],
		"widgets/jquery.ui.tabs": [ "jquery.ui.widget" ],
		"widgets/jquery.ui.core": [ "jquery" ]
	}
});
