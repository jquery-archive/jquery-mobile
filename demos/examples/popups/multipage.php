<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup alignment - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script id="popup-outside-page-script">
// Do this on DOMReady so we find the popup
$( function() {
	$( "#popup-outside-page" ).enhanceWithin().popup();
});

// Upon click on any button that opens the popup, open the popup over the button
$.mobile.document.on( "click", ".popup-outside-page-button", function( event ) {
	var target = $( event.target );
	$( "#popup-outside-page" ).popup( "open", {
		x: target.offset().left + target.width() / 2,
		y: target.offset().top + target.height() / 2
	});
	event.preventDefault();
});
	</script>
</head>
<body>
<div id="popup-outside-page">
	<ul data-role="listview">
		<li>Global Menu</li>
		<li><a href="#demo-intro">Intro Page</a></li>
		<li><a href="#other-page">Other Page</a></li>
		<li><a href="#third-page">Third Page</a></li>
	</ul>
</div>
<div data-role="page" id="demo-intro" class="jqm-demos">
	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
		<h2>Using the same popup across multiple pages</h2>
		<p>You can reuse the same popup on multiple pages if you declare it as a direct child of the <code>body</code> element. It can then appear on any page in the document.</p>
		<p>If you define the popup outside of any page, then you must take care to instantiate the popup widget yourself. You can do this as early as DOMReady, because the popup is not on any page.</p>
		<p>If you wish the popup to be opened from a set of links, then you must also handle that manually, because automatic handling via <code>data-rel="popup"</code> is restricted to popups on the active page.</p>
		<p>The example below illustrates the setup with two pages.</p>
		<div data-demo-html="#popup-outside-page,#other-page,#third-page" data-demo-js="#popup-outside-page-script">
			<a href="#" class="popup-outside-page-button ui-btn ui-btn-inline ui-corner-all">Menu</a>
		</div>
	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->

<?php include( '../../global-nav.php' ); ?>

	<a href="#alignment-example" id="open-alignment-example" data-rel="popup" data-role="button" data-inline="true">Open</a>
</div><!-- /page -->
<div id="other-page" data-role="page">
	<div data-role="header">
		<!-- Links that open the global popup are all marked with a class -->
		<a href="#" class="popup-outside-page-button">Menu</a>
		<h1>Another Page</h1>
	</div>
	<div data-role="content">
		<p>This is another page that can be reached using the links in the global menu.</p>
	</div>
</div>
<div id="third-page" data-role="page">
	<div data-role="header">
		<!-- Links that open the global popup are all marked with a class -->
		<a href="#" class="popup-outside-page-button">Menu</a>
		<h1>Third Page</h1>
	</div>
	<div data-role="content">
		<p>This is a third page that can be reached using the links in the global menu.</p>
	</div>
</div>
</body>
</html>
