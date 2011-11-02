window.Perf = (function($, Perf) {
	$.extend(Perf, {
		reportUrl: 'stats/',
		revUrl: 'stats/rev.php',

		// should be defined before report or poll are run
		currentRev: undefined,

		report: function( data, after ) {
			var self = this;

			$.post( self.reportUrl, data, after );
		},

		poll: function() {
			var self = this;

			setInterval(function() {
				$.get( self.revUrl, function( data ) {

					// if there's a new revision refresh or currentRev isn't being set
					if( self.currentRev && self.currentRev !== data ){
						location.href = location.href;
					}
				});
			}, 60000);
		},

		setCurrentRev: function() {
			var self = this;

			$.get( self.revUrl, function( data ) {
				self.currentRev = data;
			});
		}
	});

	var $listPage = $( "#list-page" );

	Perf.setCurrentRev();
	Perf.pageLoadStart = Date.now();

	$listPage.live( "pagebeforecreate", function() {
		Perf.pageCreateStart = Date.now();
	});

	$listPage.live( "pageinit", function(){
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

	return Perf;
})(jQuery, window.Perf || {});
