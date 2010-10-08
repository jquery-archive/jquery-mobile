(function() {
	var defaults = [
		{
			type: "currency",
			from: "USD",
			to: "EUR"
		}
		// TODO add back in as defaults once its possible to add other conversions, not just currencies
		/*,
		{
			type: "distance",
			from: "Miles",
			to: "Kilometer",
			rate: 1.609344
		},
		{
			type: "distance",
			from: "inch",
			to: "centimeter",
			rate: 2.54
		}*/
	];
	
	// TODO fallback to whatever else when localStorage isn't available
	function get() {
		return JSON.parse(localStorage.getItem("conversions"));
	}
	function set(value) {
		window.console && console.log && console.log("storing conversion: "+ JSON.stringify(value))
		localStorage.setItem("conversions", JSON.stringify(value));
	}
	
	var conversions = get("conversions");
	if (!conversions) {
		conversions = $.extend([], defaults);
		set(conversions);
	}
	window.conversions = {
		store: function() {
			set(conversions);
		},
		all: function() {
			return conversions;
		},
		clear: function() {
			conversions.length = 0;
			this.store();
		},
		restore: function() {
			conversions.length = 0;
			$.extend(conversions, defaults);
			this.store();
		},
		remove: function(tofrom) {
			$.each(conversions, function(index, conversion) {
				if ((conversion.from + conversion.to) == tofrom) {
					conversions.splice(index, 1);
					return false;
				}
			});
			this.store();
		}
	};
	
})();
