
//thx @elroyjetson for the code example

// When map page opens get location and display map
$('.page-map').live("pagecreate", function() {

	//boston :)
	var lat = 42.35843,
		lng = -71.059773;
	
	//try to get GPS coords
	if( navigator.geolocation ) {
			
		//redirect function for successful location	
		function gpsSuccess(pos){
			if( pos.coords ){ 
				lat = pos.coords.latitude;
				lng = pos.coords.longitude;
			}
			else{
				lat = pos.latitude;
				lng = pos.longitude;
			}
		}	
		
		function gpsFail(){
			//Geo-location is supported, but we failed to get your coordinates. Workaround here perhaps?
		}
		
		navigator.geolocation.getCurrentPosition(gpsSuccess, gpsFail, {enableHighAccuracy:true, maximumAge: 300000});
	}

	/*
	if not supported, you might attempt to use google loader for lat,long
	$.getScript('http://www.google.com/jsapi?key=YOURAPIKEY',function(){
		lat = google.loader.ClientLocation.latitude;
		lng = google.loader.ClientLocation.longitude;
	});			
	*/

	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 10,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),myOptions);
});
