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

			<h1>I'm trying to use the application cache but it's not working.</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">The issue here is not actually jQuery Mobile but the fact that some browsers return a status of zero. This causes the internal error handlers to be triggered in jQuery's AJAX function.</p>
			<p>There is a simple workaround for this:</p>
<pre><code>
$.ajaxPrefilter( function(options, originalOptions, jqXHR) {
  if ( applicationCache &&
    applicationCache.status != applicationCache.UNCACHED &&
    applicationCache.status != applicationCache.OBSOLETE ) {
     // the important bit
	options.isLocal = true;
  }
});
</pre></code>
<p>One important note on this workaround is that this sets is local to true for all AJAX requests weather or not they are in the manifest. This works currently because is local is only checked As long as the cache is valid and the status is 0 so it doesn't affect uncached results. This may  change in the future breaking applications using this workaround.</p>

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
