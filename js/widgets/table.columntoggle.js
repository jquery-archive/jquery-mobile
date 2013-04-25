//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css


define( [
	"jquery",
	"./table",
	"../jquery.mobile.buttonMarkup",
	"./popup",
	"../jquery.mobile.fieldContain",
	"./controlgroup",
	"./forms/checkboxradio" ], function( jQuery ) {
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

$.mobile.document.delegate( ":jqmData(role='table')", "tablecreate refresh", function( e ) {
	
	var $table = $( this ),
		self = $table.data( "mobile-table" ),
		event = e.type,
		o = self.options,
		ns = $.mobile.ns,
		id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup", /* TODO BETTER FALLBACK ID HERE */
		$menuButton,
		$popup,
		$menu,
		$switchboard;

	if ( o.mode !== "columntoggle" ) {
		return;
	}

	if ( event !== "refresh" ) {
		self.element.addClass( o.classes.columnToggleTable );
	
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" ),
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>"),
		$menu = $("<fieldset data-" + ns + "role='controlgroup'></fieldset>");
	}
	
	// create the hide/show toggles
	self.headers.not( "td" ).each(function( i ) {

		var priority = $( this ).jqmData( "priority" ),
			$cells = $( this ).add( $( this ).jqmData( "cells" ) );

		if ( priority ) {

			$cells.addClass( o.classes.priorityPrefix + priority );

			if ( event !== "refresh" ) {
				$("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
					.appendTo( $menu )
					.children( 0 )
					.jqmData( "cells", $cells )
					.checkboxradio({
						theme: o.columnPopupTheme
					});
			} else {
				$( '#' + id + ' fieldset div:eq(' + i +')').find('input').jqmData( 'cells', $cells );
			}
		}
	});
	
	if ( event !== "refresh" ) {
		$menu.appendTo( $popup );
	}

	// bind change event listeners to inputs - TODO: move to a private method?
	if ( $menu === undefined ) {
		$switchboard = $('#' + id + ' fieldset');
	} else {
		$switchboard = $menu;
	}

	if ( event !== "refresh" ) {
    $switchboard.on( "change", "input", function( e ){
      self.update( $(this), true );
    });

		$menuButton
			.insertBefore( $table )
			.buttonMarkup({
				theme: o.columnBtnTheme
			});

		$popup
			.insertBefore( $table )
			.popup();
	}

  // toggle popup handler
  self.update = function( pass, override ){
    var elems = pass === true ? $switchboard.find( "input" ) : pass;

    elems.each(function(){
      var blocker;

      // manual toggling via popup "locks" columns
      if ( override ) {
        if (this.checked) {
          this.setAttribute("locked", "show");
        } else {
          this.setAttribute("locked", "hide");
        }
      }

      blocker = this.getAttribute("locked");

      if (blocker) {
        // override CSS and keep input as-is
        $( this ).jqmData( "cells" )[blocker]();
      } else {
        // update input status based on responsive CSS
        this.checked = $(this).jqmData( "cells" ).eq(0).css( "display" ) !== "none";
        $( this ).checkboxradio( "refresh" );
      }
    });
  };

  $.mobile.window.on( "throttledresize", function () { self.update(true) });

  self.update(true);

});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
