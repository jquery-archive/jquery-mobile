<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos - How do I use touch and mouse events?</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<p><strong>Note: this page has not been updated after 1.3</strong></p>

		<h2>Question:</h2>

		<h1>How do I use touch and mouse events?</h1>

		<h2>Answer:</h2>

		<p>One important consideration in mobile is handling mouse and touch events. These events differ significantly across mobile platforms, but the common denominator is that click events will work everywhere, but usually after a significant delay of 300-500ms. This delay is necessary for the browser to wait for double tap, scroll and extended hold tap events to potentially occur. To avoid this delay, it's possible to bind to touch events (ex. touchstart) but the issue with this approach is that some mobile platforms (WP7, Blackberry) don't support touch. To compound this issue, some platforms will emit <em>both</em> touch and mouse events so if you bind to both types, duplicate events will be fired for a single interaction.</p>
			<p>Our solution is to create a set of virtual events that normalize mouse and touch events. This allows the developer to register listeners for the basic mouse events, such as mousedown, mousemove, mouseup, and click, and the plugin will take care of registering the correct listeners behind the scenes to invoke the listener at the fastest possible time for that device. This still retains the order of event firing in the traditional mouse environment, should multiple handlers be registered on the same element for different events. The virtual mouse system exposes the following virtual events to jQuery bind methods: <code>vmouseover</code>, <code>vmousedown</code>, <code>vmousemove</code>, <code>vmouseup</code>, <code>vclick</code>, and <code>vmousecancel</code>.</p>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
