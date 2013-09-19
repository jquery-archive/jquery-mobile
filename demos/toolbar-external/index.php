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
	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	

	<div data-role="content" class="jqm-content">

		<h1>External Headers</h1>

		<p>
				The Header and footer on this page are positioned outside the page. They are before and after the page withing the body. These Toolbars will remain in the dom until manually removed. If you navigate to a page that does not have a header or footer within it these toolbars will persist. Otherwise they will hide to allow the page's internal header and footer to show. 
			</p>

		<h2>Header markup</h2>

		<p>The markup for external headers is identical to normal headers you just place the header outside the page within the body of your page</p>

		<h2>Auto Init</h2>

		<p>Because these toolbars are not within the page they will not auto initalize. You must call the toolbar plugin yourself on document ready.</p>

		<h2>Ajax Navigation</h2>

		<p>Because these toolbars are not within the page they will remain in the DOM until manually removed. However they will automatically hide if you navigate to a page containing a toolbar to allow the pages own toolbars to take their place. They will automatically show again if you navigate to a page containing no toolbars.</p>

		<p>Toolbars not within a page will not be pulled into the DOM during Ajax navigation.</p>

		<h2>Fixed External Toolbars</h2>

		<p>External toolbars can also be set to fixed positioning just like normal toolbars <a href="external-fixed.php" data-ajax="false">Fixed Position External Toolbars</a></p>

	</div><!-- /content -->

	

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
	<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
	<p>Copyright 2013 The jQuery Foundation</p>
</div><!-- /footer -->
</body>
</html>
