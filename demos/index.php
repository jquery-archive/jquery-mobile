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
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><img src="_assets/img/jquery-logo.png" alt="jQuery Mobile"></h1>
		
		<div><!-- TODO: Remove div wrapper -->
			<!-- TODO: Remove data-role="none" --><a href="#" data-role="none" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-icon-nodisc ui-icon-alt ui-btn-left">Menu</a>
			<!-- TODO: Remove data-role="none" --><a href="#" data-role="none" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-icon-nodisc ui-icon-alt ui-btn-right">Search</a>
		</div><!-- TODO: Remove div wrapper -->
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Demos <span class="jqm-version-number"></span></h1>
		
		<p>jQuery Mobile is a touch-optimized HTML5 UI framework designed to make responsive web sites and apps that are accessible on all smartphone, tablet and desktop devices.</p>

        <p>For more info about the project, visit the <a href="http://jquerymobile.com" title="jQuery Mobile web site" target="_blank">web site</a>.</p>

        <p>For technical info, visit the <a href="http://api.jquerymobile.com" title="jQuery Mobile API documentation" target="_blank">API documentation</a>.</p>
		
        <ul data-role="listview" data-inset="true" data-icon="false" data-global-nav="demos" class="jqm-list">
			<?php include( 'jqm-contents.php' ); ?>
		</ul>
		
	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->
	
<?php include( 'jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
