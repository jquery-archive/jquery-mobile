/*
* "page" plugin
*/

define( [ "jquery", "jquery.mobile.widget" ], function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
	},

	_create: function() {

		this._trigger( "beforecreate" );

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );
			
		// if touchOverflow scrolling is enabled, add class
		if( $.support.touchOverflow && $.mobile.touchOverflowEnabled ){
			this.element.addClass( "ui-mobile-touch-overflow" );
		}	
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim(options.keepNative);

		if( keepNativeDefined && options.keepNative !== options.keepNativeDefault ){
			return [options.keepNative, options.keepNativeDefault].join(", ");
		}

		return options.keepNativeDefault;
	}
});
});
