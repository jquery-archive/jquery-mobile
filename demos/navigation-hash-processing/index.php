<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Hash Processing - Navigation - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="demo-script">
( function( $, undefined ) {

// Helper function that splits a URL just the way we want it
var processHash = function( url ) {
	var parsed = $.mobile.path.parseUrl( url ),
		queryParameters = {},
		hashQuery = parsed.hash.split( "?" );

	// Create name: value pairs from the query parameters
	$.each( ( hashQuery.length > 1 ? hashQuery[ 1 ] : "" ).split( "&" ), function() {
		var pair = this.split( "=" );

		if ( pair.length > 0 && pair[ 0 ] ) {
			queryParameters[ pair[ 0 ] ] =
				( pair.length > 1 ? decodeURIComponent( pair[ 1 ] ) : true );
		}
	});

	return {
		parsed: parsed,
		cleanHash: ( hashQuery.length > 0 ? hashQuery[ 0 ] : "" ),
		queryParameters: queryParameters
	};
};

$.mobile.document

	// When the page is about to change, we may want to modify the navigation process to
	// accommodate same-page navigation. Since we wish to make it appear as though we're navigating
	// between different pages, we need to queue the page update to occur right at the halfway
	// point of the transition associated with page-to-page navigation.
	.on( "pagecontainerbeforechange", function( event, data ) {
		var processedHash;

		if ( typeof data.toPage === "string" ) {
			processedHash = processHash( data.toPage );

			// We only affect navigation behavior when going to #secondary-page
			if ( processedHash.cleanHash === "#secondary-page" ) {

				// Set the url of the page - this will be used by navigation to set the
				// URL in the location bar
				$( "#secondary-page" ).jqmData( "url", processedHash.parsed.hash );

				// Allow same-page transition when coming from #secondary page
				data.options.allowSamePageTransition = ( data.options.fromPage &&
					data.options.fromPage.attr( "id" ) === "secondary-page" );

				// Update the page when the outgoing animation completes. This involves two things:
				// 1. Removing the active class from the button used for navigation.
				// 2. Updating the page to make it look like the destination page.
				$.mobile.activePage.animationComplete( function() {
					$.mobile.removeActiveLinkClass( true );

					// Set the title from the query parameters
					$( "#section" ).text( processedHash.queryParameters.section );
				});
			}
		}
	});
})( jQuery );
	</script>
</head>
<body>
<div id="main-page" data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">
		<h1>Hash Processing</h1>
		<p>If you wish to perform processing on the hash values as a user clicks the links to the various internal pages in your application, you can do so by handling the events <code>pagebeforechange</code> and <code>pagecontainerbeforetransition</code>.</p>
		<div data-demo-html="#demo-page,#secondary-page" data-demo-js="#demo-script">
			<a href="#demo-page" class="ui-button ui-corner-all ui-shadow ui-button-inline">Open Demo</a>
		</div>
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

<div id="demo-page" data-role="page">
	<div data-role="toolbar" data-type="header">
		<a href="#main-page" class="ui-button">Back To Demos <span class="ui-icon ui-icon-back"></span></a>
		<h1>Demo Main Page</h1>
	</div>
	<div role="main" class="ui-content">
		<p>The following three buttons all take you to the same page. However, when you get there, you will notice that the title of the page is different depending on which button you have clicked.</p>
		<a href="#secondary-page?section=My Area" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Area</a>
		<a href="#secondary-page?section=My Friends" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Friends</a>
		<a href="#secondary-page?section=My Items" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Items</a>
	</div>
</div>

<div id="secondary-page" data-role="page">
	<div data-role="toolbar" data-type="header">
		<a href="#demo-page" class="ui-button">Back To Main Page <span class="ui-icon ui-icon-back"></span></a>
		<a href="#main-page" class="ui-button">Back To Demos <span class="ui-icon ui-icon-arrow-u"></span></a>
		<h1 id="section"></h1>
	</div>
	<div role="main" class="ui-content">
		<p>This is the second page in the demo. Notice that, as you navigate to this page from the main page, the title of this page changes depending on which button on the main page you clicked.</p>
		<p>You can also navigate to this same page with different parameters using the links below:</p>
		<a href="#secondary-page?section=My Area" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Area</a>
		<a href="#secondary-page?section=My Friends" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Friends</a>
		<a href="#secondary-page?section=My Items" class="ui-button ui-corner-all ui-shadow ui-button-inline">My Items</a>
	</div>
</div>

</body>
</html>
