(function() {
	var defaults = [
		{
			type: "currency",
			from: "USD",
			to: "EUR"
		},
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
		}
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
		}
	};
	
})();
