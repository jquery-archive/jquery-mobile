//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Navigate jQuery Method
//>>label: AJAX Navigation System
//>>group: Navigation
define([ "jquery", "./path", "./history", "./navigator" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {
	// TODO consider queueing navigation activity until previous activities have completed
	//      so that end users don't have to think about it. Punting for now
	// TODO !! move the event bindings into callbacks on the navigate event
	$.navigate = function( url, data, noEvents ) {
		$.navigate.navigator.go( url, data, noEvents );
	};

	// expose the history on the navigate method in anticipation of full integration with
	// existing navigation functionalty that is tightly coupled to the history information
	$.navigate.history = new $.History();

	// instantiate an instance of the navigator for use within the $.navigate method
	$.navigate.navigator = new $.Navigator( $.navigate.history );

	var loc = $.mobile.path.parseLocation();
	$.navigate.history.add( loc.href, {hash: loc.hash} );
})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
