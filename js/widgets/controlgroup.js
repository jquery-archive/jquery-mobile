//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>label: Controlgroups
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"jquery-ui/widget",
	"./widget.theme",
	"jquery-ui/controlgroup"
], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "ui.controlgroup", $.ui.controlgroup, {
	options: {
		enhanced: false,
		theme: null
	},

	_create: function() {
		this._super();
		this._on( this.document, {
			"pagecontainershow": function( event, ui ) {
				if ( $.contains( ui.toPage[ 0 ], this.element[ 0 ] ) ) {
					this.refresh();
				}
			}
		});
	},

	// Deprecated as of 1.5.0 and will be removed in 1.6.0
	// This method is no longer necessary since controlgroup no longer has a wrapper
	container: function() {
		return this.element;
	},

	_enhance: function() {
		if ( !this.options.enhanced ) {
			this._super();
		}
	}
});

$.widget( "ui.controlgroup", $.ui.controlgroup, $.mobile.widget.theme );

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
