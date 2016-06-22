<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Transitions - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
        table { width:100%; border-spacing: 0; }
        th { text-align:left; }
        th h3 { margin:.6em 0 .6em .5em; }
        th, td { vertical-align:top; border-top:1px solid #eee; padding: 1px 3px; background-color:#fcfcfc; }
        td .ui-button { margin:.4em 0 .5em 0; }
        td .ui-button-inner { padding: .4em 15px; }
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

	<div role="main" class="jqm-content ui-content">

		<h1>Transitions</h1>

		<p>The jQuery Mobile framework includes a set of CSS-based transition effects that can be applied to any page link or form submission with Ajax navigation.</p>

		<h2>Page transitions</h2>

			<div data-demo-html="true" data-demo-css="true">
			<table margin="0">
				<tr>
					<th><h3>fade</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="fade" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="fade" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>pop</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="pop" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="pop" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>flip</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="flip" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="flip" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>turn</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="turn" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="turn" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>flow</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="flow" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="flow" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>slidefade</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="slidefade" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="slidefade" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>slide</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="slide" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="slide" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>slideup</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="slideup" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="slideup" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>slidedown</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="slidedown" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="slidedown" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
				<tr>
					<th><h3>none</h3></th>
					<td><a href="page-transitions-dialog.php" data-rel="dialog" data-transition="none" class="ui-button ui-corner-all ui-shadow ui-button-inline">dialog</a></td>
					<td><a href="page-transitions-page.php" data-transition="none" class="ui-button ui-corner-all ui-shadow ui-button-inline">page</a></td>
				</tr>
			</table>
			</div><!-- /demo-html -->

	            <p><strong>Important:</strong> Some platforms currently have issues with transitions. We are working on a solution to solve the problem for everyone. If you are experiencing flickers and flashes during or at the end of a transition we suggest the following workaround. Please note that this workaround should be thoroughly tested on the target platform before deployment. This workaround is known to cause performance issues and browser crashes on some platforms, especially Android. Add the following code to your custom css:</p>
	            <code>
	                .ui-page { -webkit-backface-visibility: hidden; }
	            </code>

	<p><strong>Only seeing fade transitions?</strong> To view all transition types, you must be on a browser that supports 3D transforms. By default, devices that lack 3D support (such as Android 2.x) will fallback to "fade" for all transition types. This behavior is configurable (see below).</p>

	<p><strong>Transitions were originally inspired by <a href="http://www.jqtjs.com/">jQtouch</a></strong> They've since been rebuilt, but props to David Kaneda and Jonathan Stark for the initial guidance.</p>

		<h2>Setting a transition</h2>
		<p>By default, the framework applies a <strong>fade</strong> transition. To set a custom transition effect, add the <code>data-transition</code> attribute to the link. </p>

	<code><code>
	&lt;a href=&quot;index.html&quot; <strong>data-transition=&quot;pop&quot;</strong>&gt;I'll pop&lt;/a&gt;
	</code></code>

		<p>When the Back button is pressed, the framework will automatically apply the reverse version of the transition that was used to show the page. To specify that the reverse version of a transition should be used, add the <code>data-direction="reverse"</code> attribute to a link. <b>Note:</b> <code>data-direction="reverse"</code> attribute can only be used with page and dialog.</p>

		<h2>Global configuration</h2>

		<p>Set the <code>defaultPageTransition</code> global option if you'd prefer a different default transition. Dialogs have a different option called <code>defaultDialogTransition</code> that can also be configured.</p>

		<p><strong>Note:</strong> since the dialog widget is deprecated as of jQuery Mobile 1.4.0, the <code>$.mobile.defaultDialogTransition</code> global option is also deprecated and will be removed.</p>

		<h2>Browser support</h2>
		<p>All transitions are built with CSS keyframe animations and include <code>-webkit</code> vendor prefixed rules for iOS, Blackberry, Android, Safari and Chrome browsers, <code>-moz</code> rules for Firefox browsers, and unprefixed rules for Windows Phone 8 and IE10. Support for keyframe animations and transition smoothness is determined by the browser version and hardware and will safely fall back to no transition if animations aren't supported. To proactively exclude transition in situations with poor performance, we exclude browsers that lack 3D transforms and provide a fallback transition and apply a max width for when transitions are applied.</p>

		<h2>Fallback transition</h2>
		<p>By default, all transitions except fade require 3D transform support. Devices that lack 3D support will fall back to a fade transition, regardless of the transition specified. We do this to proactively exclude poorly-performing platforms like Android 2.x from advanced transitions and ensure they still have a smooth experience. Note that there are platforms such as Android 3.0 that technically support 3D transforms, but still have poor animation performance so this won't guarantee that every browser will be 100% flicker-free but we try to target this responsibly.</p>

		<p>The fallback transition for browsers that don't support 3D transforms can be configured for each transition type, but by default we specify "fade" as the fallback. For example, this will set the fallback transition for the slideout transition to "none":</p>
			<code>$.mobile.transitionFallbacks.slideout = "none"</code>

		<h2>Max scroll for transitions</h2>
		<p>By default, transitions are disabled (set to "none") when you're either coming FROM or going TO a page where the scroll position is 3x the height of the device's screen.
			This feature was added because of the slow response times and the possibility of browser crashing when clicking on a list item (or any navigation element) far down a long page which leads to the
			browser trying to animate a really massively tall page from the scroll position to the top of the screen. The scroll position, not total screen height, is the determining factor for performance.
			This scroll position breakpoint is configurable via the new <code>getMaxScrollForTransition</code> function.</p>

		<h2>Max width for transitions</h2>
		<p>By default, transitions can be disabled (set to "none") when the window width is greater than a certain pixel width. This feature is useful because transitions can be distracting or perform poorly on larger screens. This value is configurable via the global option <code>$.mobile.maxTransitionWidth</code>, which defaults to <code>false</code>. The option accepts any number representing a pixel width or <code>false</code> value. If it's not <code>false</code>, the handler will use a "none" transition when the window is wider than the specified value.</p>

		<h2>Same page transition</h2>
		<p>Transitions to the current active page are ignored by default but can be enabled by using the <code>allowSamePageTransition</code> option of the pagecontainer widget's <code>change()</code> method. Note that not all transitions will work as expected and may end in an impractical result.</p>

		<h2>Creating custom transitions</h2>
		<p>jQuery Mobile allows for the addition of custom transitions to the <code>$.mobile.transitionHandlers</code> dictionary so you can expand the selection of transitions on your site or app.</p>

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
