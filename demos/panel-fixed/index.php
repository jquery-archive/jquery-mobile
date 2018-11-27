<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Panel fixed positioning - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" id="panel-fixed-page1" data-title="Panel fixed positioning">

    <div data-role="toolbar" data-type="header" data-position="fixed">
        <h1>Fixed header</h1>
        <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
        <a href="#add-form" data-icon="gear" data-iconpos="notext">Add</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content jqm-fullwidth">

    	<h1>Panel fixed positioning</h1>

        <p>This is a typical page that has two buttons in the header bar that open panels. The left panel has the push display mode. The right panel opens as overlay. For both panels we set <code>data-position-fixed="true"</code>. We also set position fixed for the header and footer on this page.</p>

        <p>The left panel contains a long menu to demonstrate that the framework will check the panel contents height and unfixes the panel so its content can be scrolled. In the right panel there is a short form that shows the fixed positioning.</p>

		<div data-demo-html="#panel-fixed-page1"></div><!--/demo-html -->

        <br>
        <br>
        <br>
        <br>
        <br>

        <a href="../" data-rel="back" data-ajax="false" class="ui-button ui-shadow ui-corner-all ui-mini ui-button-inline ui-alt-icon ui-nodisc-icon">Back <span class="ui-icon ui-icon-caret-l"></span></a>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <p>We made the page a bit longer because you only see the panel fixed positioning if you can scroll the page :-)</p>

	</div><!-- /content -->

    <div data-role="toolbar" data-type="footer" data-position="fixed">
    	<h4>Fixed footer</h4>
    </div><!-- /footer -->

	<div data-role="panel" data-position-fixed="true" data-display="push" data-theme="b" id="nav-panel">

		<ul data-role="listview">
            <li data-icon="delete"><a href="#" data-rel="close">Close menu</a></li>
                <li><a href="#panel-fixed-page2">Accordion</a></li>
                <li><a href="#panel-fixed-page2">Ajax Navigation</a></li>
                <li><a href="#panel-fixed-page2">Autocomplete</a></li>
                <li><a href="#panel-fixed-page2">Buttons</a></li>
                <li><a href="#panel-fixed-page2">Checkboxes</a></li>
                <li><a href="#panel-fixed-page2">Collapsibles</a></li>
                <li><a href="#panel-fixed-page2">Controlgroup</a></li>
                <li><a href="#panel-fixed-page2">Dialogs</a></li>
                <li><a href="#panel-fixed-page2">Fixed toolbars</a></li>
                <li><a href="#panel-fixed-page2">Flip switch toggle</a></li>
                <li><a href="#panel-fixed-page2">Footer toolbar</a></li>
                <li><a href="#panel-fixed-page2">Form elements</a></li>
                <li><a href="#panel-fixed-page2">Grids</a></li>
                <li><a href="#panel-fixed-page2">Header toolbar</a></li>
                <li><a href="#panel-fixed-page2">Icons</a></li>
                <li><a href="#panel-fixed-page2">Links</a></li>
                <li><a href="#panel-fixed-page2">Listviews</a></li>
                <li><a href="#panel-fixed-page2">Loader overlay</a></li>
                <li><a href="#panel-fixed-page2">Navbar</a></li>
                <li><a href="#panel-fixed-page2">Navbar, persistent</a></li>
                <li><a href="#panel-fixed-page2">Pages</a></li>
                <li><a href="#panel-fixed-page2">New</a></li>
                <li><a href="#panel-fixed-page2">Popup</a></li>
                <li><a href="#panel-fixed-page2">Radio buttons</a></li>
                <li><a href="#panel-fixed-page2">Select</a></li>
                <li><a href="#panel-fixed-page2">Slider, single</a></li>
                <li><a href="#panel-fixed-page2">New</a></li>
                <li><a href="#panel-fixed-page2">New</a></li>
                <li><a href="#panel-fixed-page2">New</a></li>
                <li><a href="#panel-fixed-page2">Text inputs & textarea</a></li>
                <li><a href="#panel-fixed-page2">Transitions</a></li>
		</ul>

	</div><!-- /panel -->

	<div data-role="panel" data-position="right" data-position-fixed="true" data-display="overlay" data-theme="a" id="add-form">

        <form class="userform">

        	<h2>Login</h2>

            <label for="name">Username:</label>
            <input type="text" name="name" id="name" value="" data-clear-button="true" data-mini="true">

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="" data-clear-button="true" autocomplete="off" data-mini="true">

            <div class="ui-grid-a">
                <div class="ui-block-a"><a href="#" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-b ui-mini">Cancel</a></div>
                <div class="ui-block-b"><a href="#" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-mini">Save</a></div>
			</div>
        </form>

	</div><!-- /panel -->

</div><!-- /page -->

<div data-role="page" id="panel-fixed-page2">

    <div data-role="toolbar" data-type="header">
        <h1>Landing page</h1>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <p>This is just a landing page.</p>

        <a href="#panel-fixed-page1" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Back <span class="ui-icon ui-icon-back"></span></a>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
