//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Used for boolean style inputs for on/off or true/false functionality
//>>label: Flip Switch
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.flipswitch.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget",
	"./flipswitch",
	"../widget.backcompat" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {


	$.widget( "mobile.flipswitch", $.mobile.flipswitch, {
		options: {
			
			// Deprecated in 1.5
			wrapperClass: null,
			corners: true,
			mini: false
		},

		classProp: "ui-flipswitch"

	});

$.widget( "mobile.flipswitch", $.mobile.flipswitch, $.mobile.widget.backcompat );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
