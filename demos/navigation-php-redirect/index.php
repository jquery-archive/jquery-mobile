<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Redirection Example - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="redirectCode">
	$( document ).bind( "pagecontainerload", function( e, triggerData ) {

		// We can use this event to recognize that this is a redirect. It is
		// triggered when jQuery Mobile has finished loading a page, but before it
		// has enhanced the page, and before it has altered the browser history. In
		// this example the server helpfully returns a custom header. However, if
		// you don't have access to the server side, you can still examine
		// triggerData.page, which contains the page that was loaded, but which has
		// not yet been displayed or even recorded in the browser history. You can
		// also examine triggerData.xhr which contains the full XMLHTTPRequest. If
		// there is a way to recognize that this is not the expected page, you can
		// mark it with some jqmData that will be picked up in
		// "pagecontainerbeforetransition" (below) which in turn will give you an
		// opportunity to redirect (by calling the pagecontainer widget's change()
		// method).

		var redirect = triggerData.xhr.getResponseHeader( "X-Redirect" );
		if ( redirect ) {

			// We have identified that this page is really a redirect. Mark it as
			// such by setting some jqmData on it. The "pagecontainerbeforetransition"
			// handler below will look for this data, and, if present, will perform
			// the appropriate redirect.
			triggerData.page.jqmData( "redirect", redirect );
		}
	});

	$( document ).bind( "pagecontainerbeforetransition", function( e, data ) {

		// Search for redirect data that has been set on the data.toPage by the
		// "pagecontainerload" handler above If we find such data we know that we
		// are supposed to perform a redirect.
		var redirect = data.toPage.jqmData( "redirect" );

		if ( redirect ) {

			// The data has been found. Perform the appropriate redirect.
			$( e.target ).pagecontainer( "change", redirect, data.options );

			// Stop the process of loading the current page, because in the line
			// above we've initiated the process of loading the redirect destination
			// page, which is the page we wish to display to the user.
			e.preventDefault();
		}
	});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->
	
	<div data-role="content" class="jqm-content">
	
		<h1>Redirection example: Source Page</h1>
		
		<p>Clicking the link below will cause a page to be loaded from the server which contains a special instruction that is captured in the sample code to load the final redirection target page.</p>
         
        <div data-demo-html="true" data-demo-js="#redirectCode" data-demo-php="source.php">
            <a href="redirect.php?to=redirect-target.html" data-role="button" data-inline="true">Redirect</a>
        </div><!--/demo-html -->
		
		<p>Note: This is a PHP demo that will only work on a server and not in a build (i.e. the demos that come with each release).</p>


	</div><!-- /content -->
	
	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
