define( [ "jquery" ], function( $ ) {

	var container = {
		eventStack: [],
		etargets: [],
		cEvents: [],
		cTargets: []
	};

	$( document ).bind( "pagebeforecreate pagecreate", function( e ) {
		container.eventStack.push( e.type );
		container.etargets.push( e.target );
	} );

	$( document ).on( "pagebeforecreate", "#c", function( e ) {
		container.cEvents.push( e.type );
		container.cTargets.push( e.target );
		return false;
	} );

	return container;
} );
