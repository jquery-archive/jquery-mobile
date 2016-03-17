<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup iframes - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script src="popup-iframe-video.js" id="video-script"></script>
    <script src="popup-iframe-map.js" id="map-script"></script>
    <style>
        iframe {
            border: none;
        }
    </style>
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

		<h1>iframes in popups</h1>

		<p>You may need to embed an iframe into a popup to use a 3rd party widget. Here, we'll walk through a few real-world examples of working with iframes: videos and maps.</p>

		<h2>Video example</h2>

		<p>Here is an example of a 3rd party video player embedded in a popup:</p>

        <div data-demo-html="true" data-demo-css="true" data-demo-js="#video-script">
    		<a href="#popupVideo" data-rel="popup" data-position-to="window" class="ui-button ui-corner-all ui-shadow ui-button-inline">Launch video player</a>

    		<div data-role="popup" id="popupVideo" data-overlay-theme="b" data-theme="a" data-tolerance="15,15" class="ui-content">
    			<iframe src="http://player.vimeo.com/video/41135183?portrait=0" width="497" height="298" seamless=""></iframe>
    		</div>
        </div>

		<p>The markup is an iframe inside a popup container. The popup will have a 15 pixels padding because of class <code>ui-content</code> and a one pixel border because the framework will add class <code>ui-body-a</code> to the popup.</p>

		<p>When using an iframe inside a popup it is important to initially <strong>set the width and height attributes to 0</strong>. This prevents the page to breaking on platforms like Android 2.3. Note that you have to set the attributes, because setting the width and height with CSS is not sufficient. You can leave the actual width and height in the markup for browsers that have JavaScript disabled and use <code>attr()</code> to set the zero values upon the <code>pagecreate</code> event.</p>

		<p>Next, bind to the <code>popupbeforeposition</code> event to set the desired size of the iframe when the popup is shown or when the window is resized (e.g. orientation change). For the iframe examples on this page a custom function <code>scale()</code> is used to scale down the iframe to fit smaller screens.</p>

		<p>When the popup is closed the width and height should be set back to 0. You can do this by binding to the <code>popupafterclose</code> event.</p>

        <p>Note that the video will still be playing in the iframe when the popup is closed. If available you can use the 3rd party API to stop the video on the <code>popupafterclose</code> event. Another way is to create the iframe when the popup is opened and destroy it when the popup is closed, but this would drop support for browsers that have JavaScript disabled.</p>

		<h2>Map example</h2>

		<p>In the second example, an iframe is used to display <strong>Google Maps API</strong>. Using an iframe prevents issues with the controls of the map.</p>

        <div data-demo-html="true" data-demo-css="true" data-demo-js="#map-script">
			<a href="#popupMap" data-rel="popup" data-position-to="window" class="ui-button ui-corner-all ui-shadow ui-button-inline">Open Map</a>

			<div data-role="popup" id="popupMap" data-overlay-theme="a" data-theme="a" data-corners="false" data-tolerance="15,15">
				<a href="#" data-rel="back" class="ui-button ui-button-b ui-corner-all ui-shadow ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a>
				<iframe src="map.html" width="480" height="320" seamless=""></iframe>
			</div>
        </div>

		<p>Expand the section below to view the source of the iframe.</p>

		<div data-role="collapsible" data-content-theme="a">
			<h3><code>map.html</code></h3>
<pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Map&lt;/title&gt;
    &lt;script&gt;
        function initialize() {
            var myLatlng = new google.maps.LatLng( 51.520838, -0.140261 );
            var myOptions = {
                zoom: 15,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
        }
    &lt;/script&gt;
    &lt;script src="http://maps.google.com/maps/api/js?sensor=false"&gt;&lt;/script&gt;
    &lt;style&gt;
        html {
            height: 100%;
            overflow: hidden;
        }
        body {
            margin: 0;
            padding: 0;
            height: 100%;
        }
        #map_canvas {
            height: 100%;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body onload="initialize()"&gt;

    &lt;div id="map_canvas"&gt;&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>
		</div>

        <p>Setting the size of the iframe is done exactly the same as for the video example, with one exception. You should also set the width and height of the div that contains the map to prevent the page to break on platforms like Android 2.3. In this example the ID of this div is <code>#map_canvas</code>.</p>

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
