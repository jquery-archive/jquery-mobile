<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Links - jQuery Mobile Demos</title>
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

        <h1>Links <a href="http://api.jquerymobile.com/grid-layout/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

        <p class="jqm-intro">jQuery Mobile is designed to work with standard page link conventions and layers the AJAX navigation on top for maximum compatibility.
        </p>

        <h2>Linking pages</h2>

        <p>You can link pages and assets as you normally would, and jQuery Mobile will automatically handle page requests in a single-page model, using AJAX when possible. When AJAX isn't possible (such as a non-same-domain url, or if specified using certain attributes on the link), a normal http request is used instead.</p>

        <p>The goal of this nav model is to allow developers to create websites using best practices &mdash; where ordinary links will "just work" without any special configuration &mdash; while creating a rich, native-like experience that can't be achieved with standard HTTP requests.</p>

        <h2>Default link behavior: AJAX</h2>

        <p>To enable animated page transitions, all links that point to an external page (ex. products.html) will be loaded via AJAX. To do this unobtrusively, the framework parses the link's <code>href</code> to formulate an AJAX request (Hijax) and displays the loading spinner. All this is done automatically by jQuery Mobile.</p>

        <p>If the AJAX request is successful, the new page content is added to the DOM, all mobile widgets are auto-initialized, then the new page is animated into view with a page transition.</p>

        <p>If the AJAX request fails, the framework will display a small error message overlay (styled in the "e" swatch) that disappears after a brief time so this doesn't break the navigation flow. View an <a href="notapage.html">example of the error message</a>.</p>

        <p><strong>Note:</strong> You cannot link <strong>to</strong> a multipage document with AJAX navigation active because the framework will only load the first page it finds, not the full set of internal pages. In these cases, you must link without AJAX (see next section) for a full page refresh to prevent potential hash collisions. There is currently a <a href="https://github.com/ToddThomson/jQuery-Mobile-Subpage-Widget" rel="external">subpage plugin</a> that makes it possible to load in multi-page documents.</p>

        <div data-demo-html="true">
            <p>Example:</p>
            <a href="../../../">To the homepage, with AJAX</a>
        </div><!--/demo-html -->

        <h2>Linking without AJAX</h2>

		<p>Links that point to other domains or that have <code>rel="external"</code>, <code>data-ajax="false"</code> or <code>target</code> attributes will not be loaded with AJAX. Instead, these links will cause a full page refresh with no animated transition. Both attributes (<code>rel="external"</code> and <code>data-ajax="false"</code>) have the same effect, but a different semantic meaning: <code>rel="external"</code> should be used when linking to another site or domain, while <code>data-ajax="false"</code> is useful for simply opting a page within your domain from being loaded via AJAX. Because of security restrictions, the framework always opts links to external domains out of the AJAX behavior.</p>

		<div data-demo-html="true">
            <p>Examples:</p>
            <p><a href="../../../" data-ajax="false">To the homepage, no AJAX</a></p>
            <p><a href="http://www.google.com" rel="external">Google</a></p>
		</div><!--/demo-html -->

		<p>In version 1.1, we added support for using <code>data-ajax="false"</code> on a parent container which allows you to exclude a large number of links from the AJAX navigation system. This avoids the need to add this attribute to every link in a container. To activate this functionality, <code>$.mobile.ignoreContentEnabled</code> must be set to <code>true</code> because this feature adds overhead we don't want to enable by default.</p>

		<div data-demo-html="true">
			<ul data-role="listview" data-ajax="false" data-inset="true" data-theme="d">
	            <li data-role="list-divider">All links are non-AJAX</li>
	            <li><a href="../accordions/">Accordion</a></li>
	            <li><a href="../ajax-nav/">AJAX Navigation</a></li>
	            <li><a href="../autocomplete/">Autocomplete</a></li>
			</ul>
		</div><!--/demo-html -->

		<p>Note: When building a jQuery Mobile application where the AJAX navigation system is disabled globally or frequently disabled on individual links, we recommend disabling the <code>$.mobile.pushStateEnabled</code> global configuration option to avoid inconsistent navigation behavior in some browsers.</p>

		<h2>Linking within a multi-page document</h2>

			<p>A single HTML document can contain one or many "page" containers simply by stacking multiple divs with a <code>data-role</code> of <code>"page"</code>. This allows you to build a small site or application within a single HTML document; jQuery Mobile will simply display the first "page" it finds in the source order when the page loads.</p>

			<p>If a link in a <a href="../pages/">multi-page document</a> points to an anchor (<code>#foo</code>), the framework will look for a page wrapper with that id (<code>id="foo"</code>). If it finds a page in the HTML document, it will transition the new page into view. You can seamlessly navigate between local, internal "pages" and external pages in jQuery Mobile. Both will look the same to the end user except that external pages will display the AJAX spinner while loading. In either situation, jQuery Mobile updates the page's URL hash to enable Back button support, deep-linking and bookmarking.</p>

		<p>It's important to note that if you are linking from a mobile page that was loaded via AJAX to a page that contains multiple internal pages, you need to add a <code>rel="external"</code> or <code>data-ajax="false"</code> to the link. This tells the framework to do a full page reload to clear out the AJAX hash in the URL. This is critical because AJAX pages use the hash (<code>#</code>) to track the AJAX history, while multiple internal pages use the hash to indicate internal pages so there will be conflicts in the hash between these two modes.</p>

		<p>For example, a link to a page containing multiple internal pages would look like this:</p>

			<code>&lt;a href=&quot;multipage.html&quot; rel=&quot;external&quot;&gt;Multi-page link&lt;/a&gt;</code>

		<h2>"Back" button links</h2>
		<p>If you use the attribute <code>data-rel="back"</code> on an anchor, any clicks on that anchor will mimic the back button, going back one history entry and ignoring the anchor's default <code>href</code>. This is particularly useful when generating "back" buttons with JavaScript, such as a button to close a dialog. </p>
		<p>When using this feature in your source markup, although browsers that support this feature will not use the specified <code>href</code> attribute, be sure to still provide a meaningful value that actually points to the URL of the referring page to allow the feature to work for users in C-Grade browsers. If users can reach this page from more than one referring pages, specify a sensible <code>href</code> so that the navigation remains logical for all users. </p>
		<p>Also, please keep in mind that if you just want a reverse transition without actually going back in history, you should use the <code>data-direction="reverse"</code> attribute instead.
		Note: <code>data-direction="reverse"</code> is meant to simply run the backwards version of the transition that will run on that page change, while <code>data-rel="back"</code> makes the link functionally equivalent to the browser's back button and all the standard back button logic applies. Adding <code>data-direction="reverse"</code> to a link with <code>data-rel="back"</code> <b>will not</b> reverse the reversed page transition and produce the "normal" version of the transition. </p>

		<h2>Redirects and linking to directories</h2>

		<p>When linking to directory indexes (such as href="typesofcats/" instead of href="typesofcats/index.html"), you must provide a trailing slash. This is because jQuery Mobile assumes the section after the last "/" character in a url is a filename, and it will remove that section when creating base urls from which future pages will be referenced.</p>

		<p>However, you can work around this issue by returning your page div with a <code>data-url</code> attribute already specified. When you do this, jQuery Mobile will use that attribute's value for updating the URL, instead of the url used to request that page. This also allows you to return urls that change as the result of a redirect, for example, you might post a form to "/login.html" but return a page from the url "/account" after a successful submission. This tool allows you to take control of the jQuery Mobile history stack in these situations. </p>

			<h2>Link notes</h2>

			<p>The non-standard environment created by jQuery Mobile's page navigation model introduces some conditions of which you should be aware when building pages:</p>

			<ul class="jqm-list">
			<li><p>When linking to directories, without a filename URL, (such as <code>href="typesofcats/"</code> instead of <code>href="typesofcats/index.html"</code>), you must provide a trailing slash. This is because jQuery Mobile assumes the section after the last "/" character in a URL is a filename, and it will remove that section when creating base URLs from which future pages will be referenced.</p></li>
			<li><p>Documents loaded via AJAX will select the first page in the DOM of that document to be loaded as a jQuery Mobile page element. As a result the developer must make sure to manage the <code>id</code> attributes of the loaded page and child elements to prevent confusion when manipulating the DOM.</p></li>
			<li><p>If you link to a multipage document, you must use a <code>data-ajax="false"</code> attribute on the link to cause a full page refresh due to the limitation above where we only load the first page node in an AJAX request due to potential hash collisions. There is currently a <a href="https://github.com/ToddThomson/jQuery-Mobile-Subpage-Widget" rel="external">subpage plugin</a> that makes it possible to load in multipage documents. </p></li>
			<li><p>While linking pages inside a multipage template, you should not use the <code>data-ajax="false"</code> attribute as it is of no use and will only interfere with the transition settings. </p></li>
			<li><p>The <code>"ui-page"</code> key name used in sub-hash URL references can be set to any value you'd like, so as to blend into your URL structure. This value is stored in <code>jQuery.mobile.subPageUrlKey</code>.</p></li>
			<li><p>When traveling back to a previously loaded jQuery Mobile document from an external <b>or</b> internal document with the push state plugin enabled, some browsers load and trigger the <code>popstate</code> event on the wrong document or for the wrong reasons (two edge cases recorded so far). If you are regularly linking to external documents and find the application behaving erratically try disabling pushstate support.</p></li>
			<li><p>jQuery Mobile does not support query parameter passing to internal/embedded pages but there are two plugins that you can add to your project to support this feature. There is a lightweight <a href="https://github.com/jblas/jquery-mobile-plugins/tree/master/page-params" rel="external">page params plugin</a> and a more fully featured <a href="https://github.com/azicchetti/jquerymobile-router" rel="external">jQuery Mobile router plugin</a> for use with backbone.js or spine.js. A newer plugin called <a href="https://github.com/1Marc/jquery-mobile-routerlite" rel="external">routerlite</a> keeps it simple with just four methods: routeinit, routechange, pageinit and pagechange.</p></li>
			<li><p>Some external applications (notably Facebook's OAuth implementation) modify their response URL in such a way that interferes with jQuery Mobile. In particular, Facebook appends <code>#_=_</code> to the end of the callback. Currently the best solution for this is to remove it from the location hash before jQuery Mobile loads using something like: <code>if (window.location.hash == "#_=_") window.location.hash = ""; </code>. jQuery Mobile can then process &amp; enhance the page properly.</p></li>
			</ul>

		</div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
