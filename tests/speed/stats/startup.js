(function(Perf) {
	var $listPage = $( "#list-page" );

	Perf.setCurrentRev();
	Perf.pageLoadStart = Date.now();

	$listPage.live( "pagebeforecreate", function() {
		Perf.pageCreateStart = Date.now();
	});

	$listPage.live( "pageinit", function() {
		Perf.pageLoadEnd = Date.now();

		// report the time taken for a full app boot
		Perf.report({
			agent: window.navigator.userAgent,
			datapoint: "fullboot",
			value: Perf.pageLoadEnd - Perf.pageLoadStart
		});

		// record the time taken to load and enhance the page
		// start polling for a new revision
		Perf.report({
			agent: window.navigator.userAgent,
			datapoint: "pageload",
			value: Perf.pageCreateStart - Perf.pageLoadStart,
			after: function() {
				Perf.poll();
			}
		});
	});
})(window.Perf);
