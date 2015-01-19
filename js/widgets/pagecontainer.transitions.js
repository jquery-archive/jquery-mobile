//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extension that adds transition management support to pagecontainer widget
//>>label: Transitions Support for Pagecontainer
//>>group: Navigation
define( [
	"jquery",
	"./pagecontainer",

	// For $.mobile.navigate.history
	"../navigation/method",
	"../transitions/handlers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.pagecontainer", $.mobile.pagecontainer, {
	_getTransitionHandler: function( transition ) {
		transition = $.mobile._maybeDegradeTransition( transition );

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick off the transition.
		return $.mobile.transitionHandlers[ transition ] || $.mobile.defaultTransitionHandler;
	},

	_performTransition: function( transition, reverse, to, from ) {
		var TransitionHandler = this._getTransitionHandler( transition );

		return ( new TransitionHandler( transition, reverse, to, from ) ).transition(
			$.mobile.navigate.history.getActive().lastScroll || $.mobile.defaultHomeScroll );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
