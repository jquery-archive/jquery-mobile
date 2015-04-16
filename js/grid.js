/*!
 * jQuery Mobile Grid @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Grid Layouts (Columns)
//>>group: Widgets
//>>description: Applies classes for creating grid or column styling.
//>>docs: http://api.jquerymobile.com/grid-layout/
//>>demos: http://demos.jquerymobile.com/@VERSION/grids/
//>>css.structure:../css/structure/jquery.mobile.grid.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.fn.grid = function( options ) {
	return this.each( function() {

		var $this = $( this ),
			o = $.extend( {
				grid: null
			}, options ),
			$kids = $this.children(),
			gridCols = { solo: 1, a: 2, b: 3, c: 4, d: 5 },
			grid = o.grid,
			iterator,
			letter;

		if ( !grid ) {
			if ( $kids.length <= 5 ) {
				for ( letter in gridCols ) {
					if ( gridCols[ letter ] === $kids.length ) {
						grid = letter;
					}
				}
			} else {
				grid = "a";
				$this.addClass( "ui-grid-duo" );
			}
		}
		iterator = gridCols[ grid ];

		$this.addClass( "ui-grid-" + grid );

		$kids.filter( ":nth-child(" + iterator + "n+1)" ).addClass( "ui-block-a" );

		if ( iterator > 1 ) {
			$kids.filter( ":nth-child(" + iterator + "n+2)" ).addClass( "ui-block-b" );
		}
		if ( iterator > 2 ) {
			$kids.filter( ":nth-child(" + iterator + "n+3)" ).addClass( "ui-block-c" );
		}
		if ( iterator > 3 ) {
			$kids.filter( ":nth-child(" + iterator + "n+4)" ).addClass( "ui-block-d" );
		}
		if ( iterator > 4 ) {
			$kids.filter( ":nth-child(" + iterator + "n+5)" ).addClass( "ui-block-e" );
		}
	} );
};

return $.fn.grid;

} );
