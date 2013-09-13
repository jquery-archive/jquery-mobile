define([
	"./shared",
	"jquery.mobile"
], function( shared, jqm ){
	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one( "mobileinit", function(){
		shared.ns = $.mobile.ns;
		shared.page = $.mobile.page;

		$.mobile.loader.prototype.options.text = "mobileinit";
		$.mobile.loader.prototype.options.textVisible = true;
	});
})