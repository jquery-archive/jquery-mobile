<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="favicon.ico">
	<link rel="stylesheet"  href="../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="_assets/css/jqm-demos.css">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../js/jquery.js"></script>
	<script src="_assets/js/"></script>
	<script src="../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-home">

	<div data-role="header" class="jqm-header">
		<h2><img src="_assets/img/jquery-logo.png" alt="jQuery Mobile"></h2>
		<p>Version <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
	
		<h1>Demos</h1>
		
		<p><strong>Note:</strong> Not all demos are updated yet and we are working on a new navigation menu for the demos.</p>
		
		<p>jQuery Mobile is a touch-optimized HTML5 UI framework designed to make responsive web sites and apps that are accessible on all smartphone, tablet and desktop devices.</p>
		
        <p>For technical info, visit the <a href="http://api.jquerymobile.com" title="jQuery Mobile API documentation" target="_blank">API documentation</a>. Downloads and info about the project can be found on <a href="http://jquerymobile.com" title="jQuery Mobile web site" target="_blank">jquerymobile.com</a>.</p>
		
		<h2>Contents</h2>
		
        <ul data-role="listview" data-inset="true" data-icon="false" data-global-nav="demos" class="jqm-list">
			<?php include( 'jqm-contents.php' ); ?>
		</ul>
		
	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->
	
<?php include( 'jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
