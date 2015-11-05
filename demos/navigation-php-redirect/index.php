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
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="redirectCode">
	$( document ).bind( "pagecontainerload", function( e, triggerData ) {

		// We can use this event to recognize that this is a redirect. The event is
		// triggered when jQuery Mobile has finished loading a page and inserting
		// it into the DOM, but before it has altered the browser history. In this
		// example the server helpfully returns a custom header. However, if you
		// don't have access to the server side, you can still examine
		// triggerData.page, which contains the page that was loaded, but which
		// has not yet been displayed or even recorded in the browser history. You
		// can also examine triggerData.xhr which contains the full XMLHTTPRequest.
		// If there is a way to recognize that this is not the expected page, you
		// can discard it and issue a second load() call for the page that really
		// needs to be displayed to the user, reusing the options from the overall
		// page change process.

		var redirect = triggerData.xhr.getResponseHeader( "X-Redirect" );
		if ( redirect ) {

			// We have identified that this page is really a redirect. Thus, we load
			// the real page instead, reusing the options passed in. It is important
			// to reuse the options, because they contain the deferred governing this
			// page change process. We must also prevent the default on this event so
			// that the page change process continues with the desired page.
			$( e.target ).pagecontainer( "load", redirect, triggerData.options );
			e.preventDefault();
		}
	});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Redirection example: Source Page</h1>

		<p>Clicking the link below will cause a page to be loaded from the server which contains a special instruction that is captured in the sample code to load the final redirection target page. Note that both the initial page (which contains the redirect) as well as the final redirect target page contain an intentional delay that should simulate network congestion and should allow jQuery Mobile enough time to display the loading indicator.</p>

        <div data-demo-html="true" data-demo-js="#redirectCode" data-demo-php="source.php">
            <a href="redirect.php?to=redirect-target.php" class="ui-shadow ui-button ui-corner-all ui-button-inline">Redirect</a>
        </div><!--/demo-html -->

		<p>Note: This is a PHP demo that will only work on a server and not in a build (i.e. the demos that come with each release).</p>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

</body>
</html>
