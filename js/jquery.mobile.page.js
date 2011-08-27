/*
* jQuery Mobile Framework : "page" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false
	},

	_create: function() {
		
		this.element.addClass( "ui-page ui-body-" + this.options.theme );	

		if ( this._trigger( "beforeCreate" ) === false ) {
			return;
		}
	}
});

})( jQuery );
