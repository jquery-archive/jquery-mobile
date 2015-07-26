define( [ "qunit", "jquery" ], function( QUnit, $ ) {

// Convert the values of the keys under option classes to hashes so they may be compared via
// deepEquals. We convert to hash because order does not matter in a hash, just as it does not
// matter in a class string.
function convertClassValuesToHashes( options ) {
	var classKey;

	if ( options.classes ) {
		for ( classKey in options.classes ) {
			if ( typeof options.classes[ classKey ] === "string" ) {

				// Overwrite the string-typed class value with a hash
				options.classes[ classKey ] =
					$.testHelper.classStringToHash( options.classes[ classKey ] );
			}
		}
	}

	return options;
}

QUnit.module( "Synchronization of classes option and style options", {
	setup: function() {
		$.widget( "mobile.testwidget", {
			options: {
				classes: {
					"test-testwidget": "ui-button-inline ui-shadow"
				},
				inline: true,
				mini: false,
				shadow: true,
				corners: false
			},
			classProp: "test-testwidget",
			_create: function() {
				this._addClass( this.element, "test-testwidget" );
				this._enhance();
			},
			_enhance: $.noop
		} );
		$.widget( "mobile.testwidget", $.mobile.testwidget, $.mobile.widget.backcompat );
	},
	teardown: function() {
		delete $.mobile.testwidget;
		delete $.fn.testwidget;
	}
} );

QUnit.test( "Style options are updated when the classes option changes", function( assert ) {
	var testWidget = $.mobile.testwidget( {
		classes: {
			"test-testwidget": "ui-corner-all"
		}
	} );

	assert.deepEqual( testWidget.option(), {
		create: null,
		disabled: false,
		classes: {
			"test-testwidget": "ui-corner-all"
		},
		inline: false,
		mini: false,
		shadow: false,
		corners: true
	},
		"Widget options reflect classes option values" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-corner-all", "Element has corner class" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-button-inline ui-mini ui-shadow",
		"Element does not have inline, mini, and shadow classes" );

	testWidget.option( "classes.test-testwidget", "ui-button-inline ui-mini" );
	assert.deepEqual( convertClassValuesToHashes( testWidget.option() ), {
		create: null,
		disabled: false,
		classes: {
			"test-testwidget": {
				"ui-button-inline": true,
				"ui-mini": true
			}
		},
		inline: true,
		mini: true,
		shadow: false,
		corners: false
	},
		"Widget options reflect classes option values" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-button-inline ui-mini" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-shadow ui-corner-all" );
} );

QUnit.test( "The classes option is updated when style options change", function( assert ) {
	var testWidget = $.mobile.testwidget( {
		inline: false,
		shadow: false
	} );

	assert.deepEqual( testWidget.option(),
		{
			create: null,
			disabled: false,
			classes: {
				"test-testwidget": ""
			},
			inline: false,
			mini: false,
			shadow: false,
			corners: false
		},
		"After initial creation classes option value is empty" );
	assert.lacksClasses( testWidget.element[ 0 ],
		"ui-button-inline ui-mini ui-shadow ui-corner-all",
		"Element lacks all classes" );

	// Intentionally setting the option twice here to ensure that the resulting class gets deduped
	testWidget.option( "shadow", true );
	testWidget.option( "shadow", true );
	assert.deepEqual( testWidget.option(),
		{
			create: null,
			disabled: false,
			classes: {
				"test-testwidget": "ui-shadow"
			},
			inline: false,
			mini: false,
			shadow: true,
			corners: false
		},
		"After turning on shadow classes option value contains 'ui-shadow'" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-shadow", "Element has shadow class" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-button-inline ui-mini ui-corner-all",
		"Element lacks all other classes" );

	testWidget.option( "mini", true );
	assert.deepEqual( convertClassValuesToHashes( testWidget.option() ),
		{
			create: null,
			disabled: false,
			classes: {
				"test-testwidget": {
					"ui-shadow": true,
					"ui-mini": true
				}
			},
			inline: false,
			mini: true,
			shadow: true,
			corners: false
		},
		"After turning on mini classes option value contains 'ui-shadow' and 'ui-mini'" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-shadow ui-mini",
		"Element has shadow and mini classes" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-button-inline ui-corner-all",
		"Element lacks all other classes" );

	testWidget.option( {
		mini: false,
		inline: true
	} );
	assert.deepEqual( convertClassValuesToHashes( testWidget.option() ),
		{
			create: null,
			disabled: false,
			classes: {
				"test-testwidget": {
					"ui-button-inline": true,
					"ui-shadow": true
				}
			},
			inline: true,
			mini: false,
			shadow: true,
			corners: false
		},
		"After turning off mini and turning on inline classes option value contains 'ui-shadow' " +
		"and 'ui-button-inline'" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-shadow ui-button-inline",
		"Element has shadow and mini classes" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-mini ui-corner-all",
		"Element lacks all other classes" );
} );

QUnit.test( "The classes option is updated correctly when an option is turned on", function( assert ) {
	var testWidget = $.mobile.testwidget( {
		corners: true
	} );

	assert.deepEqual( convertClassValuesToHashes( testWidget.option() ),
		{
			create: null,
			disabled: false,
			classes: {
				"test-testwidget": {
					"ui-button-inline": true,
					"ui-corner-all": true,
					"ui-shadow": true
				}
			},
			inline: true,
			mini: false,
			shadow: true,
			corners: true
		},
		"After initial creation classes option value is correct" );
	assert.hasClasses( testWidget.element[ 0 ], "ui-button-inline ui-corner-all ui-shadow",
		"Element has classes ui-button-inline, ui-corner-all, and ui-shadow" );
	assert.lacksClasses( testWidget.element[ 0 ], "ui-mini", "Element lacks ui-mini class" );
} );

QUnit.module( "wrapperClass", {
	setup: function() {
		$.widget( "mobile.testwidget", {
			options: {
				classes: {},
				enhanced: false,
				wrapperClass: ""
			},
			_create: function() {
				if ( !this.options.enhanced ) {
					this._enhance();
				}
				return this._superApply( arguments );
			},
			_enhance: $.noop
		} );
		$.widget( "mobile.testwidget", $.mobile.testwidget, $.mobile.widget.backcompat );
	},
	teardown: function() {
		delete $.mobile.testwidget;
		delete $.fn.testwidget;
	}
} );

QUnit.test( "wrapperClass is correctly applied, modified, and removed", function( assert ) {
	var testWidget = $.mobile.testwidget( {
			wrapperClass: "abc"
		} ),
		testElement = testWidget.element;

	assert.hasClasses( testElement[ 0 ], "abc", "Wrapper class initially applied" );

	testWidget.option( "wrapperClass", "def" );
	assert.hasClasses( testElement[ 0 ], "def", "Wrapper class update applied" );
	assert.lacksClasses( testElement[ 0 ], "abc", "Wrapper class old value removed" );

	testWidget.destroy();
	assert.deepEqual( !!testElement.attr( "class" ), false,
		"Class attribute cleared upon destroy()" );
} );

} );
