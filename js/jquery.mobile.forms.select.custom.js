/*
* jQuery Mobile Framework : "selectmenu" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

/* add options to selectmenu pertaining to custom menus*/
$.mobile.selectmenu.prototype.options.menuPageTheme = "b";
$.mobile.selectmenu.prototype.options.overlayTheme = "a";
$.mobile.selectmenu.prototype.options.hidePlaceholderMenuItems = true;
$.mobile.selectmenu.prototype.options.closeText = "Close";
$.mobile.selectmenu.prototype.options.nativeMenu = true;



$( "select" ).live( "selectmenucreate", function() {

	var select = $( this ),
		selectmenu = select.data( "selectmenu" );

	if ( !selectmenu.options.nativeMenu ) {
		return;
	}
	
	
	



})( jQuery );

