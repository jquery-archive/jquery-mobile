/*
* jQuery Mobile Framework : "nojs" plugin - class to make elements hidden to A grade browsers
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );