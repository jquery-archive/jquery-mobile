/*
* jQuery Mobile Framework : "fieldcontain" plugin - simple class additions to make form row separators
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

//auto self-init widgets
var initSelector = ":jqmData(role='fieldcontain')";

$( document ).bind( "pagecreate create", function( e ){
	$( initSelector, e.target ).fieldcontain();
});

$.fn.fieldcontain = function( options ) {
	return this.addClass( "ui-field-contain ui-body ui-br" );
};

})( jQuery );