( function( QUnit, $ ) {

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
	assert.hasClassesStrict( firstChild, "ui-icon-loading ui-icon",
		"Loader's first child has solely classes 'ui-icon-loading' and 'ui-icon'" );
	assert.strictEqual( lastChild[ 0 ].nodeName.toLowerCase(), "h1",
		"Loader's last child is a h1" );
	assert.strictEqual( lastChild.text(), "", "Loader's last child has no text" );
	assert.hasClassesStrict( lastChild, "", "Loader's hast child has no classes" );

	loader.element.remove();
	loader.destroy();
} );

} )( QUnit, jQuery );
