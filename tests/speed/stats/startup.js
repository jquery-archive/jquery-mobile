(function(Perf) {
	var $listPage = $( "#list-page" ), firstCounter = 0;

	Perf.setCurrentRev();
	Perf.pageLoadStart = Date.now();

	$listPage.live( "pagebeforecreate", function() {
		if( firstCounter == 0 ) {
			Perf.pageCreateStart = Date.now();
			firstCounter++;
		}
	});

	$listPage.live( "pageinit", function( event ) {
		// if a child page init is fired ignore it, we only
		// want the top level page init event
		if( event.target !== $("#list-page")[0] ){
			return;
		}

		Perf.pageLoadEnd = Date.now();

		// report the time taken for a full app boot
		Perf.report({
			datapoint: "fullboot",
			value: Perf.pageLoadEnd - Perf.pageLoadStart
		});

		// record the time taken to load and enhance the page
		// start polling for a new revision
		Perf.report({
			datapoint: "pageload",
			value: Perf.pageCreateStart - Perf.pageLoadStart,
			after: function() {
				Perf.poll();
			}
		});
	});
})(window.Perf);
