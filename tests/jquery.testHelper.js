/*
 * mobile support unit tests
 */

(function( $ ) {
	$.testHelper = {
		excludeFileProtocol: function(callback){
			var message = "Tests require script reload and cannot be run via file: protocol";

			if ( location.protocol == "file:" ) {
				test(message, function(){
					ok(false, message);
				});
			} else {
				callback();
			}
		},

		reloadCounts: {},

		reloadLib: function(libName){
			var lib = $("script[src$=" + libName + "]").clone(),
					src = lib.attr('src');

			if(this.reloadCounts[libName] === undefined) {
				this.reloadCounts[libName] = 0;
			}

			//NOTE append "cache breaker" to force reload
			lib.attr('src', src + "?" + this.reloadCounts[libName]++);
			$("body").append(lib);
		}
	};
})(jQuery);