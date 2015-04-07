//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define([
	"jquery",
	"../widget.theme",
	"../widget.backcompat",
	"./textinput"
	], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			corners: true,
			mini: false,
			wrapperClass: null
		},
		classProp: "ui-textinput"
	});
	$.widget( "mobile.textinput", $.mobile.textinput, $.mobile.widget.backcompat );
}

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
