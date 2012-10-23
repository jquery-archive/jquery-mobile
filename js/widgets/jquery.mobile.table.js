//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.buttonMarkup", "./page", "./page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.widget, {
 
    options: {
      btnText: "Columns...",
      persist: "persist", // specify a class assigned to column headers (th) that should always be present; the script not create a checkbox for these columns
      initSelector: ":jqmData(role='table')"
    },
 
    _create: function() {
      var self = this,
         o = self.options,
         $table = self.element,
         $thead = $table.find( "thead" ),
         $tbody = $table.find( "tbody" ),
         $hdrCols = $thead.find( "th" ),
         $bodyRows = $tbody.find( "tr" ),
         id = $table.attr( "id" ) || "ui-table-menu", //TODO BETTER ID HERE
         $menuButton = $( "<a href='#" + id + "' class='ui-table-column-btn' data-rel='popup'>" + o.btnText + "</a>" ),
         $popup = $( "<div data-role='popup' data-role='fieldcontain' class='ui-table-column-popup' id='" + id + "'></div>"),
         $menu = $("<fieldset data-role='controlgroup'></fieldset>").appendTo( $popup );

      // create the hide/show toggles
      $hdrCols.each(function(i){
         if( !$( this ).is( "." + o.persist ) ){
            $("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
               .appendTo( $menu )
               .children( 0 )
               .jqmData( "cells", $( this ).add( $bodyRows.children( ":nth-child(" + (i + 1) + ")" ) ) )
               .checkboxradio();
         }
      });



      $menuButton
         .insertBefore( $table )
         .buttonMarkup();

      $popup
         .insertBefore( $table )
         .popup();

      this._menu = $menu;

      this.element.addClass( "ui-table" );

      this._bindEvents();

   },


   _bindEvents: function(){
      this._menu.on( "change", "input", function( e ){
         console.log($( this ).jqmData( "cells" ))
         $( this ).jqmData( "cells" )[ this.checked ? "removeClass" : "addClass" ]( "ui-table-cell-hidden" );
      } );
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

