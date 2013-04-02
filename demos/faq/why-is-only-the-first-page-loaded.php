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

			<h1>Why is only the first page of my multi page document loaded?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">jQuery Mobile currently only supports loading of single page documents via AJAX. To navigate to a multi page document you must disable ajax on the link by adding the <code>data-ajax="false"</code> attribute. There is also a widget to allow for supporting sub-pages by Todd Thompson available at <a href="https://github.com/ToddThomson/jQuery-Mobile-Subpage-Widget">https://github.com/ToddThomson/jQuery-Mobile-Subpage-Widget</a></p>

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
