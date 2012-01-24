//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Corner-rounding for groups of buttons, checks, radios, etc
//>>label: Controlgroups

define( [ "jquery", "./jquery.mobile.buttonMarkup" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.fn.controlgroup = function( options ) {

	return this.each(function() {

		var $el = $( this ),
			o = $.extend({
						direction: $el.jqmData( "type" ) || "vertical",
						shadow: false,
						excludeInvisible: true
					}, options ),
			groupheading = $el.children( "legend" ),
			flCorners = o.direction == "horizontal" ? [ "ui-corner-left", "ui-corner-right" ] : [ "ui-corner-top", "ui-corner-bottom" ],
			type = $el.find( "input" ).first().attr( "type" );

		// Replace legend with more stylable replacement div
		if ( groupheading.length ) {
			$el.wrapInner( "<div class='ui-controlgroup-controls'></div>" );
			$( "<div role='heading' class='ui-controlgroup-label'>" + groupheading.html() + "</div>" ).insertBefore( $el.children(0) );
			groupheading.remove();
		}

		$el.addClass( "ui-corner-all ui-controlgroup ui-controlgroup-" + o.direction );

		// TODO: This should be moved out to the closure
		// otherwise it is redefined each time controlgroup() is called
		function flipClasses( els ) {
			els.removeClass( "ui-btn-corner-all ui-shadow" )
				.eq( 0 ).addClass( flCorners[ 0 ] )
				.end()
				.last().addClass( flCorners[ 1 ] ).addClass( "ui-controlgroup-last" );
		}

		flipClasses( $el.find( ".ui-btn" + ( o.excludeInvisible ? ":visible" : "" ) ) );
		flipClasses( $el.find( ".ui-btn-inner" ) );

		if ( o.shadow ) {
			$el.addClass( "ui-shadow" );
		}
	});
};

// The pagecreate handler for controlgroup is in jquery.mobile.init because of the soft-dependency on the wrapped widgets

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
