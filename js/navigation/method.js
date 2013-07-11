//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: A wrapper for the primary Navigator and History objects in jQuery Mobile
//>>label: Navigate Method
//>>group: Navigation
define([ "jquery", "./path", "./history", "./navigator" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {
	// TODO consider queueing navigation activity until previous activities have completed
	//      so that end users don't have to think about it. Punting for now
	// TODO !! move the event bindings into callbacks on the navigate event
	$.ui.navigate = function( url, data, noEvents ) {
		$.ui.navigate.navigator.go( url, data, noEvents );
	};

	// expose the history on the navigate method in anticipation of full integration with
	// existing navigation functionalty that is tightly coupled to the history information
	$.ui.navigate.history = new $.ui.History();

	// instantiate an instance of the navigator for use within the $.navigate method
	$.ui.navigate.navigator = new $.ui.Navigator( $.ui.navigate.history );

	var loc = $.ui.path.parseLocation();
	$.ui.navigate.history.add( loc.href, {hash: loc.hash} );
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
