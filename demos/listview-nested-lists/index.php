<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listviews collapsible list items - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
    <script id="script" src="http://cdn.rawgit.com/arschmitz/jquery-mobile-nestedlists/master/jquery.mobile.nestedlists.js"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main">

        <h1>Nested Listviews</h1>

        <p>Nested listviews were deprecated in jQuery Mobile 1.3 and were removed in 1.4. For those wishing to use the 1.3 behavior there is a plugin available at <a href="https://github.com/arschmitz/jquery-mobile-nestedlists/">https://github.com/arschmitz/jquery-mobile-nestedlists/</a>. With this plugin you can use the same markup. All you need to do to be able to use "jQuery Mobile 1.3 style" nested listviews is drop the plugin script in after the jQuery Mobile script.</p>

        <div data-demo-html="true" data-demo-js="#script">
            <ul data-role="listview" data-inset="true">
                <li data-role="list-divider" data-theme="b"><h1>Separate Page Sublists</h1></li>
                <li data-role="list-divider"><h1>Nested list page generated from markup requires plugin</h1></li>
                <li>
                    Infiniti
                    <ul>
                        <li>G37</li>
                        <li>Q50</li>
                        <li>M57</li>
                        <li>FX</li>
                        <li>EX</li>
                    </ul>
                </li>
                <li>
                    <h1>Audi</h1>
                    <ul>
                        <li>A6</li>
                        <li>S6</li>
                        <li>A7</li>
                        <li>S7</li>
                        <li>A8</li>
                        <li>S8</li>
                    </ul>
                </li>
                <li>
                    <h1>BMW</h1>
                    <ul>
                        <li>1 series</li>
                        <li>3 series</li>
                        <li>5 series</li>
                        <li>6 series</li>
                        <li>7 series</li>
                    </ul>
                </li>
                <li>
                    <h1>Cadillac
                    </h1>
                    <ul>
                        <li>CTS</li>
                        <li>ATS</li>
                        <li>XTS</li>
                    </ul>
                </li>
                <li>
                    <h1>Lexus</h1>
                    <ul>
                        <li>IS</li>
                        <li>ES</li>
                        <li>GS</li>
                        <li>LS</li>
                    </ul>
                </li>
                <li>
                    <h1>Mercedes</h1>
                    <ul>
                        <li>A-Class</li>
                        <li>B-Class</li>
                        <li>C-Class</li>
                        <li>CL-Class</li>
                        <li>E-Class</li>
                    </ul>
                </li>
            </ul>
        </div>
	</div><!-- /content -->


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
