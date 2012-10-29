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
        trs = this.element.find( "thead tr" );

      this.element.addClass( this.options.classes.table );


      self.headers = trs.eq(0).children();
      self.allHeaders = trs.children();

      trs.each(function(){

        var coltally = 0;

        $( this ).children().each(function( i ){

          var span = parseInt( $( this ).attr( "colspan" ), 10 ),
            sel = ":nth-child(" + (coltally + 1) + ")";

          if( span ){
            for( var j = 0; j < span-1; j++ ){
              coltally++;
              sel += ", :nth-child(" + (coltally + 1) + ")";
            }
          }

          $( this ).jqmData( "cells", self.element.find( "tr" ).not( trs.eq(0) ).not( this ).children( sel ) );

          coltally++;
        });


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

