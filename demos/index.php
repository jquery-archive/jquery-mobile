<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="favicon.ico">
	<link rel="stylesheet" href="../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="_assets/css/jqm-demos.css">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../external/jquery/jquery.js"></script>
	<script src="_assets/js/"></script>
	<script src="../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-home">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><img src="_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">
		<h1><span class="jqm-version"></span> Demos</h1>

		<p><span class="jqm-intro-span">jQuery Mobile</span> is a touch-optimized HTML5 UI framework designed to make responsive web sites and apps that are accessible on all smartphone, tablet and desktop devices.</p>

        <img src="_assets/img/devices.png" class="jqm-demos-hero">

		<p>New to jQuery Mobile? Get started by reading this <a href="intro/" data-ajax="false">introduction</a>. For technical info, visit the <a href="http://api.jquerymobile.com" title="jQuery Mobile API documentation" target="_blank">API documentation</a>. Downloads and info about the project can be found on <a href="http://jquerymobile.com" title="jQuery Mobile web site" target="_blank">jquerymobile.com</a>.</p>

        <div class="ui-grid-a ui-responsive jqm-grid">
        	<div class="ui-block-a">
        		<div class="jqm-block-content">
        			<h3>Pages &amp; Navigation</h3>

        			<p><a href="pages/" data-ajax="false">Pages</a>, <a href="navigation/" data-ajax="false">Navigation</a></p>
        			<p><a href="loader/" data-ajax="false">Loader</a></p>
        			<p><a href="transitions/" data-ajax="false">Transitions</a></p>
        		</div>
        	</div>
        	<div class="ui-block-b">
        		<div class="jqm-block-content">
        			<h3>CSS Framework</h3>

        			<p><a href="theme-default/" data-ajax="false">Theming</a>, <a href="grids/" data-ajax="false">Grids</a></p>
                    <p><a href="button/" data-ajax="false">Buttons</a>, <a href="icons/" data-ajax="false">Icons</a></p>
        			<p><a href="../body-bar-classes/" data-ajax="false">Body and bar classes</a></p>
        		</div>
        	</div>
        	<div class="ui-block-a">
        		<div class="jqm-block-content">
        			<h3>Widgets</h3>

        			<p><a href="toolbar/" data-ajax="false">Toolbar</a>, <a href="navbar/" data-ajax="false">Navbar</a>, <a href="controlgroup/" data-ajax="false">Controlgroup</a></p>
        			<p><a href="tabs/" data-ajax="false">Tabs</a>, <a href="panel/" data-ajax="false">Panel</a>, <a href="popup/" data-ajax="false">Popup</a></p>
        			<p><a href="accordion/" data-ajax="false">Accordion</a>, <a href="collapsible/" data-ajax="false">Collapsible</a>, <a href="collapsibleset/" data-ajax="false">Collapsible set</a></p>
        		</div>
        	</div>
        	<div class="ui-block-b">
        		<div class="jqm-block-content">
        			<h3>Form Widgets</h3>

                    <p><a href="button/" data-ajax="false">Button</a>, <a href="textinput/" data-ajax="false">Textinput</a>, <a href="slider/" data-ajax="false">Slider</a>, <a href="rangeslider/" data-ajax="false">Rangeslider</a></p>
        			<p><a href="flipswitch/" data-ajax="false">Flipswitch</a>, <a href="checkboxradio-checkbox/" data-ajax="false">Checkboxes</a>, <a href="checkboxradio-radio/" data-ajax="false">Radio buttons</a></p>
        			<p><a href="selectmenu/" data-ajax="false">Selectmenu</a>, <a href="selectmenu-custom/" data-ajax="false">Custom menu</a></p>
        		</div>
        	</div>
            <div class="ui-block-a">
                <div class="jqm-block-content">
                    <h3>3rd Party Integrations</h3>

                    <p><a href="../datepicker/" data-ajax="false">Datepicker</a>, <a href="../listview-nested-lists/" data-ajax="false">Nested Listviews</a></p>
                    <p><a href="../backbone-requirejs/" data-ajax="false">Backbone RequireJS</a></p>
                    <p><a href="../map-geolocation/" data-ajax="false">Google Maps geolocation</a>, <a href="../map-list-toggle/" data-ajax="false">Google Maps list toggle</a></p>
                    <p></p>
                </div>
            </div>
            <div class="ui-block-b">
                <div class="jqm-block-content">
                    <h3>Lists and Tables</h3>

                    <p><a href="listview/" data-ajax="false">Listview</a>, <a href="../listview-collapsible-item-flat/" data-ajax="false">Collapsible Listview</a></p>
					<p><a href="filterable/" data-ajax="false">Filterable</a></p>
                    <p><a href="table-reflow/" data-ajax="false">Table Reflow</a>, <a href="table-column-toggle/" data-ajax="false">Table Column Toggle</a></p>
                </div>
            </div>
        </div>

	</div><!-- /content -->

	<?php include( 'jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( 'jqm-search.php' ); ?>

</body>
</html>
