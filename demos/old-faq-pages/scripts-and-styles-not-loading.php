<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile: Why aren't my scripts and styles loading?</title>
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

		<h1>Why aren't my scripts and styles  loading?</h1>

		<h2>Answer:</h2>

		<p>jQuery Mobile's Ajax navigation system only loads in the contents of the page wrapper, the scripts and styles in the <code>head</code> are discarded so you need to plan how to load and organize these assets.</p>

		<p>When the user clicks a link in a jQuery Mobile-driven site, the default behavior of the navigation system is to use that link's <code>href</code> to formulate an Ajax request (instead of allowing the browser's default link behavior of requesting that <code>href</code> with full page load). When that Ajax request goes out, the framework will receive its entire text content, but it will only inject the <em>contents of the response's <code>body</code> element (or more specifically the <code>data-role="page"</code> element, if it's provided)</em>, meaning nothing in the <code>head</code> of the page will be used (with the exception of the page title, which is fetched specifically). Please note that scripts loaded dynamically in this fashion do not guarantee a load order in the same way they would if the page was loaded via a normal http request.</p>

			<p> This means that any scripts and styles referenced in the <code>head</code> of a page won't have any effect <em>when a page is loaded via Ajax</em>, but they <strong>will execute if the page is requested normally via HTTP</strong>. When scripting jQuery Mobile sites, both scenarios need to be considered. The reason that the <code>head</code> of a page is ignored when requested via Ajax is that the potential of re-executing the same JavaScript is very high (it's common to reference the same scripts in every page of a site). Due to the complexity of attempting to work around that issue, we leave the task of executing page-specific scripts to the developer, and assume <code>head</code> scripts are only expected to execute once per browsing session.</p>

			<p>The simplest approach when building a jQuery Mobile site is to reference the same set of stylesheets and scripts in the head of every page. If you need to load in specific scripts or styles for a particular page, we recommend binding logic to the <code>pagecreate</code> event (details below) to run  necessary code when a specific page is created (which can be determined by its <code>id</code> attribute, or a number of other ways). Following this approach will ensure that the code executes if the page is loaded directly or is pulled in and shown via Ajax.</p>

			<p>Another approach for page-specific scripting would be to include scripts at the end of the <code>body</code> element when no <code>data-role=page</code> element is defined, or inside the first <code>data-role=page</code> element. If you include your custom scripting this way, be aware that these scripts will execute when that page is loaded via Ajax or regular HTTP, so if these scripts are the same on every page, you'll likely run into problems. If you're including scripts this way, we'd recommend enclosing your page content in a <code>data-role="page"</code> element, and placing scripts that are referenced on every page outside of that element. Scripts that are unique to that page can be placed in that element, to ensure that they execute when the page is fetched via Ajax.</p>

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
