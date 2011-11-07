window.Perf = (function($, Perf) {
	$.extend(Perf, {
		reportUrl: 'stats/',
		revUrl: 'stats/rev.php',

		// should be defined before report or poll are run
		currentRev: undefined,

		report: function( data, after ) {
			var self = this;

			data.pathname = location.pathname;

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

	return Perf;
})(jQuery, window.Perf || {});
