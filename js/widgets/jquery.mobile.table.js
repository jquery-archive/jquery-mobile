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
      btnText: "Show colums...",
      persist: "persist", // specify a class assigned to column headers (th) that should always be present; the script not create a checkbox for these columns
      initSelector: ":jqmData(role='table')"
    },
 
    _create: function() {
      var self = this,
         o = self.options,
         $table = self.element,
         $thead = $table.find( "thead" ),
         $tbody = $table.find( "tbody" ),
         $hdrCols = $thead.find( "th:not(." + o.persist + ")" ),
         $bodyRows = $tbody.find( "tr" ),
         $menuButton = $( "<a href='#jqm-table-menu'>" + o.btnText + "</a>" ),
         $popup = $( "<div id='jqm-table-menu'></div>"),
         $menu = $("<ul />").appendTo( $popup );

      // create the hide/show toggles
      $hdrCols.each(function(i){
         var $li = $( "<li></li>" ),
            $check = $("<label><input type='checkbox' checked />" + $( this ).text() + "</label>" );
         
         $check
            .appendTo( $li )
            .children( 0 )
            .jqmData( "th", $( this ) )
            .checkboxradio();

          $li.appendTo( $menu );
      });

      $popup.insertBefore( $table );

   },


   _bindEvents: function(){
      // bind event to this.element that listens for a change event, 
      //and finds an input's TH by the check input's jqmData
   
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

