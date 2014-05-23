requirejs.config({
	"paths": {
		// requireJS plugins
		"text": "../external/requirejs/plugins/text",
		"json": "../external/requirejs/plugins/json",

		"jquery": "../external/jquery/jquery",
		"jquery-ui": "../external/jquery-ui",
		"jquery-plugins": "../external/jquery/plugins",
		"pointerevents-polyfill": "../external/pointerevents-polyfill"
	},
	"shim": {
		"jquery-plugins/jquery.hashchange": [ "jquery" ],
		"jquery-ui/jquery.ui.widget": [ "jquery" ],
		"jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
		"jquery-ui/jquery.ui.core": [ "jquery" ],
		"pointerevents-polyfill/touch-action": [ "pointerevents-polyfill/boot" ],
		"pointerevents-polyfill/PointerEvent": [ "pointerevents-polyfill/touch-action" ],
		"pointerevents-polyfill/pointermap": [ "pointerevents-polyfill/PointerEvent" ],
		"pointerevents-polyfill/dispatcher": [ "pointerevents-polyfill/pointermap" ],
		"pointerevents-polyfill/installer": [ "pointerevents-polyfill/dispatcher" ],
		"pointerevents-polyfill/mouse": [ "pointerevents-polyfill/installer" ],
		"pointerevents-polyfill/touch": [ "pointerevents-polyfill/mouse" ],
		"pointerevents-polyfill/ms": [ "pointerevents-polyfill/touch" ],
		"pointerevents-polyfill/platform-events": [ "pointerevents-polyfill/ms" ],
		"pointerevents-polyfill/capture": [ "pointerevents-polyfill/platform-events" ]

	}
});
