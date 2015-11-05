<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dialogs - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
    <style>
		.ui-page-dialog.dialog-actionsheet .ui-page-dialog-contain {
			margin-top: 0;
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

		<h1>Dialogs</h1>

		<p>Any page can be presented as a modal dialog that appears to be suspended above the page by adding an attribute to the link that leads to the dialog page.</p>

		<p><strong>Note:</strong> The dialog widget is deprecated in 1.4 and will be removed in 1.5. The page widget now has the <code>dialog</code> option which, when set to <code>true</code> will apply dialog styling to a page.</p>

		<h2>Basics</h2>
		<p>Any page can be presented as a modal dialog by adding the <code>data-dialog="true"</code> attribute to the page. When the "dialog" attribute is applied, the framework adds styles to add rounded corners, margins around the page and a dark background to make the "dialog" appear to be suspended above the page. By default the framework will also add a close button if the dialog has a header.</p>

		<p>
			<code>
			&lt;a href=&quot;dialog.html&quot; class=&quot;ui-shadow ui-button ui-corner-all ui-button-inline&quot; data-transition=&quot;pop&quot;&gt;Open dialog&lt;/a&gt;
			</code>
			</p>

			<a href="dialog.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">Open dialog</a>

		<h2>Transitions</h2>
		<p>By default, the dialog will open with the same transition as a regular page. Like all pages, you can specify any <a href="../transitions/">page transition</a> you want on the dialog by adding the <code>data-transition</code> attribute to the link. To make it feel more dialog-like, we recommend specifying a transition of "pop", "slidedown" or "flip".</p>

<code>
&lt;a href=&quot;dialog.html&quot; role=&quot;button&quot; class=&quot;ui-shadow ui-button ui-corner-all ui-button-inline&quot; <strong>data-transition=&quot;slidedown&quot;</strong>&gt;data-transition=&quot;slidedown&quot;&lt;/a&gt;
</code>

			<div>
			<a href="dialog.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="slidedown">data-transition="slidedown"</a>
			<a href="dialog.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="flip">data-transition="flip"</a>
			</div>

		<h2>Closing dialogs</h2>
		<p>When any link is clicked within a dialog, the framework will automatically close the dialog and transition to the requested page, just as if the dialog were a normal page. Nevertheless, dialogs can also be chained, as explained below under <strong>"Chaining Dialogs"</strong>. Similarly, a link that opens a popup will also leave the dialog in place.</p>

            <p>If the dialog has a header the framework will add a close button at the left side of the header. You can change the position by adding <code>data-close-button="right"</code> to the dialog container. If you don't want a close button in the header or if you want to add a custom close button, you can use <code>data-close-button="none"</code>.</p>
			<a href="dialog-rightclosebtn.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">Right close button</a>
			<a href="dialog-noclosebtn.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">No close button</a>

		<p>To create a "cancel" button in a dialog, just link to the page that triggered the dialog to open and add the <code>data-rel="back"</code> attribute to your link. This pattern of linking to the previous page is also usable in non-JS devices as well.</p>
		<p>For JavaScript-generated links, you can simply set the href attribute to "#" and use the <code>data-rel="back"</code> attribute.</p>

			<h3>Setting the close button text</h3>
		<p>Just like the page plugin, you can set a dialog's close button text through an option or data attribute.
			This option is used to customize the text of the close button which is helpful for translating this into different languages. This is displayed as an icon-only button by default so the text isn't visible on-screen, but is read by screen readers so this is an important accessibility feature.
			The option can be configured for all dialogs by binding to the <code>mobileinit</code> event and setting the <code>$.mobile.dialog.prototype.options.closeBtnText</code> property to a string of your choosing, or you can place the data attribute <code>data-close-button-text</code> to configure the text from your markup.
			</p>

		<h2>Chaining Dialogs</h2>
		<p>Please note: If a dialog opens another dialog (chaining), closing the last one with a link of type <code>data-rel="back"</code> will always navigate to the previous dialog until the root-page of type <code>data-role="page"</code> is reached. This guarantees a consistent navigation between dialogs.</p>

		<h2>Styling &amp; theming</h2>
		<p>Dialogs can be styled with different theme swatches, just like any page by adding <code>data-theme</code> attributes to the header, content, or footer containers. Here is an example of a different dialog design:</p>
				<a href="dialog-alt.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">An alternate color scheme</a>

		<p>By default dialogs have rounded corners. The option <code>corners</code> can be set to <code>false</code> by adding <code>data-corners="false"</code> to the dialog container:</p>
				<a href="dialog-corners.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">No rounded corners</a>

		<p>Dialogs appear to be floating above an overlay layer. This overlay adopts the swatch "a" content color by default, but the <code>data-overlay-theme</code> attribute can be added to the page wrapper to set the overlay to any swatch letter. Here is an example of a dialog with the overlay set to swatch "e":</p>
				<a href="dialog-overlay.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="pop">Custom overlay swatch</a>

		<p>Dialogs can also be used more like a control sheet to offer multiple buttons if you simply remove the top margin from the dialog's inner container element. For example, if your dialog page had a class of <code>my-dialog</code>, you could add this CSS to pin that dialog to the top: <code>.ui-page-dialog.my-dialog .ui-page-dialog-contain { margin-top: 0 }</code>, or you could just apply that style to all dialogs with <code>.ui-page-dialog .ui-page-dialog-contain { margin-top: 0 }</code>.</p>
						<a href="dialog-buttons.html" class="ui-shadow ui-button ui-corner-all ui-button-inline" data-transition="slidedown">Share photos...</a>

		<h2>Dialog width and margins</h2>
		<p>For the sake of readability, dialogs have a default <code>width</code> of 92.5% and a <code>max-width</code> of 500 pixels. There is also a 10% top <code>margin</code> to give dialogs larger top margin on larger screens, but collapse to a small margin on smartphones. The dialog's inner container is shifted towards the <code>top</code> with 15px to hide the corner styling if a dialog is used as a control sheet (see above). To override these styles, add the following CSS override rule to your stylesheet and tweak as needed:</p>

<pre><code>
.ui-page-dialog-contain {
	<strong>width: 92.5%;</strong>
	<strong>max-width: 500px;</strong>
	<strong>margin: 10% auto 15px auto;</strong>
	padding: 0;
	position: relative;
	<strong>top: -15px;</strong>
}
</code></pre>

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
