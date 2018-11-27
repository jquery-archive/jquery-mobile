define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

$( function() {

$.mobile.ns = "nstest-";

function initSingleTable( tableId ) {
	$( "#" + tableId + "-popup" )
		.find( "input" )
			.checkboxradio()
		.end()
		.find( "fieldset" )
			.controlgroup()
		.end()
		.popup();
	$( "#" + tableId ).table();
}

initSingleTable( "columntoggle-option-test-blank" );
initSingleTable( "columntoggle-option-test-explicit" );
initSingleTable( "columntoggle-toggle-button" );
initSingleTable( "columntoggle-toggle-button-initially-absent" );
initSingleTable( "columntoggle-toggle-ui" );

} );

} );
