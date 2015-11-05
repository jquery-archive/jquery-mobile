<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Pages - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
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

		<h1>Pages</h1>

		<a href="http://api.jquerymobile.com/page/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>The page is the primary unit of interaction in jQuery Mobile and is used to group content into logical views that can be animated in and out of view with page transitions. A HTML document may start with a single "page" and the Ajax navigation system will load additional pages on demand into the DOM as users navigate around. Alternatively, a HTML document can be built with multiple "pages" inside it and the framework will transition between these local views with no need to request content from the server.</p>

		<h2>Mobile page structure</h2>

		<p>A jQuery Mobile site must start with an HTML5 <code>doctype</code> to take full advantage of all of the framework's features. (Older devices with browsers that don't understand HTML5 will safely ignore the 'doctype' and various custom attributes.)</p>

		<p>In the <code>head</code>, references to jQuery, jQuery Mobile and the mobile theme CSS are all required to start things off. The easiest way to get started is to link to files hosted on the jQuery CDN or for best performance, <a href="http://jquerymobile.com/download-builder/" rel="external">build a custom bundle</a>.</p>

		<p>Here is how you can link to the CDN, where [version] should be replaced by the actual version. See also the <a href="http://jquerymobile.com/download/" rel="external">download</a> page on the web site.</p>

<pre><code>
<strong>&lt;!DOCTYPE html&gt; </strong>
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Page Title&lt;/title&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;http://code.jquery.com/mobile/[version]/jquery.mobile-[version].min.css&quot; /&gt;
	&lt;script src=&quot;http://code.jquery.com/jquery-[version].min.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;http://code.jquery.com/mobile/[version]/jquery.mobile-[version].min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
	...content goes here...
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

		<h2>Viewport meta tag</h2>

		<p>Note above that there is a meta <code>viewport</code> tag in the <code>head</code> to specify how the browser should display the page zoom level and dimensions. If this isn't set, many mobile browsers will use a "virtual" page width around 900 pixels to make it work well with existing desktop sites but the screens may look zoomed out and too wide. By setting the viewport attributes to <code>content=&quot;width=device-width, initial-scale=1&quot;</code>, the width will be set to the pixel width of the device screen. </p>

<pre><code>
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
</code></pre>

		<p>These settings do not disable the user's ability to zoom the pages, which is nice from an accessibility perspective. There is a minor issue in iOS that doesn't properly set the width when changing orientations with these viewport settings, but this will hopefully be fixed in a future release. You can set other viewport values to disable zooming if required since this is part of your page content, not the library. </p>

		<h2>Inside the body: Pages</h2>

		<p>Inside the <code>&lt;body&gt;</code> tag, each view or "page" on the mobile device is identified with an element (usually a <code>div</code>) with the <code> data-role="page"</code> attribute. </p>

<pre><code>
&lt;div data-role="page"&gt;
	...
&lt;/div&gt;
</code></pre>

		<p>Within the "page" container, any valid HTML markup can be used, but for typical pages in jQuery Mobile, the immediate children of a "page" are divs with <code>data-role="toolbar" data-type="header"</code>, <code>class="ui-content"</code>, and <code>data-role="toolbar" data-type="footer"</code>.</p>

<pre><code>
&lt;div data-role="page"&gt;
	&lt;div data-role="toolbar" data-type="header"&gt;...&lt;/div&gt;
	&lt;div role="main" class="ui-content"&gt;...&lt;/div&gt;
	&lt;div data-role="toolbar" data-type="footer"&gt;...&lt;/div&gt;
&lt;/div&gt;
</code></pre>

		<h2>Putting it together: Basic single page template</h2>

		<p>Putting it all together, this is the standard boilerplate page template you should start with on a project: </p>

<pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Page Title&lt;/title&gt;

	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

	&lt;link rel=&quot;stylesheet&quot; href=&quot;http://code.jquery.com/mobile/[version]/jquery.mobile-[version].min.css&quot; /&gt;
	&lt;script src=&quot;http://code.jquery.com/jquery-[version].min.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;http://code.jquery.com/mobile/[version]/jquery.mobile-[version].min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div data-role=&quot;page&quot;&gt;

	&lt;div data-role=&quot;header&quot;&gt;
		&lt;h1&gt;Page Title&lt;/h1&gt;
	&lt;/div&gt;&lt;!-- /header --&gt;

	&lt;div role=&quot;main&quot; class=&quot;ui-content&quot;&gt;
		&lt;p&gt;Page content goes here.&lt;/p&gt;
	&lt;/div&gt;&lt;!-- /content --&gt;

	&lt;div data-role=&quot;footer&quot;&gt;
		&lt;h4&gt;Page Footer&lt;/h4&gt;
	&lt;/div&gt;&lt;!-- /footer --&gt;
&lt;/div&gt;&lt;!-- /page --&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>

		<a href="../pages-single-page/index.html" data-ajax="false" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">View page template <span class="ui-icon ui-icon-arrow-r"></span></a>

		<h2>Multi-page template structure</h2>

		<p>A single HTML document can contain multiple "pages" that are loaded together by stacking multiple divs with a <code>data-role</code> of <code>"page"</code>. Each "page" block needs a unique id (<code>id="foo"</code>) that will be used to link internally between "pages" (<code>href="#foo"</code>). When a link is clicked, the framework will look for an internal "page" with the id and transition it into view.</p>

		<p>Here is an example of a two "page" site built with two jQuery Mobile divs navigated by linking to an id placed on each page wrapper. Note that the ids on the page wrappers are only needed to support the internal page linking, and are optional if each page is a separate HTML document. Here is what two pages look like inside the <code>body</code> element.</p>

<pre><code>
&lt;body&gt;

&lt;!-- Start of first page --&gt;
&lt;div data-role=&quot;page&quot; id=&quot;foo&quot;&gt;

	&lt;div data-role=&quot;header&quot;&gt;
		&lt;h1&gt;Foo&lt;/h1&gt;
	&lt;/div&gt;&lt;!-- /header --&gt;

	&lt;div role=&quot;main&quot; class=&quot;ui-content&quot;&gt;
		&lt;p&gt;I&#x27;m first in the source order so I&#x27;m shown as the page.&lt;/p&gt;
		&lt;p&gt;View internal page called &lt;a href=&quot;#bar&quot;&gt;bar&lt;/a&gt;&lt;/p&gt;
	&lt;/div&gt;&lt;!-- /content --&gt;

	&lt;div data-role=&quot;footer&quot;&gt;
		&lt;h4&gt;Page Footer&lt;/h4&gt;
	&lt;/div&gt;&lt;!-- /footer --&gt;
&lt;/div&gt;&lt;!-- /page --&gt;

&lt;!-- Start of second page --&gt;
&lt;div data-role=&quot;page&quot; id=&quot;bar&quot;&gt;

	&lt;div data-role=&quot;header&quot;&gt;
		&lt;h1&gt;Bar&lt;/h1&gt;
	&lt;/div&gt;&lt;!-- /header --&gt;

	&lt;div role=&quot;main&quot; class=&quot;ui-content&quot;&gt;
		&lt;p&gt;I&#x27;m the second in the source order so I&#x27;m hidden when the page loads. I&#x27;m just shown if a link that references my id is beeing clicked.&lt;/p&gt;
		&lt;p&gt;&lt;a href=&quot;#foo&quot;&gt;Back to foo&lt;/a&gt;&lt;/p&gt;
	&lt;/div&gt;&lt;!-- /content --&gt;

	&lt;div data-role=&quot;footer&quot;&gt;
		&lt;h4&gt;Page Footer&lt;/h4&gt;
	&lt;/div&gt;&lt;!-- /footer --&gt;
&lt;/div&gt;&lt;!-- /page --&gt;
&lt;/body&gt;
</code></pre>

		<a href="../pages-multi-page/index.html" data-ajax="false" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">View multi-page template <span class="ui-icon ui-icon-arrow-r"></span></a>

		<p>PLEASE NOTE: Since we are using the hash to track navigation history for all the Ajax "pages", it's not currently possible to deep link to an anchor (<code>index.html#foo</code>) on a page in jQuery Mobile, because the framework will look for a "page" with an <code>id</code> of <code>#foo</code> instead of the native behavior of scrolling to the content with that <code>id</code>.</p>

		<p>The <code>id</code> attribute of all your elements must be not only unique on a given page, but also unique across the pages in a site. This is because jQuery Mobile's single-page navigation model allows many different "pages" to be present in the DOM at the same time. This also applies when using a multi-page template, since all "pages" on the template are loaded at once.</p>

		<h2>Conventions, not requirements</h2>

		<p>Although the page structure outlined above is a recommended approach for a standard web app built with jQuery Mobile, the framework is very flexible with document structure.
		The page, header, content, and footer data-role elements are optional and are mostly helpful for providing some basic formatting and structure.
		The page wrapper that used to be required for auto-initialization to work is now optional for single page documents, so there isn't any required markup at all.
		For a web page with a custom layout, all of these structural elements can be omitted and the Ajax navigation and all widgets will work just like they do in the boilerplate structure.
		Behind the scenes, the framework will inject the page wrapper if it's not included in the markup because it's needed for managing pages, but the starting markup can now be extremely simple.</p>

		<p><strong>Note:</strong> In a multi-page setup, you are required to have page wrappers in your markup in order to group the content into multiple pages.</p>

		<p><strong>Also Note:</strong> If your body contains no <code>data-role="page"</code> divs, jQuery Mobile wraps the entire contents of the body within a page div as explained above.
		jQuery Mobile is using jQuery's <code>wrapAll()</code> method to do this which looks for any script tags inside the content being wrapped, and loads each script source via XHR.
		If scripts are present in the body, the browser ends up loading them twice.
		We therefore strongly recommend that jQuery Mobile documents with scripts in their body also contain a <code>div</code> with <code>data-role="page"</code>.</p>

		<h2>Prefetching pages</h2>

		<p>When using single-page templates, you can prefetch pages into the DOM so that they're available instantly when the user visits them. To prefetch a page, add the <code>data-prefetch</code> attribute to a link that points to the page. jQuery Mobile then loads the target page in the background after the primary page has loaded and the <code>pagecreate</code> event has triggered.</p>

		<div data-demo-html="true">

			<a href="../pages-dialog/dialog-alt.html" data-prefetch="true">This link will prefetch the page</a>

		</div><!--/demo-html -->

  		<p>Alternatively, you can prefetch a page programmatically using the pagecontainer widget's <code>load()</code> method:</p>

<pre><code>
$( ":mobile-pagecontainer" ).pagecontainer( "load", <var>pageUrl</var>, { showLoadMsg: false } );
</code></pre>

		<h2>DOM Cache</h2>

		<p>Keeping lots of pages in the DOM quickly fills the browser's memory, and can cause some mobile browsers to slow down or even crash. jQuery Mobile has a simple mechanism to keep the DOM tidy. </p>
		<p>Whenever it loads a page via Ajax, it flags the page to be removed from the DOM when you navigate away from it later (technically, on the <code>pagehide</code> event). If you revisit a removed page, the browser may be able to retrieve the page's HTML file from its cache. If not, it re-fetches the file from the server. (In the case of nested listviews, jQuery Mobile removes all the pages that make up the nested list once you navigate to a page that's not part of the list.)</p>

		<p>If you prefer, you can tell jQuery Mobile to keep previously-visited pages in the DOM instead of removing them. This lets you cache pages so that they're available instantly if the user returns to them.</p>

<pre><code>
$.mobile.page.prototype.options.domCache = true;
</code></pre>

		<p>Alternatively, to cache just a particular page, you can add the <code>data-dom-cache="true"</code> attribute to the page's container. </p>

		<p>To keep all previously-visited pages in the DOM, set the <code>domCache</code> option on the page plugin to <code>true</code>, like this:</p>

<pre><code>
<var>pageContainerElement</var>.page({ domCache: true });
</code></pre>

		<p>Note that the contents of the first page isn't removed from the DOM, only pages loaded in via Ajax. Pages inside a multi-page template aren't affected by this feature at all - jQuery Mobile only removes pages loaded via Ajax.</p>

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
