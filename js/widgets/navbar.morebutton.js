//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: navbar morebutton extension.
//>>label: NavbarMoreButton
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./navbar", "./popup" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.navbar, {

    options: {
        morebutton: false,
        morebuttontext: "..."
    },

    _create: function() {
        if (this.options.morebutton) {
            $.extend(this, {
                _createNavRows: function() {}
            });
            this._createNavPopup();
        }
        this._super();
    },

    _id: function() {
        return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
    },

    _createNavPopup: function(){
        var $navbar = this.element,
            $navbtns = $navbar.find( "a" ),
            $navitems = $navbar.find( "li" ),
            numbuttons = $navbtns.length,
            maxbutton = this.options.maxbutton,
            iconpos = this.option.iconpos,
            $popupDiv,
            $popupNav,
            morebtn,
            pos,
            btn,
            id;

        id = this._id() + "-popup";
        $popupDiv = $( "<div class='ui-navbar-popup' id='" + id + "'></div>" );
        $popupNav = $( "<ul class='ui-navbar-popupnav'>" )
            .appendTo( $popupDiv );

        // enhance buttons and move to new rows
        for( pos = 0; pos < numbuttons; pos++ ) {
            btn = $navitems.eq(pos);
            this._makeNavButton(btn.find("a"), iconpos);
            if (pos + 1 === maxbutton) {
                morebtn = $( "<li></li>" ).append(
                                 $( "<a></a>" )
                                    .attr( "href", "#" + id)
                                    .attr( "data-rel", "popup" )
                                    .addClass( "ui-btn" )
                                    .html( this.options.morebuttontext ));
                $navbar.find( "ul" ).first().append( morebtn );

            }
            if ( pos + 1 >= maxbutton ) {
                btn.detach();
                $popupNav.append( btn );
            }
            $popupNav.listview();
           
        }
        $popupDiv.appendTo( $navbar );
        $popupDiv.popup();
    }
});
  
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
