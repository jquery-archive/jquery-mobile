<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup across multiple pages - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="popup-outside-page-script">
/* Instantiate the popup on DOMReady, and enhance its contents */
$(function(){
	$( "#popup-outside-page" ).enhanceWithin().popup();
});
	</script>
</head>
<body>
<div id="popup-outside-page" data-theme="a">
	<!-- This popup has its theme explicitly defined via data-theme="a"
	     because it has no parent from which to automatically inherit
	     its theme -->
	<ul data-role="listview">
		<li>Global Menu</li>
		<li><a href="#demo-intro">Intro Page</a></li>
		<li><a href="#other-page">Other Page</a></li>
		<li><a href="#third-page">Third Page</a></li>
	</ul>
</div>
<div data-role="page" id="demo-intro" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Using the same popup across multiple pages</h1>

		<p>You can reuse the same popup on multiple pages if you declare it as a direct child of the <code>body</code> element. It can then appear on any page in the document.</p>
		<p>If you define the popup outside of any page, then you must take care to instantiate the popup widget yourself. You can do this as early as DOMReady, because the popup is not on any page.</p>
		<p>The example below illustrates the setup with two pages.</p>
		<div data-demo-html="#popup-outside-page,#other-page,#third-page" data-demo-js="#popup-outside-page-script">
			<a href="#popup-outside-page" data-rel="popup" class="ui-btn ui-btn-inline ui-corner-all">Menu</a>
		</div>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

<div id="other-page" data-role="page">
	<div data-role="header">
		<a href="#popup-outside-page" data-rel="popup">Menu</a>
		<h1>Another Page</h1>
	</div>
	<div role="main" class="ui-content">
		<p>This is another page that can be reached using the links in the global menu.</p>
	</div>
</div>
<div id="third-page" data-role="page">
	<div data-role="header">
		<a href="#popup-outside-page" data-rel="popup">Menu</a>
		<h1>Third Page</h1>
	</div>
	<div role="main" class="ui-content">
		<p>This is a third page that can be reached using the links in the global menu.</p>
	</div>
</div><!-- /page -->

</body>
</html>
