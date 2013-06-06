//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>label: Flip Switch
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.flip.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.zoom", "./reset", "../../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.flipswitch", $.mobile.widget, $.extend({
	options: {
		onText: "On",
		offText: "Off",
		theme: "a"
	},
	_create: function(){
		var flipswitch = $("<div>");
			on = $("<span tabindex='1'>"),
			off = $("<span>"),
			type = this.element.get(0).tagName,
			onText = ( type === "INPUT")? this.options.onText:this.element.find("option").eq(0).text(),
			offText = ( type === "INPUT")? this.options.onText:this.element.find("option").eq(1).text();

			on.addClass("ui-flipswitch-on ui-btn ui-shadow ui-btn-"+this.options.theme).text( onText );
			off.addClass("ui-flipswitch-off").text( offText );
			flipswitch.addClass("ui-flipswitch ui-shadow-inset ui-bar-inherit ui-corner-all ui-bar-"+this.options.theme).append( on, off );
			this.element.addClass("ui-flipswitch-input");
			this.element.after( flipswitch );
			$.extend( this, {
				flipswitch:flipswitch,
				on:on,
				off:off,
				type:type
			});

			this._on( flipswitch, {
				"click": "_toggle"+type,
				"swipe": "_toggle"+type
			});
	},
	_toggleINPUT: function(){
		this.element.toggleClass("ui-flipswitch-active").prop("checked", function(idx,attr){
            return !attr;
        });
	},
	_toggleSELECT: function(){
		var index = this.element.get(0).selectedIndex;
		this.element.toggleClass("ui-flipswitch-active").get(0).selectedIndex = ( index > 0 )? 0:1;

	},
	refresh: function(){

	},
	_setOptions: function(){

	}
}, $.mobile.behaviors.formReset ) );

$.mobile.flipswitch.initSelector = ":jqmData(role='flipswitch')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.flipswitch" );
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");