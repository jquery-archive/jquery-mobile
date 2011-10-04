/*
* jQuery Mobile Framework : "degradeInputs" plugin - degrades inputs to another type after custom enhancements are made.
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function( $, undefined ) {

$.mobile.page.prototype.options.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};

$.mobile.page.prototype.options.keepNative = ":jqmData(role='none'), :jqmData(role='nojs')";


//auto self-init widgets
$( document ).bind( "pagecreate enhance", function( e ){
	
	var page = $( e.target ).data( "page" ),
		o = page.options;
	
	// degrade inputs to avoid poorly implemented native functionality
	$( e.target ).find( "input" ).not( o.keepNative ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = o.degradeInputs[ type ] || "text";

		if ( o.degradeInputs[ type ] ) {
			var html = $( "<div>" ).html( $this.clone() ).html(),
				// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
				hasType = html.indexOf( " type=" ) > -1,
				findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/,
				repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});
	
});

})( jQuery );