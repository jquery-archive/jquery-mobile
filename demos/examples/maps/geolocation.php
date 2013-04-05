<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Google Maps - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<style>
		#map-page, #map-canvas { width: 100%; height: 100%; padding: 0; }
	</style>
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<script>
	/* 
	 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html 
	 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
	 */
	
	$( document ).on( "pageinit", "#map-page", function() {
		var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
		
		if ( navigator.geolocation ) {
			function success(pos) {
				// Location found, show map with these coordinates
				drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			}
			
			function fail(error) {
				drawMap(defaultLatLng);  // Failed to find location, show default map
			}
			
			// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
			navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
		} else {
			drawMap(defaultLatLng);  // No geolocation support, show default map	
		}
	
		function drawMap(latlng) {
			var myOptions = {
				zoom: 10,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
			
			// Add an overlay to the map of current lat/lng
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: "Greetings!"
			});
		}
		
	});
	</script>
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

        <h1>Google Maps</h1>

        <p>In this demo we show you how to:</p>
        <ul>
            <li>Integrate with Google Maps.</li>
            <li>How to get the users current location with the Geolocation API.</li>
            <li>How to plot a point on the map using your current location.</li>
            <li>How to display a default location (Hollywood, CA) if Geolocation is unavailable or a user declines to share it.</li>
        </ul>
        
        <a href="#map-page" class="jqm-button" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right">Open demo</a>

        <div data-demo-html="#map-page" data-demo-js="true" data-demo-css="true"></div><!--/demo-html -->

    </div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->

	<div data-role="page" id="map-page">
		<div data-role="header" data-theme="c">
			<h1>Maps</h1>
		</div>
		
		<div data-role="content" id="map-canvas">
			<!-- map loads here... -->
		</div>
	</div>
	
	</body>
	</html>
