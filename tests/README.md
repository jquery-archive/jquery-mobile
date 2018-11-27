## How to use Bootstrap dependency manager

[Bootstrap](lib/bootstrap.js) is a helper library that will be used to manage dependencies for a test file easily.

Features:

- Used RequireJS to load all the dependencies
- Provides attribute support for various use cases
- Includes all major deps and qunit helpers by default
- RequireJS config is also loaded by Bootstrap


`qunit-assert-classes` and `qunit-assert-domequal` are required by default in bootstrap

`jquery` version can be specified in `jquery param` in url appended by `?jquery=VERSION_NO`

Following attributes are supported by bootstrap and should be mentioned in script tag loading bootstrap:

`data-init` = Specifies if init is required as in testHelper. If `no-backcompat` then bootstrap will include `no-backcompat` otherwise is will include `set-ns` and `widgets/widget.backcompat`

`data-no-backcompat` = Attribute for specifying if backcompat is not needed. Init attribute is require for this to active

`data-full` = This is analogous to requiring index.php file in js folder.

`data-no-autoinit` = Specifies if bootstrap has to call QUnit.start(). If not specified you have to call `QUnit.start()` somewhere in your tests

`data-deps` = All the dependencies are to mentioned here seprated by spaces relative to `js` dir. `widgets` and `events` deps don't need to be appended with `widgets/` and `events/`

`data-modules` = All the test module files are to be mentioned here separated by spaces

`data-init-after-modules` = If you want to include init file after modules are loaded

`data-base-url` = If you want to change the base url of requirejs config. Default url = `../../../js`

### Example HEAD tag of HTML file using bootstrap

```html
<head>
	<meta charset="UTF-8" />
	<title>jQuery Mobile Navigate Events Test Suite</title>

	<script src="../../../../external/requirejs/require.js"></script>

	<link rel="stylesheet" href="../../../../external/qunit/qunit.css"/>
	<link rel="stylesheet" href="../../../jqm-tests.css"/>

	<script src="../../../lib/bootstrap.js"
			data-base-url="../../../../js"
			data-deps="./early_popstate_handler.js navigate"
			data-full="true"
			data-modules="event_core">
	</script>
</head>
```

- `data-base-url`: specifies base url for requirejs config since we are in folder `integration/navigation/event`
- `data-deps`: All deps which are not in the `js` folder need to be appened with `.js` so that requirejs resolves it locally.
- `data-modules`: Specifies locally resolved main test file

