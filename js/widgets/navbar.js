//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Formats groups of links as horizontal navigation bars.
//>>label: Navbars
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css


define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.grid", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", {
	options: {
		iconpos: "top",
		grid: null
	},

	_create: function() {

		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ? this.options.iconpos : undefined,
			classes = "ui-btn";

		$navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable()
			.grid({ grid: this.options.grid });

		$navbtns
			.each( function() {
				var icon = $.mobile.getAttribute( this, "icon", true ),
					theme = $.mobile.getAttribute( this, "theme", true );

				if ( theme ) {
					classes += " ui-btn-" + theme;
				}
				if ( icon ) {
					classes += " ui-icon-" + icon + " ui-btn-icon-" + iconpos;
				}
				$( this ).addClass( classes );
			});

		$navbar.delegate( "a", "vclick", function( /* event */ ) {
			var activeBtn;

			if ( !$( this ).is( ".ui-disabled, .ui-btn-active" ) ) {
				$navbtns.removeClass( $.mobile.activeBtnClass );
				$( this ).addClass( $.mobile.activeBtnClass );

				// The code below is a workaround to fix #1181
				activeBtn = $( this );

				$( document ).one( "pagehide", function() {
					activeBtn.removeClass( $.mobile.activeBtnClass );
				});
			}
		});

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	}
});

$.mobile.navbar.initSelector = ":jqmData(role='navbar')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.navbar" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
