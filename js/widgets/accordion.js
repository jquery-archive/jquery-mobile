//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Displays collapsible content panels for presenting information in a limited space.
//>>label: Accordion
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.accordion.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget",
			"widget.theme",
			"jquery-ui/accordion" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "ui.accordion", $.ui.accordion, {
	options: {
		theme: null
	}
});

$.widget( "ui.accordion", $.ui.accordion, $.mobile.widget.theme );

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
