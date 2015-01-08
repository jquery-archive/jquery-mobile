//>>description: Auto enhancement for widgets
//>>label: Enhancer
//>>group: Widgets
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery", "jquery-ui/widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

var plugin = {
	enhance: function() {

		// Call the default enhancer function
		$.fn.enhance.defaultFunction.apply( this, arguments );

		// Loop over and execute any hooks that exist
		for ( var i = 0; i < $.fn.enhance.hooks.length; i++ ) {
			$.fn.enhance.hooks[ i ].apply( this, arguments );
		}
		return this;
	}
};

// Generate the init selector to be used by a widget
plugin.enhance.initGenerator = function( widgetName ) {
	return "[data-" + $.mobile.ns + "role='" + widgetName + "']";
};

// Check if the enhancer has already been defined if it has copy its hooks if not
// define an empty array
plugin.enhance.hooks = ( $.fn.enhance && $.fn.enhance.hooks ) ? $.fn.enhance.hooks : [];

// Default function
plugin.enhance.defaultFunction = function(){
	var that = this.addBack();

	// Enhance widgets
	function crawlChildren( _childConstructors ) {
		$.each( _childConstructors, function( index, constructor ) {
			that.find( constructor.prototype.initSelector ||
				$.fn.enhance.initGenerator( constructor.prototype.widgetName )
			)[ constructor.prototype.widgetName ]();
			if ( constructor._childConstructors && constructor._childConstructors.length > 0 ) {
				crawlChildren( constructor._childConstructors );
			}
		});
	}
	crawlChildren( $.Widget._childConstructors );
};

// This is for backcompat remove in 1.6
plugin.enhanceWithin = function() {
	return this.children().enhance();
};

$.extend( $.fn, plugin );

$.extend( $.Widget.prototype, {
	_getCreateOptions: function() {
		var option, value,

			// Get all data at once avoid multiple lookups http://jsperf.com/jqm-data-bulk
			data = this.element.data(),
			options = {};

		// Translate data-attributes to options
		for ( option in this.options ) {
			value = data[ option ];
			if ( value !== undefined ) {
				options[ option ] = value;
			}
		}

		return options;
	}
});

return plugin;
}));