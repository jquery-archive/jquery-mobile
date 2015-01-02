//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Dynamic Base Tag Support
//>>label: Base Tag
//>>group: Navigation
define([
	"jquery",
	"./path",
	"./../ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, undefined ) {

	// existing base tag?
	var baseElement = $( "head" ).children( "base" ),

	// base element management, defined depending on dynamic base tag support
	// TODO move to external widget
	base = {

		// define base element, for use in routing asset urls that are referenced
		// in Ajax-requested markup
		element: ( baseElement.length ? baseElement :
			$( "<base>", { href: $.mobile.path.documentBase.hrefNoHash } ).prependTo( $( "head" ) ) ),

		// set the generated BASE element's href to a new page's base path
		set: function( href ) {

			// we should do nothing if the user wants to manage their url base
			// manually
			if ( !$.mobile.dynamicBaseEnabled ) {
				return;
			}

			// we should use the base tag if we can manipulate it dynamically
			base.element.attr( "href",
				$.mobile.path.makeUrlAbsolute( href, $.mobile.path.documentBase ) );
		},

		// set the generated BASE element's href to a new page's base path
		reset: function(/* href */) {

			if ( !$.mobile.dynamicBaseEnabled ) {
				return;
			}

			base.element.attr( "href", $.mobile.path.documentBase.hrefNoSearch );
		}
	};

	$.mobile.base = base;

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
