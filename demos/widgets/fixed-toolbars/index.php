<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Fixed Toolbars - jQuery Mobile Framework</title>
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

    <div data-role="header" data-position="fixed" class="jqm-header">
        <h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../../search.php' ); ?>
	</div><!-- /header -->

    <div data-role="content" class="jqm-content">

    	<h1>Fixed toolbars</h1>

		<p class="jqm-intro">In browsers that support CSS <code>position: fixed</code> (most desktop browsers, iOS5+, Android 2.2+, BlackBerry 6, and others), toolbars that use the "fixedtoolbar" plugin will be fixed to the top or bottom of the viewport, while the page content scrolls freely in between. In browsers that don't support fixed positioning, the toolbars will remain positioned in flow, at the top or bottom of the page. </p>

		<h2>Fixed basics</h2>
		<p>To enable this behavior on a header or footer, add the <code>data-position="fixed"</code> attribute to a jQuery Mobile header or footer element.</p>

		<p>Fixed header markup example:</p>

<pre><code>
&lt;div data-role=&quot;header&quot; <strong>data-position=&quot;fixed&quot;</strong>&gt;
	&lt;h1&gt;Fixed Header!&lt;/h1&gt;
&lt;/div&gt;
</code></pre>

		<p>Fixed footer markup example:</p>

<pre><code>
&lt;div data-role=&quot;footer&quot; <strong>data-position=&quot;fixed&quot;</strong>&gt;
	&lt;h1&gt;Fixed Footer!&lt;/h1&gt;
&lt;/div&gt;
</code></pre>

		<h2>Fullscreen Toolbars</h2>
        
		<p><a href="bars-fullscreen.php">Fullscreen</a> fixed toolbars sit on top of the content at all times when they are visible, and unlike regular fixed toolbars, fullscreen toolbars do not fall back to static positioning when toggled. Instead they disappear from the screen entirely. Fullscreen toolbars are ideal for more immersive interfaces, like a photo viewer that is meant to fill the entire screen with the photo itself and no distractions.</p>

		<p>To enable this option on a fixed header or footer, add the <code>data-fullscreen</code> attribute to the element.</p>

<pre><code>
&lt;div data-role=&quot;header&quot; data-position=&quot;fixed&quot; data-fullscreen=&quot;true&quot;&gt;
	&lt;h1&gt;Fixed Header!&lt;/h1&gt;
&lt;/div&gt;
</code></pre>

		<h2>Forms in toolbars</h2>

		<p>While all form elements are now tested to work correctly within <em>static</em> toolbars as of jQuery Mobile 1.1, we recommend extensive testing when using form elements within <em>fixed</em> toolbars or within any <code>position: fixed</code> elements. This can potentially trigger a number of unpredictable issues in various mobile browsers, Android 2.2/2.3 in particular (detailed in <b>Known issues in Android 2.2/2.3</b>, below).</p>

		<h2>Changes in jQuery Mobile 1.1</h2>

		<p>Prior to version 1.1, jQuery Mobile used dynamically re-positioned toolbars for the fixed header effect because very few mobile browsers supported the <code>position:fixed</code> CSS property, and simulating fixed support through the use of "fake" JavaScript overflow-scrolling behavior would have reduced our browser support reach, in addition to feeling unnatural on certain platforms. This behavior was not ideal, and jQuery Mobile 1.1 took a new approach to fixed toolbars that allows much broader support. The framework now offers true fixed toolbars on many popular platforms, while gracefully degrading non-supporting platforms to static positioning.</p>

		<h3>Polyfilling older platforms</h3>
		<p>The fixed toolbar plugin degrades gracefully in platforms that do not support CSS <code>position:fixed</code> properly, such as iOS4.3. If you still need to support fixed toolbars on that platform (with the show/hide behavior) included in previous releases, Filament Group has developed a polyfill that you can use.</p>

		<ul>
				<li><a href="https://github.com/filamentgroup/jQuery-Mobile-FixedToolbar-Legacy-Polyfill">Github code repository with CSS, and JavaScript required for the fixed toolbars polyfill</a></li>
				<li><a href="http://filamentgroup.github.com/jQuery-Mobile-FixedToolbar-Legacy-Polyfill/">Preview URL using the code in the repo above</a></li>
		</ul>

		<p>Just include the CSS and JS files after your references to jQuery Mobile and Fixed toolbars will work similarly to jQuery Mobile 1.0 in iOS4.3, with the inclusion of the new API for the 1.1 fixedtoolbar plugin.</p>

		<p>If you have any improvements to suggest, fork the <a href="https://github.com/filamentgroup/jQuery-Mobile-FixedToolbar-Legacy-Polyfill">gist</a> on github and let us know!</p>

		<h2>Known issue with form controls inside fixed toolbars, and programmatic scroll</h2>
		<p>An obscure issue exists in iOS5 and some Android platforms where form controls placed inside fixed-positioned containers can lose their hit area when the window is programatically scrolled (using <code>window.scrollTo</code> for example). This is not an issue specific to jQuery Mobile, but because of it, we recommend not programatically scrolling a document when using form controls inside jQuery Mobile fixed toolbars. <a href="https://github.com/scottjehl/Device-Bugs/issues/1">This ticket</a> from the <a href="https://github.com/scottjehl/Device-Bugs/">Device Bugs project</a> tracker explains this problem in more detail.</p>

		<h2>Known issues in Android 2.2/2.3</h2>
		<p>Android 2.2/2.3's implementation of <code>position: fixed;</code> can, in conjunction with seemingly unrelated styles and markup patterns, cause a number of strange issues, particularly in the case of <code>position: absolute</code> elements inside of <code>position: fixed</code> elements. While we've done our best to work around a number of these unique bugs within the scope of the library, custom styles may cause a number of issues.</p>
		<ul>
			<li>Form elements elsewhere on the page—select menus in particular—can fail to respond to user interaction when an <em>empty</em> absolute positioned element is placed within a fixed position element. In rare cases—and specific to Android 2.2—this can cause <em>entire pages</em> to fail to respond to user interaction. This can seemingly be solved by adding any character to the absolute positioned element, including a non-breaking space, and in some cases even whitespace.</li>
			<li>The above-described issue can also be triggered by an absolute positioned image inside of a fixed position element, but <em>only</em> when that image is using something <em>other than its inherent dimensions</em>. If a height or width is specified on the image using CSS, or the image src is invalid (thus having no inherent height and width), this issue can occur. If an image that is inherently, say, 50x50 pixels is placed in a fixed element and left at its inherent dimensions, this issue does not seem to occur.</li>
			<li>When a <code>position: fixed</code> element appears anywhere on a page, most 2D CSS transforms will fail. Oddly, only <code>translate</code> transforms seem unaffected by this. Even more oddly, this issue is solved by setting a CSS <code>opacity</code> of .9 or below on the parent of the fixed element.</li>
			<li>Combinations of <code>position: fixed</code> and overflow properties are best avoided, as both have been known to cause unpredictable issues in older versions of Android OS.</li>
			<li>Any element that triggers the on-screen keyboard, when placed inside a <code>position: fixed</code> element, will fail to respond to user input when using anything other than the default keyboard. This includes Swype, XT9 or, it seems, any input method apart from the standard non-predictive keyboard.</li>
		</ul>

		<p>While we will continue to try to find ways to mitigate these bugs as best we can, we currently advise against implementing fixed toolbars containing complicated user styles and form elements without extensive testing in all versions of Android's native browser.</p>

		<h2>No longer supported: touchOverflowEnabled</h2>

		<p>Prior to jQuery Mobile 1.1, true fixed toolbar support was contingent on native browser support for the CSS property <code>overflow-scrolling: touch</code>, which is currently only supported in iOS5. As of version 1.1, jQuery Mobile no longer uses this CSS property at all. We've removed all internal usage of this property in the framework, but we've left it defined globally on the $.mobile object to reduce the risk that its removal will cause trouble with existing applications. This property is flagged for removal, so please update your code to no longer use it. The support test for this property, however, remains defined under <code>$.support</code> and we have no plans to remove that test at this time. </p>


    </div><!-- /content -->
    
    <div data-role="footer" data-theme="f" data-position="fixed">
    	<h1>Fixed Footer</h1>
    </div>

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->

</body>
</html>
