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

      var self = this;

      this.element.addClass( this.options.classes.table );

      this._headtrs = this.element.find( "thead tr:eq(0)" );
      this._headers = this._headtrs.find( "th" );

      var coltally = 0;

      self._headers.each(function( i ){
        coltally++;
        var span = parseInt( $( this ).attr( "colspan" ), 10 ),
          sel = ":nth-child(" + (coltally + 1) + ")";

        if( span ){
          for( var j = 0; j < span; j++ ){
            coltally++;
            sel += ", :nth-child(" + (coltally + 1) + ")";
          }
        }

        $( this )
          .jqmData( "cells", self.element.find( "tbody tr" ).children( sel ) );
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

