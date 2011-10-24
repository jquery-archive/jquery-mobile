/*
* jQuery Mobile Framework : "links" plugin - simple class additions for links
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	
	//links within content areas
	$( e.target )
		.find( "a" )
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );