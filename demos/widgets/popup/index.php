<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h1>Popup <a href="http://api.jquerymobile.com/popup/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">The popup widget can be used for various types of popups. From a small tooltip popup to a large photo lightbox.
			</p>

			<h2>Popup basics</h2>

			<p>To create a popup, add the <code>data-role="popup"</code> attribute to a div with the popup contents. Then create a link with the <code>href</code> set to the <code>id</code> of the popup div, and add the attribute <code>data-rel="popup"</code> to tell the framework to open the popup when the link is tapped. A popup div has to be nested inside the same page as the link.</p>

			<div data-demo-html="true">
				<a href="#popupBasic" data-rel="popup" data-role="button" data-inline="true" data-transition="pop">Basic Popup</a>

				<div data-role="popup" id="popupBasic">
					<p>This is a completely basic popup, no options set.</p>
				</div>
			</div><!--/demo-html -->

			<h2>Tooltip</h2>
			<p>A tooltip can be created by adding a theme swatch to a basic popup and adding padding via the <code>ui-content</code> class.</p>
			<div data-demo-html="true">
				<p class="ui-body-d" style="padding:2em;">A paragraph with a tooltip. <a href="#popupInfo" data-rel="popup"  data-role="button" class="ui-icon-alt" data-inline="true" data-transition="pop" data-icon="info" data-theme="e" data-iconpos="notext">Learn more</a></p>

				<div data-role="popup" id="popupInfo" class="ui-content" data-theme="e" style="max-width:350px;">
		          <p>Here is a <strong>tiny popup</strong> being used like a tooltip. The text will wrap to multiple lines as needed.</p>
				</div>
			</div><!--/demo-html -->

			<h2>Photo lightbox</h2>
			<p>A lightbox for displaying images can be created easily by placing an image in a popup. In this example, a close button is added to the markup by adding a link. The <code>data-overlay-theme="a"</code> attribute adds a dark backdrop behind the photos. For advanced photo techniques, see <a href="popup-images.php" data-ajax="false">scaling images in popups</a>.</p>
			<div data-demo-html="true">
				<a href="#popupParis" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../../_assets/img/paris.jpg" alt="Paris, France" style="width:30%"></a>
				<a href="#popupSydney" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../../_assets/img/sydney.jpg" alt="Sydney, Australia" style="width:30%"></a>
				<a href="#popupNYC" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="../../_assets/img/newyork.jpg" alt="New York, USA" style="width:30%"></a>

				<div data-role="popup" id="popupParis" data-overlay-theme="a" data-theme="d" data-corners="false">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img class="popphoto" src="../../_assets/img/paris.jpg" style="max-height:512px;" alt="Paris, France">
				</div>
				<div data-role="popup" id="popupSydney" data-overlay-theme="a" data-theme="d" data-corners="false">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img class="popphoto" src="../../_assets/img/sydney.jpg" style="max-height:512px;" alt="Sydney, Australia">
				</div>
				<div data-role="popup" id="popupNYC" data-overlay-theme="a" data-theme="d" data-corners="false">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img class="popphoto" src="../../_assets/img/newyork.jpg" style="max-height:512px;" alt="New York, USA">
				</div>
			</div><!--/demo-html -->

			<h2>Menu</h2>
			<p>A menu can be created by adding a <a href="../listviews/">listview</a> inside a popup.</p>
			<div data-demo-html="true">
				<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="gear" data-theme="e">Actions...</a>

				<div data-role="popup" id="popupMenu" data-theme="d">
						<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">
							<li data-role="divider" data-theme="e">Choose an action</li>
							<li><a href="#">View details</a></li>
							<li><a href="#">Edit</a></li>
							<li><a href="#">Disable</a></li>
							<li><a href="#">Delete</a></li>
						</ul>
				</div>
			</div><!--/demo-html -->

			<h2>Nested menu</h2>
			<p>A nested menu can be created by placing <a href="../listviews/">listviews</a> into an <a href="../accordions/">accordion</a> inside a popup.</p>
			<div data-demo-html="true">
				<a href="#popupNested" data-rel="popup" data-role="button" data-inline="true" data-icon="bars" data-theme="b" data-transition="pop">Choose a creature...</a>

				<div data-role="popup" id="popupNested" data-theme="none">
					<div data-role="collapsible-set" data-theme="b" data-content-theme="c" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" style="margin:0; width:250px;">
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
				<a href="#popupLogin" data-rel="popup" data-position-to="window" data-role="button" data-inline="true" data-icon="check" data-theme="a" data-transition="pop">Sign in</a>

				<div data-role="popup" id="popupLogin" data-theme="a" class="ui-corner-all">
					<form>
						<div style="padding:10px 20px;">
							<h3>Please sign in</h3>
					        <label for="un" class="ui-hidden-accessible">Username:</label>
					        <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a" />

					        <label for="pw" class="ui-hidden-accessible">Password:</label>
					        <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="a" />

					    	<button type="submit" data-theme="b" data-icon="check">Sign in</button>
						</div>
					</form>
				</div>
			</div><!--/demo-html -->

			<h2>Dialog</h2>
			<p>Standard dialog markup can be placed into a popup. To create a modal style dialog, add the <code>data-dismissible="false"</code> attribute to the popup to prevent the click-outside-to-close behavior so people need to interact with popup buttons to close it.</p>
			<div data-demo-html="true">
				<a href="#popupDialog" data-rel="popup" data-position-to="window" data-role="button" data-inline="true" data-transition="pop" data-icon="delete" data-theme="b">Delete page...</a>

				<div data-role="popup" id="popupDialog" data-overlay-theme="a" data-theme="c" data-dismissible="false" style="max-width:400px;" class="ui-corner-all">
					<div data-role="header" data-theme="a" class="ui-corner-top">
						<h1>Delete Page?</h1>
					</div>
					<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content">
						<h3 class="ui-title">Are you sure you want to delete this page?</h3>
						<p>This action cannot be undone.</p>
						<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>
						<a href="#" data-role="button" data-inline="true" data-rel="back" data-transition="flow" data-theme="b">Delete</a>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2>Adding padding</h2>
			<p>For popups with formatted text, padding is needed. The <code>ui-content</code> class can be added to the popup to add the standard 15px of padding. When padding is added, we apply a few style rules to negate the top margin for the first heading or paragraph in the popup and do the same for the last element's bottom margin.</p>
			<div data-demo-html="true">
				<a href="#popupPadded" data-rel="popup" data-role="button" data-inline="true">Popup with padding</a>

				<div data-role="popup" id="popupPadded" class="ui-content">
					<p>This is a popup with the <code>ui-content</code> class added to the popup container.</p>
				</div>

			</div><!--/demo-html -->

			<h2>Closing popups</h2>
			<p>By default popups can be closed either by clicking outside the popup widget or by pressing the <code>Esc</code> key. To prevent this, the <code>data-dismissible="false"</code> attribute can be added to the popup. To add an explicit close button to a popup, add a link with the role of button into the popup container with a <code>data-rel="back"</code> attribute and position via a class.</p>

			<div data-demo-html="true">
				<a href="#popupCloseRight" data-rel="popup" data-role="button" data-inline="true">Right close button</a>
				<a href="#popupCloseLeft" data-rel="popup" data-role="button" data-inline="true">Left close button</a>
				<a href="#popupUndismissible" data-rel="popup" data-role="button" data-inline="true">Undismissible Popup</a>

				<div data-role="popup" id="popupCloseRight" class="ui-content" style="max-width:280px">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
					<p>I have a close button at the top right corner with simple HTML markup.</p>
				</div>

				<div data-role="popup" id="popupCloseLeft" class="ui-content" style="max-width:280px">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>
					<p>I have a close button at the top left corner with simple HTML markup.</p>
				</div>

				<div data-role="popup" id="popupUndismissible" class="ui-content" style="max-width:280px" data-dismissible="false">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>
					<p>I have the <code>data-dismissible</code> attribute set to <code>false</code>. I'm not closeable by clicking outside of me.</p>
				</div>
			</div><!--/demo-html -->

			<h2 id="position-header">Position</h2>
			<p>By default, popups open centered vertically and horizontally over the element you clicked (the origin) which is good for popups used as tooltips or menus. If a popup should appear centered within the window instead of over the origin, add the <code>data-position-to</code> attribute to the <strong>link</strong> and specify a value of <code>window</code>. It's also possible to specify any valid selector as the value of <code>position-to</code> in addition to <code>origin</code> and <code>window</code>.</p>

			<div data-demo-html="true">
				<a href="#positionWindow" data-role="button" data-inline="true" data-rel="popup" data-position-to="window">Position to window</a>
				<a href="#positionOrigin" data-role="button" data-inline="true" data-rel="popup" data-position-to="origin">Position to origin</a>
				<a href="#positionSelector" data-role="button" data-inline="true" data-rel="popup" data-position-to="#position-header">Position to #position-header</a>

				<div data-role="popup" id="positionWindow" class="ui-content" data-theme="d">
					<p>I am positioned to the window.</p>
				</div>

				<div data-role="popup" id="positionOrigin" class="ui-content" data-theme="d">
					<p>I am positioned over the origin.</p>
				</div>

				<div data-role="popup" id="positionSelector" class="ui-content" data-theme="d">
					<p>I am positioned over the header for this section via a selector. If the header isn't scrolled into view, collision detection will place the popup so it's in view.</p>
				</div>
			</div><!--/demo-html -->

			<h2>Transitions</h2>
			<p>By default, popups have no transition to make them open as quickly as possible. To set the transition used for a popup, add the <code>data-transition</code> attribute to the link that references the popup. The reverse transition will be used when closing the popup. For performance reasons on mobile devices, we recommend using simpler transitions like pop, fade or none for smooth and fast popup animations.</p>

			<div data-demo-html="true">
				<a href="#transitionExample" data-transition="none" data-role="button" data-inline="true" data-rel="popup">No transition</a>
				<a href="#transitionExample" data-transition="pop" data-role="button" data-inline="true" data-rel="popup">Pop</a>
				<a href="#transitionExample" data-transition="fade" data-role="button" data-inline="true" data-rel="popup">Fade</a>
				<a href="#transitionExample" data-transition="flip" data-role="button" data-inline="true" data-rel="popup">Flip</a>
				<a href="#transitionExample" data-transition="turn" data-role="button" data-inline="true" data-rel="popup">Turn</a>
				<a href="#transitionExample" data-transition="flow" data-role="button" data-inline="true" data-rel="popup">Flow</a>
				<a href="#transitionExample" data-transition="slide" data-role="button" data-inline="true" data-rel="popup">Slide</a>
				<a href="#transitionExample" data-transition="slidefade" data-role="button" data-inline="true" data-rel="popup">Slidefade</a>
				<a href="#transitionExample" data-transition="slideup" data-role="button" data-inline="true" data-rel="popup">Slide up</a>
				<a href="#transitionExample" data-transition="slidedown" data-role="button" data-inline="true" data-rel="popup">Slide down</a>

				<div data-role="popup" id="transitionExample" class="ui-content" data-theme="d">
					<p>I'm a simple popup.</p>
				</div>
			</div><!--/demo-html -->

				<h2>Theme</h2>

				<p>The popup has two theme-related options: <code>data-theme</code> and <code>data-overlay-theme</code>. The <code>data-theme</code> option refers to the theme of the popup itself, whereas <code>data-overlay-theme</code> controls the semi-opaque layer behind the popup. The theme is inherited from the page; specify <code>data-theme=&quot;none&quot;</code> for a popup with a transparent background.</p>

				<div data-demo-html="true">
					<a href="#theme" data-rel="popup" data-role="button" data-inline="true">Theme A</a>
					<div id="theme" data-role="popup" data-theme="a" class="ui-content">
					  <p>I have <code>data-theme="a"</code> set on me</p>
					</div>

					<a href="#transparent" data-rel="popup" data-role="button" data-inline="true">Theme "none", no shadow</a>
					<div id="transparent" data-role="popup" data-theme="none" data-shadow="false">
						<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
					  <img src="../../_assets/img/firefox-logo.png" class="popphoto" alt="firefox logo on a transparent popup">
					</div>

					<a href="#overlay" data-rel="popup" data-role="button" data-inline="true">Overlay theme A</a>
					<div id="overlay" data-role="popup" data-overlay-theme="a" class="ui-content">
					  <p>I have a <code>data-overlay-theme="a"</code> set on me</p>
					</div>

					<a href="#both" data-rel="popup" data-role="button" data-inline="true">Theme E + overlay A</a>
					<div id="both" data-role="popup" data-overlay-theme="a" data-theme="e" class="ui-content">
					  <p>I have <code>data-theme="e"</code> and <code>data-overlay-theme="a"</code> set on me</p>
					</div>
				</div><!--/demo-html -->

			<h2>Advanced techniques</h2>
			<p>Learn how to customize and extend popups by working with the API, custom scripts, and styles.</p>
			<a href="popup-images.php" class="jqm-button" data-ajax="false" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-r" data-iconpos="right">Scaling images</a>
			<a href="popup-iframes.php" class="jqm-button" data-ajax="false" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-r" data-iconpos="right">Map + video iframes</a>

		</div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
