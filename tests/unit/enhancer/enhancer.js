define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.module( "enhancer: basic" );

QUnit.test( "Basic widget enhancement", function( assert ) {
	assert.expect( 2 );

	$( "#basic-enhance" ).enhance();

	assert.ok( $( "#basic-toolbar" ).toolbar( "instance" ),
		"widgets loaded before enhancer are enhanced" );
	assert.ok( $( "#basic-flipswitch" ).flipswitch( "instance" ),
		"widgets loaded after enhancer are enhanced" );
} );

QUnit.test( "Custom init selector", function( assert ) {
	assert.expect( 1 );

	$( "#basic-enhance" ).enhance();

	assert.ok( $( "#basic-textinput" ).textinput( "instance" ),
		"Widgets work with custom initSelectors" );
} );

QUnit.test( "enhanceWithin", function( assert ) {
	assert.expect( 2 );
	var toolbar = $( "#enhance-within-target" ).enhanceWithin();

	assert.ok( $( "#enhance-within-input" ).textinput( "instance" ),
		"enhanceWithin enhance inputs within the container" );
	assert.strictEqual( !!toolbar.toolbar( "instance" ), false,
		"enhanceWithin does not enhance the parent element" );
} );

var hook;
QUnit.module( "enhancer: custom hook", {
	setup: function() {
		hook = function() {
			$( this ).find( ".hook-target" ).addClass( "hooked" );
		};
		$.enhance.hooks.push( hook );
	},
	teardown: function() {
		$.enhance.hooks.splice( $.inArray( hook, $.enhance.hooks ), 1 );
	}
} );

QUnit.test( "custom hook", function( assert ) {
	assert.expect( 1 );

	$( "#hooks" ).enhance();
	assert.hasClasses( $( ".hook-target" ), "hooked" );
} );

var generator;
QUnit.module( "enhancer: custom generator", {
	setup: function() {
		generator = $.fn.enhance.initGenerator;
		$.enhance.initGenerator = function( prototype ) {
			return "." + prototype.widgetName;
		};
	},
	teardown: function() {
		$.enhance.initGenerator = generator;
	}
} );

QUnit.test( "custom generator", function( assert ) {
	assert.expect( 3 );

	$( "#custom-generator" ).enhance();
	assert.ok( $( ".toolbar" ).toolbar( "instance" ),
		"custom generator works with toolbar" );
	assert.ok( $( ".flipswitch" ).flipswitch( "instance" ),
		"custom generator works with flipswitch" );
	assert.ok( $( ".textinput" ).textinput( "instance" ),
		"custom generator overrides custom initSelectors" );
} );

QUnit.module( "enhancer: multiple widgets" );

QUnit.test( "enhancer - define multiple widgets", function( assert ) {
	assert.expect( 2 );

	$( "#enhance-multiple" ).enhance();
	assert.ok( $( "#enhancer-multiple" ).is( ":ui-button" ),
		"Widget with multiple roles calls first widget" );
	assert.ok( $( "#enhancer-multiple" ).is( ":mobile-toolbar" ),
		"Widget with multiple roles calls second widget" );
} );

QUnit.test( "$.fn.enhanceRoles", function( assert ) {
	assert.expect( 1 );
	var roles = $( "#enhancer-multiple" ).enhanceRoles();

	assert.deepEqual( [ "button", "toolbar" ], roles, "enhanceRoles returns array of roles" );
} );

QUnit.test( "$.fn.enhanceOptions", function( assert ) {
	assert.expect( 1 );
	var options = $( "#enhancer-options" ).enhanceOptions();
	var expected = {
		optionbaz: "boo",
		optionBar: "foo",
		optionFoo: "bar",
		role: "button toolbar"
	};

	assert.deepEqual( options, expected, "enhanceOptions returns options object" );
} );

} );
