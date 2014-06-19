<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Google Maps - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<style>
	.segmented-control { text-align:center; }
	.segmented-control .ui-controlgroup { display:inline; margin:.2em 0px; }

	#map-page { width:100%; height:100%; }
	#map-canvas { width:100%; height:100%; margin-top:-30px; padding:0px!important; }
	#gmap-marker-link { color:#00a0df; text-decoration:none; }

	.ui-gmap-canvas { width:100%; height:100%; }
	.ui-gmap-infobox { display:none; }

	#show-more .ui-li-heading { text-align:center; }
	#show-more .ui-icon { visibility:hidden; }

	.ui-li-has-count .ui-li-count { border-color:transparent; }
	.wrap { white-space:normal; }
	</style>
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<!-- Google Maps JS assets are loaded at bottom of page for performance -->
	<script>
	$( document ).on( "pagecreate", "#map-page", function() {
		var $mapSwitch = $( "#map-switch" ),
		    $listSwitch = $( "#list-switch" ),
			$map = $( "#map-canvas" ),
	        $list = $( "#list-canvas" );

	    $mapSwitch.on( "click", function( e ){
	       	$map.show();
	       	$map.gmap();
	       	$list.hide();
	    });

	    $listSwitch.on( "click", function( e ){
	       	$list.show();
			$map.hide();
	    });

	    $( "#show-more a" ).on( "click", function( e ){
			// Assume we already have a cached geolocation because it's not necessary for this example.
			var location = location || {};
			    location.coords = location.coords || {};
				location.coords.latitude = location.coords.latitude || {};
				location.coords.longitude = location.coords.longitude || {};

			JQM.geo.startIndex = $( "#list-results li" ).size() -1; // exclude show more list item
	    	JQM.geo.showMore( location );
	    	e.preventDefault();
	    });
	});

	/**
	 * Geolocation configuration
	 */
	var JQM = JQM || {};
	JQM.geo = {
		location: "",
		zip: "",
		startIndex: "",

	    showMore: function(latlng) {
	    	$.mobile.loading( "show" );
	    	JQM.geo.location = latlng;

			$.ajax({
			  	url: "showMore.html?lat="+JQM.geo.location.coords.latitude+"&lon="+JQM.geo.location.coords.longitude+"&zip="+JQM.geo.zip+"&startIndex="+JQM.geo.startIndex,
			  	success: function( response ) {
			  		var $listResults = $( "#list-results" );
					$listResults.find( "#show-more" ).before(response);
					$listResults.listview( "refresh" );
					$.mobile.loading( 'hide' );
			  	},
				timeout: 6000,  // Timeout after 6 seconds
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Error, textStatus: " + textStatus + " errorThrown: "+ errorThrown);
					$.mobile.loading( "hide" );
				}
			});
	    }
	};
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Google Maps with List toggle</h1>

        <p>In this demo we show you how to:</p>
        <ul>
            <li>Create a segmented control that toggles between a list view and map view.</li>
            <li>How to transfer geolocation data from a list view to a map view.</li>
            <li>How to load more list results and dynamically append them to an existing list.</li>
            <li>How to display an info box on the map when a push pin is tapped.</li>
        </ul>

        <a href="#map-page" data-ajax="false" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini ui-icon-arrow-r ui-btn-icon-right">Open demo</a>

        <div data-demo-html="#map-page" data-demo-js="true" data-demo-css="true"></div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

	<div data-role="page" id="map-page">
		<div data-role="header" data-position="fixed">
			<div class="segmented-control ui-bar-d">
		 	<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
	  			<input type="radio" name="switch" id="list-switch" checked="true">
				<label for="list-switch">List</label>
	         	<input type="radio" name="switch" id="map-switch">
	         	<label for="map-switch">Map</label>
		    </fieldset>
			</div>
		</div>
		<div role="main" class="ui-content ui-content-list">
	        <div id="list-canvas">
	            <ul id="list-results" data-role="listview">
	            	<li data-marker-info="44.811805,-93.176352">
					  <div style="display:none;">
					    <div class="ui-gmap-marker-info">
					  	  <h1><a id="gmap-marker-link" href="#">Fast Clinic</a></h1>
					  	  <p>8888 Fast Rd</p>
					  	</div>
					  </div>
	            	  <a href="#">
	            	  	<h1 class="ui-gmap-marker-title wrap">Fast Clinic</h1>
	            	  	<div class="ui-li-count">
	            	  		<span>0.71 miles</span>
	            	  	</div>
	            	  </a>
	            	</li>
	            	<li data-marker-info="44.788673,-93.205671">
					  <div style="display:none;">
					    <div class="ui-gmap-marker-info">
					  	  <h1><a id="gmap-marker-link" href="#">North Memorial Care</a></h1>
					  	  <p>8398 Jefferson Ct</p>
					  	</div>
					  </div>
	            	  <a href="#">
	            	  	<h1 class="ui-gmap-marker-title wrap">North Memorial Care</h1>
	            	  	<div class="ui-li-count">
	            	  		<span>0.71 miles</span>
	            	  	</div>
	            	  </a>
	            	</li>
	            	<li data-marker-info="44.750453,-93.204766">
					  <div style="display:none;">
					    <div class="ui-gmap-marker-info">
					  	  <h1><a id="gmap-marker-link" href="#">Fast Clinic-Newtown</a></h1>
					  	  <p>34555 Dove Trl</p>
					  	</div>
					  </div>
	            	  <a href="#">
	            	  	<h1 class="ui-gmap-marker-title wrap">Fast Clinic-Newtown</h1>
	            	  	<div class="ui-li-count">
	            	  		<span>4.15 miles</span>
	            	  	</div>
	            	  </a>
	            	</li>
	            	<li data-marker-info="44.736285,-93.207487">
					  <div style="display:none;">
					    <div class="ui-gmap-marker-info">
					  	  <h1><a id="gmap-marker-link" href="#">Brad's Medical Clinic</a></h1>
					  	  <p>3444 Great Ave</p>
					  	</div>
					  </div>
	            	  <a href="#">
	            	  	<h1 class="ui-gmap-marker-title wrap">Brad's Medical Clinic</h1>
	            	  	<div class="ui-li-count">
	            	  		<span>5.09 miles</span>
	            	  	</div>
	            	  </a>
	            	</li>
	            	<li data-marker-info="44.723595,-93.176812">
					  <div style="display:none;">
					    <div class="ui-gmap-marker-info">
					  	  <h1><a id="gmap-marker-link" href="#">Super Clinics</a></h1>
					  	  <p>15560 Pilot Rd</p>
					  	</div>
					  </div>
	            	  <a href="#">
	            	  	<h1 class="ui-gmap-marker-title wrap">Super Clinics</h1>
	            	  	<div class="ui-li-count">
	            	  		<span>5.58 miles</span>
	            	  	</div>
	            	  </a>
	            	</li>
					<li id="show-more"><a href=""><h1>Show more</h1></a></li>
				</ul>
			</div>
		</div>
		<div role="main" class="ui-content" id="map-canvas" data-initial-view="44.80,-93.16,10" style="display:none;"></div>
	<!-- Load map assets at bottom for performance -->
	<script type="text/javascript" src="jquery.gmap.js"></script>
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.0/src/infobox_packed.js"></script>
	</div>

</body>
</html>
