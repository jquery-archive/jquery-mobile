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

   var id = ( $table.attr( "id" ) || self.options.classes.popup ),//TODO BETTER FALLBACK ID HERE
      reverseHeaders =  $( self.allHeaders.get().reverse() );
         
   // create the hide/show toggles
   reverseHeaders.each(function(i){
      var $cells = $( this ).jqmData( "cells" ),
         hierarchyClass = $cells.not( this ).filter( "thead th" ).length ? " ui-table-cell-label-top" : "",
         text = $(this).text();

      if( text !== ""  ){
         $cells
            
            .filter("tbody tr td:first" )
            .prepend( "<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );

      }
   });

});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
