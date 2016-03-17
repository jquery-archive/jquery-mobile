<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Panel responsive - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos ui-responsive-panel" id="panel-responsive-page1" data-title="Panel responsive page">

    <div data-role="toolbar" data-type="header">
        <h1>Panel responsive</h1>
        <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
        <a href="#add-form" data-icon="gear" data-iconpos="notext">Add</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content jqm-fullwidth">

    	<h1>Panel responsive</h1>

        <p>This is a typical page that has two buttons in the header bar that open panels. The left panel has the push display mode, the right panel reveal. To make this responsive, you can make the page re-flow at wider widths. This allows both the panel menu and page to be used together when more space is available. This behavior is controlled by CSS media queries. You can create a custom one for a specific breakpoint or use the breakpoint preset by adding the <code>class="ui-responsive-panel"</code> to the page container. We have added this class on this demo page. Note that when using the preset class, we also hide the dismiss layer on wider screens if the panel has the push display mode.</p>

		<div data-demo-html="#panel-responsive-page1"></div><!--/demo-html -->

        <br>
        <br>
        <br>
        <br>
        <br>

        <a href="../" data-rel="back" data-ajax="false" class="ui-button ui-shadow ui-corner-all ui-mini ui-button-inline ui-alt-icon ui-nodisc-icon">Back <span class="ui-icon ui-icon-caret-l"></span></a>

	</div><!-- /content -->

	<div data-role="panel" data-display="push" data-theme="b" id="nav-panel">

		<ul data-role="listview">
            <li data-icon="delete"><a href="#" data-rel="close">Close menu</a></li>
                <li><a href="#panel-responsive-page2">Accordion</a></li>
                <li><a href="#panel-responsive-page2">Ajax Navigation</a></li>
                <li><a href="#panel-responsive-page2">Autocomplete</a></li>
                <li><a href="#panel-responsive-page2">Buttons</a></li>
                <li><a href="#panel-responsive-page2">Checkboxes</a></li>
                <li><a href="#panel-responsive-page2">Collapsibles</a></li>
                <li><a href="#panel-responsive-page2">Controlgroup</a></li>
                <li><a href="#panel-responsive-page2">Dialogs</a></li>
                <li><a href="#panel-responsive-page2">Fixed toolbars</a></li>
                <li><a href="#panel-responsive-page2">Flip switch toggle</a></li>
                <li><a href="#panel-responsive-page2">Footer toolbar</a></li>
                <li><a href="#panel-responsive-page2">Form elements</a></li>
                <li><a href="#panel-responsive-page2">Grids</a></li>
                <li><a href="#panel-responsive-page2">Header toolbar</a></li>
                <li><a href="#panel-responsive-page2">Icons</a></li>
                <li><a href="#panel-responsive-page2">Links</a></li>
                <li><a href="#panel-responsive-page2">Listviews</a></li>
                <li><a href="#panel-responsive-page2">Loader overlay</a></li>
                <li><a href="#panel-responsive-page2">Navbar</a></li>
                <li><a href="#panel-responsive-page2">Navbar, persistent</a></li>
                <li><a href="#panel-responsive-page2">Pages</a></li>
                <li><a href="#panel-responsive-page2">New</a></li>
                <li><a href="#panel-responsive-page2">Popup</a></li>
                <li><a href="#panel-responsive-page2">Radio buttons</a></li>
                <li><a href="#panel-responsive-page2">Select</a></li>
                <li><a href="#panel-responsive-page2">Slider, single</a></li>
                <li><a href="#panel-responsive-page2">New</a></li>
                <li><a href="#panel-responsive-page2">New</a></li>
                <li><a href="#panel-responsive-page2">New</a></li>
                <li><a href="#panel-responsive-page2">Text inputs & textarea</a></li>
                <li><a href="#panel-responsive-page2">Transitions</a></li>
		</ul>

	</div><!-- /panel -->

	<div data-role="panel" data-position="right" data-display="reveal" data-theme="a" id="add-form">

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

<div data-role="page" id="panel-responsive-page2">

    <div data-role="toolbar" data-type="header">
        <h1>Landing page</h1>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <p>This is just a landing page.</p>

        <a href="#panel-responsive-page1" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Back <span class="ui-icon ui-icon-back"></span></a>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
