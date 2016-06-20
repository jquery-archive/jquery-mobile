<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Datepicker - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <link rel="stylesheet" href="../../external/jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.css">
    <link rel="stylesheet" href="../../external/jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.theme.css">
    <script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
    <script src="../../external/jquery-ui/widgets/datepicker.js"></script>
    <script id="mobile-datepicker" src="../../external/jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.js"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Datepicker</h1>

        <p>This demo uses the jQuery UI Datepicker widget combined with a 3rd party wrapper to make this work with jQuery Mobile. This widget has all the same options and methods as the jQuery UI widget.</p>

		<h2>Information</h2>

        <p>For documentation on the Datepicker widget, please see the <a href="http://api.jqueryui.com/datepicker/">jQuery UI API docs</a>.</p>

        <p>For information and support on the jQuery Mobile Wrapper, please see <a href="https://github.com/arschmitz/jquery-mobile-datepicker-wrapper">https://github.com/arschmitz/jquery-mobile-datepicker-wrapper</a>.</p>

        <p><strong>PLEASE NOTE: This is not a jQuery Mobile widget and is not supported by jQuery Mobile.</strong></p>

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
