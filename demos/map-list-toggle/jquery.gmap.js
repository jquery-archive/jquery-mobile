/* gmap plugin.
 *
 * 	$.gmap()
 * 	$.gmap({ ...options... })
 * 	$.gmap('addMarkers', data)
 *
 * The jQuery object being mapified must have an attribute: data-initial-view="lat,lng,zoom"
 *
 * Configuration options:
 *
 * 	loadingMessage: a string for the loading overlay. Default: "Loading..."
 *  autoAddMarkers: boolean. If true, a marker is automatically added for each item with the
 *  	attribute data-marker-info="lat,lng". If the element or any descendant has the class
 *  	"ui-gmap-marker-content", then an infobox containing that content will be shown when
 *  	the marker is clicked (this content is cloned). The HTML contents of a subelement with
 *  	class "ui-gmap-marker-title" will be used for the mouseover tooltip.
 *  infoWindowConfig: Object containing a list of properties for the info window (if applicable).
 *
 * Markup requirements:
 *
 *  1. The class "ui-gmap" will be added to each element to which the plugin is applied.
 */
(function($) {
	var pluginName = 'gmap';
	var DATA_INITIAL_VIEW = "44.80,-93.16,5";

	function parseLatLng(string) {
		if (!string) string = DATA_INITIAL_VIEW;
		var parts = string.split(',');
		if (parts.length != 2) throw 'Invalid lat/lng: "'+string+'"';
		var lat = parseFloat(parts[0]);
		var lng = parseFloat(parts[1]);
		if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lng) || lng < -180 || lng > 180)
			throw 'Invalid lat/lng: "'+string+'"';
		return new google.maps.LatLng(lat, lng);
	}

	function parseLatLngZoom(string) {
		if (!string) string = DATA_INITIAL_VIEW;
		var parts = string.split(',');
		if (parts.length != 3) throw 'Invalid lat/lng/zoom: "'+string+'"';
		var lat = parseFloat(parts[0]);
		var lng = parseFloat(parts[1]);
		var zoom = parseInt(parts[2]);
		if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lng) || lng < -180 || lng > 180 || zoom < 3 || zoom > 30)
			throw 'Invalid lat/lng/zoom: "'+string+'"';
		return { center: new google.maps.LatLng(lat, lng), zoom: zoom };
	}

	var commands = {
		init: function(config) {
			if (!('google' in window) || !('maps' in google)) {
				throw 'Google maps API did not complete loading';
			}

			var $this = $(this);
			$this.data(pluginName, config);

			// Set up UI
			$this.addClass('ui-gmap').html('<div class="ui-gmap-canvas"></div>');

			// Figure out the initial view and construct the googlemap
			var opts = parseLatLngZoom($this.attr('data-initial-view'));
			opts.mapTypeId = google.maps.MapTypeId.ROADMAP;
			opts.zoomControlOptions = {
				  position: google.maps.ControlPosition.LEFT_CENTER
			};
			var $canvas = $this.find('.ui-gmap-canvas');
			var map = new google.maps.Map($canvas.get(0), opts);
			$this.data(pluginName + '.map', map);

			if (config.autoAddMarkers) {
				$(this).gmap('addMarkersFromDOM');
			}

			// propagate resize events
			$canvas.resize(function(e) {
				google.maps.event.trigger(map, 'resize');
			});

			// ideally we would like to say: "resize the map if it or any parent goes from hidden->visible"
			// but we don't have that event available, so the caller needs to be responsible for now
		},
		addMarkersFromDOM: function() {
			var data = [];

			$('[data-marker-info]').each(function() {
				try {
					var pos = parseLatLng($(this).attr('data-marker-info'));
					data.push({ position: pos,
						title: $(this).find('.ui-gmap-marker-title').html(),
						content: $(this).find('.ui-gmap-marker-info').andSelf().filter('.ui-gmap-marker-info').clone().get(0)
					});
				}
				catch (e) {
					console.log(e);
				}
			});

			var config = $(this).data(pluginName);
			var map = $(this).data(pluginName + '.map');
			var bounds = $(this).gmap('addMarkers', data);
			if (!bounds.isEmpty()) {
				var span = bounds.toSpan();
				if (span.lat() < 0.0001 || span.lng() < 0.0001) {
					map.setCenter(bounds.getCenter());
					map.setZoom(config.zoomForSingleMarker);
				}
				else {
					map.fitBounds(bounds);
				}
			}
		},
		addMarkers: function(data) {
			var config = $(this).data(pluginName);
			var map = $(this).data(pluginName + '.map');
			var bounds = new google.maps.LatLngBounds();
			var info = new InfoBox({
				boxStyle: {
					border: "1px solid black",
					background: "white",
	                width: "220px",
	                padding: "5px"
	            }
	            ,closeBoxURL: "http://maps.google.com/mapfiles/close.gif"
			});

			// Feel free to make lat/lng dynamic
			var lat="44.80";
			var lon = "-93.16";
			if (lat && lon) {
				var myLocation = new google.maps.LatLng(lat, lon);
				new google.maps.Marker({ map:map, position:myLocation, icon:"http://labs.google.com/ridefinder/images/mm_20_green.png" });
				bounds.extend(myLocation);
			}

			$.each(data, function(i) {
				var icon = "http://maps.google.com/mapfiles/marker.png";
				var marker = new google.maps.Marker({ map:map, position:this.position, title:this.title, icon:icon });
				var content = this.content;
				if (content) {
					google.maps.event.addListener(marker, 'click', (function(map, marker, content) { return function() {
						info.setContent($(content).html());
						info.open(map, marker);
					};})(map, marker, content));
				}
				bounds.extend(this.position);
			});
			return bounds;
		}
	};

	var defaultConfig = {
		autoAddMarkers: true,
		zoomForSingleMarker: 15,
		infoWindowConfig: { maxWidth: 175 }
	};

	$.fn[pluginName] = function() {
		if (arguments.length == 0) {
			var config = $.extend({}, defaultConfig);
			$(this).each(function() {
				commands.init.call(this, config);
			});
			return this;
		}
		if (arguments.length == 1 && $.isPlainObject(arguments[0])) {
			var config = $.extend({}, defaultConfig, arguments[0]);
			$(this).each(function() {
				commands.init.call(this, config);
			});
			return this;
		}
		var cmd = commands[arguments[0]];
		if ($.isFunction(cmd)) {
			var args = [];
			for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
			return cmd.apply(this, args);
		}
		else {
			alert('Function '+arguments[0]+' is not supported by the '+pluginName+' plugin.');
		}
		return this;
	};
})(jQuery);
