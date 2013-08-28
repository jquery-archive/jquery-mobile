<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-faq">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h1>
		<div><!-- TODO: Remove div wrapper -->
			<!-- TODO: Remove data-role="none" --><a href="#" data-role="none" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-icon-nodisc ui-icon-alt ui-btn-left">Menu</a>
			<!-- TODO: Remove data-role="none" --><a href="#" data-role="none" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-icon-nodisc ui-icon-alt ui-btn-right">Search</a>
		</div><!-- TODO: Remove div wrapper -->
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h2>Question:</h2>

			<h1>Controls in my fixed header or footer are not responding or behave erratically.</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">There are several well known bugs in mobile browsers regarding form elements inside <code>position: fixed</code> elements. Android 2.3 has a number of serious issues with fixed positioning and scrolling that can make select menus inoperable. See the device bugs project issue #1 <A href="https://github.com/scottjehl/Device-Bugs/issues/1">https://github.com/scottjehl/Device-Bugs/issues/1</a></p>

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
