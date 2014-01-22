<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Hash Processing - Navigation - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css" />
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css" />
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="demo-script">
$.mobile.document
	.on( "pagebeforechange", function( event, data ) {
		var hashQuery, cleanHash, url, hash, absNoHash, queryParameters;

		// pagebeforechange gets called twice for each page change. The first time
		// around data.toPage contains a string, and the second time around it
		// contains a jQuery object (the destination page itself).
		// This behaviour is deprecated. As of 1.5.0 pagebeforechange will only be
		// called once per page change, with a string. Until then, however, we need
		// to ignore the case where data.toPage is not a string.
		if ( $.type( data.toPage ) === "string" ) {

			// Split the URL of the destination page into its components, retrieve the
			// hash, create an object from the query string, and replace all URLs in
			// data with a version that does not include the hash query string
			url = $.mobile.path.parseUrl( data.absUrl );
			hash = url.hash;
			absNoHash = url.hrefNoHash;
			queryParameters = {};
			hashQuery = hash.split( "?" );
			cleanHash = hashQuery[ 0 ] || "";

			// We're only interested in the case where we're navigating to the
			// secondary page
			if ( cleanHash === "#secondary-page" ) {

				// Assemble query parameters object from the query string
				hashQuery = hashQuery.length > 1 ? hashQuery[ 1 ] : "";
				$.each( hashQuery.split( "&" ), function( index, value ) {
					var pair = value.split( "=" );

					if ( pair.length > 0 && pair[ 0 ] ) {
						queryParameters[ pair[ 0 ] ] =
							( pair.length > 1 ? pair[ 1 ] : true );
					}
				});

				// Remove the hash query from the event data
				data.options.target = 
				data.absUrl = url.hrefNoHash + cleanHash;
				data.originalHref = cleanHash;

				// Attach query parameters for use later on
				data.options.queryParameters = queryParameters;
			}
		}
	})
	.on( "pagebeforetransition", function( event, data ) {

		// Restore original state
		$( "#section" ).text( "" );

		// Retrieve the section stored in the event data ...
		if ( data.toPage.attr( "id" ) === "secondary-page" &&
			data.options.queryParameters.section ) {

			// ... and set it as the page title
			$( "#section" ).text( data.options.queryParameters.section );
		}
	});
	</script>
</head>
<body>
	<div id="main-page" data-role="page" class="jqm-demos" data-quicklinks="true">

		<div data-role="header" class="jqm-header">
			<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
			<p><span class="jqm-version"></span> Demos</p>
			<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
			<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
		</div><!-- /header -->

		<div role="main" class="ui-content jqm-content">
			<h1>Hash Processing</h1>
			<p>If you wish to perform processing on the hash values as a user clicks the links to the various internal pages in your application, you can do so by handling the <code>pagebeforechange</code> event.</p>
			<div data-demo-html="#demo-page,#secondary-page" data-demo-js="#demo-script">
				<a href="#demo-page" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Open Demo</a>
			</div>
		</div><!-- /content -->

		<?php include( '../jqm-navmenu.php' ); ?>

		<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
			<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
			<p>Copyright 2014 The jQuery Foundation</p>
		</div><!-- /footer -->

		<?php include( '../jqm-search.php' ); ?>

	</div><!-- /page -->

	<div id="demo-page" data-role="page">
		<div data-role="header">
			<a href="#main-page" class="ui-btn ui-icon-back ui-btn-icon-left">Back To Demos</a>
			<h1>Demo Main Page</h1>
		</div>
		<div role="main" class="ui-content">
			<p>The following three buttons all take you to the same page. However, when you get there, you will notice that the title of the page is different depending on which button you have clicked.</p>
			<a href="#secondary-page?section=My Area" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">My Area</a>
			<a href="#secondary-page?section=My Friends" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">My Friends</a>
			<a href="#secondary-page?section=My Items" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">My Items</a>
		</div>
	</div>

	<div id="secondary-page" data-role="page">
		<div data-role="header">
			<a href="#demo-page" class="ui-btn ui-icon-back ui-btn-icon-left">Back To Main Page</a>
			<a href="#main-page" class="ui-btn ui-icon-arrow-u ui-btn-icon-left">Back To Demos</a>
			<h1 id="section"></h1>
		</div>
		<div role="main" class="ui-content">
			<p>This is the second page in the demo. Notice that, as you navigate to this page from the main page, the title of this page changes depending on which button on the main page you clicked.</p>
		</div>
</body>
</html>
