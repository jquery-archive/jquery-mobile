//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Widget factory extentions for mobile.
//>>label: Widget Factory
//>>group: Core
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"./jquery.mobile.ns",
	"jquery.ui.widget",
	"jquery.mobile.data" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var rcapitals = /[A-Z]/g,
	replaceFunction = function( c ) {
		return "-" + c.toLowerCase();
	};

$.extend( $.Widget.prototype, {
	_getCreateOptions: function() {
		var option, value,
			elem = this.element[ 0 ],
			options = {};

		for ( option in this.options ) {
			value = $.mobile.getAttribute( elem, option.replace( rcapitals, replaceFunction ) );
			if ( value != null ) {
				options[ option ] = value;
			}
		}

		return options;
	},

	enhanceWithin: function( target, useKeepNative ) {
		this.enhance( $( $[ this.namespace ][ this.widgetName ].initSelector, $( target ) ), useKeepNative );
	},

	enhance: function( targets, useKeepNative ) {
		var page, keepNative, $widgetElements = $( targets );

		// if ignoreContentEnabled is set to true the framework should
		// only enhance the selected elements when they do NOT have a
		// parent with the data-namespace-ignore attribute
		$widgetElements = $.mobile.enhanceable( $widgetElements );

		if ( useKeepNative && $widgetElements.length ) {
			// TODO remove dependency on the page widget for the keepNative.
			// Currently the keepNative value is defined on the page prototype so
			// the method is as well
			page = $.mobile.closestPageData( $widgetElements );
			keepNative = ( page && page.keepNativeSelector()) || "";

			$widgetElements = $widgetElements.not( keepNative );
		}

		$widgetElements[ this.widgetName ]();
	}
});

//TODO: Remove in 1.5 for backcompat only
$.mobile.widget = $.Widget;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
