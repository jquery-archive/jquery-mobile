<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="popup-arrow-script">
	$.mobile.document.on( "click", "#open-popupArrow", function( evt ) {
		$( "#popupArrow" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
		evt.preventDefault();
	});
	</script>
	<style id="popup-arrow-css">
	.clickable-area {
		display: block;
		width: 100%;
		height: 300px;
		background-color: #ffefef;
	}
	.clickable-area:focus {
		outline: 0;
	}
	</style>
	<style id="tooltip-button">
	.ui-button.my-tooltip-button,
	.ui-button.my-tooltip-button:hover,
	.ui-button.my-tooltip-button:active {
		background: none;
		border: 0;
	}
	</style>
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

		<h1>Popup</h1>

		<a href="http://api.jquerymobile.com/popup/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>The popup widget can be used for various types of popups. From a small tooltip popup to a large photo lightbox.</p>

		<h2>Popup basics</h2>

		<p>To create a popup, add the <code>data-role="popup"</code> attribute to a div with the popup contents. Then create a link with the <code>href</code> set to the <code>id</code> of the popup div, and add the attribute <code>data-rel="popup"</code> to tell the framework to open the popup when the link is tapped. A popup div has to be nested inside the same page as the link.</p>

		<div data-demo-html="true">
			<a href="#popupBasic" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-transition="pop">Basic Popup</a>

			<div data-role="popup" id="popupBasic">
			<p>This is a completely basic popup, no options set.</p>
			</div>
		</div><!--/demo-html -->

		<h2>Tooltip</h2>
		<p>A tooltip can be created by adding a theme swatch to a basic popup and adding padding via the <code>ui-content</code> class. Here we also show how you can custom style the tooltip button.</p>
		<div data-demo-html="true" data-demo-css="#tooltip-button">
			<p>A paragraph with a tooltip. <a href="#popupInfo" data-rel="popup" data-transition="pop" class="my-tooltip-button ui-button ui-alt-icon ui-nodisc-icon ui-button-inline ui-button-icon-only" title="Learn more">Learn more <span class="ui-icon ui-icon-info"></span></a></p>

			<div data-role="popup" id="popupInfo" class="ui-content" data-theme="a" style="max-width:350px;">
	          <p>Here is a <strong>tiny popup</strong> being used like a tooltip. The text will wrap to multiple lines as needed.</p>
			</div>
		</div><!--/demo-html -->

		<h2>Photo lightbox</h2>
		<p>A lightbox for displaying images can be created easily by placing an image in a popup. In this example, a close button is added to the markup by adding a link. The <code>data-overlay-theme="b"</code> attribute adds a dark backdrop behind the photos. For advanced photo techniques, see <a href="../popup-image-scaling/" data-ajax="false">scaling images in popups</a>.</p>

		<div data-demo-html="true">
			<a href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../_assets/img/paris.jpg" alt="Paris, France" style="width:30%"></a>
			<a href="#popupSydney" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../_assets/img/sydney.jpg" alt="Sydney, Australia" style="width:30%"></a>
			<a href="#popupNYC" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../_assets/img/newyork.jpg" alt="New York, USA" style="width:30%"></a>

			<div data-role="popup" id="popupParis" data-overlay-theme="b" data-theme="b" data-corners="false">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a><img class="popphoto" src="../_assets/img/paris.jpg" style="max-height:512px;" alt="Paris, France">
			</div>
			<div data-role="popup" id="popupSydney" data-overlay-theme="b" data-theme="b" data-corners="false">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a><img class="popphoto" src="../_assets/img/sydney.jpg" style="max-height:512px;" alt="Sydney, Australia">
			</div>
			<div data-role="popup" id="popupNYC" data-overlay-theme="b" data-theme="b" data-corners="false">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a><img class="popphoto" src="../_assets/img/newyork.jpg" style="max-height:512px;" alt="New York, USA">
			</div>
		</div><!--/demo-html -->

		<h2>Menu</h2>
		<p>A menu can be created by adding a <a href="../listview/">listview</a> inside a popup.</p>
		<div data-demo-html="true">
			<a href="#popupMenu" data-rel="popup" data-transition="slideup" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-a">Actions... <span class="ui-icon ui-icon-gear"></span></a>

			<div data-role="popup" id="popupMenu" data-theme="b">
					<ul data-role="listview" data-inset="true" style="min-width:210px;">
						<li data-role="list-divider">Choose an action</li>
						<li><a href="#">View details</a></li>
						<li><a href="#">Edit</a></li>
						<li><a href="#">Disable</a></li>
						<li><a href="#">Delete</a></li>
					</ul>
			</div>
		</div><!--/demo-html -->

		<h2>Nested menu</h2>
		<p>A nested menu can be created by placing <a href="../listview/">listview</a> into an <a href="../collapsible/">collapsible</a> inside a popup.</p>
		<div data-demo-html="true">
			<a href="#popupNested" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-b" data-transition="pop">Choose a creature... <span class="ui-icon ui-icon-bars"></span></a>

			<div data-role="popup" id="popupNested" data-theme="none">
				<div data-role="collapsibleset" data-theme="b" data-content-theme="a" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" style="margin:0; width:250px;">
					<div data-role="collapsible" data-inset="false">
					<h2>Farm animals</h2>
						<ul data-role="listview">
							<li><a href="#" data-rel="dialog">Chicken</a></li>
							<li><a href="#" data-rel="dialog">Cow</a></li>
							<li><a href="#" data-rel="dialog">Duck</a></li>
							<li><a href="#" data-rel="dialog">Sheep</a></li>
						</ul>
					</div><!-- /collapsible -->
					<div data-role="collapsible" data-inset="false">
					<h2>Pets</h2>
						<ul data-role="listview">
							<li><a href="#" data-rel="dialog">Cat</a></li>
							<li><a href="#" data-rel="dialog">Dog</a></li>
							<li><a href="#" data-rel="dialog">Iguana</a></li>
							<li><a href="#" data-rel="dialog">Mouse</a></li>
						</ul>
					</div><!-- /collapsible -->
					<div data-role="collapsible" data-inset="false">
					<h2>Ocean Creatures</h2>
						<ul data-role="listview">
							<li><a href="#" data-rel="dialog">Fish</a></li>
							<li><a href="#" data-rel="dialog">Octopus</a></li>
							<li><a href="#" data-rel="dialog">Shark</a></li>
							<li><a href="#" data-rel="dialog">Starfish</a></li>
						</ul>
					</div><!-- /collapsible -->
					<div data-role="collapsible" data-inset="false">
					<h2>Wild Animals</h2>
						<ul data-role="listview">
							<li><a href="#" data-rel="dialog">Lion</a></li>
							<li><a href="#" data-rel="dialog">Monkey</a></li>
							<li><a href="#" data-rel="dialog">Tiger</a></li>
							<li><a href="#" data-rel="dialog">Zebra</a></li>
						</ul>
					</div><!-- /collapsible -->
				</div><!-- /collapsible set -->
			</div><!-- /popup -->
		</div><!--/demo-html -->

		<h2>Form</h2>
		<p>You can place a form inside a popup. When it opens, focus will be restricted to elements inside the popup.</p>
		<div data-demo-html="true">
			<a href="#popupLogin" data-rel="popup" data-position-to="window" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-a" data-transition="pop">Sign in <span class="ui-icon ui-icon-check"></span></a>

			<div data-role="popup" id="popupLogin" data-theme="a" class="ui-corner-all">
				<form>
					<div style="padding:10px 20px;">
						<h3>Please sign in</h3>
				        <label for="un" class="ui-hidden-accessible">Username:</label>
				        <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a">

				        <label for="pw" class="ui-hidden-accessible">Password:</label>
				        <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="a">

						<button type="submit" class="ui-button ui-corner-all ui-shadow ui-button-b">Sign in <span class="ui-icon ui-icon-check"></span></button>
					</div>
				</form>
			</div>
		</div><!--/demo-html -->

		<h2>Dialog</h2>
		<p>Standard dialog markup can be placed into a popup. To create a modal style dialog, add the <code>data-dismissible="false"</code> attribute to the popup to prevent the click-outside-to-close behavior so people need to interact with popup buttons to close it.</p>
		<div data-demo-html="true">
			<a href="#popupDialog" data-rel="popup" data-position-to="window" data-transition="pop" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-b">Delete page... <span class="ui-icon ui-icon-delete"></span></a>

			<div data-role="popup" id="popupDialog" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">
				<div data-role="toolbar" data-type="header" data-theme="a">
				<h1>Delete Page?</h1>
				</div>
				<div role="main" class="ui-content">
					<h3 class="ui-title">Are you sure you want to delete this page?</h3>
				<p>This action cannot be undone.</p>
					<a href="#" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-b" data-rel="back">Cancel</a>
					<a href="#" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-button-b" data-rel="back" data-transition="flow">Delete</a>
				</div>
			</div>
		</div><!--/demo-html -->

		<h2>Adding padding</h2>
		<p>For popups with formatted text, padding is needed. The <code>ui-content</code> class can be added to the popup to add the standard 15px of padding. When padding is added, we apply a few style rules to negate the top margin for the first heading or paragraph in the popup and do the same for the last element's bottom margin.</p>
		<div data-demo-html="true">
			<a href="#popupPadded" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Popup with padding</a>

			<div data-role="popup" id="popupPadded" class="ui-content">
			<p>This is a popup with the <code>ui-content</code> class added to the popup container.</p>
			</div>

		</div><!--/demo-html -->

		<h2>Closing popups</h2>
		<p>By default popups can be closed either by clicking outside the popup widget or by pressing the <code>Esc</code> key. To prevent this, the <code>data-dismissible="false"</code> attribute can be added to the popup. To add an explicit close button to a popup, add a link with the role of button into the popup container with a <code>data-rel="back"</code> attribute and position via a class.</p>

		<div data-demo-html="true">
			<a href="#popupCloseRight" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Right close button</a>
			<a href="#popupCloseLeft" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Left close button</a>
			<a href="#popupUndismissible" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Undismissible Popup</a>

			<div data-role="popup" id="popupCloseRight" class="ui-content" style="max-width:280px">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a>
			<p>I have a close button at the top right corner with simple HTML markup.</p>
			</div>

			<div data-role="popup" id="popupCloseLeft" class="ui-content" style="max-width:280px">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-left">Close <span class="ui-icon ui-icon-delete"></span></a>
			<p>I have a close button at the top left corner with simple HTML markup.</p>
			</div>

			<div data-role="popup" id="popupUndismissible" class="ui-content" style="max-width:280px" data-dismissible="false">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-left">Close <span class="ui-icon ui-icon-delete"></span></a>
			<p>I have the <code>data-dismissible</code> attribute set to <code>false</code>. I'm not closeable by clicking outside of me.</p>
			</div>
		</div><!--/demo-html -->

		<h2 id="position-header">Position</h2>
		<p>By default, popups open centered vertically and horizontally over the element you clicked (the origin) which is good for popups used as tooltips or menus. If a popup should appear centered within the window instead of over the origin, add the <code>data-position-to</code> attribute to the <strong>link</strong> and specify a value of <code>window</code>. It's also possible to specify any valid selector as the value of <code>position-to</code> in addition to <code>origin</code> and <code>window</code>.</p>

		<div data-demo-html="true">
			<a href="#positionWindow" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup" data-position-to="window">Position to window</a>
			<a href="#positionOrigin" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup" data-position-to="origin">Position to origin</a>
			<a href="#positionSelector" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup" data-position-to="#position-header">Position to #position-header</a>

			<div data-role="popup" id="positionWindow" class="ui-content" data-theme="a">
			<p>I am positioned to the window.</p>
			</div>

			<div data-role="popup" id="positionOrigin" class="ui-content" data-theme="a">
			<p>I am positioned over the origin.</p>
			</div>

			<div data-role="popup" id="positionSelector" class="ui-content" data-theme="a">
			<p>I am positioned over the header for this section via a selector. If the header isn't scrolled into view, collision detection will place the popup so it's in view.</p>
			</div>
		</div><!--/demo-html -->

		<h2>Transitions</h2>
		<p>By default, popups have no transition to make them open as quickly as possible. To set the transition used for a popup, add the <code>data-transition</code> attribute to the link that references the popup. The reverse transition will be used when closing the popup. For performance reasons on mobile devices, we recommend using simpler transitions like pop, fade or none for smooth and fast popup animations.</p>

		<div data-demo-html="true">
			<a href="#transitionExample" data-transition="none" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">No transition</a>
			<a href="#transitionExample" data-transition="pop" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Pop</a>
			<a href="#transitionExample" data-transition="fade" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Fade</a>
			<a href="#transitionExample" data-transition="flip" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Flip</a>
			<a href="#transitionExample" data-transition="turn" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Turn</a>
			<a href="#transitionExample" data-transition="flow" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Flow</a>
			<a href="#transitionExample" data-transition="slide" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Slide</a>
			<a href="#transitionExample" data-transition="slidefade" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Slidefade</a>
			<a href="#transitionExample" data-transition="slideup" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Slide up</a>
			<a href="#transitionExample" data-transition="slidedown" class="ui-button ui-corner-all ui-shadow ui-button-inline" data-rel="popup">Slide down</a>

			<div data-role="popup" id="transitionExample" class="ui-content" data-theme="a">
			<p>I'm a simple popup.</p>
			</div>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<p>The popup has two theme-related options: <code>data-theme</code> and <code>data-overlay-theme</code>. The <code>data-theme</code> option refers to the theme of the popup itself, whereas <code>data-overlay-theme</code> controls the semi-opaque layer behind the popup. The theme is inherited from the page; specify <code>data-theme=&quot;none&quot;</code> for a popup with a transparent background.</p>

		<div data-demo-html="true">
			<a href="#theme" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Theme A</a>
			<div id="theme" data-role="popup" data-theme="a" class="ui-content">
			  <p>I have <code>data-theme="a"</code> set on me</p>
			</div>

			<a href="#transparent" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Theme "none", no shadow</a>
			<div id="transparent" data-role="popup" data-theme="none" data-shadow="false">
				<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a>
			  <img src="../_assets/img/firefox-logo.png" class="popphoto" alt="firefox logo on a transparent popup" height="300" width="300">
			</div>

			<a href="#overlay" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Overlay theme A</a>
			<div id="overlay" data-role="popup" data-overlay-theme="a" class="ui-content">
			  <p>I have a <code>data-overlay-theme="a"</code> set on me</p>
			</div>

			<a href="#both" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline">Theme B + overlay A</a>
			<div id="both" data-role="popup" data-overlay-theme="a" data-theme="b" class="ui-content">
			  <p>I have <code>data-theme="b"</code> and <code>data-overlay-theme="a"</code> set on me</p>
			</div>
		</div><!--/demo-html -->

		<h2>Arrow</h2>
		<p>The popup can display an arrow along one of its edges when it opens if the <code>data-arrow</code> attribute is set. The attribute can take a value of <code>true</code>, <code>false</code>, or a string containing a comma-separated list of edge abbreviations ("l" for left, "t" for top, "r" for right, and "b" for bottom). For example, if you set <code>data-arrow="r,b"</code> then the arrow will only ever appear along the bottom or right edge of the popup. <code>true</code> is the same as <code>"l,t,r,b"</code> and <code>false</code> or <code>""</code> indicates that the popup should be displayed without an arrow.</p>
		<p>Click in the pink area below to display a popup with an arrow.</p>
			<div data-demo-html="true" data-demo-css="#popup-arrow-css" data-demo-js="#popup-arrow-script">
				<div data-role="popup" id="popupArrow" data-arrow="true">
				<p>A paragraph inside the popup with an arrow.</p>
				<p>This second paragraph serves to increase the height of the popup</p>
				</div>
				<a href="#" id="open-popupArrow" class="clickable-area"></a>
			</div>

		<h2>Pre-rendered markup</h2>
		<p>You can supply pre-rendered popup markup to save startup time. The page in the example below contains a popup with pre-rendered markup supplied as part of the original page markup.</p>
			<div data-demo-html="#pre-rendered-page">
				<a href="#pre-rendered-page" class="ui-button ui-corner-all ui-shadow" data-mini="true" data-inline="true">Go to demo <span class="ui-icon ui-icon-arrow-r"></span></a>
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

	<div id="pre-rendered-page" data-role="page">
		<div data-role="toolbar" data-type="header" data-add-back-btn="true">
		<h1>Pre-rendered popup demo</h1>
		</div>
		<div role="main" class="ui-content">
			<a href="#pre-rendered" data-rel="popup" class="ui-button ui-corner-all ui-shadow ui-button-inline" aria-owns="pre-rendered" aria-haspopup="true" aria-expanded="false">Open Popup</a>
			<div style="display: none;"><!-- placeholder for pre-rendered --></div>
		</div>
		<div id="pre-rendered-screen" class="ui-popup-screen ui-screen-hidden"></div>
		<div id="pre-rendered-popup" class="ui-popup-container fade ui-popup-hidden ui-body-inherit ui-overlay-shadow ui-corner-all">
			<div id="pre-rendered" class="ui-popup" data-role="popup" data-enhanced="true" data-transition="fade">
				<p>This is the contents of the pre-rendered popup</p>
			</div>
		</div>
	</div><!-- /page -->

</body>
</html>
