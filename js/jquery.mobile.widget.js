//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Widget factory extentions for mobile.
//>>label: Widget Factory Extensions

define( [ "jquery", "../external/requirejs/depend!./jquery.ui.widget[jquery]" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.widget", {
	// decorate the parent _createWidget to trigger `widgetinit` for users
	// who wish to do post post `widgetcreate` alterations/additions
	//
	// TODO create a pull request for jquery ui to trigger this event
	// in the original _createWidget
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( 'init' );
	},

	_getCreateOptions: function() {

		var elem = this.element,
			options = {};

		$.each( this.options, function( option ) {

			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
							return "-" + c.toLowerCase();
						})
					);

			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	enhanceWithin: function( target, useKeepNative ) {
		this.enhance( $(this.options.initSelector, $(target)), useKeepNative );
	},

	enhance: function( targets, useKeepNative ) {
		var page, keepNative, count, $widgetElements = $( targets );

		// if ignoreContentEnabled is set to true the framework should
		// only enhance the selected elements when they do NOT have a
		// parent with the data-namespace-ignore attribute
		// TODO use parentNode traversal to speed things up
		if ( $.mobile.ignoreContentEnabled ) {
			count = $widgetElements.length;

			for( var i = 0; i < count; i++ ) {
				var $element = $( $widgetElements[i] );

				if ( !$element.closest( ":jqmData(ignore)").length ) {
					$element[ this.widgetName ]();
				}
			}
		} else if ( useKeepNative ) {
			// TODO remove dependency on the page widget for the keepNative.
			// Currently the keepNative value is defined on the page prototype so
			// the method is as well
			page = $.mobile.closestPageData( $(target) );
			keepNative = (page && page.keepNativeSelector()) || "";

			$widgetElements.not( keepNative )[ this.widgetName ]();
		} else {
			$widgetElements[ this.widgetName ]();
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
