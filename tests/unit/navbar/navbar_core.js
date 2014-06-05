/*
 * mobile navbar unit tests
 */
( function( QUnit, $ ) {
QUnit.test( "navbar button gets active button class when clicked", function( assert ) {
	var link = $( "#disabled-btn-click a:not(.ui-state-disabled)" ).first();

	link.click();
	assert.ok( link.hasClass( "ui-button-active" ), "link has active button class" );
} );

QUnit.test( "disabled navbar button doesn't add active button class when clicked", function( assert ) {
	var link = $( "#disabled-button-click a.ui-disabled" ).first();

	link.click();
	assert.ok( !link.hasClass( "ui-button-active" ), "link doesn't have active button class" );
} );

QUnit.test( "classes are correctly assigned", function( assert ) {
	var $ul = $( '#enhanced-classes' ),
		r = $ul.find( "li" ).eq( 0 ).find( "a" ),
		d = $ul.find( "li" ).eq( 1 ).find( "a" ),
		u = $ul.find( "li" ).eq( 2 ).find( "a" );

	assert.ok( r.hasClass( "ui-icon-arrow-r" ) && !r.hasClass( "ui-icon-arrow-d" ) && !r.hasClass( "ui-icon-arrow-u" ), "first item only has class of arrow-r" );
	assert.ok( !d.hasClass( "ui-icon-arrow-r" ) && d.hasClass( "ui-icon-arrow-d" ) && !d.hasClass( "ui-icon-arrow-u" ), "second item only has class of arrow-d" );
	assert.ok( !u.hasClass( "ui-icon-arrow-r" ) && !u.hasClass( "ui-icon-arrow-d" ) && u.hasClass( "ui-icon-arrow-u" ), "third item only has class of arrow-u" );
} );

QUnit.module( "navbar exceed maxbutton, without moreButton" );

QUnit.test( "exceeding default maxbutton creates a new row", function() {
    var navbar = $( "#default-maxbutton-overflow" ),
        navRows = navbar.children( "ul" ),
        navRowCount = navRows.length;

    ok( navRowCount === 2, "six items overflows to two lists" );
    ok( navRows.eq(1).hasClass("ui-navbar-row"),
        "overflow list gets appropriate classname" );
    ok( navRows.eq(1).children( "li" ).length === 1,
        "overflow row holds sixth nav item" );
} );

QUnit.test( "override the default maxbutton works", function() {
    var navbar = $( "#default-maxbutton-override" ),
        navRows = navbar.children( "ul" ),
        navRowCount = navRows.length;

    ok( navRowCount === 1, "six items should fit on a single row when maxbutton = 6" );
    ok( navRows.children( "li" ).length === 6, "there should be six items on the navbar row" );
});

QUnit.module( "navbar appending items and refresh, without moreButton" , {
    setup: function() {
        this.addNav = $( "#add-items-navbar" );
        this.navbarRow = this.addNav.find( "ul" );
        this.navbarRow.append( "<li><a href='#'>four</a></li>" );
        this.navbarRow.append( "<li><a href='#'>five</a></li>" );
        this.navbarRow.append( "<li><a href='#'>six</a></li>" );
        this.addNav.navbar( "refresh" );
    }
});

QUnit.test( "adding items to navbar", function() {
    var navRows = this.addNav.children( "ul" ),
        navRowCount = navRows.length;

    ok( this.navbarRow.find( "li:last-child > a" ).hasClass ( "ui-btn" ),
        "added items get ui-btn class after refresh" );
    ok( navRowCount === 2, "six items overflows to two lists" );
    ok( navRows.eq(1).hasClass("ui-navbar-row"),
        "overflow list gets appropriate classname" );
    ok( navRows.eq(1).children( "li" ).length === 1,
        "overflow row holds sixth nav item" );
});

QUnit.module( "navbar destroy, without moreButton", {
    setup: function() {
        this.navbar = $( "#default-maxbutton-overflow-destroy" );
        this.navbar.navbar( "destroy" );
    }
} );

QUnit.test( "destroy navbar ", function() {
    var navRows = this.navbar.children( "ul" ),
        navRowCount = navRows.length;

    ok( navRowCount === 1, "destroyed navbars revert to one ul" );
    navRows.find( "li" ).each( function() {
        ok( !$(this).find("a").hasClass( "ui-btn" ), "ui-btn class removed on item" );
    });
});
} )( QUnit, jQuery );
