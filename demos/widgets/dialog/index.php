<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dialogs - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
    <style>
		.ui-dialog.dialog-actionsheet .ui-dialog-contain {
			margin-top: 0;
		}
	</style>
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

			<h1>Dialogs <a href="http://api.jquerymobile.com/dialog/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">Any page can be presented as a modal dialog that appears to be suspended above the page by adding an attribute to the link that leads to the dialog page.
			</p>

			<h2>Basics</h2>
			<p>Any page can be presented as a modal dialog by adding the <code>data-rel="dialog"</code> attribute to the page anchor link. When the "dialog" attribute is applied, the framework adds styles to add rounded corners, margins around the page and a dark background to make the "dialog" appear to be suspended above the page. By default the framework will also add a close button if the dialog has a header.</p>

			<p>
			<code>
			&lt;a href=&quot;foo.html&quot; data-rel=&quot;dialog&quot;&gt;Open dialog&lt;/a&gt;
			</code>
			</p>

			<a href="dialog.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">Open dialog</a>

			<h2>Transitions</h2>
			<p>By default, the dialog will open with a 'pop' transition.  Like all pages, you can specify any <a href="page-transitions.html">page transition</a> you want on the dialog by adding the <code>data-transition</code> attribute to the link. To make it feel more dialog-like, we recommend specifying a transition of "pop", "slidedown" or "flip".</p>

<code>
&lt;a href=&quot;foo.html&quot; data-rel=&quot;dialog&quot; data-transition=&quot;pop&quot;&gt;Open dialog&lt;/a&gt;
</code>

			<div>
			<a href="dialog.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">data-transition="pop"</a>
			<a href="dialog.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="slidedown">data-transition="slidedown"</a>
			<a href="dialog.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="flip">data-transition="flip"</a>
			</div>

			<h2>Closing dialogs</h2>
			<p>When any link is clicked within a dialog, the framework will automatically close the dialog and transition to the requested page, just as if the dialog were a normal page. Nevertheless, dialogs can also be chained, as explained below under <strong>"Chaining Dialogs"</strong>. Similarly, a link that opens a popup will also leave the dialog in place.</p>

            <p>If the dialog has a header the framework will add a close button at the left side of the header. You can change the position by adding <code>data-close-btn="right"</code> to the dialog container. If you don't want a close button in the header or if you want to add a custom close button, you can use <code>data-close-btn="none"</code>.</p>
			<a href="dialog-rightclosebtn.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">Right close button</a>
			<a href="dialog-noclosebtn.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">No close button</a>

			<p>To create a "cancel" button in a dialog, just link to the page that triggered the dialog to open and add the <code>data-rel="back"</code> attribute to your link. This pattern of linking to the previous page is also usable in non-JS devices as well.</p>
			<p>For JavaScript-generated links, you can simply set the href attribute to "#" and use the <code>data-rel="back"</code> attribute. You can also call the dialog's <code>close()</code> method to programmatically close dialogs, for example: <code>$('.ui-dialog').dialog('close')</code>. </p>

			<h3>Setting the close button text</h3>
			<p>Just like the page plugin, you can set a dialog's close button text through an option or data attribute.
			This option is used to customize the text of the close button which is helpful for translating this into different languages. This is displayed as an icon-only button by default so the text isn't visible on-screen, but is read by screen readers so this is an important accessibility feature.
			The option can be configured for all dialogs by binding to the <code>mobileinit</code> event and setting the <code>$.mobile.dialog.prototype.options.closeBtnText</code> property to a string of your choosing, or you can place the data attribute <code>data-close-btn-text</code> to configure the text from your markup.
			</p>

			<h2>History &amp; Back button behavior</h2>
			<p>Since dialogs are typically used to support actions within a page, the framework does not include dialogs in the hash state history tracking. This means that dialogs will not appear in your browsing history chronology when the Back button is clicked. For example, if you are on a page, click a link to open a dialog, close the dialog, then navigate to another page, if you were to click the browser's Back button at that point you will navigate back to the first page, not the dialog.</p>

			<h2>Chaining Dialogs</h2>
			<p>Please note: If a dialog opens another dialog (chaining), closing the last one with a link of type <code>data-rel="back"</code> will always navigate to the previous dialog until the root-page of type <code>data-role="page"</code> is reached. This guarantees a consistent navigation between dialogs.</p>

			<h2>Styling &amp; theming</h2>
			<p>Dialogs can be styled with different theme swatches, just like any page by adding <code>data-theme</code> attributes to the header, content, or footer containers. Here is an example of a different dialog design:</p>
				<a href="dialog-alt.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">An alternate color scheme</a>

			<p>By default dialogs have rounded corners. The option <code>corners</code> can be set to <code>false</code> by adding <code>data-corners="false"</code> to the dialog container:</p>
				<a href="dialog-corners.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">No rounded corners</a>

			<p>Dialogs appear to be floating above an overlay layer. This overlay adopts the swatch "a" content color by default, but the <code>data-overlay-theme</code> attribute can be added to the page wrapper to set the overlay to any swatch letter. Here is an example of a dialog with the overlay set to swatch "e":</p>
				<a href="dialog-overlay.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">Custom overlay swatch</a>

			<p>Dialogs can also be used more like a control sheet to offer multiple buttons if you simply remove the top margin from the dialog's inner container element. For example, if your dialog page had a class of <code>my-dialog</code>, you could add this CSS to pin that dialog to the top: <code>.ui-dialog.my-dialog .ui-dialog-contain { margin-top: 0 }</code>, or you could just apply that style to all dialogs with <code>.ui-dialog .ui-dialog-contain { margin-top: 0 }</code>.</p>
						<a href="dialog-buttons.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="slidedown">Share photos...</a>

			<h2>Dialog width and margins</h2>
			<p>For the sake of readability, dialogs have a default <code>width</code> of 92.5% and a <code>max-width</code> of 500 pixels. There is also a 10% top <code>margin</code> to give dialogs larger top margin on larger screens, but collapse to a small margin on smartphones. The dialog's inner container is shifted towards the <code>top</code> with 15px to hide the corner styling if a dialog is used as a control sheet (see above). To override these styles, add the following CSS override rule to your stylesheet and tweak as needed:</p>

<pre><code>
.ui-dialog-contain {
	<strong>width: 92.5%;</strong>
	<strong>max-width: 500px;</strong>
	<strong>margin: 10% auto 15px auto;</strong>
	padding: 0;
	position: relative;
	<strong>top: -15px;</strong>
}
</code></pre>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
