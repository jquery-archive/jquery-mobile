window.Perf = (function($, Perf) {
	$.extend(Perf, {
		reportUrl: 'stats/',
		revUrl: 'stats/rev.php',

		// should be defined before report or poll are run
		currentRev: undefined,

		agents: {
			ANDROID: "Android",
			WP: "Windows Phone OS"
		},

		vRegexs: {},

		report: function( data, after ) {
			$.extend(data, {
				pathname: location.pathname,
				agent: this.agent(),
				agentFull: window.navigator.userAgent,
				agentVersion: this.agentVersion()
			});

			$.post( this.reportUrl, data, after );
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
		},

		agent: function() {
			var agent = window.navigator.userAgent;

			for( name in this.agents ) {
				if( agent.indexOf( this.agents[name] ) > -1 ) {
					return this.agents[name];
				}
			}

			return agent;
		},

		agentVersion: function() {
			var agent = window.navigator.userAgent;

			agent.search(this.vRegexs[this.agent()] || "");

			return RegExp.$1 ? RegExp.$1 : "0.0";
		}
	});

	Perf.vRegexs[Perf.agents.ANDROID] = /([0-9].[0-9].[0-9]);/;
	Perf.vRegexs[Perf.agents.WP] = /Windows Phone OS ([0-9].[0-9]);/;

	return Perf;
})(jQuery, window.Perf || {});
