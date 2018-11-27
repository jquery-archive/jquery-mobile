<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Google Maps - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<style>
	.segmented-control {
		text-align: center;
	}

	.segmented-control .ui-controlgroup {
		display: inline;
		margin: .2em 0px;
	}

	.map-page {
		width: 100%;
		height: 100%;
	}

	#map-canvas {
		width: 100%;
		height: 100%;
		margin-top: -30px;
		padding: 0px!important;
	}

	#gmap-marker-link {
		color: #00a0df;
		text-decoration: none;
	}

	.ui-gmap-canvas {
		width: 100%;
		height: 100%;
	}

	.ui-gmap-infobox {
		display: none;
	}

	#show-more .ui-listview-item-heading {
		text-align: center;
	}

	#show-more .ui-icon {
		visibility: hidden;
	}

	.ui-listview-item-has-count .ui-listview-item-count-bubble {
		border-color: transparent;
	}

	.wrap {
		white-space: normal;
	}
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
		var map = $( "#map-canvas" ),
		    list = $( "#list-canvas" ),
		    page = $( this );

		$( "#list-switch, #map-switch" ).on( "click", function(){
			var isMap = this.id === "map-switch";

			page.toggleClass( "map-page", isMap );

			map[ isMap ? "show" : "hide" ]();
			map.gmap();

			list[ !isMap ? "show" : "hide" ]();
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

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
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

        <a href="#map-page" data-ajax="false" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-mini">Open demo <span class="ui-icon ui-icon-arrow-r"></span></a>

        <div data-demo-html="#map-page" data-demo-js="true" data-demo-css="true"></div><!--/demo-html -->

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

	<div data-role="page" id="map-page">
		<div data-role="toolbar" data-type="header" data-position="fixed">
			<div class="segmented-control ui-bar-d">
		 	<fieldset data-role="controlgroup" data-mini="true">
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
						<div class="ui-listview-item-count-bubble">
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
						<div class="ui-listview-item-count-bubble">
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
						<div class="ui-listview-item-count-bubble">
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
						<div class="ui-listview-item-count-bubble">
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
						<div class="ui-listview-item-count-bubble">
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
	<script type="text/javascript" src="https://cdn.rawgit.com/googlemaps/v3-utility-library/infobox/1.0/src/infobox_packed.js"></script>
	</div>

</body>
</html>
