//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Changes input type to another after custom enhancements are made (ex. range > numeric).
//>>label: Degrade Inputs
//>>group: Utilities

define( [ "jquery", "./widgets/page" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.degradeInputs = {
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
// Backcompat remove in 1.5
$.mobile.page.prototype.options.degradeInputs = $.mobile.degradeInputs;

// Auto self-init widgets
$.mobile.degradeInputsWithin = function( target ) {

	target = $( target );

	// Degrade inputs to avoid poorly implemented native functionality
	target.find( "input" ).not( $.mobile.page.prototype.keepNativeSelector() ).each(function() {
		var element = $( this ),
			type = this.getAttribute( "type" ),
			optType = $.mobile.degradeInputs[ type ] || "text",
			html, hasType, findstr, repstr;

		if ( $.mobile.degradeInputs[ type ] ) {
			html = $( "<div>" ).html( element.clone() ).html();
			// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
			hasType = html.indexOf( " type=" ) > -1;
			findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/;
			repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			element.replaceWith( html.replace( findstr, repstr ) );
		}
	});

};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
