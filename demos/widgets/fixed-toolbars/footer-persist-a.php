<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header" data-position="fixed">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

			<h1>Persistent navbars <a href="http://api.jquerymobile.com/navbar/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>
		<p>These pages are a demo of a persistent <a href="../navbar/">navbar</a> in a fixed footer toolbar. Click on any of the links in the footer, and you'll see the page content transition. Both the persistent header and footer on these pages remain in place during the animation to a new HTML page.</p>
		<p>To tell the framework to apply the persistent behavior, add the same <code>data-id</code> attribute to the header and/or footer of all HTML pages in the navigation. It's that simple: If the page you're navigating to has a header or footer with the same <code>data-id</code> as the page you're navigating from, the toolbars will appear fixed outside of the transition. Each of the pages in this demo has a different transition to test out how this works.</p>

		<p>Typically, the persistent toolbar technique will be combined with fixed positioning. In this example, the footer also has a navbar, like this:</p>

<pre><code>
&lt;div data-role=&quot;footer&quot;<strong> data-id=&quot;foo1&quot; data-position=&quot;fixed&quot;</strong>&gt;
	&lt;div data-role=&quot;navbar&quot;&gt;
		&lt;ul&gt;
			&lt;li&gt;&lt;a href=&quot;a.html&quot;&gt;Info&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href=&quot;b.html&quot;&gt;Friends&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href=&quot;c.html&quot;&gt;Albums&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href=&quot;d.html&quot;&gt;Emails&lt;/a&gt;&lt;/li&gt;
		&lt;/ul&gt;
	&lt;/div&gt;&lt;!-- /navbar --&gt;
&lt;/div&gt;&lt;!-- /footer --&gt;
</code></pre>
		<p>To set the active state of an item in a persistent toolbar, add <code>class="ui-btn-active ui-state-persist"</code> to the corresponding anchor.</p>

<pre><code>
&lt;li&gt;&lt;a href=&quot;a.html&quot; <strong>class=&quot;ui-btn-active ui-state-persist&quot;</strong>&gt;Info&lt;/a&gt;&lt;/li&gt;
</code></pre>

		<h3>A note about transitions</h3>
		<p>The slide, slideup, slidedown, fade or none page transitions all work great with persistent fixed toolbars. However, intensive 3D transitions like flip, turn, and flow can cause positioning and animation performance issues with this technique so we don't recommend using them.</p>

		</div><!-- /content -->

		<div data-role="footer" data-id="foo1" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a href="footer-persist-a.php" data-prefetch="true" data-transition="none" class="ui-btn-active ui-state-persist">Info</a></li>
					<li><a href="footer-persist-b.php" data-prefetch="true" data-transition="none">Friends</a></li>
					<li><a href="footer-persist-c.php" data-prefetch="true" data-transition="none">Albums</a></li>
					<li><a href="footer-persist-d.php" data-prefetch="true" data-transition="none">Emails</a></li>
				</ul>
			</div><!-- /navbar -->
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
