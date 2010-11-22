/*
 * mobile support unit tests
 */

(function( $ ) {
	$.testHelper = {
		excludeFileProtocol: function(callback){
			var message = "Tests require script reload and cannot be run via file: protocol";
			//NOTE alert tester that running the file locally will not work for these tests
			if ( location.protocol == "file:" ) {
				test(message, function(){
					ok(false, message);
				});
			} else {
				callback();
			}
		}
	};
})(jQuery);