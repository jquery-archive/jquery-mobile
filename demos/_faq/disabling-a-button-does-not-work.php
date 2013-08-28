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

			<h1>Disabling a button does not work.</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">Buttons that are created from a link cannot be disabled because these aren't form elements and aren't designed to be disabled. This is the reason why the HTML spec does not provide for a disabled attribute on links. To disable a link-based button, you can add the <code>.ui-disabled</code> class via JavaScript and prevent interaction to give it a disabled appearance.</p>

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
