<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile - Popup iframes</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>

	<script src="popup-examples.js"></script>
	<link rel="stylesheet" href="popup-examples.css" />

</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

			<a href="index.php" data-role="button" data-transition="fade" data-icon="arrow-l" data-inline="true" data-mini="true">Back to Popups</a>
			<h1>iframes in popups</h1>

			<p>You may need to embed an iframe into a popup to use a 3rd party widget. Here, we'll walk through a few real-world examples of working with iframes: videos and maps.</p>

			<h2>Video example</h2>

			<p>Here is an example of a 3rd party video player embedded in a popup:</p>
				<a href="#popupVideo" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true">Launch video player</a>

				<div data-role="popup" id="popupVideo" data-overlay-theme="a" data-theme="d" data-tolerance="15,15" class="ui-content">
					<iframe src="http://player.vimeo.com/video/41135183?portrait=0" width="497" height="298" seamless></iframe>
				</div>

			<p>The markup is an iframe inside a popup container. The popup will have a 15 pixels padding because of class <code>ui-content</code> and a one pixel border because the framework will add class <code>ui-body-d</code> to the popup.</p>

<pre><code>
&lt;div data-role="popup" id="popupVideo" data-overlay-theme="a" data-theme="d" data-tolerance="15,15" class="ui-content"&gt;

    &lt;iframe src="http://player.vimeo.com/video/41135183" width="497" height="298" seamless&gt;&lt;/iframe&gt;

&lt;/div&gt;
</code></pre>

			<p>When using an iframe inside a popup it is important to initially <strong>set the width and height attributes to 0</strong>. This prevents the page to breaking on platforms like Android 2.3. Note that you have to set the attributes, because setting the width and height with CSS is not sufficient. You can leave the actual width and height in the markup for browsers that have JavaScript disabled and use <code>attr()</code> to set the zero values upon the <code>pageinit</code> event.</p>

			<p>Next, bind to the <code>popupbeforeposition</code> event to set the desired size of the iframe when the popup is shown or when the window is resized (e.g. orientation change). For the iframe examples on this page a custom function <code>scale()</code> is used to scale down the iframe to fit smaller screens. Expand the section below to view the code of this function.</p>

			<div data-role="collapsible" data-content-theme="d">
				<h3><code>scale()</code></h3>
				<p>The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account.</p>
<pre><code>
function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};
</code></pre>
				<p><strong>Note:</strong> This function is not part of the framework. Copy the code into your script to use it.</p>
			</div>

			<p>When the popup is closed the width and height should be set back to 0. You can do this by binding to the <code>popupafterclose</code> event.</p>

			<p>This is the complete script and the link to open the video popup:</p>

<pre><code>
$( document ).on( "pageinit", function() {
    $( "#popupVideo iframe" )
        .attr( "width", 0 )
        .attr( "height", 0 );

    $( "#popupVideo" ).on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;

            $( "#popupVideo iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#popupVideo iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );
        }
    });
});
</code></pre>

            <p>Note that the video will still be playing in the iframe when the popup is closed. If available you can use the 3rd party API to stop the video on the <code>popupafterclose</code> event. Another way is to create the iframe when the popup is opened and destroy it when the popup is closed, but this would drop support for browsers that have JavaScript disabled.</p>

			<h2>Map example</h2>
			<p>In the second example, an iframe is used to display <strong>Google Maps API</strong>. Using an iframe prevents issues with the controls of the map.</p>

			<a href="#popupMap" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true">Open Map</a>

			<div data-role="popup" id="popupMap" data-overlay-theme="a" data-theme="a" data-corners="false" data-tolerance="15,15">
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
				<iframe src="map.html" width="480" height="320" seamless></iframe>
			</div>

			<p>This is the markup of the popup including a right close button:</p>
<pre><code>
&lt;div data-role="popup" id="popupMap" data-overlay-theme="a" data-theme="a" data-corners="false" data-tolerance="15,15"&gt;

    &lt;a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close&lt;/a&gt;

    &lt;iframe src="map.html" width="480" height="320" seamless&gt;&lt;/iframe&gt;

&lt;/div&gt;
</code></pre>

			<p>Expand the section below to view the source of the iframe.</p>

			<div data-role="collapsible" data-content-theme="d">
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

			<p>This is the complete script and the link to open the map popup:</p>

<pre><code>
$( document ).on( "pageinit", function() {
    $( "#popupMap iframe" )
        .attr( "width", 0 )
        .attr( "height", 0 );

    $( "#popupMap iframe" ).contents().find( "#map_canvas" )
        .css( { "width" : 0, "height" : 0 } );

    $( "#popupMap" ).on({
        popupbeforeposition: function() {
            var size = scale( 480, 320, 0, 1 ),
                w = size.width,
                h = size.height;

            $( "#popupMap iframe" )
                .attr( "width", w )
                .attr( "height", h );

            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": w, "height" : h } );
        },
        popupafterclose: function() {
            $( "#popupMap iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );

            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": 0, "height" : 0 } );
        }
    });
});
</code></pre>

			</div><!-- /content -->

			<div data-role="footer" class="jqm-footer">
				<p class="jqm-version"></p>
				<p>Copyright 2013 The jQuery Foundation</p>
			</div><!-- /footer -->

		<?php include( '../../global-nav.php' ); ?>

		</div><!-- /page -->
		</body>
		</html>
