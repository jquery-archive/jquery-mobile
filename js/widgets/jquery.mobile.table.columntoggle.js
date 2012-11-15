//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css


define( [ "jquery", "./jquery.mobile.table", "../jquery.mobile.buttonMarkup", "./popup", "../jquery.mobile.fieldContain", "../jquery.mobile.controlGroup" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "columntoggle";

$.mobile.table.prototype.options.columnBtnTheme = null;

$.mobile.table.prototype.options.columnPopupTheme = null;

$.mobile.table.prototype.options.columnBtnText = "Columns...";

$.mobile.table.prototype.options.classes = $.extend(
	$.mobile.table.prototype.options.classes,
	{
		popup: "ui-table-columntoggle-popup",
		columnBtn: "ui-table-columntoggle-btn",
		priorityPrefix: "ui-table-priority-",
		columnToggleTable: "ui-table-columntoggle"
	}
);

$( document ).delegate( ":jqmData(role='table')", "tablecreate", function() {

	var $table = $( this ),
		self = $table.data( "table" ),
		o = self.options;

	if( o.mode !== "columntoggle" ){
		return;
	}

	self.element.addClass( o.classes.columnToggleTable );

	var id = ( $table.attr( "id" ) || self.options.classes.popup ) + "-popup", //TODO BETTER FALLBACK ID HERE
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-rel='popup' data-mini='true'>" + o.columnBtnText + "</a>" ),
		$popup = $( "<div data-role='popup' data-role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>"),
		$menu = $("<fieldset data-role='controlgroup'></fieldset>").appendTo( $popup );

	// create the hide/show toggles
	self.headers.not( "td" ).each(function(){

		var priority = $( this ).jqmData( "priority" ),
			$cells = $( this ).add( $( this ).jqmData( "cells" ) );

		if( priority ){

			$cells.addClass( o.classes.priorityPrefix + priority );

			$("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
				.appendTo( $menu )
				.children( 0 )
				.jqmData( "cells", $cells )
				.checkboxradio({
					 theme: o.columnPopupTheme
				});
		}

	});

	// bind change event listeners to inputs - TODO: move to a private method?
	$menu.on( "change", "input", function( e ){
		if( this.checked ){
			$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-hidden" ).addClass( "ui-table-cell-visible" );
		}
		else {
			$( this ).jqmData( "cells" ).removeClass( "ui-table-cell-visible" ).addClass( "ui-table-cell-hidden" );
		}
	});

	$menuButton
		.insertBefore( $table )
		.buttonMarkup({
			theme: o.columnBtnTheme
		});

	$popup
		.insertBefore( $table )
		.popup();

	// refresh method
	self.refresh = function(){
		$menu.find( "input" ).each( function(){
			this.checked = $( this ).jqmData( "cells" ).eq(0).css( "display" ) === "table-cell";
			$( this ).checkboxradio( "refresh" );
		});
	};

	$( window ).on( "throttledresize", self.refresh );

	self.refresh();

});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
