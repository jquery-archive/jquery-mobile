/*
 * mobile core url unit tests
 */

(function( $ ) {
	var libName = "jquery.mobile.core.js",
	    currentLocation = location.href,

			addHash = function(){
				var loc = location.href;
				if(!isHashed()){
					location.href = loc + "#mock.html";
				}
			},

			isHashed = function(url){
				if(url === undefined){
					url = location.href;
				}

				return url.match(/#/);
			};

	//NOTE if the page is refreshed or otherwise has a hashtag remove it
	//     befor running the tests
	if(isHashed()){
		location.href = location.href.replace(/#.+/, '');
	}

	module(libName);

	$.testHelper.excludeFileProtocol(function(){
		test( "getPathDir removes hash tags from base url when reset", function(){
			$.testHelper.reloadLib(libName);
			addHash();
			ok(!isHashed($("base").attr("href")));
		});
	});
})(jQuery);
