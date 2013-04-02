<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Swipe to navigate - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="stylesheet" href="swipe-page.css" id="demo-style">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script src="swipe-page.js" id="demo-script"></script>
</head>
<body>

<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header">
        <h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

        <h1>Swipe to navigate</h1>

        <div data-demo-html="#city" data-demo-js="#demo-script" data-demo-css="#demo-style">
            <p>This demo shows how you can use the swipe event to navigate between pages. We are using single HTML files for each page. Here you can see the JavaScript and CSS source. On each of the demo pages you can see the page markup as well.</p>

            <p><a href="newyork.html" data-prefetch="true" data-transition="fade" data-role="button" data-inline="true" data-theme="c">Open swipe page demo</a></p>
        </div>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->

<!-- The markup below is a copy of the actual demo pages just so we can show the markup in the "view source" -->

<div data-role="page" id="city" class="demo-page" data-dom-cache="true" data-theme="a" data-prev="prevCity" data-next="nextCity">

	<!-- "city", "prevCity" and "nextCity" are used as placeholders and contain the name of the applicable city in our demo files. -->

	<div data-role="header" data-position="fixed" data-fullscreen="true" data-id="hdr" data-tap-toggle="false">
		<h1>City</h1>
        <a href="swipe-page.html" data-direction="reverse" data-icon="delete" data-iconpos="notext" data-shadow="false" data-icon-shadow="false">Back</a>
    </div><!-- /header -->

	<div data-role="content">

		<div id="trivia-city" class="trivia ui-content" data-role="popup" data-position-to="window" data-tolerance="50,30,30,30" data-theme="d">
        	<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
			<p>Here some text.</small></p>
        </div><!-- /popup -->

	</div><!-- /content -->

    <div data-role="footer" data-position="fixed" data-fullscreen="true" data-id="ftr" data-tap-toggle="false">
		<div data-role="controlgroup" class="control ui-btn-left" data-type="horizontal" data-mini="true">
        	<a href="#" class="prev" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-theme="d">Previous</a>
        	<a href="#" class="next" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="d">Next</a>
        </div>

		<a href="#trivia-city" data-rel="popup" class="trivia-btn ui-btn-right" data-role="button" data-icon="info" data-iconpos="left" data-theme="d" data-mini="true">Trivia</a>
    </div><!-- /footer -->

</div><!-- /page -->

</body>
</html>
