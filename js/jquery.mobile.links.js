/*
* "links" plugin - simple class additions for links
*/

define(function() {

$( document ).bind( "pagecreate create", function( e ){
	
	//links within content areas
	$( e.target )
		.find( "a" )
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

});
