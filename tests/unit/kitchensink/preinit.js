define( [ "jquery" ], function( $ ) {

var $w = $( window ), incCreated, created, expected;

window.createTests = $.Deferred();

created = 0;
expected = 0;

incCreated = function() {
	created += 1;
};

$( document ).bind( "mobileinit", function() {
	$w.bind( "controlgroupcreate", incCreated );
	$( function() {
		expected += $( ":jqmData(role='controlgroup')" ).length;
	} );

	$w.bind( "pagecreate", function() {
		var createTests = {};

		// If the expected count is larger than the actual count by the
		// time we get the pagecreate event we know that not all of the widgets
		// have been properly initialized before pagecreate, and that pagecreate
		// isn't properly functioning as the "everything is initialized" event
		createTests.pageCreateTimed = expected === created;

		window.createTests.resolve( createTests );
	} );
} );

} );
