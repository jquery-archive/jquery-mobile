//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Deprecated popup features
//>>label: Popups
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

define( [
	"jquery",
	"./widget.backcompat",
	"./popup" ], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

( function( $ ) {

$.widget( "mobile.popup", $.mobile.popup, {
	options: {
		wrapperClass: null,
		shadow: true,
		corners: true
	},
	classProp: "ui-popup"
} );

$.widget( "mobile.popup", $.mobile.popup, $.mobile.widget.backcompat );

$.mobile.popup.prototype._boolOptions.shadow = "ui-overlay-shadow";

} )( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

