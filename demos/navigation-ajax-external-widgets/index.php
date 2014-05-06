<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navigation With External Widgets - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
  <script type="text/javascript" src="demo.js"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">
		<h1>Ajax Navigation And External Widgets</h1>
		<p>When Ajax navigation is used in combination with the pushState plugin, the location bar is updated to show the URL of the file that has been loaded via Ajax. This implies that the user may copy that URL and launch your application with a starting URL that is different from the one you had intended. For example, if your application contains two documents, <code>products.html</code> and <code>services.html</code> and if the pages inside the documents contain links to one another, then both documents must be equipped to handle your application's startup. This means that you have to copy script references into the <code>&lt;head&gt;</code> section of each document, and you must also copy external shared widgets (widgets that are not inside the page, but which are seen and/or used from both pages) to the <code>&lt;body&gt;</code> section of both documents.</p>
		<p><a href="products.html" data-ajax="false" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Open external widgets demo</a></p>
		<p>The code snippets below illustrate this structure.</p>
		<p>init.js:</p>
<pre><code>
<strong>// Wait for DOMready and instantiate common external widgets that the framework will not
// autoinitialize because they are located outside of a jQuery Mobile page. This script
// must be referenced from all documents containing your application's pages.</strong>
$( function() {
	$( &quot;#common-header&quot; ).toolbar();
	$( &quot;#nav-menu&quot; )
		.children()
			.listview()
		.end()
		.popup();
});
</code></pre>
		<p>products.html:</p>
<pre><code>
&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Products&lt;/title&gt;

	<strong>&lt;!-- References to the scripts and stylesheets required for application startup must appear in all
	     documents containing your application's pages, because any one of them can become the start page --&gt;</strong>
	&lt;meta charset=&quot;utf-8&quot;&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.css&quot;/&gt;
	&lt;script src=&quot;http://code.jquery.com/jquery-1.10.2.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.js&quot;&gt;&lt;/script&gt;
	<strong>&lt;script src=&quot;init.js&quot;&gt;&lt;/script&gt;</strong>
&lt;/head&gt;
&lt;body&gt;

	<strong>&lt;!-- The header and the popup must be copied verbatim into each document that can serve as
	     the start page. They must also be themed explicitly because they do not inherit their
	     theme swatches from the page, since they are not contained inside a page. --&gt;</strong>
	&lt;div data-role=&quot;header&quot; id=&quot;common-header&quot; data-theme=&quot;a&quot;&gt;
		&lt;h1&gt;Welcome to International Widgets, Inc.&lt;/h1&gt;
		&lt;a href=&quot;#nav-menu&quot; data-rel=&quot;popup&quot; class=&quot;ui-btn ui-icon-grid ui-btn-icon-notext ui-btn-right ui-corner-all&quot;&gt;Navigate our site&lt;/a&gt;
	&lt;/div&gt;

	&lt;div data-role=&quot;popup&quot; id=&quot;nav-menu&quot; data-theme=&quot;a&quot;&gt;
		&lt;ul data-role=&quot;listview&quot;&gt;
			&lt;li&gt;&lt;a href=&quot;products.html&quot;&gt;Products&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href=&quot;services.html&quot;&gt;Services&lt;/a&gt;&lt;/li&gt;
		&lt;/ul&gt;
	&lt;/div&gt;

	&lt;div data-role=&quot;page&quot; id=&quot;products&quot;&gt;
		&lt;div class=&quot;ui-content&quot;&gt;
			&lt;h1&gt;Products&lt;/h1&gt;
			&lt;p&gt;We offer a wide range of products designed to suit your specific needs.&lt;/p&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
		<p>services.html:</p>
<pre><code>
&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Services&lt;/title&gt;

	<strong>&lt;!-- References to the scripts and stylesheets required for application startup must appear in all
	     documents containing your application's pages, because any one of them can become the start page --&gt;</strong>
	&lt;meta charset=&quot;utf-8&quot;&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.css&quot;/&gt;
	&lt;script src=&quot;http://code.jquery.com/jquery-1.10.2.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.js&quot;&gt;&lt;/script&gt;
	<strong>&lt;script src=&quot;init.js&quot;&gt;&lt;/script&gt;</strong>
&lt;/head&gt;
&lt;body&gt;

	<strong>&lt;!-- The header and the popup must be copied verbatim into each document that can serve as
	     the start page. They must also be themed explicitly because they do not inherit their
	     theme swatches from the page, since they are not contained inside a page. --&gt;</strong>
	&lt;div data-role=&quot;header&quot; id=&quot;common-header&quot; data-theme=&quot;a&quot;&gt;
		&lt;h1&gt;Welcome to International Widgets, Inc.&lt;/h1&gt;
		&lt;a href=&quot;#nav-menu&quot; data-rel=&quot;popup&quot; class=&quot;ui-btn ui-icon-grid ui-btn-icon-notext ui-btn-right ui-corner-all&quot;&gt;Navigate our site&lt;/a&gt;
	&lt;/div&gt;

	&lt;div data-role=&quot;popup&quot; id=&quot;nav-menu&quot; data-theme=&quot;a&quot;&gt;
		&lt;ul data-role=&quot;listview&quot;&gt;
			&lt;li&gt;&lt;a href=&quot;products.html&quot;&gt;Products&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href=&quot;services.html&quot;&gt;Services&lt;/a&gt;&lt;/li&gt;
		&lt;/ul&gt;
	&lt;/div&gt;

	&lt;div data-role=&quot;page&quot; id=&quot;products&quot;&gt;
		&lt;div class=&quot;ui-content&quot;&gt;
			&lt;h1&gt;Services&lt;/h1&gt;
			&lt;p&gt;Allow our experts to design and deliver the solutions you need.&lt;/p&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
