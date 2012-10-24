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
      columnBtnText: "Columns...",
      initSelector: ":jqmData(role='table')"
    },
 
    _create: function() {
      var self = this,
         o = self.options,
         $table = self.element,
         $thead = $table.find( "thead" ),
         $tbody = $table.find( "tbody" ),
         $bodyRows = $tbody.find( "tr" ),
         id = ( $table.attr( "id" ) || "ui-table" ) + "-popup", //TODO BETTER ID HERE
         $menuButton = $( "<a href='#" + id + "' class='ui-table-column-btn' data-rel='popup'>" + o.columnBtnText + "</a>" ),
         $popup = $( "<div data-role='popup' data-role='fieldcontain' class='ui-table-column-popup' id='" + id + "'></div>"),
         $menu = $("<fieldset data-role='controlgroup'></fieldset>").appendTo( $popup );

      // create the hide/show toggles
      $thead.find( "th" ).each(function(i){

         var priority = $( this ).jqmData( "priority" );

         if( priority !== "persist" ){

            var $cells = $( this ).add( $bodyRows.children( ":nth-child(" + (i + 1) + ")" ) );

            $cells.addClass( "ui-table-priority-" + priority );

            $("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" )
               .appendTo( $menu )
               .children( 0 )
               .jqmData( "cells", $cells )
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

      var self = this;

      this._menu.on( "change", "input", function( e ){
         if( this.checked ){
            $( this ).jqmData( "cells" ).removeClass( "ui-table-cell-hidden" ).addClass( "ui-table-cell-visible" );
         }
         else {
            $( this ).jqmData( "cells" ).removeClass( "ui-table-cell-visible" ).addClass( "ui-table-cell-hidden" );
         }
      } );

      $( window ).on( "throttledresize", function(){
         self._menu.find( "input" ).each( function(){
               this.checked = $( this ).jqmData( "cells" ).eq(0).is( ":visible" );
               $( this ).checkboxradio( "refresh" );
         } );
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

