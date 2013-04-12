//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Styling to responsively position forms and labels based on screen width and add visual separation
//>>label: Fieldcontainers
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.fieldcontain.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// filter function removes whitespace between label and form element so we can use inline-block (nodeType 3 = text)
$.fn.fieldcontain = function(/* options */) {
	return this
		.addClass( "ui-field-contain ui-body ui-br" )
		.contents().filter( function() {
			return ( this.nodeType === 3 && !/\S/.test( this.nodeValue ) );
		}).remove();
};

//auto self-init widgets
$.mobile._enhancer.add( "mobile.fieldcontain", undefined, function( target ) {
	$( ":jqmData(role='fieldcontain')", target ).jqmEnhanceable().fieldcontain();
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
