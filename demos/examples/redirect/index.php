<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Redirection Example - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script id="redirectCode">
	$( document ).bind( "pagebeforechange", function( e, data ) {
		if ( $.type( data.toPage ) !== "string" ) {

			// Search for redirect data that has been set on the data.toPage by the
			// "pageload" handler below. If we find such data we know that we are
			// supposed to perform a redirect.

			var redirect = data.toPage.jqmData( "redirect" );
			if ( redirect ) {

				// The data has been found. Perform the appropriate redirect.

				data.toPage = redirect;
			}
		}
	});

	$( document ).bind( "pageload", function( e, triggerData ) {

		// We can use this event to recognize that this is a redirect. In this
		// example the server helpfully returns a custom header. However, if you
		// don't have access to the server side, you can still examine
		// triggerData.page, which contains the page that was loaded, but which has
		// not yet been displayed or even recorded in the browser history. If there
		// is a way to recognize that this is not the expected page, you can mark
		// it with some jqmData that will be picked up in "pagebeforechange"
		// (above) which in turn will give you an opportunity to redirect (by
		// overwriting data.toPage as in the handler above)

		var redirect = triggerData.xhr.getResponseHeader( "X-Redirect" );
		if ( redirect ) {

			// We have identified that this page is really a redirect. Mark it as
			// such by setting some jqmData on it. The "pagebeforechange" handler
			// above will look for this data, and, if present, will perform the
			// appropriate redirect.

			triggerData.page.jqmData( "redirect", redirect );
		}
	});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->
	
	<div data-role="content" class="jqm-content">
	
		<h1>Redirection example: Source Page</h1>
		
		<p>Clicking the link below will cause a page to be loaded from the server which contains a special instruction that is captured in the sample code to load the final redirection target page.</p>
         
        <div data-demo-html="true" data-demo-js="#redirectCode" data-demo-php="source.php">
            <a href="redirect.php?to=redirect-target.html" data-role="button" data-inline="true">Redirect</a>
        </div><!--/demo-html -->
		
		<p>Note: This is a PHP demo that will only work on a server and not in a build (i.e. the demos that come with each release).</p>


	</div><!-- /content -->
	
	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
