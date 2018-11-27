<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Swipe to navigate - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="stylesheet" href="swipe-page.css" id="demo-style">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script src="swipe-page.js" id="demo-script"></script>
	<style>
		#_header, #_footer {
			display: none;
		}
	</style>
</head>
<body>

<div data-role="page" class="jqm-demos">

    <div data-role="toolbar" data-type="header" class="jqm-header">
        <h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Swipe to navigate</h1>

		<p>This demo shows how you can use the swipe event to navigate between pages. We are using single HTML files for each page. Here you can see the JavaScript and CSS source. On each of the demo pages you can see the page markup as well.</p>

		<a href="newyork.html" data-ajax="false" class="ui-button ui-corner-all ui-shadow ui-button-inline">Open swipe page demo</a>

        <div data-demo-html="#city" data-demo-js="#demo-script" data-demo-css="#demo-style"></div>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

<!-- The markup below is a copy of the actual demo pages just so we can show the markup in the "view source" -->

<!-- "city", "prevCity" and "nextCity" are used as placeholders and contain the name of the applicable city in our demo files. -->

<!-- The ID's of the header and footer are prefixed here with "_" to prevent the external toolbars to show up on our intro page. -->

<div id="_header" data-role="toolbar" data-type="header" data-id="header" data-position="fixed" data-fullscreen="true" data-tap-toggle="false">
	<h1>City</h1>
    <a href="./" data-direction="reverse" data-icon="delete" data-iconpos="notext" data-shadow="false" data-icon-shadow="false">Back</a>
</div><!-- /header -->

<div data-role="page" id="city" class="demo-page" data-dom-cache="true" data-theme="b" data-prev="prevCity" data-next="nextCity">

	<div role="main" class="ui-content">

		<div id="trivia-city" class="trivia ui-content" data-role="popup" data-position-to="window" data-tolerance="50,30,30,30" data-theme="a">
        	<a href="#" data-rel="back" class="ui-button ui-toolbar-header-button-right ui-button-b ui-button-icon-only ui-corner-all">Close <span class="ui-icon ui-icon-delete"></span></a>
			<p>Here some text.</p>
        </div><!-- /popup -->

	</div><!-- /content -->

</div><!-- /page -->

<div data-role="toolbar" data-type="footer" id="_footer" data-id="footer" data-position="fixed" data-fullscreen="true" data-tap-toggle="false">
	<div data-role="controlgroup" class="control ui-toolbar-header-button-left" data-mini="true">
    	<a href="#" class="prev ui-button ui-button-icon-only">Previous<span class="ui-icon ui-icon-caret-l"></span></a>
    	<a href="#" class="next ui-button ui-button-icon-only">Next<span class="ui-icon ui-icon-caret-r"></span></a>
    </div>

	<a href="#" data-rel="popup" class="trivia-button ui-button ui-toolbar-header-button-right ui-mini ui-corner-all">Trivia <span class="ui-icon ui-icon-info"></span></a>
</div><!-- /footer -->

</body>
</html>
