(function(Perf) {
	var $listPage = $( "#list-page" ), firstCounter = 0;

	Perf.setCurrentRev();
	Perf.pageLoadStart = Date.now();

	$( document ).bind( "mobileinit", function() {
		Perf.pageProcessingStart = Date.now();
	});

	$listPage.live( "pagebeforecreate", function() {
		if( firstCounter == 0 ) {
			Perf.pageCreateStart = Date.now();
			firstCounter++;
		}
	});

	$listPage.live( "pagecreate", function( event ) {
		if( event.target !== $("#list-page")[0] ){
			return;
		}

		Perf.pageEnhanceStart = Date.now();
	});

	$listPage.live( "pageinit", function( event ) {
		// if a child page init is fired ignore it, we only
		// want the top level page init event
		if( event.target !== $("#list-page")[0] ){
			return;
		}

		Perf.pageLoadEnd = Date.now();

		// report the time taken for a full app boot includes the time for
		// the jquery mobile js to load
		Perf.report({
			datapoint: "fullboot",
			value: Perf.pageLoadEnd - Perf.pageLoadStart
		});

		// report the time taken for the first page to be enhanced
		// pagecreate -> pageinit
		Perf.report({
			datapoint: "enhancement",
			value: Perf.pageLoadEnd - Perf.pageEnhanceStart
		});

		// report the time taken for the page to process. does *not*
		// inclue the load time for js
		// mobileinit -> pageinit
		Perf.report({
			datapoint: "pageprocessing",
			value: Perf.pageLoadEnd - Perf.pageProcessingStart
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
