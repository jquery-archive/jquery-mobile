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

      self._headers = this.element.find( "thead th" );

      self._headers.each(function( i ){
         $( this ).jqmData( "cells", self.element.find( "tbody tr" ).children( ":nth-child(" + (i + 1) + ")" ) );
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

