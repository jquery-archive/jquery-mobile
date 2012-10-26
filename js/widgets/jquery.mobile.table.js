//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.widget, {
 
    options: {
      columnBtnText: "Columns...",
      classes: {
         table: "ui-table"
      },
      initSelector: ":jqmData(role='table')"
    },
 
    _create: function() {

      var self = this,
        coltally = 0,
        firstTR = this.element.find( "tr:eq(0)" );

      this.element.addClass( this.options.classes.table );

      this._headers = firstTR.children();



      self._headers.each(function( i ){

          var span = parseInt( $( this ).attr( "colspan" ), 10 ),
            sel = ":nth-child(" + (coltally + 1) + ")";

          if( span ){
            for( var j = 0; j < span-1; j++ ){
              coltally++;
              sel += ", :nth-child(" + (coltally + 1) + ")";
            }
          }

          $( this ).jqmData( "cells", self.element.find( "tr" ).not( firstTR ).children( sel ) );

          coltally++;
      });

   }
    
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
   $.mobile.table.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

