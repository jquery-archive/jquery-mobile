<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Panels - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function(){
			$("body>[data-role='panel']").panel()

		});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<!-- default panel  -->
	<div data-role="panel" id="defaultpanel">

        <h3>Default panel options</h3>
        <p>This panel has all the default options: positioned on the left with the reveal display mode. The panel markup is <em>before</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /default panel -->

	<!-- Note: all other panels are at the end of the page, scroll down  -->

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>External Panels Page 2<a href="http://api.jquerymobile.com/panel/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

		<p>Flexible by design, panels can be used for navigation, forms, inspectors and more.</p>

		<h2>External Panels - These panels only exist if you navigated here from page 1. If you refresh this page the links below will not work.</h2>

		<p>The panels below are all located outside the page</p>

		<p><strong>Left</strong> panel examples</p>
		<a href="#leftpanel3" data-role="button" data-inline="true" data-mini="true">Overlay</a>
		<a href="#leftpanel1" data-role="button" data-inline="true" data-mini="true">Reveal</a>
		<a href="#leftpanel2" data-role="button" data-inline="true" data-mini="true">Push</a>

		<p><strong>Right</strong> panel examples</p>
		<a href="#rightpanel3" data-role="button" data-inline="true" data-mini="true">Overlay</a>
		<a href="#rightpanel1" data-role="button" data-inline="true" data-mini="true">Reveal</a>
		<a href="#rightpanel2" data-role="button" data-inline="true" data-mini="true">Push</a>

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

	<!-- Here are a bunch of panels at the end, just before the close page tag  -->

	<!-- leftpanel1  -->
	

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
