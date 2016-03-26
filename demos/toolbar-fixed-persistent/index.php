<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Persistent toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function() {
			$( "[data-role='navbar']" ).navbar();
			$( "[data-role='toolbar']" ).toolbar();
		});
		// Update the contents of the toolbars
		$( document ).on( "pagecontainerchange", function() {
			// Each of the four pages in this demo has a data-title attribute
			// which value is equal to the text of the nav button
			// For example, on first page: <div data-role="page" data-title="Info">
			var current = $( ".ui-page-active" ).jqmData( "title" );
			// Change the heading
			$( "[data-type='header'] h1" ).text( current );
			// Remove active class from nav buttons
			$( "[data-role='navbar'] a.ui-button-active" ).removeClass( "ui-button-active" );
			// Add active class to current nav button
			$( "[data-role='navbar'] a" ).each(function() {
				if ( $( this ).text() === current ) {
					$( this ).addClass( "ui-button-active" );
				}
			});
		});
	</script>
</head>
<body>
    <div data-role="toolbar" data-type="header" data-position="fixed" data-theme="a">
		<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
        <h1>Info</h1>
    </div><!-- /header -->

	<div data-role="page" data-title="Info" class="jqm-demos">

	    <div role="main" class="ui-content jqm-content jqm-fullwidth">

			<h1>Persistent toolbars</h1>

			<p>These pages are a demo of a persistent <a href="../navbar/">navbar</a> in a fixed footer toolbar. Click on any of the links in the footer, and you'll see the page content transition. Both the persistent header and footer on these pages remain in place during the animation to a new HTML page.</p>

			<p>With the new external toolbars no extra effort is required to now have persistent toolbars. Simply place them outside of the page container on each page they will be loaded on the first page and persist on subsequent pages. The toolbars still need to be placed on each page to account for refresh however they will be ignored if not within a page container.</p>

			<p>Typically, the persistent toolbar technique will be combined with fixed positioning.</p>

			<h2>Updating toolbar contents</h2>

			<p>Because the same toolbar is used on every page, you might want to update the content. In this demo we show how to change the heading in the header and set the nav button of the page currently in view to the active state.</p>

			<div data-demo-js="true"></div>

			<h2>Improving page load with persistent toolbars</h2>

			<p>By combining this technique with a little bit of server side logic you can reduce the file size for each page load significantly by not sending anything except the actual page container back when the request is from ajax. this not only reduces file size but makes the actual processing of the page quicker also. To see an example of this technique see <a href="../external-widgets/" data-ajax="false">Ajax optimized persistent toolbars</a></p>

			<h3>A note about transitions</h3>

			<p>By Removing the toolbars from the page container they are no longer part of the page transition which dramaticly improves the performance of complex 3D page transitions over the older style of persistent toolbars.</p>

		</div><!-- /content -->

	</div><!-- /page -->

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-theme="a">
		<div data-role="navbar">
			<ul>
				<li><a href="index.php" data-prefetch="true" data-transition="fade">Info</a></li>
				<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
				<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
				<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
			</ul>
		</div><!-- /navbar -->
	</div><!-- /footer -->

</body>
</html>
