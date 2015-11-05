<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<p><strong>Note: this page has not been updated after 1.3</strong></p>

		<h2>Question:</h2>

		<h1>Why won't my CSS styles apply correctly to a widget?</h1>

		<h2>Answer:</h2>

		<p>This is probably because the element you see in the markup (button, form element, etc.) isn't the same after enhancements have been applied. In order to style elements and add behavior, jQuery Mobile modifies the original markup with additional classes and elements which could impact your CSS selectors. Use a web inspector to view the post-enhancement markup to find the right selectors to use.</p>

		<p>Let's look at an example to illustrate the enhancements. Here is the starting markup for a button:</p>
<pre class="brush: html"><code>
// Button before enhancement
&#60;button&#62;Button element&#60;/button&#62;
</code></pre>

		<p>After enhancement, the button markup has been modified by the framework to add classes and wrap the contents for styling:</p>
<pre class="brush: html"><code>
// Button after enhancement
&#60;div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-button ui-shadow ui-button-corner-all ui-button-up-c" aria-disabled="false"&#62;
	&#60;span class="ui-button-inner ui-button-corner-all"&#62;
		&#60;span class="ui-button-text"&#62;Button element&#60;/span&#62;
	&#60;/span&#62;
	&#60;button class="ui-button-hidden" aria-disabled="false"&#62;Button element&#60;/button&#62;
&#60;/div&#62;
</code></pre>

		<p>As you can see from the code snippet above the markup has significantly changed after enhancement. The original button you added has been wrapped in a div and had several spans added. The original button you added is now also hidden. To change the visual styling of the button you must target the new enhanced markup not the button you added.</p>

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
