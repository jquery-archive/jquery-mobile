/*
 * Mobile page unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var libName = "jquery.mobile.page",
	themedefault = $.mobile.page.prototype.options.theme;

QUnit.module( libName );

var eventStack = [],
	etargets = [],
	cEvents = [],
	cTargets = [];

$( document ).bind( "pagebeforecreate pagecreate", function( e ) {
	eventStack.push( e.type );
	etargets.push( e.target );
} );

$( document ).on( "pagebeforecreate", "#c", function( e ) {
	cEvents.push( e.type );
	cTargets.push( e.target );
	return false;
} );

QUnit.test( "pagecreate event fires when page is created", function( assert ) {
	assert.ok( eventStack[ 0 ] === "pagecreate" || eventStack[ 1 ] === "pagecreate" );
} );

QUnit.test( "pagebeforecreate event fires when page is created", function( assert ) {
	assert.ok( eventStack[ 0 ] === "pagebeforecreate" || eventStack[ 1 ] === "pagebeforecreate" );
} );

QUnit.test( "pagebeforecreate fires before pagecreate", function( assert ) {
	assert.ok( eventStack[ 0 ] === "pagebeforecreate" );
} );

QUnit.test( "target of pagebeforecreate event was div #a", function( assert ) {
	assert.ok( $( etargets[ 0 ] ).is( "#a" ) );
} );

QUnit.test( "target of pagecreate event was div #a", function( assert ) {
	assert.ok( $( etargets[ 0 ] ).is( "#a" ) );
} );

QUnit.test( "page element has ui-page class", function( assert ) {
	assert.ok( $( "#a" ).hasClass( "ui-page" ) );
} );

QUnit.test( "page element has default page theme class when not overidden", function( assert ) {
	assert.ok( $( "#a" ).hasClass( "ui-page-theme-" + themedefault ) );
} );

QUnit.test( "setting option 'theme' on page updates classes correctly", function( assert ) {
	$( "#a" ).page( "option", "theme", "x" );
	assert.deepEqual( $( "#a" ).hasClass( "ui-page-theme-x" ), true, "After setting option 'theme' to 'x', the page has the new theme class" );
	assert.deepEqual( $( "#a" ).hasClass( "ui-page-theme-" + themedefault ), false, "After setting option 'theme', the page does not have default theme class" );
	$( "#a" ).page( "option", "theme", themedefault );
} );

QUnit.test( "B page has non-default theme matching its data-theme attr", function( assert ) {
	$( "#b" ).page();
	var btheme = $( "#b" ).jqmData( "theme" );
	assert.ok( $( "#b" ).hasClass( "ui-page-theme-" + btheme ) );
} );

QUnit.test( "Binding to pagebeforecreate and returning false prevents pagecreate event from firing", function( assert ) {
	$( "#c" ).page();

	assert.ok( cEvents[ 0 ] === "pagebeforecreate" );
	assert.ok( !cTargets[ 1 ] );
} );

QUnit.test( "Binding to pagebeforecreate and returning false prevents classes from being applied to page", function( assert ) {
	$( "#c" ).page();

	assert.ok( !$( "#c" ).hasClass( "ui-body-" + themedefault ) );
	assert.ok( !$( "#c" ).hasClass( "ui-page" ) );
} );

QUnit.asyncTest( "page container is updated to page theme at pagebeforeshow", function( assert ) {
	assert.expect( 1 );

	var pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "theme" );

	$( ".ui-pagecontainer" ).removeClass( pageTheme );

	$.mobile.activePage
		.bind( "pagebeforeshow", function() {
			assert.ok( $( ".ui-pagecontainer" ).hasClass( pageTheme ),
				"Page container has the same theme as the page on pagebeforeshow" );
			QUnit.start();
		} )
		.trigger( "pagebeforeshow" );

} );

QUnit.asyncTest( "page container is updated to page theme at pagebeforeshow", function( assert ) {

	assert.expect( 1 );

	var pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "theme" );

	$( ".ui-pagecontainer" ).addClass( pageTheme );

	$.mobile.activePage
		.bind( "pagebeforehide", function() {
			assert.ok( !$.mobile.pageContainer.hasClass( pageTheme ), "Page container does not have the same theme as the page on pagebeforeshow" );
			QUnit.start();
		} )
		.trigger( "pagebeforehide" );

} );

} );
