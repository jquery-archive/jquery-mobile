//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds Theme option to widgets
//>>label: Widget Theme
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../core",
	"../widget"
	], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.widget.theme = {
	_create: function() {
		this._super();
		if ( !this.options.enhanced && this.options.theme ) {
			this.widget().addClass( "ui-theme-" + this.options.theme );
		}
	},

	_setOption: function( key, value ) {
		if ( key === "theme" && this.options.theme ) {
			this.widget()
				.removeClass( "ui-theme-" + this.options.theme )
				.addClass( "ui-theme-" + value );
		}
		this._superApply ( arguments );
	}
};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
