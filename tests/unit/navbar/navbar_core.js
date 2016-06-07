/*
 * Mobile navbar unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "classes are correctly assigned", function( assert ) {
	var navbar = $( "#enhanced-classes" ),
		r = navbar.find( "li" ).eq( 0 ).find( "a span" ),
		d = navbar.find( "li" ).eq( 1 ).find( "a span" ),
		u = navbar.find( "li" ).eq( 2 ).find( "a span" );

	assert.hasClasses( r, "ui-icon-arrow-r" );
	assert.hasClasses( d, "ui-icon-arrow-d" );
	assert.hasClasses( u, "ui-icon-arrow-u" );
} );

QUnit.module( "navbar exceed maxbutton, without moreButton" );

QUnit.test( "exceeding default maxbutton creates a new row", function( assert ) {
	var navbar = $( "#default-maxbutton-overflow" ),
		navRows = navbar.children( "ul" ),
		navRowCount = navRows.length;

	assert.ok( navRowCount === 2, "six items overflows to two lists" );
	assert.hasClasses( navRows.eq( 1 ), "ui-navbar-row" );
	assert.ok( navRows.eq( 1 ).children( "li" ).length === 1,
		"overflow row holds sixth nav item" );
} );

QUnit.test( "override the default maxbutton works", function( assert ) {
	var navbar = $( "#default-maxbutton-override" ),
		navRows = navbar.children( "ul" ),
		navRowCount = navRows.length;

	assert.ok( navRowCount === 1, "six items should fit on a single row when maxbutton = 6" );
	assert.ok( navRows.children( "li" ).length === 6,
		"there should be six items on the navbar row" );
} );

QUnit.module( "navbar appending items and refresh, without moreButton", {
	beforeEach: function() {
		this.addNav = $( "#add-items-navbar" );
		this.navbarRow = this.addNav.find( "ul" );
		this.navbarRow.append( "<li><a href='#'>four</a></li>" );
		this.navbarRow.append( "<li><a href='#'>five</a></li>" );
		this.navbarRow.append( "<li><a href='#'>six</a></li>" );
		this.addNav.navbar( "refresh" );
	}
} );

QUnit.test( "adding items to navbar", function( assert ) {
	var navRows = this.addNav.children( "ul" ),
		navRowCount = navRows.length;

	assert.hasClasses( this.navbarRow.find( "li:last-child > a" ), "ui-button" );
	assert.ok( navRowCount === 2, "six items overflows to two lists" );
	assert.hasClasses( navRows.eq( 1 ), "ui-navbar-row" );
	assert.ok( navRows.eq( 1 ).children( "li" ).length === 1,
		"overflow row holds sixth nav item" );
} );

QUnit.module( "navbar destroy, without moreButton", {
	beforeEach: function() {
		this.navbar = $( "#default-maxbutton-overflow-destroy" );
		this.navbar.navbar( "destroy" );
	}
} );

QUnit.test( "destroy navbar ", function( assert ) {
	var navRows = this.navbar.children( "ul" ),
		navRowCount = navRows.length;

	assert.ok( navRowCount === 1, "destroyed navbars revert to one ul" );
	navRows.find( "li" ).each( function() {
		assert.lacksClasses( $( this ).find( "a" ), "ui-button" );
	} );
} );

QUnit.module( "navbar exceed maxbutton, with moreButton" );

QUnit.test( "exceeding maxbutton creates morebutton", function( assert ) {
	var navbar = $( "#default-maxbutton-morebutton" ),
		morebutton = navbar.find( "li:last-child > button" );

	assert.equal( morebutton.data( "rel" ), "popup",
		"The last item in the list is the more button" );

} );
} );
