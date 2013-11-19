<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Collapsible - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <link rel="stylesheet" href="https://rawgithub.com/arschmitz/jquery-mobile-datepicker-wrapper/master/jquery.mobile.datepicker.css" />
    <script src="../../js/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
    <script src="http://view.jqueryui.com/master/ui/jquery.ui.datepicker.js"></script>
    <script id="mobile-datepicker" src="https://rawgithub.com/arschmitz/jquery-mobile-datepicker-wrapper/master/jquery.mobile.datepicker.js"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Datepicker Widget</h1>
        <h2>PLEASE NOTE: This is not a jQuery Mobile widget and is not supported by jQuery Mobile</h2>
        <p>This demo uses the jQuery UI Dateicker widget combined with a 3rd party wrapper to make this work with jQuery Mobile</p>
        <p>This widget has all the same options and methods as the jQuery UI widget</p>
        <p>For documentation on the Datepicker widget please see jQuery UI API docs <a href="http://api.jqueryui.com/datepicker/">http://api.jqueryui.com/datepicker/</a>
        <p>For information and support on the jQuery Mobile Wrapper please see <a href="https://github.com/arschmitz/jquery-mobile-datepicker-wrapper">https://github.com/arschmitz/jquery-mobile-datepicker-wrapper</a></p>
        <h2>Popup Datepicker</h2>
        <div data-demo-html="true">
            <input type="text" data-role="date">
        </div>
        <p> The Popup does not always position well for use on small screens and mobile devices there for the wrapper adds an inline option this option makes the calendar for the datepicker show up inline after the input which it is called on avoiding the issues related to popups</p>
        <h2>Inline Datepicker</h2>
        <div data-demo-html="true">
            <input type="text" data-role="date" data-inline="true">
        </div>

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
