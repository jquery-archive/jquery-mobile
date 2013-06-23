<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos - How do I need to configure PhoneGap/Cordova?</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-faq">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
			<h2>Question:</h2>

			<h1>How do I need to configure PhoneGap/Cordova?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">Since PhoneGap/Cordova is frequently used in conjunction with jQuery Mobile, we wanted to offer a few tips and recommendations to help you get started. <a href="http://phonegap.com/" rel="external">PhoneGap</a> is an HTML5 app platform that allows developers to author native applications with web technologies and get access to APIs and app stores. Applications are built as normal HTML pages and packaged up to run as a native application within a UIWebView or WebView (a chromeless browser, referred to hereafter as a webview). </p>

			<h2>Overview</h2>

			<p>The initial application document is loaded by the PhoneGap application by a local file:// URL. This means that if you want to pull in pages from your company's remote server (phone home) you will have to refer to them with absolute URLs to your server. Because your document originates from a file:// URL, loading pages or assets from your remote server is considered a cross-domain request that can be blocked in certain scenarios. </p>

			<p>Your ability to access cross-domain pages from within a Phone Gap jQuery Mobile application is controlled by two key things: <code>$.support.cors</code> and <code>$.mobile.allowCrossDomainPages</code>, and can also be influenced by the white list feature in later builds of PhoneGap.</p>

			<h2>$.support.cors</h2>

			<p>In jQuery core, there is a <a href="http://api.jquery.com/jQuery.support/" rel="external">$.support.cors</a> boolean that indicates whether or not jQuery thinks the browser supports the W3C "<a href="http://www.w3.org/TR/cors/" rel="external">Cross-Origin Resource Sharing</a>" feature to support cross-domain requests.</p>

			<p>Since jQuery Mobile relies on jQuery core's $.ajax() functionality, <code>$.support.cors</code> must be set to <code>true</code> to tell <code>$.ajax</code> to load cross-domain pages. We've heard reports that webviews on some platforms, like BlackBerry, support cross-domain loading, but that jQuery core incorrectly sets <code>$.support.cors</code> value to <code>false</code> which disables cross-domain $.ajax() requests and will cause the page or assets to fail to load. </p>

			<h2>$.mobile.buttonMarkup.hoverDelay</h2>

			<p>If you find that the button down/hover state (lists, buttons, links etc) feels sluggish the <code>$.mobile.buttonMarkup.hoverDelay</code> setting might be of use. It will decrease the time between the touch event and the application of the relevant class but will also result in a higher chance that the same class will be applied even when the user is scrolling (eg, over a long list of links).</p>

			<h2>$.mobile.allowCrossDomainPages</h2>

			<p>When jQuery Mobile attempts to load an external page, the request runs through <code>$.mobile.loadPage()</code>. This will only allow cross-domain requests if the <code>$.mobile.allowCrossDomainPages</code> configuration option is set to <code>true</code>. Because the jQuery Mobile framework tracks what page is being viewed within the browser's location hash, it is possible for a cross-site scripting (XSS) attack to occur if the XSS code in question can manipulate the hash and set it to a cross-domain URL of its choice. This is the main reason that the default setting for <code>$.mobile.allowCrossDomainPages</code> is set to <code>false</code>.</p>

			<p>So in PhoneGap apps that must "phone home" by loading assets off a remote server, both the <code>$.support.cors</code> AND <code>$.mobile.allowCrossDomainPages</code> must be set to <code>true</code>.  The <code>$.mobile.allowCrossDomainPages</code> option must be set before any cross-domain request is made so we recommend wrapping this in a <code>mobileinit</code> handler:</p>

<pre><code>
$( document ).on( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
</code></pre>

			<h2>$.mobile.phonegapNavigationEnabled</h2>

			<p>On Android PhoneGap has as special navigation helper in place to work around issues with Honeycomb <code>navigator.app.backHistory</code> that replaces <code>window.history.back</code>. For most jQuery Mobile applications it's unecessary to have knowledge or make use of this helper because the vanilla history object works fine for hashchange and replace state alterations of the embedded browser history. <b>If and only if</b> your PhoneGap application uses a full page refresh (eg, for form validation) and you wish to support the Android platform, please make sure to set <code>$.mobile.phonegapNavigationEnabled = true</code> either in a <code>mobileinit</code> call back or anywhere before user interaction take place with the page. This will replace calls to <code>window.history.back</code> with calls to PhoneGap's helper method thereby alleviating history navigation issues associated with full page refreshes on Android devices.</p>

			<h2>PhoneGap White Listing</h2>

			<p>PhoneGap 1.0 introduced the idea of white-listing servers to which its internal webview is allowed to make cross-domain requests. You can find info about it here on the <a href="http://wiki.phonegap.com/w/page/40796976/Install%20the%20latest%20%28trunk%29%20source%20of%20iOS%20PhoneGap">PhoneGap wiki</a>.</p>

			<p>However, not all platforms support this white-listing feature so check the PhoneGap documentation for details. Older versions of PhoneGap prior to 1.0 defaulted to allowing cross-domain requests to any server.</p>

			<h2>More Tips and Tricks</h2>

			<p>Here are a few more tips that aren't specifically related to PhoneGap but are good to know:</p>

			<p><strong>We recommend disabling the pushState feature for installed apps </strong>because there are edge cases where this feature can cause unexpected navigation behavior and since URLs aren't visible in a webview, it's not worth keeping this active in these situations.</p>
			
			<p>Use to following code to disable pushState. Because the mobileinit event is triggered immediately, you'll need to bind your event handler before jQuery Mobile is loaded.</p>
		
<pre><code>
$(document).bind("mobileinit", function(){
	$.mobile.pushStateEnabled = false;
});
</code></pre>

			<p><strong>Android enforces a timeout when loading URLs in a webview</strong> which may be too short for your needs. You can change this timeout by editing a Java class generated by the Eclipse plugin for Android:</p>
			<code>super.setIntegerProperty("loadUrlTimeoutValue", 60000);</code>

			<p><strong>Avoid underscores in files and folders</strong> because Phonegap may fail to load the contained files in Android. This is a known <a href="http://code.google.com/p/android/issues/detail?id=5343" data-ajax="false">issue</a>.</p>

			<p><strong>Try <code>animation-fill-mode</code> to reduce blinky transitions</strong> but beware that we're found that certain devices like the Nexus 7 run animations very slowly when this CSS property is in play. We recommend targeting this carefully and testing thoroughly to ensure that it doesn't impact smoothness. To see how to add this to your CSS, see <a href="https://github.com/jquery/jquery-mobile/commit/fbbcf9e16ed2978547f1460c66f533157714371d" data-ajax="false">this commit</a>.</p>

			<h2>Building UIWebView apps with jQuery Mobile</h2>

			<p>It's important to note that when creating a custom, non-PhoneGap, <code>UIWebView</code> control in an iOS application you must use the <code>loadRequest</code> method in preference to <code>loadData</code> for back button support. The snippet below is an example of loading <code>default.html</code> in your view controller.</p>

<pre><code>- (void)viewDidLoad
{
    [super viewDidLoad];
    NSString *fullURL = [[NSBundle mainBundle] pathForResource:@"dialog" ofType:@"html"];
    NSURL *url = [NSURL fileURLWithPath:fullURL];
    NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
    [webView loadRequest:requestObj];
}</code></pre>

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
