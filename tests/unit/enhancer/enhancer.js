module( "enhancer: basic" );

test( "Basic widget enhancement", function() {
	expect( 2 );

	$( "#basic-enhance" ).enhance();

	ok( $( "#basic-toolbar" ).toolbar( "instance" ),
		"widgets loaded before enhancer are enhanced" );
	ok( $( "#basic-flipswitch" ).flipswitch( "instance" ),
		"widgets loaded after enhancer are enhanced" );
} );

test( "Custom init selector", function() {
	expect( 1 );

	$( "#basic-enhance" ).enhance();

	ok( $( "#basic-textinput" ).textinput( "instance" ),
		"Widgets work with custom initSelectors" );
} );

test( "enhanceWithin", function() {
	expect( 2 );
	var toolbar = $( "#enhance-within-target" ).enhanceWithin();

	ok( $( "#enhance-within-input" ).textinput( "instance" ),
		"enhanceWithin enhance inputs within the container" );
	strictEqual( !!toolbar.toolbar( "instance" ), false,
		"enhanceWithin does not enhance the parent element" );
} );

var hook;
module( "enhancer: custom hook", {
	setup: function() {
		hook = function() {
			$( this ).find( ".hook-target" ).addClass( "hooked" );
		};
		$.fn.enhance.hooks.push( hook );
	},
	teardown: function() {
		$.fn.enhance.hooks.splice( $.inArray( hook, $.fn.enhance.hooks ), 1 );
	}
} );

test( "custom hook", function( assert ) {
	expect( 1 );

	$( "#hooks" ).enhance();
	assert.hasClasses( $( ".hook-target" ), "hooked" );
} );

var generator;
module( "enhancer: custom generator", {
	setup: function() {
		generator = $.fn.enhance.initGenerator;
		$.fn.enhance.initGenerator = function( prototype ) {
			return "." + prototype.widgetName;
		};
	},
	teardown: function() {
		$.fn.enhance.initGenerator = generator;
	}
} );

test( "custom generator", function( assert ) {
	expect( 3 );

	$( "#custom-generator" ).enhance();
	ok( $( ".toolbar" ).toolbar( "instance" ), "custom generator works with toolbar" );
	ok( $( ".flipswitch" ).flipswitch( "instance" ), "custom generator works with flipswitch" );
	ok( $( ".textinput" ).textinput( "instance" ),
		"custom generator overrides custom initSelectors" );
} );
