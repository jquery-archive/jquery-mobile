// Wait for DOMready and instantiate common external widgets that the framework will not
// autoinitialize because they are located outside of a jQuery Mobile page. This script
// must be referenced from all documents containing your application's pages.
$( function() {
	$( "#common-header" ).toolbar();
	$( "#nav-menu" )
		.children()
			.listview()
		.end()
		.popup();
});
