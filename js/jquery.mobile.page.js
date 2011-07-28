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
		var $elem = this.element,
			o = this.options;

		if ( this._trigger( "beforeCreate" ) === false ) {
			return;
		}

		$elem.addClass( "ui-page ui-body-" + o.theme );
	}
});

})( jQuery );
