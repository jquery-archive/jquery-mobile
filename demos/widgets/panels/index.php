<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Panels - jQuery Mobile Demos</title>
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

	<!-- default panel  -->
	<div data-role="panel" id="defaultpanel">

        <h3>Default panel options</h3>
        <p>This panel has all the default options: positioned on the left with the reveal display mode. The panel markup is <em>before</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="c" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /default panel -->

	<!-- Note: all other panels are at the end of the page, scroll down  -->

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Panels <a href="http://api.jquerymobile.com/panel/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

		<p class="jqm-intro">Flexible by design, panels can be used for navigation, forms, inspectors and more.</p>

		<h2 id="panel-examples">Panel examples</h2>

		<p><strong>Left</strong> panel examples</p>
		<a href="#leftpanel3" data-role="button" data-inline="true" data-mini="true">Overlay</a>
		<a href="#leftpanel1" data-role="button" data-inline="true" data-mini="true">Reveal</a>
		<a href="#leftpanel2" data-role="button" data-inline="true" data-mini="true">Push</a>

		<p><strong>Right</strong> panel examples</p>
		<a href="#rightpanel3" data-role="button" data-inline="true" data-mini="true">Overlay</a>
		<a href="#rightpanel1" data-role="button" data-inline="true" data-mini="true">Reveal</a>
		<a href="#rightpanel2" data-role="button" data-inline="true" data-mini="true">Push</a>

		<p>The <strong>position</strong> of the panel on the screen is set by the <code>data-position</code> attribute. The default value of the attribute is <code>left</code>, meaning it will appear from the left edge of the screen. Specify <code>data-position="right"</code> for it to appear from the right edge instead.</p>

		<p>The <strong>display mode</strong> of the panel is set by the <code>data-display</code> attribute. The value of the attribute defaults to <code>reveal</code>, meaning the panel will sit under the page and reveal as the page slides away. Specify <code>data-display="overlay"</code> for the panel to appear on top of the page contents. A third mode, <code>data-display="push"</code> animates both the panel and page at the same time.</p>

		<h2 id="panel-markup">Where panel markup goes in the markup</h2>

		<p>A panel must be a sibling to the header, content and footer elements inside a jQuery Mobile page. You can add the panel markup either <em>before</em> or <em>after</em> these elements, but not in between. A panel cannot be placed outside a page, but this constraint will be removed in a future version.</p>

		<p>Here is an example of the panel before the header, content and footer in the source order:</p>

<pre><code>
&lt;div data-role=&quot;page&quot;&gt;

<strong>&lt;div data-role=&quot;panel&quot; id=&quot;mypanel&quot;&gt;</strong>
    &lt;!-- panel content goes here --&gt;
<strong>&lt;/div&gt;&lt;!-- /panel --&gt;</strong>

&lt;!-- header --&gt;
&lt;!-- content --&gt;
&lt;!-- footer --&gt;

&lt;/div&gt;&lt;!-- page --&gt;
</code></pre>

		<p>Alternatively, it's possible to add the panel markup <em>after</em> the header, content and footer in the source order, just before the end of the page container. Where in the source order you place the panel markup will depend on how you want the page content to read for people experiencing the page on a C-grade device (HTML only) or for a screen reader.</p>

		<h2 id="panel-dynamic">Dynamic content</h2>

		<p>When you dynamically add content to a panel or make hidden content visible while the panel is open, you have to trigger the <code>updatelayout</code> event on the panel.</p>

<pre><code>
$( "#mypanel" ).trigger( "updatelayout" );
</code></pre>

		<p>The framework will then check the new height of the panel contents. If it exceeds the screen height, it will set the page <code>min-height</code> to this height and unfix panels with <code>data-position-fixed="true"</code>. See also <strong>Panel positioning</strong>.</p>

		<h2 id="panel-open">Opening a panel</h2>

		<p>To control a panel from a link, set the <code>href</code> to the <code>ID</code> of the panel you want to toggle (<code>mypanel</code> in the example above). This instructs the framework to bind the link to the panel. This link will toggle the visibility of the panel so tapping it will open the panel, and tapping it again will close it.</p>

		<a href="#defaultpanel" data-role="button" data-inline="true" data-icon="bars">Default panel</a>

		<h2 id="panel-close">Closing a panel</h2>

		<p>Clicking the link that opened the panel, swiping left or right, or tapping the Esc key will close the panel. To turn off the swipe-to-close behavior, add the <code>data-swipe-close="false"</code> attribute to the panel.</p>

		<p>By default, panels can also be closed by clicking outside the panel onto the page contents. To prevent this behavior, add the <code>data-dismissible="false"</code> attribute to the panel. It's possible to have the panel and page sit side-by-side at wider screen widths and prevent the click-out-to-close behavior only above a certain screen width by applying a media query. See the responsive section below for details. </p>

		<p>It's common to also add a close button inside the panel. To add the link that will close the panel, add the <code>data-rel="close"</code> attribute to tell the framework to close that panel when clicked. It's important to ensure that this link also makes sense if JavaScript isn't available, so we recommend that the <code>href</code> point to the ID of the page to which the user should jump when closing. For example, if the button to open the panel is in the header bar that has and ID of <code>my-header</code>, the close link in the panel should be:</p>

<pre><code>
&lt;a href=&quot;#my-header&quot; <strong>data-rel=&quot;close&quot;</strong>&gt;Close panel&lt;/a&gt;
</code></pre>

		<h2 id="panel-animate">Panel animations</h2>

		<p>Panels will animate if the browser supports 3D transforms &mdash; the same criteria for CSS animation support we use for page transitions. Panel animations use <code>translate3d(x,y,z)</code> CSS transforms to ensure they are hardware accelerated and smooth.</p>

		<p>The <code>animate</code> option allows you to turn off panel animations for all devices. To turn off animations via markup, add the <code>data-animate="false"</code> attribute to the panel container.</p>

		<h2 id="panel-positioning">Panel positioning</h2>

		<p>The panel will be displayed with the <code>position:absolute</code> CSS property, meaning it will scroll with the page. When a panel is opened the framework checks to see if the bottom of the panel contents is in view. If not, it scrolls to the top of the page.</p>

        <p>You can set a panel to <code>position:fixed</code>, so its contents will appear no matter how far down the page you're scrolled, by adding the <code>data-position-fixed="true"</code> attribute to the panel. The framework also checks to see if the panel contents will fit within the viewport before applying the fixed positioning because this property would prevent the panel contents from scrolling and make it inaccessible. <code>overflow</code> is not well supported enough to use at this time. If the panel contents are too long to fit within the viewport, the framework will simply display the panel without fixed positioning. See an example of <a href="panel-fixed.php" data-ajax="false">panels with fixed positioning</a>.</p>

		<h2 id="panel-styling">Styling panels</h2>

		<p>By default, panels have very simple styles to let you customize them as needed. Panels are essentially just simple blocks with no margins that sit on either side of the page content. The framework wraps the panel content in a <code>div</code> with class <code>ui-panel-inner</code> which has a padding of 15 pixels. If needed you can override this with custom CSS or use option <code>classes.panelInner</code> to set a different class name for the <code>div</code>.</p>

		<p>Panels have a fixed width of 17em (272 pixels) which is narrow enough to still show some of the page contents when open to make clicking out to close easy, while still looking good on wider tablet or desktop screens. The styles to set widths on panels are fairly complex but these can be overridden with CSS as needed.</p>

		<p>Other than the theme background, width and 100% height styles, panels have very little styling on their own. The default theme for panels is "c". You can set a different theme for the panel by adding a <code>data-theme</code> attribute to the panel container, or you can set <code>data-theme="none"</code> and add your own classes to style it as needed.</p>

		<p>Note that adding padding, borders, or margins directly to the panel container will alter the overall dimensions and could cause the positioning and animation to be affected. To avoid this, apply styles to the panel content wrapper (<code>.ui-panel-inner</code>).</p>

		<h2 id="panel-responsive">Making the panel responsive</h2>

		<p>When the push or reveal display is used, a panel pushes the page aside when it opens. Since some of the page is pushed offscreen, the panel is modal and must be closed to interact with the page content again. On larger screens, you may want to have the panel work more like a collapsible column that can be opened and used alongside the page to make better use of the screen real estate. </p>
		<p>To make the page work alongside the open panel, it needs to re-flow to a narrower width so it will fit next to the panel. This can be done purely with CSS by adding a left or right margin equal to the panel width (17em) to the page contents to force a re-flow. Second, the invisible layer placed over the page for the click-out-to-dismiss behavior is hidden with CSS so you can click on the page and not close the menu. </p>
		<p>Here is an example of these rules wrapped in a media query to only apply this behavior above 35em (560px):</p>

<pre><code>
@media (min-width:35em){

	/* wrap on wide viewports once open */
	
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-push.ui-panel-content-fixed-toolbar-position-left,
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-reveal.ui-panel-content-fixed-toolbar-position-left,
	.ui-page-panel-open .ui-panel-content-wrap-display-push.ui-panel-content-wrap-position-left,
	.ui-page-panel-open .ui-panel-content-wrap-display-reveal.ui-panel-content-wrap-position-left {
		margin-right: 17em;
	}
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-push.ui-panel-content-fixed-toolbar-position-right,
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-reveal.ui-panel-content-fixed-toolbar-position-right,
	.ui-page-panel-open .ui-panel-content-wrap-display-push.ui-panel-content-wrap-position-right,
	.ui-page-panel-open .ui-panel-content-wrap-display-reveal.ui-panel-content-wrap-position-right {
		margin-left: 17em;
	}
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-push,
	.ui-page-panel-open .ui-panel-content-fixed-toolbar-display-reveal {
		width: auto;
	}
	
	/* disable "dismiss" on wide viewports */
	.ui-panel-dismiss {
		display: none;
	}
	/* same as the above but for panels with display mode "push" only */
	.ui-panel-dismiss-display-push {
		display: none;
	}

}
</code></pre>

		<h4>Applying a preset breakpoint</h4>

		<p>Included in the widget styles is a breakpoint preset for this behavior that kicks in at 55em (880px). This breakpoint is not applied by default to make it easier for you to write custom breakpoints that work best for your content and design. To apply the breakpoint preset, add the <code>ui-responsive-panel</code> class to the <em>page wrapper</em> (not the panel). See an example of a <a href="panel-fixed.php" data-ajax="false">responsive panel</a> page.</p>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

	<!-- Here are a bunch of panels at the end, just before the close page tag  -->

	<!-- leftpanel1  -->
	<div data-role="panel" id="leftpanel1" data-position="left" data-display="reveal" data-theme="a">

        <h3>Left Panel: Reveal</h3>
        <p>This panel is positioned on the left with the reveal display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="a" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /leftpanel1 -->

	<!-- leftpanel2  -->
	<div data-role="panel" id="leftpanel2" data-position="left" data-display="push" data-theme="a">

        <h3>Left Panel: Push</h3>
        <p>This panel is positioned on the left with the push display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="a" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /leftpanel2 -->

	<!-- leftpanel3  -->
	<div data-role="panel" id="leftpanel3" data-position="left" data-display="overlay" data-theme="a">

        <h3>Left Panel: Overlay</h3>
        <p>This panel is positioned on the left with the overlay display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="a" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /leftpanel3 -->

	<!-- rightpanel1  -->
	<div data-role="panel" id="rightpanel1" data-position="right" data-display="reveal" data-theme="b">

        <h3>Right Panel: Reveal</h3>
        <p>This panel is positioned on the right with the reveal display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="c" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /rightpanel1 -->

	<!-- rightpanel2  -->
	<div data-role="panel" id="rightpanel2" data-position="right" data-display="push" data-theme="b">

        <h3>Right Panel: Push</h3>
        <p>This panel is positioned on the right with the push display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="c" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /rightpanel2 -->

	<!-- rightpanel3  -->
	<div data-role="panel" id="rightpanel3" data-position="right" data-display="overlay" data-theme="b">

        <h3>Right Panel: Overlay</h3>
        <p>This panel is positioned on the right with the overlay display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
        <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
        <a href="#demo-links" data-rel="close" data-role="button" data-theme="c" data-icon="delete" data-inline="true">Close panel</a>

	</div><!-- /rightpanel3 -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
