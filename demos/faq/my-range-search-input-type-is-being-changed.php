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
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h2>Question:</h2>

			<h1>My range or search inputs are being change to number/text.</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">These inputs are degraded to type text or number to allow for consistent look and enhancement by jQuery Mobile. For example, we parse the min, max, value, and step attributes of a <code>range</code> input to configure the JavaScript-based slider we generate to give us full control of the features and appearance. We then 'degrade' the input type of the original <code>range</code> input (which is a native slider) to <code>number</code> in order provide the numeric field next to the slider.</p>

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
