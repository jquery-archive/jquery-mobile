define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Loader html option", function( assert ) {
	var children, firstChild, lastChild,
		loader = $.mobile.loader( {
			html: "<span class='red'>Danger, Will Robinson!</span>"
		} );

	loader.show();
	children = loader.element.children();
	firstChild = children.first();

	assert.strictEqual( children.length, 1, "Loader has only one child" );
	assert.strictEqual( firstChild[ 0 ].nodeName.toLowerCase(), "span",
		"Loader's only child is a span" );
	assert.hasClassesStrict( firstChild, "red", "Loader's only child has solely class 'red'" );
	assert.strictEqual( firstChild.text(), "Danger, Will Robinson!",
		"Loader's only child has the correct text" );

	loader.resetHtml();
	children = loader.element.children();
	firstChild = children.first();
	lastChild = children.last();

	assert.strictEqual( children.length, 2, "Loader has two children" );
	assert.strictEqual( firstChild[ 0 ].nodeName.toLowerCase(), "span",
		"Loader's first child is a span" );
	assert.hasClassesStrict( firstChild, "ui-icon-loading ui-loader-icon",
		"Loader's first child has solely classes 'ui-icon-loading' and 'ui-loader-icon'" );
	assert.strictEqual( lastChild[ 0 ].nodeName.toLowerCase(), "h1",
		"Loader's last child is a h1" );
	assert.strictEqual( lastChild.text(), "", "Loader's last child has no text" );
	assert.hasClasses( lastChild, "ui-loader-header",
		"Loader's last child has class 'ui-loader-header'" );

	loader.hide();
	loader.element.remove();
	loader.destroy();
} );

QUnit.test( "show() with custom HTML", function( assert ) {
	var loader = $.mobile.loader();

	loader.show( {
		textonly: false,
		textVisible: false,
		text: ""
	} );
	assert.hasClasses( loader.element, "ui-loader ui-corner-all ui-loader-default ui-body-a",
		"Initial classes are correct" );

	loader.show( {
		theme: "b",
		textonly: true,
		textVisible: true,
		text: "Custom Loader",
		html: "<span class='ui-bar ui-shadow ui-overlay-d ui-corner-all'>" +
			"<img src='../../../demos/_assets/img/jquery-logo.png'></img></span>"
	} );
	assert.deepEqual( loader.element.children().first()[ 0 ].nodeName.toLowerCase(), "span",
		"After showing custom HTML, the first child is a span" );
	assert.strictEqual( loader.element.children().length, 1,
		"After showing custom HTML, the loader has only one child" );
	assert.hasClasses( loader.element, "ui-loader-verbose ui-loader-textonly",
		"After showing custom HTML, 'ui-loader-verbose' and 'ui-loader-textonly' are present" );

	loader.show( {
		textonly: false,
		textVisible: false,
		text: ""
	} );
	assert.hasClasses( loader.element, "ui-loader ui-corner-all ui-loader-default ui-body-a",
		"After showing default loader, classes are correct" );
	assert.deepEqual( loader.element.children().first()[ 0 ].nodeName.toLowerCase(), "span",
		"After showing default loader, the first child is a span" );
	assert.strictEqual( loader.element.children().length, 2,
		"After showing default loader, there are two children" );
	assert.deepEqual( loader.element.children().last()[ 0 ].nodeName.toLowerCase(), "h1",
		"After showing default loader the last child is a h1" );
	assert.hasClassesStrict( loader.element.children().last(), "ui-loader-header",
		"After showing default loader the last child has exactly class 'ui-loader-header'" );

	loader.hide();
	loader.element.remove();
	loader.destroy();
} );

} );
