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
        morebuttontext: "...",
        morebuttoniconpos: "top",
        morebuttonicon: null
    },

    _create: function() {

        this._super();
        if ( this.options.morebutton  && this.numButtons > this.maxButton) {
            this._createNavPopup();
        }
    },

    _id: function() {
        return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
    },

    _createNavRows: function () {
        if ( this.options.morebutton ) {
            return;
        }

        this._super();
    },

    _createNavPopup: function(){
        var popupDiv, popupNav, moreButton, pos, buttonItem, id,
            navItems = this.navbar.find( "li" ),
            buttonCount = navItems.length,
            maxButton = this.maxButton,
            iconpos = this.iconpos,
            icon = this.options.morebuttonicon,
            classes = "ui-btn";

        id = this._id() + "-popup";

        popupDiv = $( "<div class='ui-navbar-popup' id='" + id + "'></div>" );
        popupNav = $( "<ul class='ui-navbar-popupnav'>" )
            .appendTo( popupDiv );

        // enhance buttons and move to new rows
        for( pos = 0; pos < buttonCount; pos++ ) {
            buttonItem = navItems.eq(pos);
            this._makeNavButton(buttonItem.find("a"), iconpos);
            if (pos + 1 === maxButton) {
                if ( icon ) {
                    classes += " ui-icon-" + icon + " ui-btn-icon-" + this.options.morebuttoniconpos;
                }
                moreButton = $( "<li></li>" ).append(
                                 $( "<a></a>" )
                                    .attr( "href", "#" + id)
                                    .attr( "data-rel", "popup" )
                                    .addClass( classes )
                                    .html( this.options.morebuttontext ));
                this.navbar.find( "ul" ).first().append( moreButton );
            }
            if ( pos + 1 >= maxButton ) {
                buttonItem.detach();
                popupNav.append( buttonItem );
            }
            popupNav.listview();
           
        }
        popupDiv.appendTo( this.navbar );
        popupDiv.popup();

        $.extend(this, {
            moreButton: moreButton,
            popupDiv: popupDiv
        });
    },

    refresh: function() {
	    var newitems,
            self = this,
	        iconpos = self.iconpos;
	    if (!self.options.morebutton) {
	      self._super();
	      return;
	    }

        if ( self.popupDiv ) {
		    newitems = self.moreButton.parent().nextAll();
		    newitems.find("a").each(function() {
		      self._makeNavButton(this, iconpos);
		    });
		    newitems.appendTo(self.popupDiv.find("ul"));
		}
        self._createNavPopup();
    },

    _destroy: function() {
        var navitems,
            self = this;
            

        if (!self.options.morebutton) {
            self._super();
            return;
        }
           
        if ( self.popupDiv ) {
            navitems = self.popupDiv.find("li").detach();
            self.popupDiv.remove();
            self.moreButton.parent().remove();
            self.navbar.find("ul").append(navitems);
            self.navbar.removeClass( "ui-navbar" );
            self.navButtons = self.navbar.find("a");
            self.navButtons.each(function() {
                var icon = $.mobile.getAttribute( this, "icon" ),
                    theme = $.mobile.getAttribute( this, "theme" ),
                    classes = "ui-btn";

                if ( theme ) {
                    classes += " ui-btn-" + theme;
                }
                if ( icon ) {
                    classes += " ui-icon-" + icon + " ui-btn-icon-" + self.iconpos;
                }
                $( this ).removeClass( classes );
            });
        }
    }
});
  
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
