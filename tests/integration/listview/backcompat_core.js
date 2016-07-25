define( [
	"qunit",
	"jquery",
	"../tests/integration/listview/sparing-setup-teardown"
	], function( QUnit, $, sparingSetupTeardown ) {

var helper = $.testHelper;

QUnit.module( "Listview style options - turning options off", {
	beforeEach: function() {
		this.listview = $( "#the-listview" ).listview( { inset: true } ).listview( "instance" );
	}
} );

QUnit.test( "Initial state", function( assert ) {
	assert.hasClasses( this.listview.element, "ui-listview-inset ui-corner-all ui-shadow",
		"The listview has all inset-related classes" );
	assert.strictEqual(
		"ui-shadow" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		true, "Class ui-shadow present in class key" );
	assert.strictEqual(
		"ui-corner-all" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		true, "Class ui-corner-all present in class key" );
} );

QUnit.test( "Turning off option corners", function( assert ) {
	this.listview.option( "corners", false );
	assert.lacksClasses( this.listview.element, "ui-corner-all",
		"Class ui-corner-all missing from DOM after corners option was turned off" );
	assert.strictEqual(
		"ui-corner-all" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		false, "Class ui-corner-all missing from class key after corners option was turned off" );
} );

QUnit.test( "Turning off option shadow", function( assert ) {
	this.listview.option( "shadow", false );
	assert.lacksClasses( this.listview.element, "ui-shadow",
		"Class ui-shadow missing from DOM" );
	assert.strictEqual(
		"ui-shadow" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		false, "Class ui-shadow missing from class key" );
} );

QUnit.module( "Listview style options - turning options on", {
	beforeEach: function() {
		this.listview = $( "#listview-off" ).listview( { inset: true } ).listview( "instance" );
	}
} );

QUnit.test( "Turning on option corners", function( assert ) {
	this.listview.option( "corners", true );
	assert.hasClasses( this.listview.element, "ui-corner-all",
		"Class ui-corner-all present in DOM after corners option was turned off" );
	assert.strictEqual(
		"ui-corner-all" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		true, "Class ui-corner-all present in class key after corners option was turned off" );
} );

QUnit.test( "Turning on option shadow", function( assert ) {
	this.listview.option( "shadow", true );
	assert.hasClasses( this.listview.element, "ui-shadow",
		"Class ui-shadow present in DOM after shadow option was turned off" );
	assert.strictEqual(
		"ui-shadow" in
			helper.classStringToHash( this.listview.option( "classes.ui-listview-inset" ) ),
		true, "Class ui-shadow present in class key after shadow option was turned off" );
} );

QUnit.module( "Listview style options - turning classes off", {
	beforeEach: function() {
		this.listview = $( "#the-listview" ).listview( { inset: true } ).listview( "instance" );
	}
} );

QUnit.test( "Turning off class ui-corner-all", function( assert ) {
	this.listview.option( "classes.ui-listview-inset", "ui-shadow" );
	assert.strictEqual( this.listview.option( "corners" ), false,
		"Option corners is false whenever ui-corner-all is absent from ui-listview-inset" );
} );

QUnit.test( "Turning off class ui-shadow", function( assert ) {
	this.listview.option( "classes.ui-listview-inset", "" );
	assert.strictEqual( this.listview.option( "shadow" ), false,
		"Option shadow is false whenever ui-shadow is absent from ui-listview-inset" );
} );

QUnit.module( "Listview style options - turning classes on", {
	beforeEach: function() {
		this.listview = $( "#listview-off" ).listview( { inset: true } ).listview( "instance" );
	}
} );

QUnit.test( "Turning on class ui-corner-all", function( assert ) {
	this.listview.option( "classes.ui-listview-inset", "ui-corner-all" );
	assert.strictEqual( this.listview.option( "corners" ), true,
		"Option corners is true whenever ui-corner-all is present in ui-listview-inset" );
} );

QUnit.test( "Turning on class ui-shadow", function( assert ) {
	this.listview.option( "classes.ui-listview-inset", "ui-shadow" );
	assert.strictEqual( this.listview.option( "shadow" ), true,
		"Option shadow is true whenever ui-shadow is present in ui-listview-inset" );
} );

QUnit.module( "Sparingness of refresh()", sparingSetupTeardown );

QUnit.test( "refresh()", function( assert ) {
	assert.expect( 2 );

	this.listview.refresh();

	assert.strictEqual( this.calls[ 1 ][ 0 ].length, 1,
		"One element was passed to _addClass()" );
	assert.deepEqual( this.calls[ 1 ][ 0 ].get( 0 ), this.newItem[ 0 ],
		"The single item in the call is as expected" );
} );

} );
