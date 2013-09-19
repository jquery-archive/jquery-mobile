<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Headers - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function(){
			$("[data-role='header'], [data-role='footer']").toolbar();
		});
	</script>
</head>
<body>
	<div data-role="header" class="jqm-header" data-position="fixed">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	

	<div data-role="content" class="jqm-content">

		<h1>Fixed External Headers</h1>

		<p>The Header and footer on this page are outside of the page within the body. They have been set to position fixed.</p>

		<h2>True Persistant Toolbars</h2>

		<p>Because External toolbars are outside of the page they are not effected by transition and make truely persistant toolbars possible</p>

		<p><a href="footer-persist-a.php" data-ajax="false">Persistant Footer</a></p>

	</div><!-- /content -->

	

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
<div data-role="footer" class="jqm-footer" data-position="fixed" style="background-color:white;">
	<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
	<p>Copyright 2013 The jQuery Foundation</p>
</div><!-- /footer -->
</body>
</html>
