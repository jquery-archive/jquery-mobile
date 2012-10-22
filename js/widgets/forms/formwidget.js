//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Base class for form widgets.
//>>label: Baseclass
//>>group: Forms

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.formwidget", $.mobile.widget, {
	_init: function() {
		this._on( this.element.closest( "form" ), {
			"reset": "_resetTimeout"
		});
		this._super( '_init' );
	},

	_resetTimeout: function() {
		// For some reason, we need to take this extra step of calling _reset via
		// setTimeout because, at least in the case of the select menu, if we call
		// _reset directly, the widget receives the old input value rather than the
		// reset input value when it attempts to reset its appearance to reflect
		// the original value. However, this only happens when we hit reset the
		// first time.
		setTimeout( $.proxy( this, "_reset" ) );
	},

	_reset: function() {
		// We call refresh() by default if that method is available
		if ( this.refresh ) {
			this.refresh.apply( this, arguments );
		}
		this._super( '_reset' );
	}
});
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
