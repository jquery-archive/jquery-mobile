//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Utility methods for enabling and disabling user scaling (pinch zoom)
//>>label: Zoom Handling
//>>group: Utilities

define( [ "jquery", "./jquery.mobile.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $ ) {
	var	meta = $( "meta[name=viewport]" ),
		initialContent = meta.attr( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
		enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
		disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );

	$.mobile.zoom = $.extend( {}, {
		enabled: !disabledInitially,
		locked: false,
		disable: function( lock ) {
			if ( !disabledInitially && !$.mobile.zoom.locked ) {
				meta.attr( "content", disabledZoom );
				$.mobile.zoom.enabled = false;
				$.mobile.zoom.locked = lock || false;
			}
		},
		enable: function( unlock ) {
			if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
				meta.attr( "content", enabledZoom );
				$.mobile.zoom.enabled = true;
				$.mobile.zoom.locked = false;
			}
		},
		restore: function() {
			if ( !disabledInitially ) {
				meta.attr( "content", initialContent );
				$.mobile.zoom.enabled = true;
			}
		}
	});

}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
