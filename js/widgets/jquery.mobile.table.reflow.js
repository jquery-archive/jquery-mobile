//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to reflow on narrower screens
//>>label: Table: reflow
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.reflow.css


define( [ "jquery", "./jquery.mobile.table" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.table.prototype.options.mode = "reflow";

$.mobile.table.prototype.options.classes = $.extend(
   $.mobile.table.prototype.options.classes,
   {
      cellLabels: "ui-table-cell-label",
      reflowTable: "ui-table-reflow"
   }
);

$( document ).delegate( ":jqmData(role='table')", "tablecreate", function() {

   var $table = $( this ),
      self = $table.jqmData( "table" ),
      o = self.options;

   if( o.mode !== "reflow" ){
      return;
   }

   self.element.addClass( o.classes.reflowTable );

   var id = ( $table.attr( "id" ) || self.options.classes.popup ); //TODO BETTER FALLBACK ID HERE
         
   // create the hide/show toggles
   self._headers.each(function(i){

      $( this ).jqmData( "cells" ).prepend( "<b aria-hidden='true' class='" + o.classes.cellLabels + "'>" + $(this).text() + "</b>"  );
   });

});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
