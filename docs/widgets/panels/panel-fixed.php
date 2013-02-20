<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Panel fixed positioning - jQuery Mobile Demos</title>
    <link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../_assets/favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
    <script src="../../_assets/js/"></script>
    <script src="../../../js/"></script>
    <style>
        .nav-search .ui-btn-up-a {
            background-image:none;
            background-color:#333333;
        }
        .nav-search .ui-btn-inner {
            border-top: 1px solid #888;
            border-color: rgba(255, 255, 255, .1);
        }
        .nav-search .ui-btn.ui-first-child {
            border-top-width: 0;
            background: #111;
        }
        .userform {
			padding: .8em 1.2em;
		}
        .userform h2 {
			color: #555;
			margin: 0.3em 0 .8em 0;
			padding-bottom: .5em;
			border-bottom: 1px solid rgba(0,0,0,.1);
		}
        .userform label {
			display: block;
			margin-top: 1.2em;
		}
        .switch .ui-slider-switch {
			width: 6.5em !important;
		}
        .ui-grid-a {
			margin-top: 1em;
			padding-top: .8em;
			margin-top: 1.4em;
			border-top: 1px solid rgba(0,0,0,.1);
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos ui-responsive-panel" id="panel-fixed-page1">

    <div data-role="header" data-theme="f" data-position="fixed">
        <h1>Fixed header</h1>
        <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
        <a href="#add-form" data-icon="plus" data-iconpos="notext">Add</a>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

    	<h1>Panel</h1>

		<h2>Fixed positioning</h2>

        <p>This is a typical page that has two buttons in the header bar that open panels. The left button opens a left menu with the reveal display mode. The right button opens a form in a right overlay panel. We also set position fixed for the header and footer on this page.</p>

        <p>The left panel contains a long menu to demonstrate that the framework will check the panel contents height and unfixes the panel so its content can be scrolled.</p>

		<h2>Responsive</h2>

        <p>To make this responsive, the panel stays open and causes the page to re-flow at wider widths. This allows both the menu and page to be used together when more space is available. This behavior is controlled by CSS media queries. You can create a custom one for a specific breakpoint or use the breakpoint preset by adding the <code>class="ui-responsive-panel"</code> to the page container. We have added this class on this demo page.</p>

        <a href="/" class="jqm-button" data-ajax="false" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-l" data-iconpos="left">Back to Panels</a>

		<div data-demo-html="#panel-fixed-page1" data-demo-css="true"></div><!--/demo-html -->

	</div><!-- /content -->

    <div data-role="footer" data-position="fixed" data-theme="f">
    	<h4>Fixed footer</h4>
    </div><!-- /footer -->

	<div data-role="panel" data-position-fixed="true" data-theme="a" id="nav-panel">

		<ul data-role="listview" data-theme="a" class="nav-search">
            <li data-icon="delete"><a href="#" data-rel="close">Close menu</a></li>
            <li><a href="#panel-fixed-page2">Accessibility</a></li>
            <li><a href="#panel-fixed-page2">Accordions</a></li>
            <li><a href="#panel-fixed-page2">AJAX navigation model</a></li>
            <li><a href="#panel-fixed-page2">Anatomy of a page</a></li>
            <li><a href="#panel-fixed-page2">Animation events</a></li>
            <li><a href="#panel-fixed-page2">Automatic listview dividers</a></li>
            <li><a href="#panel-fixed-page2">Buttons</a></li>
            <li><a href="#panel-fixed-page2">Button icons</a></li>
            <li><a href="#panel-fixed-page2">Caching pages</a></li>
            <li><a href="#panel-fixed-page2">Checkbox</a></li>
            <li><a href="#panel-fixed-page2">Collapsible content</a></li>
            <li><a href="#panel-fixed-page2">Collapsible lists</a></li>
            <li><a href="#panel-fixed-page2">Data attribute reference</a></li>
            <li><a href="#panel-fixed-page2">Dialogs</a></li>
            <li><a href="#panel-fixed-page2">Disabling form elements</a></li>
            <li><a href="#panel-fixed-page2">Dynamically injecting pages</a></li>
            <li><a href="#panel-fixed-page2">Events API</a></li>
            <li><a href="#panel-fixed-page2">Flip switch</a></li>
            <li><a href="#panel-fixed-page2">Features overview</a></li>
            <li><a href="#panel-fixed-page2">Fixed toolbars</a></li>
            <li><a href="#panel-fixed-page2">Forms intro</a></li>
            <li><a href="#panel-fixed-page2">Form element gallery</a></li>
            <li><a href="#panel-fixed-page2">Fullscreen toolbars</a></li>
            <li><a href="#panel-fixed-page2">Footer toolbars</a></li>
            <li><a href="#panel-fixed-page2">Global options (mobileinit)</a></li>
            <li><a href="#panel-fixed-page2">Grouped buttons</a></li>
            <li><a href="#panel-fixed-page2">Header toolbars</a></li>
            <li><a href="#panel-fixed-page2">Hiding elements accessibly</a></li>
            <li><a href="#panel-fixed-page2">HTML formatting</a></li>
		</ul>

	</div><!-- /panel -->

	<div data-role="panel" data-position="right" data-position-fixed="true" data-display="overlay" data-theme="b" id="add-form">

        <form class="userform">

        	<h2>Create new user</h2>

            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="" data-clear-btn="true" data-mini="true">

            <label for="email">Email</label>
            <input type="email" name="email" id="status" value="" data-clear-btn="true" data-mini="true">

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="" data-clear-btn="true" autocomplete="off" data-mini="true">

            <div class="switch">
                <label for="status">Status</label>
                <select name="status" id="slider" data-role="slider" data-mini="true">
                    <option value="off">Inactive</option>
                    <option value="on">Active</option>
                </select>
            </div>

            <div class="ui-grid-a">
                <div class="ui-block-a"><a href="#" data-rel="close" data-role="button" data-theme="c" data-mini="true">Cancel</a></div>
                <div class="ui-block-b"><a href="#" data-rel="close" data-role="button" data-theme="b" data-mini="true">Save</a></div>
			</div>
        </form>

	</div><!-- /panel -->

</div><!-- /page -->

<div data-role="page" id="panel-fixed-page2">

    <div data-role="header" data-theme="f">
        <h1>Landing page</h1>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

        <p>This is just a landing page.</p>

        <a href="#panel-fixed-page1" data-role="button" data-inline="true" data-mini="true" data-icon="back" data-iconpos="left">Back</a>

    </div><!-- /content -->

</div><!-- /page -->
</body>
</html>
