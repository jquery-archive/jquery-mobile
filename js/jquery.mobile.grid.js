/*
* jQuery Mobile Framework : plugin for creating CSS grids
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/ 
(function( $, undefined ) {
$.fn.grid = function(options) {
	return this.each(function() {
		var o = $.extend({
				grid: null 
			}, options),
			$this = $( this ),
			$kids = $this.children(),
			kidlen = $kids.length,
			gridCols = [ "solo", "a", "b", "c", "d" ],
			grid = o.grid || ( kidlen < 6 ? gridCols[ kidlen - 1 ] : "a" ),
			iterator = kidlen < 6 ? kidlen : 2 ;

		$this.addClass( "ui-grid-" + grid );

		// iterator 0 or 1
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

	});
};
})(jQuery);
