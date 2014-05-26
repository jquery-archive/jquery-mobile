/* You can place the code for initializing widgets that are shared by the various pages of yout
   application and which reside outside your application's jQuery Mobile pages into an external
   script which you can then reference from all your application's pages. This way, no matter which
   page ends up being your application's startup page, the shared widgets will always be functional
   and correctly enhanced. */
$( function() {
	$( "[data-role='navbar']" ).navbar();
	$( "[data-role='header'], [data-role='footer']" ).toolbar();
	$( "#nav-menu" ).popup();
	$( "#nav-menu-links" ).listview();
});
