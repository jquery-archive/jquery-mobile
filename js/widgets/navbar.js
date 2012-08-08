//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Formats groups of links as horizontal navigation bars.
//>>label: Navbars
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css


define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.buttonMarkup", "../jquery.mobile.grid" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.widget, {
	options: {
		iconpos: "top",
		grid: null,
		initSelector: ":jqmData(role='navbar')"
	},

	_create: function() {

		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ?
									this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar ui-mini" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable()
			.grid({ grid: this.options.grid });

		$navbtns.buttonMarkup({
			corners:	false,
			shadow:		false,
			inline:     true,
			iconpos:	iconpos
		});

		$navbar.delegate( "li", "vclick", function( event ) {

			// if the vclick was triggered on an anchor or the child
			// of an anchor (eg, ui-btn), grab the parent link
			var $link = $(event.target).closest( "a" );

			// if there isn't a parent link find the child link and trigger a click
			// this addresses Issue #4663 where the events are being triggered
			// on the parent element in fixed position navbars
			if( !$link.length ){
				$link = $( this ).children( "a" ).first();
				setTimeout(function() {
					$link.trigger( "click" );
				});

				return false;
			}

			// clear existing active button states
			$navbtns.removeClass( $.mobile.activeBtnClass );

			// if the target button isn't disabled
			if ( !$link.hasClass( "ui-disabled" ) ) {
				$link.addClass( $.mobile.activeBtnClass );
			}
		});

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.navbar.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
